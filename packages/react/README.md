# @tantuui/react

[![npm](https://img.shields.io/npm/v/@tantuui/react?color=blue)](https://www.npmjs.com/package/@tantuui/react)
[![license](https://img.shields.io/npm/l/@tantuui/react)](https://github.com/pawan-rocks/tantuUI/blob/main/LICENSE)

React component library for **TantuUI** — token-driven, accessible, and lightweight.

## Installation

```bash
npm install @tantuui/react @tantuui/tokens
```

## Quick Start

```tsx
// Import token styles (once, at app root)
import "@tantuui/tokens/css/base";

// Import component styles
import "@tantuui/react/css";

// Use components
import { Button, Input, DatePicker } from "@tantuui/react";

function App() {
  return (
    <div>
      <Button intent="primary" size="md">Click me</Button>
      <Input placeholder="Enter text" size="md" />
      <DatePicker showTime isClearable placeholder="Pick a date" />
    </div>
  );
}
```

## Three Ways to Style

### 1. With React Components (Recommended)

```tsx
import { Button, Input, Box, Text } from "@tantuui/react";

<Box className="tui-p-4 tui-bg-white tui-rounded-lg tui-shadow-sm">
  <Text size="lg" weight="semibold">Form Title</Text>
  <Input placeholder="Email" intent="primary" size="md" />
  <Button intent="success" size="md" fullWidth>Submit</Button>
</Box>
```

### 2. With Utility Classes (Without Tailwind)

TantuUI provides built-in utility classes you can use alongside components:

```tsx
<div className="tui-flex tui-flex-col tui-gap-3 tui-p-4">
  <h2 className="tui-text-xl tui-font-semibold tui-text-brand-black-900">
    Dashboard
  </h2>
  <div className="tui-bg-primary-50 tui-p-3 tui-rounded-md tui-border tui-border-primary-200">
    <p className="tui-text-sm tui-text-primary-700">Welcome back!</p>
  </div>
  <Button intent="primary">Get Started</Button>
</div>
```

### 3. With Tailwind CSS

```js
// tailwind.config.js
const tantuPreset = require("@tantuui/tokens/tailwind-preset");
module.exports = { presets: [tantuPreset] };
```

```tsx
<div className="flex flex-col gap-3 p-4">
  <h2 className="text-xl font-semibold text-tui-brand-black-900">Dashboard</h2>
  <div className="bg-tui-primary-50 p-3 rounded-tui-md border border-tui-primary-200">
    <p className="text-sm text-tui-primary-700">Welcome back!</p>
  </div>
  <Button intent="primary">Get Started</Button>
</div>
```

## Features

- **Token-driven** — all styles use `--tui-*` CSS variables from `@tantuui/tokens`
- **Accessible** — semantic HTML, ARIA attributes, keyboard navigation
- **Lightweight** — pure CSS with token variables, no runtime CSS-in-JS
- **Composable** — every component accepts `className`, `style`, and `children`
- **Size-aware** — all components support `xs`, `sm`, `md`, `lg`, `xl` sizes
- **Intent colors** — primary, success, warning, danger, info, teal, orange, rose, indigo, mint, coal
- **Ghost/Shimmer** — every component supports `isGhost` prop for skeleton loading

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Interactive button with variants, sizes, loading state |
| `Input` | Text input with leading/trailing icons, clearable |
| `Textarea` | Multi-line text input with character count |
| `Select` | Native select dropdown with styling |
| `Checkbox` | Checkbox with label and indeterminate state |
| `Radio` | Radio button with label |
| `Switch` | Toggle switch |
| `Label` | Form label |
| `FormField` | Wrapper for label + input + error message |
| `Text` | Typography component |
| `Box` | Layout box with spacing props |
| `LinkText` | Styled anchor/link |
| `Tag` | Status tag/badge |
| `Chip` | Interactive chip with dismiss |
| `Pill` | Rounded pill badge |
| `Calendar` | Date calendar with range selection, week numbers |
| `TimeSelector` | Scrollable time picker (12h/24h, seconds) |
| `DatePicker` | Full date/time picker with presets, range, footer |
| `Popover` | Portal-based floating container |
| `Shimmer` | Skeleton/ghost loading placeholder |

## Hooks

| Hook | Description |
|------|-------------|
| `useDropdownPosition` | Auto-positions a portal dropdown relative to trigger |

## Utilities

| Utility | Description |
|---------|-------------|
| `cn()` | Merge CSS class names (clsx-style) |
| `getCSSVar()` / `setCSSVar()` | Read/write CSS custom properties |
| `tokenVar()` | Get token variable reference |

## Utility Classes Reference

TantuUI comes with utility classes that work without Tailwind:

```html
<!-- Layout -->
<div class="tui-flex tui-flex-col tui-items-center tui-justify-between tui-gap-4">

<!-- Spacing -->
<div class="tui-p-4 tui-px-3 tui-py-2 tui-m-2 tui-mt-4">

<!-- Colors -->
<div class="tui-bg-primary-600 tui-text-white">
<div class="tui-bg-success-50 tui-text-success-700">

<!-- Typography -->
<p class="tui-text-sm tui-font-medium tui-leading-relaxed">

<!-- Borders -->
<div class="tui-border tui-border-brand-black-200 tui-rounded-lg">

<!-- Shadows -->
<div class="tui-shadow-sm tui-shadow-lg">

<!-- Sizing -->
<div class="tui-w-full tui-h-auto">
```

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Requires CSS custom properties support.

## Links

- [Storybook](https://tantuui.com/storybook/)
- [GitHub](https://github.com/pawan-rocks/tantuUI)
- [Tokens package](https://www.npmjs.com/package/@tantuui/tokens)

## License

MIT
