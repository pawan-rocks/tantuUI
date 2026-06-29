# @tantuui/postcss-plugin

PostCSS plugin for TantuUI — adds `@apply` support for `tui-*` utility classes.

## Installation

```bash
npm install @tantuui/postcss-plugin postcss --save-dev
```

## Setup

```js
// postcss.config.js
module.exports = {
  plugins: [
    require("@tantuui/postcss-plugin")(),
  ],
};
```

## Usage

Use `@apply` in your CSS files to compose TantuUI utility classes:

```css
.my-button {
  @apply tui-px-4 tui-py-2 tui-rounded-md tui-bg-brand-blue-600 tui-text-white tui-font-medium tui-transition-colors;
}

.my-button:hover {
  @apply tui-bg-brand-blue-700;
}

.my-card {
  @apply tui-p-6 tui-rounded-xl tui-bg-white tui-border-1 tui-border-brand-black-200 tui-shadow-sm;
}

.sidebar__link {
  @apply tui-block tui-px-3 tui-py-2 tui-rounded-md tui-text-sm tui-font-medium tui-no-underline tui-whitespace-nowrap tui-transition-colors tui-text-brand-gray-600;
}

.sidebar__link:hover {
  @apply tui-bg-brand-black-100 tui-text-brand-navy-default;
}

.sidebar__link--active {
  @apply tui-bg-info-50 tui-text-brand-navy-default;
}
```

## Arbitrary values

Works with arbitrary values too:

```css
.custom-width {
  @apply tui-w-[350px] tui-max-w-[calc(100%-2rem)];
}
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `utilitiesPath` | `string` | Custom path to utilities.css (auto-resolved from node_modules by default) |

## License

MIT
