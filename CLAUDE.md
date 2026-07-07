# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

StreamVibe landing page — a marketing/landing site built by converting Pixso designs into
production React components.

## Commands

```bash
npm run dev            # start Vite dev server
npm run build           # tsc -b && vite build (typecheck is part of build)
npm run preview         # preview the production build locally
npm run typecheck       # tsc -b --noEmit (typecheck without building)
npm run lint             # eslint .
npm run format           # prettier --write .
npm run format:check     # prettier --check .
npm run test             # vitest run (unit tests, single pass)
npm run test:watch       # vitest (watch mode)
npm run test:e2e         # playwright test (builds, serves on :4173, runs e2e + a11y specs)
```

Run a single unit test file: `npx vitest run src/hooks/useMediaQuery.test.ts`
Run a single Playwright spec: `npx playwright test tests/e2e/home.spec.ts`
Run a single Playwright spec in headed/debug mode: `npx playwright test --debug tests/e2e/home.spec.ts`

## Tech stack

React 19 (satisfies React 18+ APIs), TypeScript, Vite, CSS Modules, React Router (lazy routes),
Vitest + Testing Library (unit), Playwright + `@axe-core/playwright` (e2e + accessibility).

## Architecture

- **Routing**: `src/App.tsx` defines routes with `React.lazy` + `Suspense`, wrapped in a single
  top-level `ErrorBoundary`. Each page is its own lazy chunk — verify with `npm run build` that a
  new page produces its own `dist/assets/<PageName>-*.js` chunk rather than growing the main bundle.
- **Path aliases**: `@`, `@components`, `@pages`, `@styles`, `@utils`, `@hooks` map to
  `src/*` subfolders. Defined in **two places that must stay in sync**: `vite.config.ts`
  (`resolve.alias`) and `tsconfig.app.json` (`compilerOptions.paths`). Adding a new alias means
  editing both files.
- **Design tokens**: `src/styles/tokens.css` holds CSS custom properties (color, spacing, font,
  radius). `src/styles/global.css` imports tokens and applies resets. Component styles are CSS
  Modules (`*.module.css`) that reference `var(--token-name)` rather than hardcoding values — this
  is what makes a Pixso token update a one-file change instead of a find-and-replace across
  components.
- **Error boundaries**: `ErrorBoundary` (`src/components/ErrorBoundary`) is a class component —
  React has no hook equivalent for `getDerivedStateFromError`/`componentDidCatch`. Wrap each
  route/major feature in its own boundary so one broken feature doesn't blank the whole page.
- **Testing split**: Vitest (`vite.config.ts` `test` block) covers unit/component tests and
  excludes `tests/e2e/**`. Playwright (`playwright.config.ts`) owns everything under
  `tests/e2e/`, builds the app, and serves it on port 4173 before running. Don't add
  `*.spec.ts` files outside `tests/e2e/` — Vitest's default include glob will pick them up and
  fail (Playwright's `test()` cannot run inside Vitest).
- **Env vars**: Vite only exposes `VITE_`-prefixed vars to client code. Declare new ones in both
  `.env.example` and the `ImportMetaEnv` interface in `src/vite-env.d.ts`.

## Coding standards

- Functional components only; the sole exception is `ErrorBoundary` (React requirement).
- Explicit typing on component props, hook returns, and function signatures — no inferred `any`.
  `@typescript-eslint/no-explicit-any` is set to `error` in `eslint.config.js`; do not weaken it.
- Every route/major feature gets its own `ErrorBoundary`, not one global catch-all beyond the
  top-level one in `App.tsx`.
- Prefer `useSyncExternalStore` over `useState`+`useEffect` when subscribing to an external source
  (browser APIs, media queries, etc.) — see `src/hooks/useMediaQuery.ts`. Calling `setState`
  synchronously inside an effect body is flagged by `react-hooks/set-state-in-effect`; don't
  suppress it, restructure the hook instead.
- Memoize with `React.memo`/`useMemo`/`useCallback` where a component re-renders with unchanged
  props/inputs on a hot path (lists, anything wrapping Pixso-derived sections with many DOM nodes)
  — not reflexively on every component.
- New pages should be added to the route table in `App.tsx` via `React.lazy`, not static imports.

## Project structure

```
src/
  components/   shared, reusable UI components (each in its own folder with .tsx + .module.css)
  pages/        route-level components (one folder per route)
  styles/       tokens.css (design tokens) + global.css (resets)
  utils/        framework-agnostic helper functions
  hooks/        reusable custom hooks
tests/e2e/      Playwright specs (visual + accessibility)
```

## Commit conventions

Conventional Commits: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`.
Format: `<type>(<optional scope>): <description>`. Use the `commit` skill
(`.claude/skills/commit/SKILL.md`) to generate one with scope auto-detected from staged paths.

## Branch protection (GitHub)

`main` requires: PR review before merge, the `ci` GitHub Actions check passing, and no direct
pushes. See `.github/workflows/ci.yml` for what the required check runs (install, lint, typecheck,
unit tests, build, Playwright e2e).

## MCP servers (`.mcp.json`)

- **pixso-mcp** — local HTTP server exposed by the Pixso desktop app (`127.0.0.1:3667`, no auth).
  Use `get_design_context` for tokens/component structure and `get_screenshot` for visual
  reference when converting a frame to React.
- **playwright** — drives a real browser for the e2e/visual/a11y tests and for comparing a live
  page against a Pixso screenshot.
- **github** — repository operations (issues, PRs, checks) via the `gh` CLI's auth token.

## Claude Code config in this repo

- **Skills** (`.claude/skills/`): `pixso-to-react`, `ui-review`, `commit`, `test-generator`,
  `component-docs`, `accessibility-check`.
- **Subagents** (`.claude/agents/`): `ui-developer`, `ui-reviewer`, `test-writer`,
  `accessibility-auditor`. Invoke `ui-developer` with worktree isolation
  (`isolation: worktree`) when generating a full page/feature so main stays clean until reviewed.
- **Hooks** (`.claude/settings.json`): dangerous-command blocking (PreToolUse), Prettier
  auto-format and TypeScript typecheck (PostToolUse) after file edits. Commits and PRs are
  intentionally **not** automated via hooks — see the `commit` skill and the `ui-developer` →
  `ui-reviewer` workflow instead, so a human/agent reviews before either happens.
