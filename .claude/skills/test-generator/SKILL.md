---
name: test-generator
description: Generate Vitest + React Testing Library unit tests for a React component or hook in this project. Use when the user asks to add tests, or after generating a new component that has none.
---

# test-generator

Writes colocated unit tests (`ComponentName.test.tsx` / `useThing.test.ts`) matching this
project's existing test style (see `src/components/ErrorBoundary/ErrorBoundary.test.tsx` and
`src/hooks/useMediaQuery.test.ts` as reference examples).

## Steps

1. **Read the component/hook fully** before writing tests — don't guess its API from the filename.
2. **Test behavior, not implementation**: query by role/label/text (`getByRole`, `getByLabelText`),
   not by CSS Module class names or internal state. CSS Module class names are implementation
   detail and will change when the design does.
3. **Cover, at minimum**:
   - The default/happy-path render.
   - Each meaningful prop variant (e.g. a `variant="primary" | "secondary"` prop gets a test per
     variant if they render differently).
   - User interactions via `@testing-library/user-event`, not `fireEvent`, unless there's a
     specific reason `fireEvent` is needed.
   - Error/edge states (empty lists, missing optional props, error boundaries triggering).
4. **For hooks**, use `renderHook` from `@testing-library/react` and `act` for state updates that
   happen outside of an event handler (see `useMediaQuery.test.ts` for the pattern of mocking a
   browser API like `matchMedia`).
5. **Don't test what Playwright already covers.** Pixel-level layout, cross-viewport behavior, and
   accessibility violations belong to `tests/e2e/` (Playwright + axe), not Vitest. Unit tests should
   verify component logic/rendering in isolation.
6. **Run the new tests**: `npx vitest run <path-to-test-file>` and make sure they fail for the
   right reason if you temporarily break the implementation (a test that can't fail isn't testing
   anything).
7. **Add jsdom-only mocks sparingly** — prefer testing through the public DOM API surface
   (`document`, `window`) the way the component actually uses it, rather than mocking internals.

## File placement

Tests live next to the file they test: `src/components/Foo/Foo.test.tsx` next to `Foo.tsx`. Do not
create a separate top-level `__tests__/` directory — that's not this project's convention.
