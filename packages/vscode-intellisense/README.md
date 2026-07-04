# TantuUI CSS IntelliSense

VS Code extension providing intelligent autocomplete, hover preview, and inline color decorators for [TantuUI](https://github.com/pawan-rocks/tantuUI) CSS utility classes.

## Features

### Autocomplete

Start typing `tui-` in any `class`, `className`, or `@apply` context and get smart suggestions with CSS output previews.

- All `tui-bg-*`, `tui-text-*`, `tui-border-*` color classes
- Spacing: `tui-p-*`, `tui-m-*`, `tui-gap-*`
- Typography: `tui-text-lg`, `tui-font-bold`, `tui-leading-*`
- Layout: `tui-flex`, `tui-grid`, `tui-items-center`, etc.
- Border radius: `tui-rounded-*`
- Shadows: `tui-shadow-*`
- Opacity: `tui-opacity-*`
- Z-index: `tui-z-*`

### Hover Preview

Hover over any `tui-*` class to see:
- The exact CSS output
- The token variable it maps to
- Color swatch (for color utilities)

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
