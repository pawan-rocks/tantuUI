# @tantuui/react

[![npm](https://img.shields.io/npm/v/@tantuui/react?color=blue)](https://www.npmjs.com/package/@tantuui/react)
[![license](https://img.shields.io/npm/l/@tantuui/react)](https://github.com/pawan-rocks/tantuUI/blob/main/LICENSE)

React component library for **TantuUI** — token-driven, accessible, and lightweight.

## Installation

```bash
npm install @tantuui/react @tantuui/tokens
```

## Setup

### With Vite (Recommended — Zero Config)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tantuui from "@tantuui/tokens/vite";

export default defineConfig({
  plugins: [react(), tantuui()],
});
```

Done. No CSS imports needed.

### Without Vite (Next.js, Webpack, CRA)

```tsx
// main.tsx / _app.tsx — import once at app root
import "@tantuui/tokens/css";
import "@tantuui/tokens/css/utilities";
import "@tantuui/tokens/runtime";
import "@tantuui/react/css";
```

### With Tailwind

```tsx
// main.tsx — only token variables + component styles
import "@tantuui/tokens/css";
import "@tantuui/react/css";
```

Use the Tailwind preset in `tailwind.config.js`:
```js
const tantuPreset = require("@tantuui/tokens/tailwind-preset");
module.exports = { presets: [tantuPreset], content: ["./src/**/*.{tsx,ts}"] };
```

## Usage

```tsx
import { Button, Text, Input, Box, LinkText, Switch } from "@tantuui/react";

function App() {
  return (
    <Box display="flex" direction="column" gap="4" p="6">
      <Text as="h1" size="3xl" weight="bold">Hello TantuUI</Text>
      <Button intent="primary" size="md">Click me</Button>
      <Input placeholder="Enter text" variant="outline" />
      <LinkText variant="navy" href="/about">Learn more</LinkText>
      <Switch checked label="Enable notifications" intent="success" />
    </Box>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Clickable actions with variants, sizes, intents, loading |
| `Text` | Typography with size, weight, color, truncation |
| `Box` | Layout container with spacing, flex/grid, rounded, shadow |
| `Input` | Text input with icons, prefix/suffix, clearable |
| `Textarea` | Multi-line input with auto-resize, character count |
| `Checkbox` | With indeterminate, box style, labels |
| `Radio` | With group context, box style |
| `Select` | Native dropdown with variants |
| `Switch` | Toggle with label and intent colors |
| `Label` | Form label with required indicator |
| `FormField` | Field wrapper with label, helper, error text |
| `LinkText` | Styled anchor/span with color variants |
| `Tag` | Labeling with filled/outlined, removable |
| `Chip` | Interactive chip with selection, remove |
| `Pill` | Status indicator with solid/subtle/outlined |
| `Shimmer` | Skeleton loading placeholder |
| `Calendar` | Date selection with range, constraints |
| `DatePicker` | Date input with popup, presets, time |
| `TimePicker` | Time input with popup |
| `TimeSelector` | Inline time selector |
| `Popover` | Positioned overlay |

## Shared Props

All components support:
- `className` — extra CSS classes
- `style` — inline styles
- `testId` — `data-testid` for testing
- `isGhost` — skeleton/shimmer loading state

## React Version Support

- React 17+
- React 18 (recommended)
- React 19 compatible

## Links

- [Changelog](https://github.com/pawan-rocks/tantuUI/blob/main/packages/react/CHANGELOG.md)
- [Design Tokens](https://www.npmjs.com/package/@tantuui/tokens)
- [GitHub](https://github.com/pawan-rocks/tantuUI)
- [Storybook](https://tantuui.com/storybook/)
- Support: pawanjee.srkg@gmail.com

## License

MIT
