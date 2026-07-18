# TantuUI — Tokens & Components Implementation Guide

> This file was auto-added by `@tantuui/react` to help AI tools (Kiro, Cursor, Copilot, etc.)
> understand how to use TantuUI in your project. Keep it in your repo for best results.

## Setup

### Vite (Zero Config)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tantuui from "@tantuui/tokens/vite";

export default defineConfig({
  plugins: [react(), tantuui()],
});
```

### Next.js / Webpack / CRA

```tsx
// main.tsx or _app.tsx — import once at app root
import "@tantuui/tokens/css";
import "@tantuui/tokens/css/utilities";
import "@tantuui/tokens/runtime";
import "@tantuui/react/css";
```

### With Tailwind

```tsx
// main.tsx
import "@tantuui/tokens/css";
import "@tantuui/react/css";
```

```js
// tailwind.config.js
const tantuPreset = require("@tantuui/tokens/tailwind-preset");
module.exports = { presets: [tantuPreset], content: ["./src/**/*.{tsx,ts}"] };
```

> With Tailwind, do NOT import `@tantuui/tokens/css/utilities` or `@tantuui/tokens/runtime`.

---

## Token Usage Rules

### Always use `--tui-*` CSS variables for styling

| Property | Token pattern | Example |
|----------|--------------|---------|
| Color | `var(--tui-color-*)` | `var(--tui-color-brand-blue-600)` |
| Spacing | `var(--tui-spacing-*)` | `var(--tui-spacing-4)` |
| Font size | `var(--tui-font-size-*)` | `var(--tui-font-size-sm)` |
| Font weight | `var(--tui-font-weight-*)` | `var(--tui-font-weight-bold)` |
| Line height | `var(--tui-leading-*)` | `var(--tui-leading-normal)` |
| Border radius | `var(--tui-radius-*)` | `var(--tui-radius-md)` |
| Shadow | `var(--tui-shadow-*)` | `var(--tui-shadow-sm)` |
| Border width | `var(--tui-border-width-*)` | `var(--tui-border-width-1)` |
| Z-index | `var(--tui-z-*)` | `var(--tui-z-dropdown)` |
| Duration | `var(--tui-duration-*)` | `var(--tui-duration-normal)` |
| Easing | `var(--tui-ease-*)` | `var(--tui-ease-in-out)` |
| Opacity | `var(--tui-opacity-*)` | `var(--tui-opacity-50)` |

### Naming conventions

- Decimal spacing uses underscore: `--tui-spacing-0_5`, `--tui-spacing-1_5`
- Size scales have no hyphen before number: `--tui-radius-2xl`, `--tui-font-size-3xl`
- Color with opacity: `rgb(var(--tui-color-primary-600-rgb) / 0.5)`

### Never use hardcoded values

❌ Bad: `padding: 16px; border-radius: 8px; color: #333;`
✅ Good: `padding: var(--tui-spacing-4); border-radius: var(--tui-radius-lg); color: var(--tui-color-brand-black-900);`

---

## Utility Classes (without Tailwind)

Use `tui-*` prefixed utility classes:

```html
<div class="tui-bg-brand-blue-600 tui-text-white tui-p-4 tui-rounded-lg tui-shadow-md">
  Styled with utilities
</div>
```

| Category | Pattern | Example |
|----------|---------|---------|
| Background | `tui-bg-*` | `tui-bg-brand-blue-600` |
| Text color | `tui-text-*` | `tui-text-white` |
| Padding | `tui-p-*`, `tui-px-*`, `tui-py-*` | `tui-p-4` |
| Margin | `tui-m-*`, `tui-mx-*`, `tui-my-*` | `tui-m-2` |
| Gap | `tui-gap-*` | `tui-gap-3` |
| Border radius | `tui-rounded-*` | `tui-rounded-xl` |
| Shadow | `tui-shadow-*` | `tui-shadow-sm` |
| Border | `tui-border-*` | `tui-border-1` |
| Font size | `tui-text-*` | `tui-text-lg` |
| Font weight | `tui-font-*` | `tui-font-bold` |
| Flex | `tui-flex`, `tui-items-center`, `tui-justify-between` | |
| Grid | `tui-grid`, `tui-grid-cols-*` | `tui-grid-cols-3` |
| Display | `tui-block`, `tui-hidden`, `tui-inline-flex` | |

