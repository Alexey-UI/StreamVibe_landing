---
name: accessibility-check
description: Audit a page or component for WCAG 2.1 AA issues using axe-core (via Playwright) and manual heuristics, then propose concrete fixes. Use when the user asks for an accessibility/a11y review, or before marking a converted Pixso page as done.
---

# accessibility-check

Runs an automated + manual accessibility pass. Automated tools (axe-core) catch roughly a third of
real WCAG issues — this skill also checks the things axe structurally cannot (keyboard flow,
focus order, meaningful reading order, motion).

## Steps

1. **Automated scan.** Use the `playwright` MCP tools (or `npx playwright test`, see
   `tests/e2e/home.spec.ts` for the pattern) to run `@axe-core/playwright`'s `AnalyzeAccessibility`
   against the page. Treat every reported violation as something to fix, not just "moderate" ones
   — `impact: minor` still means a real user is affected.
2. **Keyboard navigation.** Tab through the whole page/component manually (or drive it via the
   Playwright MCP `press_key` tool). Every interactive element must be reachable, in a sensible
   order, with a visible focus indicator — don't accept `outline: none` without a replacement focus
   style in the CSS Module.
3. **Semantic structure.** Headings form a single logical outline (one `h1`, no skipped levels).
   Landmarks (`<nav>`, `<main>`, `<footer>`) are used instead of generic `<div>`s where they apply.
4. **Images and icons.** Meaningful images have descriptive `alt` text; purely decorative images/
   icons have `alt=""` or `aria-hidden="true"` (see `ErrorBoundary`'s fallback and the icon pattern
   in the project for reference).
5. **Color contrast against `tokens.css`.** Check text/background pairs meet 4.5:1 (normal text) or
   3:1 (large text/UI components) in both light and dark token sets — Pixso designs sometimes look
   fine in the design tool's canvas but fail contrast once real token values are substituted in.
6. **Motion/animation.** Anything animated respects `prefers-reduced-motion`.
7. **Forms** (if present): every input has an associated `<label>`, error messages are associated
   via `aria-describedby`, and errors are announced (not just shown visually).
8. **Report** each finding as: element/component, WCAG criterion, and the specific fix — not just
   "improve accessibility here."

## Fixing

- Prefer a semantic HTML fix (`<button>` instead of `<div onClick>`) over an ARIA patch
  (`role="button"` + manual keyboard handling) — ARIA is for gaps native HTML can't fill.
- After fixing, re-run the axe scan to confirm the violation is actually gone, not just visually
  addressed.
