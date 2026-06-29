# @tantuui/vite-plugin

Zero-config Vite plugin for TantuUI. One line in your Vite config and everything works.

## Installation

```bash
npm install @tantuui/vite-plugin @tantuui/tokens @tantuui/react --save-dev
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tantuui from "@tantuui/vite-plugin";

export default defineConfig({
  plugins: [react(), tantuui()],
});
```

**That's it.** No `postcss.config.js` needed. No manual CSS imports needed.

The plugin automatically:
- Configures PostCSS with `@apply` support for `tui-*` classes
- Injects `@tantuui/tokens/css` (design token variables)
- Injects `@tantuui/tokens/css/utilities` (utility classes)
- Injects `@tantuui/tokens/runtime` (hover:/focus:/responsive JIT)
- Injects `@tantuui/react/css` (component styles)

## Options

```ts
tantuui({
  // Disable auto CSS injection (do it manually in your entry file)
  autoImport: false,

  // Don't include React component CSS (tokens-only mode)
  includeComponentCSS: false,
})
```

## What you can now do

### In JSX — utility classes + pseudo variants:
```tsx
<div className="tui-p-4 tui-bg-white hover:tui-bg-brand-black-100 md:tui-grid-cols-2">
  Content
</div>
```

### In CSS — @apply:
```css
.my-card {
  @apply tui-p-6 tui-rounded-xl tui-bg-white tui-border-1 tui-border-brand-black-200 tui-shadow-sm;
}

.my-card:hover {
  @apply tui-shadow-md tui-border-brand-blue-default;
}
```

## License

MIT
