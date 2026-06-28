# @tantuui/tokens

[![npm](https://img.shields.io/npm/v/@tantuui/tokens?color=blue)](https://www.npmjs.com/package/@tantuui/tokens)
[![license](https://img.shields.io/npm/l/@tantuui/tokens)](https://github.com/pawan-rocks/tantuUI/blob/main/LICENSE)

Framework-agnostic design tokens for **TantuUI**. Every visual decision lives as a `--tui-*` CSS variable.

## Installation

```bash
npm install @tantuui/tokens
```

## Quick Start

```css
/* Import all tokens + reset */
@import "@tantuui/tokens/css/base";
```

## Three Ways to Use

### 1. CSS Variables (Any Framework)

```html
<button style="
  background: var(--tui-color-primary-600);
  color: var(--tui-color-white);
  padding: var(--tui-spacing-2) var(--tui-spacing-4);
  border-radius: var(--tui-radius-md);
  font-size: var(--tui-font-size-sm);
">
  Hello TantuUI
</button>
```

### 2. Utility Classes (Without Tailwind)

TantuUI provides built-in utility classes — no Tailwind required:

```html
<!-- Background + text color -->
<div class="tui-bg-primary-600 tui-text-white tui-p-4 tui-rounded-lg">
  Styled with utility classes
</div>

<!-- Spacing -->
<div class="tui-p-3 tui-m-2 tui-gap-4">Padding, margin, gap</div>

<!-- Typography -->
<p class="tui-text-sm tui-font-medium tui-leading-relaxed">Text styling</p>

<!-- Border + shadow -->
<div class="tui-border tui-border-brand-black-200 tui-rounded-md tui-shadow-sm">
  Card
</div>

<!-- Flex layout -->
<div class="tui-flex tui-items-center tui-justify-between tui-gap-3">
  <span>Left</span>
  <span>Right</span>
</div>
```

### 3. With Tailwind CSS Preset

```js
// tailwind.config.js
const tantuPreset = require("@tantuui/tokens/tailwind-preset");

module.exports = {
  presets: [tantuPreset],
  // your config...
};
```

Then use Tailwind classes mapped to TantuUI tokens:

```html
<div class="bg-tui-primary-600 text-tui-white p-4 rounded-lg shadow-tui-md">
  Tailwind + TantuUI tokens
</div>

<button class="bg-tui-success-600 text-white px-4 py-2 rounded-tui-md text-tui-sm font-tui-medium">
  Success Button
</button>
```

## CSS Imports

| Import | Description |
|--------|-------------|
| `@tantuui/tokens/css/base` | Full reset + all token variables |
| `@tantuui/tokens/css` | Token variables only (no reset) |
| `@tantuui/tokens/css/utilities` | Utility classes (`tui-*`) |

## Token Categories

| Category | CSS Prefix | Utility Class | Example |
|----------|------------|---------------|---------|
| Colors | `--tui-color-*` | `tui-bg-*`, `tui-text-*` | `tui-bg-primary-600` |
| Spacing | `--tui-spacing-*` | `tui-p-*`, `tui-m-*`, `tui-gap-*` | `tui-p-4` |
| Font Size | `--tui-font-size-*` | `tui-text-*` | `tui-text-sm` |
| Font Weight | `--tui-font-weight-*` | `tui-font-*` | `tui-font-bold` |
| Line Height | `--tui-leading-*` | `tui-leading-*` | `tui-leading-tight` |
| Border Radius | `--tui-radius-*` | `tui-rounded-*` | `tui-rounded-lg` |
| Shadows | `--tui-shadow-*` | `tui-shadow-*` | `tui-shadow-md` |
| Sizing | `--tui-size-*` | — | `--tui-size-md` (36px) |
| Z-Index | `--tui-z-*` | `tui-z-*` | `tui-z-dropdown` |
| Duration | `--tui-duration-*` | — | `--tui-duration-normal` |
| Easing | `--tui-ease-*` | — | `--tui-ease-in-out` |
| Opacity | `--tui-opacity-*` | `tui-opacity-*` | `tui-opacity-60` |
| Border Width | `--tui-border-width-*` | `tui-border` | `tui-border` |

## Spacing Scale

| Token | Value | Pixels | Utility |
|-------|-------|--------|---------|
| `--tui-spacing-0_5` | 0.125rem | 2px | `tui-p-0_5` |
| `--tui-spacing-1` | 0.25rem | 4px | `tui-p-1` |
| `--tui-spacing-1_5` | 0.375rem | 6px | `tui-p-1_5` |
| `--tui-spacing-2` | 0.5rem | 8px | `tui-p-2` |
| `--tui-spacing-2_5` | 0.625rem | 10px | `tui-p-2_5` |
| `--tui-spacing-3` | 0.75rem | 12px | `tui-p-3` |
| `--tui-spacing-3_5` | 0.875rem | 14px | `tui-p-3_5` |
| `--tui-spacing-4` | 1rem | 16px | `tui-p-4` |
| `--tui-spacing-5` | 1.25rem | 20px | `tui-p-5` |
| `--tui-spacing-6` | 1.5rem | 24px | `tui-p-6` |
| `--tui-spacing-8` | 2rem | 32px | `tui-p-8` |

## JavaScript/TypeScript API

```ts
import { colors, spacing, typography, radius, shadows } from "@tantuui/tokens";

// Access raw token values
console.log(spacing[4]); // "1rem" (16px)
console.log(colors.primary[600]); // "#..."
```

## Browser Support

Any browser with CSS custom properties support (all modern browsers).

## Links

- [React components](https://www.npmjs.com/package/@tantuui/react)
- [GitHub](https://github.com/pawan-rocks/tantuUI)
- [Storybook](https://tantuui.com/storybook/)

- For Support - Email => pawanjee.srkg@gmail.com

## License

MIT
