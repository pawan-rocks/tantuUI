# @tantuui/tokens

[![npm](https://img.shields.io/npm/v/@tantuui/tokens?color=blue)](https://www.npmjs.com/package/@tantuui/tokens)
[![license](https://img.shields.io/npm/l/@tantuui/tokens)](https://github.com/pawan-rocks/tantuUI/blob/main/LICENSE)

Framework-agnostic design tokens for **TantuUI**. Every visual decision lives as a `--tui-*` CSS variable. Ships utility classes, runtime JIT for pseudo-classes/responsive, PostCSS `@apply` plugin, and a Vite plugin — all in one package.

## Installation

```bash
npm install @tantuui/tokens
```

> Also install `@tantuui/react` if you want the React component library:
> ```bash
> npm install @tantuui/tokens @tantuui/react
> ```

---

## Setup Options

### Option 1: With Vite (Zero Config)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tantuui from "@tantuui/tokens/vite";

export default defineConfig({
  plugins: [react(), tantuui()],
});
```

> If you don't use `@tantuui/react`, pass `{ includeComponentCSS: false }`:
> ```ts
> tantuui({ includeComponentCSS: false })
> ```

Done. The Vite plugin auto-injects all CSS, utilities, runtime, and component styles. No manual imports needed.

### Option 2: Without Vite (Next.js, Webpack, CRA, any bundler)

```tsx
// main.tsx / _app.tsx / index.tsx — import at app root
import "@tantuui/tokens/css";           // Design token CSS variables
import "@tantuui/tokens/css/utilities"; // Utility classes (tui-*)
import "@tantuui/tokens/runtime";       // Runtime JIT (hover:, md:, arbitrary values)

// Only if using @tantuui/react:
import "@tantuui/react/css";            // Component styles
```

For `@apply` support in CSS files, add PostCSS config:

```js
// postcss.config.js
module.exports = {
  plugins: [require("@tantuui/tokens/postcss")()],
};
```

### Option 3: With Tailwind CSS

```js
// tailwind.config.js
const tantuPreset = require("@tantuui/tokens/tailwind-preset");

module.exports = {
  presets: [tantuPreset],
  content: ["./src/**/*.{tsx,ts,jsx,js}"],
};
```

```tsx
// main.tsx — only token variables (Tailwind generates utilities)
import "@tantuui/tokens/css";

// Only if using @tantuui/react:
import "@tantuui/react/css";
```

Then use Tailwind classes mapped to TantuUI tokens:

```tsx
<div className="bg-tui-primary-600 text-white p-4 rounded-lg hover:bg-tui-primary-700 md:flex">
  Tailwind + TantuUI tokens
</div>
```

> **Note:** With Tailwind, do NOT import `@tantuui/tokens/css/utilities` or `@tantuui/tokens/runtime` — Tailwind handles hover:, responsive, tree-shaking, and @apply natively.

### Option 4: Plain HTML (No bundler)

```html
<link rel="stylesheet" href="https://unpkg.com/@tantuui/tokens/dist/tokens.css" />
<link rel="stylesheet" href="https://unpkg.com/@tantuui/tokens/dist/utilities.css" />
<script src="https://unpkg.com/@tantuui/tokens/dist/runtime.js"></script>
```

---

## Usage

### Utility Classes (Without Tailwind)

```html
<!-- Background + text color -->
<div class="tui-bg-brand-blue-600 tui-text-white tui-p-4 tui-rounded-lg">
  Styled with utility classes
</div>

<!-- Spacing -->
<div class="tui-p-3 tui-m-2 tui-gap-4">Padding, margin, gap</div>

<!-- Typography -->
<p class="tui-text-sm tui-font-medium tui-leading-relaxed">Text styling</p>

<!-- Border + shadow -->
<div class="tui-border-1 tui-border-brand-black-200 tui-rounded-md tui-shadow-sm">
  Card
</div>

<!-- Flex layout -->
<div class="tui-flex tui-items-center tui-justify-between tui-gap-3">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Pseudo-Class Variants (Runtime JIT)

```html
<!-- Hover -->
<button class="tui-bg-white hover:tui-bg-brand-black-100 tui-transition-colors">
  Hover me
</button>

<!-- Focus -->
<input class="tui-border-1 focus:tui-ring-2 tui-rounded-md" />

<!-- Active -->
<button class="tui-bg-brand-blue-600 active:tui-bg-brand-blue-800">
  Press me
</button>

<!-- Disabled -->
<button class="disabled:tui-opacity-50" disabled>
  Disabled
</button>

<!-- Group hover -->
<div class="group tui-p-4">
  <span class="group-hover:tui-text-brand-tertiary-default">Shows on parent hover</span>
</div>
```

### Responsive Prefixes (Runtime JIT)

```html
<div class="tui-grid-cols-1 sm:tui-grid-cols-2 md:tui-grid-cols-3 lg:tui-grid-cols-4">
  Responsive grid
</div>

<div class="tui-hidden md:tui-block">
  Visible only on md+
</div>
```

### Arbitrary Values (Runtime JIT)

```html
<div class="tui-w-[350px] tui-h-[200px] tui-max-w-[calc(100%-2rem)]">
  Custom dimensions
</div>
```

### @apply in CSS Files (PostCSS Plugin)

```css
.my-card {
  @apply tui-p-6 tui-rounded-xl tui-bg-white tui-border-1 tui-border-brand-black-200 tui-shadow-sm;
}

.my-card:hover {
  @apply tui-shadow-md tui-border-brand-blue-default;
}

.sidebar__link {
  @apply tui-block tui-px-3 tui-py-2 tui-rounded-md tui-text-sm tui-font-medium tui-no-underline tui-transition-colors;
}
```

### CSS Variables (Any Framework)

```css
.custom-element {
  background: var(--tui-color-brand-blue-600);
  color: var(--tui-color-white);
  padding: var(--tui-spacing-2) var(--tui-spacing-4);
  border-radius: var(--tui-radius-md);
  font-size: var(--tui-font-size-sm);
  transition: background var(--tui-duration-fast) var(--tui-ease-default);
}
```

---

## Package Exports

| Import | Description |
|--------|-------------|
| `@tantuui/tokens` | JavaScript token objects (colors, spacing, etc.) |
| `@tantuui/tokens/css` | Token CSS variables only |
| `@tantuui/tokens/css/base` | Full reset + all token variables |
| `@tantuui/tokens/css/utilities` | Utility classes (`tui-*`) |
| `@tantuui/tokens/runtime` | Browser JIT (hover:, focus:, md:, arbitrary values) |
| `@tantuui/tokens/postcss` | PostCSS plugin (`@apply` support) |
| `@tantuui/tokens/vite` | Vite plugin (zero-config auto-setup) |
| `@tantuui/tokens/tailwind-preset` | Tailwind CSS preset |

---

## Token Categories

| Category | CSS Prefix | Utility Class | Example |
|----------|------------|---------------|---------|
| Colors | `--tui-color-*` | `tui-bg-*`, `tui-text-*`, `tui-border-*` | `tui-bg-brand-blue-600` |
| Spacing | `--tui-spacing-*` | `tui-p-*`, `tui-m-*`, `tui-gap-*` | `tui-p-4` |
| Font Size | `--tui-font-size-*` | `tui-text-*` | `tui-text-lg` |
| Font Weight | `--tui-font-weight-*` | `tui-font-*` | `tui-font-bold` |
| Line Height | `--tui-leading-*` | `tui-leading-*` | `tui-leading-relaxed` |
| Border Radius | `--tui-radius-*` | `tui-rounded-*` | `tui-rounded-xl` |
| Shadows | `--tui-shadow-*` | `tui-shadow-*` | `tui-shadow-md` |
| Border Width | `--tui-border-width-*` | `tui-border-*` | `tui-border-1` |
| Z-Index | `--tui-z-*` | `tui-z-*` | `tui-z-dropdown` |
| Opacity | `--tui-opacity-*` | `tui-opacity-*` | `tui-opacity-60` |
| Duration | `--tui-duration-*` | `tui-transition-*` | `tui-transition-colors` |

---

## Spacing Scale

| Token | Value | Pixels | Utility |
|-------|-------|--------|---------|
| `--tui-spacing-0_5` | 0.125rem | 2px | `tui-p-0_5` |
| `--tui-spacing-1` | 0.25rem | 4px | `tui-p-1` |
| `--tui-spacing-2` | 0.5rem | 8px | `tui-p-2` |
| `--tui-spacing-3` | 0.75rem | 12px | `tui-p-3` |
| `--tui-spacing-4` | 1rem | 16px | `tui-p-4` |
| `--tui-spacing-5` | 1.25rem | 20px | `tui-p-5` |
| `--tui-spacing-6` | 1.5rem | 24px | `tui-p-6` |
| `--tui-spacing-8` | 2rem | 32px | `tui-p-8` |
| `--tui-spacing-10` | 2.5rem | 40px | `tui-p-10` |
| `--tui-spacing-12` | 3rem | 48px | `tui-p-12` |
| `--tui-spacing-16` | 4rem | 64px | `tui-p-16` |

---

## JavaScript/TypeScript API

```ts
import { color, spacing, typography, radius, shadow, tokens } from "@tantuui/tokens";

console.log(spacing[4]);     // "1rem"
console.log(color.brand.blue[600]); // "#2563eb"
```

---

## Browser Support

Any browser with CSS custom properties support (all modern browsers).

---

## VS Code IntelliSense

Get autocomplete, hover previews, and color decorators for `tui-*` utility classes:

```bash
code --install-extension node_modules/@tantuui/tokens/dist/tantuui-css-intellisense.vsix
```

Or download from [GitHub Releases](https://github.com/pawan-rocks/tantuUI/releases).

---

## Links

- [Changelog](https://github.com/pawan-rocks/tantuUI/blob/main/packages/tokens/CHANGELOG.md)
- [React components](https://www.npmjs.com/package/@tantuui/react)
- [GitHub](https://github.com/pawan-rocks/tantuUI)
- [Storybook](https://tantuui.com/storybook/)
- Support: pawanjee.srkg@gmail.com

## License

MIT
