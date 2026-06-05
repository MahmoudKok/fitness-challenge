# Design System

## Purpose

This document defines the visual and UI implementation rules for the project.

It guides styling, reusable components, layout consistency, and frontend design quality.

This file does not define product features or user flows.

## Design Principles

The UI should feel:

- Modern
- Friendly
- Clean
- Readable
- Calm
- Responsive
- Consistent

Avoid:

- Aggressive visuals
- Overly decorative layouts
- Childish styling
- Medical/clinical styling
- Unnecessary visual complexity

## Typography

Use **Nunito Sans** as the primary font.

Recommended weights:

- Page headings: `800`
- Section titles: `700`
- Buttons: `700`
- Body text: `400-500`
- Small labels: `500-600`

Typography rules:

- Keep text readable on mobile and desktop.
- Avoid oversized text inside compact UI.
- Use consistent heading levels.
- Do not use negative letter spacing.
- Do not scale font size directly with viewport width.

## Color Tokens

### Brand Tokens

```txt
--color-deep-navy: #0F172A;
--color-fresh-green: #22C55E;
--color-energy-lime: #A3E635;
--color-soft-white: #F8FAFC;
--color-slate-gray: #64748B;
--color-accent-orange: #FB923C;
```

## Light Mode Tokens

```txt
--color-bg: #F8FAFC;
--color-surface: #FFFFFF;
--color-text: #0F172A;
--color-text-muted: #64748B;
--color-border: #E2E8F0;
--color-primary: #22C55E;
--color-primary-hover: #16A34A;
--color-soft-success: #DCFCE7;
--color-soft-achievement: #FFEDD5;
```

## Dark Mode Tokens

```txt
--color-bg: #0F172A;
--color-bg-deep: #020617;
--color-surface: #1E293B;
--color-text: #F8FAFC;
--color-text-muted: #94A3B8;
--color-text-secondary: #CBD5E1;
--color-border: #334155;
--color-primary: #22C55E;
--color-primary-hover: #4ADE80;
--color-achievement: #FB923C;
```

## Color Usage Rules

Use green for primary actions and positive progress.

Use lime sparingly for highlights, streaks, or active states.

Use orange sparingly for achievement or emphasis.

Use navy/slate for structure, text, and calm contrast.

Do not overuse one color family across the whole interface.

Maintain readable contrast in both light and dark mode.

## Shape Tokens

Recommended radius values:

```txt
--radius-button: 14px;
--radius-card: 20px;
--radius-panel: 24px;
```

Rules:

- Use rounded corners consistently.
- Buttons should use `14px` radius.
- Cards should use `20px` radius.
- Large panels should use `24px` radius.
- Avoid mixing many random radius values.

## Spacing Rules

Use consistent spacing based on Tailwind spacing scale.

Recommended layout spacing:

- Tight internal spacing: `p-3`, `gap-2`
- Normal cards: `p-4`, `p-5`, `gap-4`
- Large panels: `p-6`, `p-8`, `gap-6`
- Page sections: `py-6`, `py-8`, `gap-6`

Rules:

- Keep spacing comfortable but not wasteful.
- Keep dense UI readable.
- Avoid inconsistent one-off spacing values.

## Surface Rules

Light mode:

- Use white surfaces on soft white backgrounds.
- Use subtle borders or soft shadows.
- Avoid heavy shadows.

Dark mode:

- Use dark slate surfaces.
- Prefer subtle borders over shadows.
- Keep contrast readable without harsh pure-black sections.

## Component Styling Rules

Create reusable UI components for repeated patterns.

Shared UI components should live under:

```txt
src/components/ui/
```

Rules:

- Components should be small and focused.
- Shared components should not depend on feature-specific data.
- Use typed props.
- Use variants where useful, but avoid overengineering.
- Prefer composition over large configurable components.

Recommended reusable primitives:

```txt
Button
Input
Select
Checkbox
Card
Badge
Tabs
Modal/Dialog
Table
EmptyState
LoadingState
ErrorState
```

Do not create these all at once unless needed.

Create them incrementally when the UI repeats.

## Button Rules

Primary button:

- Green background
- Clear hover state
- Bold text
- Rounded `14px`
- Accessible focus ring

Secondary button:

- Transparent or surface background
- Border using the border token
- Clear hover state
- Rounded `14px`

Destructive button:

- Use only when needed
- Must be visually distinct
- Must not look like the primary action

## Card and Panel Rules

Cards:

- Use surface background
- Use `20px` radius
- Use subtle border or shadow
- Keep content readable and well spaced

Panels:

- Use `24px` radius
- Use for larger grouped UI areas
- Do not nest cards inside cards unless necessary

## Icon Rules

Use rounded line icons.

Recommended style:

- `2px` stroke
- Rounded caps
- Simple and readable
- Consistent sizing

Use icons to support meaning, not as decoration overload.

## Data UI Rules

For data-heavy UI:

- Keep tables readable.
- Use consistent alignment.
- Use muted text for secondary values.
- Use badges for compact status display.
- Use progress bars/rings only where they clarify information.
- Avoid visual noise.

## Tailwind Rules

Use Tailwind CSS for styling.

Rules:

- Prefer design tokens mapped in Tailwind config where possible.
- Avoid long repeated class strings.
- Extract reusable UI patterns into components.
- Do not add another styling library unless requested.
- Keep responsive classes intentional and readable.

## Dark Mode Rules

Dark mode should be designed intentionally, not inverted automatically.

Rules:

- Use dark surfaces and subtle borders.
- Keep text contrast strong.
- Avoid heavy shadows.
- Ensure icons, buttons, and inputs remain readable.
- Test important UI in both modes when possible.

## Accessibility Rules

Minimum requirements:

- Interactive elements must have visible focus states.
- Buttons and links must be keyboard accessible.
- Inputs must have labels or accessible names.
- Text must maintain reasonable contrast.
- Do not rely only on color to communicate meaning.
- Click targets should be comfortable on mobile.

## Responsive Rules

Design mobile-first.

Rules:

- Layouts should work on small screens.
- Avoid fixed widths that break mobile.
- Use responsive grids and flex layouts.
- Make tables scroll horizontally when needed.
- Keep buttons and inputs usable on touch devices.

## Implementation Rules

Before making UI changes:

1. Read this file.
2. Use existing UI components if available.
3. Follow existing visual patterns if they match this guide.
4. Create reusable components only when repetition appears.
5. Do not redesign unrelated UI.

After UI changes:

1. Check responsive behavior.
2. Check light and dark mode if supported.
3. Run lint/build.
