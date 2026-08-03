# TantuUI CSS IntelliSense

VS Code extension providing intelligent autocomplete, hover preview, and inline color decorators for [TantuUI](https://github.com/pawan-rocks/tantuUI) CSS utility classes.

## Features

### Autocomplete

Start typing `tui-` in any `class`, `className`, or `@apply` context and get smart suggestions with CSS output previews.

- Color utilities: `tui-bg-*`, `tui-text-*`, and `tui-border-*`
- Brand palettes: `brand-default`, `brand-primary`, `brand-secondary`, `brand-tertiary`, `brand-blue`, `brand-pink`, `brand-gray`, `brand-white`, and `brand-black`
- Semantic palettes: `success`, `warning`, `danger`, `info`, `teal`, `orange`, `rose`, `indigo`, `mint`, and `coal`
- Spacing and sizing: `tui-p-*`, `tui-m-*`, `tui-gap-*`, `tui-w-*`, and `tui-h-*`
- Typography: `tui-text-lg`, `tui-font-bold`, and `tui-leading-*`
- Layout: `tui-flex`, `tui-grid`, `tui-items-center`, and more
- Border radius, shadows, opacity, z-index, transforms, animations, filters, and additional utilities

The color palettes provide the 50–950 scales plus each palette's `-default` utility where the token exists.

### Variants and arbitrary values

The extension also suggests and previews:

- Pseudo-class variants: `hover:`, `focus:`, `focus-visible:`, `active:`, `disabled:`, `visited:`, and child variants such as `first:` and `odd:`
- Group variants: `group-hover:`, `group-focus:`, and `group-active:`
- Responsive variants: `sm:`, `md:`, `lg:`, `xl:`, and `2xl:`
- Important variants such as `!tui-p-4`
- Arbitrary values such as `tui-w-[320px]`, `tui-p-[1.25rem]`, and `tui-text-[18px]` in hover preview

### Hover Preview

Hover over any `tui-*` class to see:
- The exact CSS output, including variants and `!important`
- The token variable it maps to
- Color swatch (for color utilities)
- Resolved CSS for supported arbitrary values

### Color Decorators

Inline color squares appear next to color classes (like Tailwind CSS IntelliSense does).

## Supported Languages

HTML, JSX/TSX (React), Vue, Svelte, Astro, CSS, SCSS, PHP

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `tantuui.enable` | `true` | Enable/disable the extension |
| `tantuui.showColorDecorators` | `true` | Show inline color squares |
| `tantuui.languages` | `[...]` | Languages to activate for |

## Installation

### From VS Code Marketplace (coming soon)

Search for "TantuUI CSS IntelliSense" in the Extensions panel.

### Local development

```bash
cd packages/vscode-intellisense
npm install
npm run build
```

Then press `F5` in VS Code to launch the Extension Development Host, or install from `.vsix`:

```bash
npm run package
code --install-extension tantuui-css-intellisense-0.0.1.vsix
```

## How it works

The extension bundles the full TantuUI token dictionary statically — no runtime CSS parsing needed. When you type or hover, it matches against the known utility class names and shows the corresponding CSS output and token variables.

## License

MIT
