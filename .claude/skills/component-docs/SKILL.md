---
name: component-docs
description: Generate TSDoc comments for a component's props and exported functions/hooks in this project. Use when the user asks to document a component, add JSDoc/TSDoc, or improve API documentation.
---

# component-docs

Adds TSDoc to public API surfaces (exported components, hooks, utility functions) — this is the
one place in this codebase where doc comments are the deliverable, not a byproduct.

## Steps

1. **Scope to the public surface.** Document exported components' prop interfaces, exported hooks'
   parameters/return values, and exported utility functions. Don't document internal/unexported
   helpers or obvious one-liners — that's noise, not documentation.
2. **For a component's props interface**, add a `/** ... */` block above each prop that isn't
   self-explanatory from its name and type alone:
   ```ts
   interface CardProps {
     /** Rendered inside the card body. */
     children: ReactNode
     /** Visually emphasizes the card; use for the single most important item in a list. */
     highlighted?: boolean
   }
   ```
   Skip props where the name+type already say everything (`children: ReactNode` alone often needs
   nothing added).
3. **For hooks**, document the parameters, the return value, and any non-obvious behavior (e.g.
   "returns `false` during SSR/before hydration" for `useMediaQuery`).
4. **For utility functions**, a one-line `@param`/`@returns` is enough unless there's a subtlety
   worth calling out (edge cases, what happens with empty/falsy input).
5. **Do not** add a doc comment that just restates the function name in sentence form
   (`/** Formats the date. */ function formatDate()` — say what format, what locale, what edge
   cases instead, or omit it).
6. **Verify** the doc comments render sensibly in the editor's hover tooltip (TSDoc syntax:
   `@param`, `@returns`, `@example` where a usage example genuinely clarifies something non-obvious).

## What NOT to do

This project's default is no comments explaining _what_ code does (identifiers should do that).
This skill is a deliberate, scoped exception for public API documentation — don't let it become an
excuse to add narration comments (`// loop over items`) inside function bodies while you're in there.
