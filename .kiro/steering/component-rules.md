---
inclusion: always
---

# Component Generation Rules

When creating or modifying any TantuUI React component, follow these rules strictly.

## File Structure

Every component lives in its own folder:
```
packages/react/src/components/ComponentName/
├── ComponentName.tsx      ← component logic
├── ComponentName.css      ← component styles (CSS classes, no inline styles)
└── index.ts               ← barrel export
```

After creating the component:
1. Export from `packages/react/src/components/index.ts`
2. Import CSS in `packages/react/src/index.css`
3. Create story in `packages/react/src/stories/ComponentName.stories.tsx`

## Props Design

- **All props are optional** — component must render correctly with zero props
- **`children` is never required** — handle empty/undefined gracefully
- **`className`** always accepted, always merged (never replaced)
- **`style`** always accepted as escape hatch
- **No inline styles in component** — all visual styles via CSS classes using `--tui-*` variables
- Use `cn()` utility from `../../utils/cn` for class merging
- Types for shared props (Size, Variant, Intent) come from `../../types`
- Add `testId` prop mapping to `data-testid`

## Props TypeScript Pattern

```tsx
export interface ComponentNameProps extends BaseProps, HTMLAttributes<HTMLElement> {
  /** JSDoc every prop */
  propName?: PropType;
}
```

Use `(string & {})` trick for props that accept both known values AND custom strings:
```tsx
color?: "primary" | "secondary" | "danger" | (string & {});
```

## CSS Rules

- **Class prefix:** `tui-componentname` (e.g. `tui-btn`, `tui-text`, `tui-box`)
- **Modifier pattern:** `tui-componentname--modifier` (e.g. `tui-btn--solid`, `tui-btn--lg`)
- **Child elements:** `tui-componentname__child` (e.g. `tui-btn__icon`, `tui-btn__spinner`)
- **No inline styles** — all visual properties in the CSS file using `var(--tui-*)` tokens
- Exception: dynamic values (like multi-line clamp count) can use CSS custom properties set via style attribute
- **Font family:** always `inherit` — never hardcode a font
- **Transitions:** use `var(--tui-duration-normal)` and `var(--tui-ease-in-out)`
- **Focus ring:** add `tui-focus-ring` class to any interactive/focusable element

## Disabled State

For any interactive component:
- Background: `var(--tui-color-neutral-100)`
- Text color: `var(--tui-color-neutral-300)`
- Border: `var(--tui-color-neutral-100)`
- Cursor: `not-allowed`
- NO `pointer-events: none` (allows tooltips)
- Set `tabIndex={-1}` when disabled
- Set `disabled` attribute on native elements
- Set `aria-disabled` for accessibility

## Ghost / Skeleton

- Use `isGhost` prop (boolean, optional, default false)
- When true, render `<Shimmer>` component internally
- Shimmer must match the component's exact dimensions (same size classes)
- Pass children invisibly inside Shimmer for height preservation

## Accessibility

- Use semantic HTML elements (button, a, nav, etc.)
- Add `aria-*` attributes where needed
- Support `aria-label` for icon-only elements
- Keyboard navigable — focusable elements must be in tab order (unless disabled)
- Color contrast must meet WCAG AA

## Component Render Pattern

```tsx
import React, { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./ComponentName.css";

export interface ComponentNameProps extends BaseProps, HTMLAttributes<HTMLElement> {
  // props
}

export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ className, style, children, testId, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("tui-componentname", className)}
        style={style}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ComponentName.displayName = "ComponentName";
```

## Token Usage in CSS

| Property | Token variable pattern |
|---|---|
| Color | `var(--tui-color-*)` |
| Spacing | `var(--tui-spacing-*)` |
| Font size | `var(--tui-font-size-*)` |
| Font weight | `var(--tui-font-weight-*)` |
| Line height | `var(--tui-leading-*)` |
| Border radius | `var(--tui-radius-*)` |
| Box shadow | `var(--tui-shadow-*)` |
| Border width | `var(--tui-border-width-*)` |
| Z-index | `var(--tui-z-*)` |
| Duration | `var(--tui-duration-*)` |
| Easing | `var(--tui-ease-*)` |
| Opacity | `var(--tui-opacity-*)` |

## Naming Conventions

- Decimal spacing: underscore → `--tui-spacing-0_5`, `--tui-spacing-1_5`
- Size scales: no hyphen before number → `--tui-radius-2xl`, `--tui-font-size-3xl`
- Color with opacity: use `-rgb` suffix → `rgb(var(--tui-color-primary-600-rgb) / 0.5)`