### Pseudo-class & responsive variants (requires runtime)

```html
<button class="tui-bg-white hover:tui-bg-brand-black-100 focus:tui-ring-2">Interactive</button>
<div class="tui-grid-cols-1 md:tui-grid-cols-3">Responsive</div>
```

---

## Component Usage

```tsx
import { Button, Text, Input, Box, Switch, Select, Calendar } from "@tantuui/react";
```

### Available components

| Component | Key props |
|-----------|-----------|
| `Button` | `variant`, `intent`, `size`, `isLoading`, `leftIcon`, `rightIcon` |
| `Text` | `as`, `size`, `weight`, `color`, `truncate`, `maxLines` |
| `Box` | `display`, `direction`, `gap`, `p`, `m`, `rounded`, `shadow` |
| `Input` | `variant`, `intent`, `size`, `leftIcon`, `rightIcon`, `clearable` |
| `Textarea` | `variant`, `intent`, `resize`, `rows`, `maxLength` |
| `Select` | `variant`, `intent`, `size`, `options` |
| `Checkbox` | `intent`, `size`, `indeterminate`, `boxStyle` |
| `Radio` | `intent`, `size`, `boxStyle` |
| `Switch` | `intent`, `size`, `label` |
| `Label` | `required`, `htmlFor` |
| `FormField` | `label`, `helperText`, `error` |
| `LinkText` | `variant`, `href`, `external` |
| `Tag` | `variant`, `intent`, `removable` |
| `Chip` | `variant`, `intent`, `selected`, `removable` |
| `Pill` | `variant`, `intent` |
| `Shimmer` | `width`, `height`, `rounded` |
| `Calendar` | `value`, `onChange`, `min`, `max`, `range` |
| `DatePicker` | `value`, `onChange`, `format`, `presets` |
| `TimePicker` | `value`, `onChange`, `format` |
| `TimeSelector` | `value`, `onChange` |
| `Popover` | `trigger`, `placement`, `offset` |

### Shared props (all components)

- `className` — extra CSS classes (always merged, never replaced)
- `style` — inline styles escape hatch
- `testId` — maps to `data-testid`
- `isGhost` — renders skeleton/shimmer loading state

### Intent values

`"default"` | `"primary"` | `"success"` | `"warning"` | `"danger"` | `"info"` | `"white"` | `"black"` | `(string & {})`

### Size values

`"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`

---

## Color palette

### Brand colors (50–950 scale)
`brand-white`, `brand-black`, `brand-tertiary`, `brand-blue`, `brand-primary`, `brand-pink`, `brand-gray`, `brand-secondary`

### Semantic colors (50–950 scale)
`success`, `warning`, `danger`, `info`, `teal`, `orange`, `rose`, `indigo`, `mint`, `coal`

### Usage
```css
var(--tui-color-brand-blue-600)
var(--tui-color-success-500)
var(--tui-color-danger-50)
```

---

## Focus ring

```tsx
<button className="tui-focus-ring">Accessible</button>
<button className="tui-focus-ring tui-ring--danger">Delete</button>
```

---

## Don'ts

- ❌ Don't use raw hex/rgb — use `var(--tui-*)` tokens
- ❌ Don't use inline styles for layout/colors — use utilities or CSS with tokens
- ❌ Don't hardcode font-family — use `inherit` or `var(--tui-font-family-*)`
- ❌ Don't use `!important` — use specificity or `className`
- ❌ Don't import individual component CSS — import `@tantuui/react/css` once
- ❌ Don't mix Tailwind utilities with `tui-*` utilities (pick one)
