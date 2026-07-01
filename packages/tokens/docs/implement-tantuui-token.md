# TantuUI — Tokens Implementation Guide

> This file was auto-added by `@tantuui/tokens` to help AI tools (Kiro, Cursor, Copilot, etc.)
> understand how to use TantuUI tokens in your project. Keep it in your repo for best results.

## Setup

### Vite (Zero Config)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import tantuui from "@tantuui/tokens/vite";

export default defineConfig({
  plugins: [tantuui({ includeComponentCSS: false })],
});
```

### Any bundler (Next.js, Webpack, CRA)

```tsx
// main.tsx or _app.tsx — import once at app root
import "@tantuui/tokens/css";
import "@tantuui/tokens/css/utilities";
import "@tantuui/tokens/runtime";
```

### With Tailwind

```tsx
// main.tsx
import "@tantuui/tokens/css";
```

```js
// tailwind.config.js
const tantuPreset = require("@tantuui/tokens/tailwind-preset");
module.exports = { presets: [tantuPreset], content: ["./src/**/*.{tsx,ts}"] };
```

> With Tailwind, do NOT import `@tantuui/tokens/css/utilities` or `@tantuui/tokens/runtime`.

### Plain HTML (No bundler)

```html
<link rel="stylesheet" href="https://unpkg.com/@tantuui/tokens/dist/tokens.css" />
<link rel="stylesheet" href="https://unpkg.com/@tantuui/tokens/dist/utilities.css" />
<script src="https://unpkg.com/@tantuui/tokens/dist/runtime.js"></script>
```

---

## Token Usage Rules

### Always use `--tui-*` CSS variables

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
| Opacity | `tui-opacity-*` | `tui-opacity-60` |

### Pseudo-class & responsive variants (requires runtime)

```html
<button class="tui-bg-white hover:tui-bg-brand-black-100 focus:tui-ring-2">Interactive</button>
<div class="tui-grid-cols-1 md:tui-grid-cols-3">Responsive</div>
```

### @apply in CSS (requires PostCSS plugin)

```js
// postcss.config.js
module.exports = { plugins: [require("@tantuui/tokens/postcss")()] };
```

```css
.my-card {
  @apply tui-p-6 tui-rounded-xl tui-bg-white tui-border-1 tui-shadow-sm;
}
```

---

## Color palette

### Brand colors (50–950 scale)
`brand-white`, `brand-black`, `brand-navy`, `brand-blue`, `brand-purple`, `brand-pink`, `brand-gray`, `brand-light`

### Semantic colors (50–950 scale)
`success`, `warning`, `danger`, `info`, `teal`, `orange`, `rose`, `indigo`, `mint`, `coal`

### Usage
```css
var(--tui-color-brand-blue-600)
var(--tui-color-success-500)
var(--tui-color-danger-50)
```

---

## Spacing Scale

| Token | Pixels | Utility |
|-------|--------|---------|
| `--tui-spacing-0_5` | 2px | `tui-p-0_5` |
| `--tui-spacing-1` | 4px | `tui-p-1` |
| `--tui-spacing-2` | 8px | `tui-p-2` |
| `--tui-spacing-3` | 12px | `tui-p-3` |
| `--tui-spacing-4` | 16px | `tui-p-4` |
| `--tui-spacing-5` | 20px | `tui-p-5` |
| `--tui-spacing-6` | 24px | `tui-p-6` |
| `--tui-spacing-8` | 32px | `tui-p-8` |
| `--tui-spacing-10` | 40px | `tui-p-10` |
| `--tui-spacing-12` | 48px | `tui-p-12` |
| `--tui-spacing-16` | 64px | `tui-p-16` |

---

## JavaScript/TypeScript API

```ts
import { color, spacing, typography, radius, shadow, tokens } from "@tantuui/tokens";

console.log(spacing[4]);     // "1rem"
console.log(color.brand.blue[600]); // "#2563eb"
```

---

## Package Exports

| Import | Description |
|--------|-------------|
| `@tantuui/tokens` | JavaScript token objects |
| `@tantuui/tokens/css` | Token CSS variables |
| `@tantuui/tokens/css/base` | Reset + all token variables |
| `@tantuui/tokens/css/utilities` | Utility classes (`tui-*`) |
| `@tantuui/tokens/runtime` | Browser JIT (hover:, md:, arbitrary) |
| `@tantuui/tokens/postcss` | PostCSS plugin (`@apply`) |
| `@tantuui/tokens/vite` | Vite plugin (zero-config) |
| `@tantuui/tokens/tailwind-preset` | Tailwind CSS preset |

---

## Don'ts

- ❌ Don't use raw hex/rgb — use `var(--tui-*)` tokens
- ❌ Don't use inline styles for layout/colors — use utilities or CSS with tokens
- ❌ Don't hardcode font-family — use `inherit` or `var(--tui-font-family-*)`
- ❌ Don't mix Tailwind utilities with `tui-*` utilities (pick one approach)
