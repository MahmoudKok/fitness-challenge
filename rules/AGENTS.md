## Purpose

This file defines the technical rules for this project.

Follow it when writing, editing, or reviewing code.

Do not invent product features. Build only what the user asks for.

## Tech Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth
- Firestore
- Firebase Hosting

Do not change the stack unless the user explicitly asks.

## Architecture

Use a clean feature-based structure.

Recommended structure:

```txt
src/
  app/
  components/
  features/
  lib/
  providers/
```

Use folders like this:

- `src/app`: routes, layouts, page composition
- `src/components`: shared reusable UI
- `src/features`: feature-specific components, hooks, services, types, utilities
- `src/lib`: Firebase setup, constants, shared utilities
- `src/providers`: React context providers

Keep files small and focused.

Do not put unrelated logic in the same file.

## Separation Rules

Do not put Firestore queries directly inside React components or pages.

Use this pattern:

- Components: UI only
- Hooks: loading data and managing feature state
- Services: Firebase/Firestore reads and writes
- Utils: pure business logic
- Types: TypeScript models
- Providers: global app state like auth

## Firebase Rules

Initialize Firebase in one place under:

```txt
src/lib/firebase/
```

Use environment variables for Firebase config.

Do not hardcode Firebase config inside components.

Do not use Firebase Admin SDK in client code.

Firestore access should go through service files, not UI components.

## State Management

Default approach:

- React Context for auth/session
- Custom hooks for feature data
- Local state for forms and simple UI state
- Pure functions for derived calculations

Do not add Redux, Zustand, TanStack Query, or other state libraries unless the user asks or there is a clear reason.

## TypeScript

Use clear TypeScript types.

Avoid `any`.

Do not silence TypeScript errors unless there is a strong reason.

Keep shared types in predictable files, usually `types.ts`.

## Styling

Use Tailwind CSS.

Keep UI code readable.

Create reusable components when markup repeats.

Do not add another styling system unless the user asks.

## Code Quality

Write clean, simple code.

Use meaningful names.

Avoid huge components.

Avoid duplicated logic.

Handle loading and error states.

Keep business logic out of UI components.

Prefer readable code over clever code.

## Dependencies

Do not add new dependencies unless needed.

Before adding a dependency, explain why existing tools are not enough.

## Before Coding

Before editing files:

1. Inspect the project structure.
2. Follow existing patterns if they are reasonable.
3. List the files you will create or modify.
4. Give a short implementation plan.

## After Coding

After meaningful changes, run:

```bash
npm run lint
npm run build
```

Fix errors before stopping.

If a command cannot run, explain why.

## Forbidden

Do not:

- Invent product features
- Change the tech stack
- Put Firebase logic in UI components
- Put all logic in one giant file
- Add state libraries without reason
- Add unnecessary dependencies
- Ignore TypeScript or build errors
- Hardcode secrets
- Delete user work without permission
