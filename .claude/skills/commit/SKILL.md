---
name: commit
description: Create a Conventional Commits-style commit from the currently staged (or working-tree) changes, with the scope auto-detected from changed file paths. Use when the user asks to commit, or says "commit this".
---

# commit

Generates a Conventional Commits message (`type(scope): description`) from the actual diff and
creates the commit. This is the intended replacement for a blind auto-commit hook — see
CLAUDE.md's "Claude Code config" section for why commits aren't automated on every file edit.

## Steps

1. **Check state.** Run `git status` and `git diff` (staged and unstaged). If nothing is staged,
   stage the relevant files yourself (`git add <specific files>` — avoid `git add -A` if there are
   unrelated untracked files sitting around; ask the user if unsure what's intentional).
2. **Determine `type`** from what actually changed, not from what was intended:
   - `feat` — new component/page/route/capability
   - `fix` — bug fix
   - `docs` — CLAUDE.md, README, SKILL.md, comments only
   - `style` — formatting/whitespace only, no logic change
   - `refactor` — code restructuring with no behavior change
   - `test` — test files only
   - `chore` — tooling, config, deps, CI
   - `perf` — performance improvement
   - `ci` — GitHub Actions / workflow changes
3. **Determine `scope`** from the common path prefix of changed files:
   - `src/components/**` → component name in kebab-case, e.g. `error-boundary`
   - `src/pages/**` → page name, e.g. `home`
   - `src/hooks/**` → `hooks`
   - `src/styles/**` or `tokens.css` → `styles` or `tokens`
   - `.claude/**` → `claude-config`
   - `.github/**` → `ci`
   - Mixed/unclear → omit the scope rather than guessing wrong.
4. **Write the description** in imperative mood, lowercase, no trailing period, under ~70 chars.
5. **Show the proposed message to the user before committing** if this is a large or ambiguous
   change; for small, obviously-scoped changes, just commit.
6. **Commit** via a heredoc so multi-line bodies aren't mangled:
   ```bash
   git commit -m "$(cat <<'EOF'
   feat(home): add hero section from Pixso frame

   EOF
   )"
   ```
7. **Never** `git push` as part of this skill unless the user explicitly also asked to push.

## Examples

- Adding a new `Header` component → `feat(header): add header component from pixso design`
- Fixing a broken media query in tokens → `fix(tokens): correct dark-mode breakpoint`
- Adding tests for `useMediaQuery` → `test(hooks): add useMediaQuery coverage`
- Updating the CI workflow → `ci: run playwright e2e on pull requests`
