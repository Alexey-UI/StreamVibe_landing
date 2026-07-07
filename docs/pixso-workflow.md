# Pixso → React workflow, end to end

This is the guided walkthrough for turning a Pixso frame into a merged, tested, reviewed piece of
the StreamVibe landing page — plus the pitfalls we actually hit building this setup, so you don't
have to rediscover them.

## Prerequisites (one-time)

1. **Pixso desktop app** open with the MCP server running (it's built in, no install needed) —
   confirm `http://127.0.0.1:3667/mcp` responds. `.mcp.json` already points at it.
2. **Approve the MCP servers in Claude Code.** The first time you open this project, Claude Code
   will ask you to approve the servers listed in `.mcp.json` (`pixso-mcp`, `playwright`, `github`).
   Run `/mcp` to check status or re-approve if you skipped it.
3. **GitHub MCP auth.** The `github` server (`https://api.githubcopilot.com/mcp/`) uses OAuth, not
   a stored token — the first tool call against it will prompt you to authenticate in a browser.
4. `npm install` once, then `npm run dev` to confirm the app runs.

## The pipeline

```
Select a frame in Pixso
        │
        ▼
ui-developer agent (or /pixso-to-react skill)
  → get_design_context + get_screenshot from pixso-mcp
  → generates Component.tsx + Component.module.css using tokens.css
        │
        ▼
accessibility-auditor agent (or /accessibility-check)
  → axe-core scan + manual keyboard/contrast/semantic checks
        │
        ▼
ui-reviewer agent (or /ui-review)
  → Playwright screenshots at mobile/tablet/desktop vs. the Pixso screenshot
        │
        ▼
/test-generator → unit tests, npx playwright test → e2e
        │
        ▼
/commit → conventional commit
        │
        ▼
git push + gh pr create → CI runs (build-and-test) → merge
```

## Walking through it on a real frame

1. In Pixso, select the frame you want (e.g. a new "Pricing" section).
2. Ask Claude: _"Convert the selected Pixso frame to a React component"_ — this triggers the
   `pixso-to-react` skill (or invoke the `ui-developer` subagent directly for a bigger feature; add
   `isolation: worktree` if you want it built on a separate worktree instead of your current branch).
3. Review the generated `src/components/Pricing/Pricing.tsx` + `.module.css`. Check that colors/
   spacing reference `tokens.css` variables, not raw hex/px values copied from Pixso.
4. Run `/accessibility-check` (or ask for the `accessibility-auditor` agent) before you consider it
   done — catching a heading-order or contrast problem now is a five-minute fix; catching it after
   three more components build on the same pattern is not.
5. Run `/ui-review` to diff against the Pixso screenshot across viewports.
6. Add tests: ask for the `test-generator` skill, or the `test-writer` agent for a bigger batch.
   Add/extend a Playwright spec under `tests/e2e/` for anything visual or cross-viewport.
7. Run the full local check before committing: `npm run typecheck && npm run lint && npm run test
&& npm run build && npx playwright test`.
8. `/commit` — generates a Conventional Commit message from the actual diff.
9. `git push -u origin <branch>` and `gh pr create`. **`main` is protected** — you cannot push
   directly to it, even as the repo owner (see CLAUDE.md's branch protection note). The `ci`
   workflow's `build-and-test` check must pass before the PR can merge.
10. Once CI is green, `gh pr merge --squash` (or merge in the GitHub UI).

## Testing each piece

| What                             | Command                                                | Notes                                     |
| -------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| Unit test a single file          | `npx vitest run src/hooks/useMediaQuery.test.ts`       | Fast, jsdom                               |
| Watch mode while iterating       | `npm run test:watch`                                   |                                           |
| Single Playwright spec           | `npx playwright test tests/e2e/home.spec.ts`           | Builds + serves first                     |
| Debug a Playwright spec visually | `npx playwright test --debug tests/e2e/home.spec.ts`   | Opens the Playwright inspector            |
| See what axe actually flagged    | Run the spec, then open `playwright-report/index.html` | Full HTML report with diffs/screenshots   |
| Typecheck only (no build)        | `npm run typecheck`                                    | Faster than a full build during iteration |

## Debugging with Playwright / DevTools

- **A visual test fails but you don't know why**: run with `--debug` to step through with the
  Playwright Inspector, or `--ui` (`npx playwright test --ui`) for the full time-travel UI.
- **An axe violation's target selector is unclear**: the JSON failure output includes a `html`
  field with the exact offending element and a `target` CSS path — search for that class/tag
  rather than guessing which component it came from.
- **Something renders differently in the browser than you expect**: use the `chrome-devtools` MCP
  tools (`take_snapshot`, `list_console_messages`, `evaluate_script`) to inspect the live DOM/
  console without leaving the conversation — useful for one-off checks that don't need a full
  Playwright spec.
- **CI passes locally but fails in GitHub Actions (or vice versa)**: the most common cause here was
  browser binaries — Playwright needs `npx playwright install` for whichever browsers your config
  lists (`chromium`, `webkit`); the CI workflow installs both explicitly, make sure your local
  machine has too (`npx playwright install --with-deps chromium webkit`).

## Pitfalls we actually hit (so you recognize them faster)

- **`npm create vite@latest .` hangs/cancels in a non-empty directory.** Use
  `--overwrite --no-interactive` — the interactive "remove existing files?" prompt has no TTY to
  answer in an automated shell.
- **`tsconfig`'s `baseUrl` is deprecated** as of the TypeScript version this project pins. Path
  aliases work fine with just `paths` (relative to the tsconfig file) — no `baseUrl` needed.
- **Vitest picks up Playwright `.spec.ts` files by default** and fails with "Playwright Test did
  not expect test() to be called here." Exclude `tests/e2e/**` in `vite.config.ts`'s `test.exclude`
  — already done here, but if you add a second Playwright directory, exclude that too.
- **`react-hooks/set-state-in-effect` fires on the "obvious" `useState`+`useEffect` pattern** for
  subscribing to a browser API (media queries, etc.). Use `useSyncExternalStore` instead — see
  `src/hooks/useMediaQuery.ts`.
- **axe's `heading-order` rule is easy to violate accidentally** once components are composed
  together — a component that looks right in isolation (`<h3>` inside a card) can violate heading
  order once it's dropped under a page that only has an `<h1>` with nothing at `<h2>`. This bit us
  building the `FeatureCard` example; the e2e a11y test caught it immediately.
- **`eslint-plugin-jsx-a11y` may lag behind the latest ESLint major version** — if `npm install` for
  it fails on a peer-dependency conflict, don't force-install with `--legacy-peer-deps`; lean on the
  `@axe-core/playwright` runtime scan instead (it catches more real issues than static linting
  would anyway) and revisit the static plugin once it adds support.
- **The `block-dangerous-bash` hook scans the raw command string, including heredoc bodies** — a
  commit message that merely _mentions_ `rm -rf` or `sudo` as documentation text will get blocked
  as if it were the actual command. If you need to write about a dangerous command in a commit
  message or file, avoid the exact trigger substrings (see the hook's pattern list in
  `.claude/hooks/block-dangerous-bash.cjs`) or ask the user to run that specific command manually.
- **Branch protection with `enforce_admins: true` blocks direct pushes to `main` for everyone**,
  including the repo owner. This is intentional here (it's the whole point of "require PR"), but if
  it ever gets in the way of a genuinely trivial fix, it's a repo setting
  (`gh api repos/<owner>/<repo>/branches/main/protection`) you can adjust, not a bug.
- **`npx` on Windows needs `shell: true`** when invoked via Node's `execFileSync`/`spawnSync` — it's
  a `.cmd` shim, not a directly-executable binary, so a bare `execFileSync('npx', [...])` throws
  `ENOENT` without `shell: true`. Both hook scripts in `.claude/hooks/` already set this.
