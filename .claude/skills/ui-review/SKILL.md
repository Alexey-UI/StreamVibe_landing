---
name: ui-review
description: Compare a rendered page/component against its Pixso design and this project's design tokens, using Playwright screenshots and the Pixso MCP screenshot tool. Use after generating or changing UI to verify it actually matches the design.
---

# ui-review

Visually and structurally verifies an implementation against the Pixso source of truth.

## Steps

1. **Get the design reference.** Call `pixso-mcp`'s `get_screenshot` for the frame being reviewed,
   and `get_design_context` for exact spacing/color/typography values.
2. **Get the implementation reference.** Start the dev server (`npm run dev`) or use the Playwright
   MCP tools directly against it. Take screenshots at a minimum of three viewports:
   - Mobile: 375×667
   - Tablet: 768×1024
   - Desktop: 1440×900
     (Match whatever breakpoints the Pixso frame actually defines if they differ.)
3. **Compare systematically**, not just "does it look right":
   - Layout: spacing between elements, alignment, order of elements in the DOM vs. visual order.
   - Typography: font size, weight, line-height, letter-spacing against `tokens.css` values.
   - Color: background/text/border colors against `tokens.css`, including dark-mode variants if
     the Pixso frame has one.
   - Responsive behavior: does it reflow the way Pixso's breakpoint variants show, or does
     something just shrink/overflow?
   - Interactive states: hover/focus/active/disabled — Pixso frames often only show one state, so
     check the design system / component variants for the others; don't guess.
4. **Report findings as a concrete list**: `file:line` or component name, what's wrong, what the
   correct value is (cite the token or the Pixso value). Don't just say "spacing looks off."
5. **Fix and re-verify**, don't just report and stop, unless the user asked for review-only.

## Notes

- Prefer comparing against the Pixso screenshot pixel-for-pixel intent over "looks close enough" —
  small spacing/type drift compounds across a whole page.
- If Playwright's viewport screenshot and the Pixso frame are different aspect ratios, resize the
  Playwright viewport to match the frame's dimensions before comparing, not after.
- This skill checks fidelity to the design. Run `accessibility-check` separately — a pixel-perfect
  match can still fail WCAG contrast/semantics if the design itself has issues; flag those back to
  the design rather than "faithfully" reproducing an inaccessible pattern.
