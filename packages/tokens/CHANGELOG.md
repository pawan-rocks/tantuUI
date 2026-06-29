# Changelog

## 0.0.5

### Added
- **PostCSS plugin** (`@tantuui/tokens/postcss`) — `@apply` support for `tui-*` utility classes in CSS files
- **Vite plugin** (`@tantuui/tokens/vite`) — zero-config setup, auto-injects all CSS/utilities/runtime
- **Runtime JIT pseudo-class variants** — `hover:tui-*`, `focus:tui-*`, `active:tui-*`, `disabled:tui-*`, `focus-visible:tui-*`
- **Runtime JIT group variants** — `group-hover:tui-*`, `group-focus:tui-*`, `group-active:tui-*`
- **Runtime JIT responsive prefixes** — `sm:tui-*`, `md:tui-*`, `lg:tui-*`, `xl:tui-*`, `2xl:tui-*`
- **Combined prefixes** — `md:hover:tui-*` (responsive + pseudo)

### No Breaking Changes
- All existing imports (`@tantuui/tokens/css`, `@tantuui/tokens/css/utilities`, `@tantuui/tokens/runtime`, `@tantuui/tokens/tailwind-preset`) continue to work unchanged
- Existing `tui-*-[value]` arbitrary value classes still work as before

---

## 0.0.4

### Initial Release
- Design token CSS variables (`--tui-*`)
- Utility classes (`tui-bg-*`, `tui-text-*`, `tui-p-*`, `tui-flex`, etc.)
- Runtime JIT for arbitrary values (`tui-w-[350px]`, `tui-h-[calc(100vh-64px)]`)
- Tailwind CSS preset (`@tantuui/tokens/tailwind-preset`)
- Token objects for JavaScript/TypeScript usage
