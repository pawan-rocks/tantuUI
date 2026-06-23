# TantuUI

Token-based design system — framework agnostic tokens, React components, and a Tailwind preset.

## Structure

```
tantuui/
├── packages/
│   ├── tokens/     @tantu/tokens   — CSS variables, JS token objects, Tailwind preset
│   └── react/      @tantu/react    — React component library
└── tsconfig.base.json
```

---

## @tantu/tokens

All design decisions live here. Every token is exported as:
1. **JS/TS** — typed objects you can import in any framework
2. **CSS** — `--tui-*` custom properties in a plain `.css` file
3. **Tailwind preset** — maps Tailwind utilities to the same CSS variables

### CSS variable prefix

All variables use the `--tui-` prefix:

```
--tui-color-primary-500
--tui-spacing-4
--tui-font-size-md
--tui-font-weight-semibold
--tui-radius-lg
--tui-shadow-md
--tui-border-width-1
--tui-z-modal
--tui-duration-normal
--tui-ease-in-out
--tui-opacity-50
```

### Token categories

| Category   | Prefix example                  | File                       |
|------------|---------------------------------|----------------------------|
| Color      | `--tui-color-primary-500`       | `tokens/color.ts`          |
| Spacing    | `--tui-spacing-4`               | `tokens/spacing.ts`        |
| Typography | `--tui-font-size-md`            | `tokens/typography.ts`     |
| Radius     | `--tui-radius-lg`               | `tokens/radius.ts`         |
| Shadow     | `--tui-shadow-md`               | `tokens/shadow.ts`         |
| Border     | `--tui-border-width-2`          | `tokens/border.ts`         |
| Z-index    | `--tui-z-modal`                 | `tokens/zindex.ts`         |
| Animation  | `--tui-duration-normal`         | `tokens/animation.ts`      |
| Breakpoint | `--tui-screen-lg`               | `tokens/breakpoint.ts`     |
| Opacity    | `--tui-opacity-50`              | `tokens/opacity.ts`        |

### Usage

#### Any HTML / Vanilla CSS

```html
<link rel="stylesheet" href="node_modules/@tantu/tokens/css" />

<button style="
  background: var(--tui-color-brand-default);
  padding: var(--tui-spacing-2) var(--tui-spacing-4);
  border-radius: var(--tui-radius-md);
  font-size: var(--tui-font-size-sm);
  font-weight: var(--tui-font-weight-medium);
  box-shadow: var(--tui-shadow-sm);
">Click me</button>
```

#### Angular

```typescript
// angular.json → "styles"
"styles": ["node_modules/@tantu/tokens/css"]

// any component template
<button [style.background]="'var(--tui-color-brand-default)'"
        [style.padding]="'var(--tui-spacing-2) var(--tui-spacing-4)'">
  Click
</button>
```

#### Vue

```vue
<template>
  <button class="btn">Click</button>
</template>

<style>
@import "@tantu/tokens/css";

.btn {
  background: var(--tui-color-brand-default);
  padding: var(--tui-spacing-2) var(--tui-spacing-4);
  border-radius: var(--tui-radius-md);
}
</style>
```

#### With Tailwind

```js
// tailwind.config.js
const tuiPreset = require("@tantu/tokens/tailwind-preset");

module.exports = {
  presets: [tuiPreset],
  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
};
```

Then in your CSS:
```css
@import "@tantu/tokens/css";  /* still need the CSS vars */
```

Now you can use Tailwind classes that resolve to `--tui-*` variables:
```html
<button class="bg-brand text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm">
  Click
</button>
```

#### JS/TS — read tokens directly

```ts
import { color, spacing, radius, tokens } from "@tantu/tokens";

console.log(color.primitive.primary500); // "#3b82f6"
console.log(spacing[4]);                 // "1rem"
console.log(tokens.radius.lg);           // "0.5rem"
```

---

## @tantu/react

```tsx
import { Button, Text, Box } from "@tantu/react";
// Don't forget to import tokens CSS somewhere in your app root:
import "@tantu/tokens/css/base"; // includes reset + all token variables

function App() {
  return (
    <Box p="6" shadow="md" rounded="xl" bg="var(--tui-color-surface-default)">
      <Text as="h1" size="3xl" weight="bold" mb="4">Hello TantuUI</Text>
      <Button intent="primary" variant="solid" size="md">
        Get Started
      </Button>
      <Button intent="default" variant="outline" size="md" ml="3">
        Learn More
      </Button>
    </Box>
  );
}
```

### Component APIs

#### `<Button>`

| Prop           | Type                                     | Default     |
|----------------|------------------------------------------|-------------|
| `variant`      | `solid \| outline \| ghost \| soft`      | `solid`     |
| `intent`       | `default \| primary \| success \| warning \| danger \| info` | `primary` |
| `size`         | `xs \| sm \| md \| lg \| xl`             | `md`        |
| `loading`      | `boolean`                                | `false`     |
| `fullWidth`    | `boolean`                                | `false`     |
| `leadingIcon`  | `ReactNode`                              | —           |
| `trailingIcon` | `ReactNode`                              | —           |

#### `<Text>`

| Prop       | Type                              | Default  |
|------------|-----------------------------------|----------|
| `as`       | HTML tag                          | `p`      |
| `size`     | font size token key               | —        |
| `weight`   | font weight token key             | —        |
| `color`    | semantic color key                | —        |
| `align`    | `left \| center \| right`        | —        |
| `truncate` | `boolean \| number`               | —        |

#### `<Box>`

Low-level layout primitive. Props map directly to spacing/visual tokens:
`p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`,
`rounded`, `shadow`, `bg`, `color`, `display`, `direction`, `align`, `justify`, `wrap`, `gap`

---

## Development

```bash
# Install (pnpm workspaces)
pnpm install

# Build tokens first, then react
pnpm build

# Watch mode
pnpm dev
```

---

## Theming / Dark Mode

Override any `--tui-*` variable in your own CSS:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --tui-color-bg-base:        var(--tui-color-neutral-900);
    --tui-color-text-primary:   var(--tui-color-neutral-50);
    --tui-color-border-default: var(--tui-color-neutral-700);
    --tui-color-surface-default: var(--tui-color-neutral-800);
  }
}

/* Or a data-theme attribute */
[data-theme="dark"] {
  --tui-color-bg-base: var(--tui-color-neutral-900);
  /* ... */
}
```
