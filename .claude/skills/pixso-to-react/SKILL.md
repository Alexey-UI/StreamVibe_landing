---
name: pixso-to-react
description: Convert a Pixso frame (selected in the Pixso desktop app) into a React + TypeScript component using CSS Modules and this project's design tokens. Use when the user gives a Pixso frame/link/selection and wants React code generated from it.
---

# pixso-to-react

Converts the currently-selected frame in the Pixso desktop app into a production component
under `src/components/` or `src/pages/`, following this repo's conventions (see CLAUDE.md).

## Steps

1. **Confirm the target.** Ask which frame/selection to convert if it's not already selected in
   Pixso, and whether it's a reusable component (`src/components/<Name>/`) or a full page
   (`src/pages/<Name>/`).
2. **Pull design context.** Call the `pixso-mcp` tool `get_design_context` on the current selection
   to get layout structure, spacing, colors, typography, and any component/variant metadata. Call
   `get_screenshot` to get a visual reference image — you'll need it later to compare against the
   rendered output (the `ui-review` skill does this properly, but a quick visual sanity check here
   catches obvious misses early).
3. **Map design values to tokens, don't hardcode.** Cross-reference colors/spacing/radii against
   `src/styles/tokens.css`. If Pixso returns a color not yet in `tokens.css`, add it there first
   (as a new custom property) rather than inlining a hex value in the component's CSS Module — the
   whole point of tokens is that a design update is a one-file change.
4. **Generate the component**:
   - Functional component, explicit prop types (no `any`), in `ComponentName.tsx`.
   - Sibling `ComponentName.module.css` using `var(--token-name)` from `tokens.css`.
   - Semantic HTML elements (`<button>`, `<nav>`, `<section>`, headings in order) — don't reach for
     generic `<div>`/`<span>` with click handlers where a native interactive element exists.
   - If it's a page-level component, wire it into `App.tsx`'s route table via `React.lazy`, and add
     an `ErrorBoundary` if it's not already covered by the top-level one.
5. **Match responsive behavior.** If Pixso shows multiple breakpoints/variants, translate them to
   CSS media queries in the module file rather than JS-based conditional rendering, unless the
   layout structure genuinely differs (not just sizing) between breakpoints.
6. **Verify it builds.** Run `npm run build` and confirm the new component doesn't bloat the main
   chunk unexpectedly (check `dist/assets/` output) if it's a lazy-loaded page.
7. **Hand off to review.** Tell the user the component is ready for the `ui-review` skill (visual
   diff against the Pixso screenshot) and `accessibility-check` before it's considered done.

## Common pitfalls

- Don't invent spacing/colors that "look close enough" — pull exact values from
  `get_design_context` so the token file stays the single source of truth.
- Don't put Pixso's raw pixel font sizes directly into the component CSS if a comparable token
  already exists in `tokens.css` — check first.
- Images/icons exported from Pixso should go in `src/assets/` (or a component-local subfolder) with
  meaningful `alt` text authored by you, not left empty unless the image is purely decorative.
