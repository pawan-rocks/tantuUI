# Changelog

## 0.0.11

### Added
- **Stepper component** — token-driven horizontal and vertical progress stepper with numbered or custom icon circles, labels, sublabels, status pills, active/completed/pending states, disabled steps, ghost loading, size variants, intent variants, and top/center vertical alignment
- Circle-only Stepper interaction — enabled step circles support `onStepChange` or per-step `onClick`; labels, sublabels, descriptions, and status pills remain non-clickable
- Stepper Storybook coverage for horizontal and vertical layouts, vertical alignment, intent states, dark mode, disabled and read-only steps, sizes, hover states, ghost mode, and custom class usage
- Stepper component tests covering rendering, accessibility attributes, state classes, status content, interaction, disabled behavior, ghost mode, and wrapper usage

### Changed
- Completed Stepper states now use the selected `intent` palette instead of always using success green; pending steps retain a neutral design across all intents
- Added dark-theme Stepper tokens for normal, hover, completed, active, pending, disabled, circle, connector, label, and status colors
- Removed Storybook-only layout CSS from Stepper examples so vertical alignment and connector spacing are handled by the component
- Aligned Storybook development dependencies to version `8.6.18`

### Fixed
- Storybook React `act(...)` warnings caused by mixed Storybook package versions
- Dark-mode Stepper text contrast and circle hover contrast

## 0.0.10

### Added
- **InputOtp component** — configurable one-time-password input with controlled/uncontrolled values, custom length, numeric filtering, paste distribution, keyboard navigation, min/max constraints, intent/size variants, disabled and invalid states, accessibility labels, and ghost loading support
- **Opt-in dark mode contract** — semantic background, surface, text, border, focus, disabled, shimmer, and intent roles under `[data-theme="dark"]`
- Dark-mode intent styling across buttons, fields, selection controls, tags, lists, calendars, date pickers, time pickers, tables, modals, and forms
- Storybook dark-mode theme switching and a Dark Mode Contract documentation story

### Changed
- Improved current-month calendar date hover contrast for every intent
- Improved time-selector option hover background and text contrast for every intent
- Added intent classes to date-picker and time-picker portal popups so dark-mode styling remains consistent outside the component tree

## 0.0.9

### Added
- **Dropdown component** — searchable single- and multi-select dropdown with autocomplete, custom option rendering, removable selected tags, keyboard navigation, and intent/size variants
- **ListItem component** — composable option row with title/subtitle content, selected and disabled states, intent colors, and configurable selection controls
- **ListGroup component** — grouped ListItem container with headers, footers, separators, selection support, and size/intent variants

### Changed
- Updated component styles and stories to use the expanded semantic color system (`primary`, `secondary`, and `tertiary`)
- Replaced invalid `surface-secondary`, `font-size-base`, `neutral-*`, and legacy Storybook color references with defined tokens
- Tokenized modal and switch shadow/color usage and added the missing Shimmer custom-class story
- Added Sizing and surface token documentation to Foundations Storybook
- Added a pinned `@tantuui/tokens` dependency version

## 0.0.8

### Added
- **Modal component** — full-featured modal/dialog with multiple placements
  - Placements: `center`, `left`, `right`, `top`, `bottom`, `fullscreen`
  - Size presets: `xs`, `sm`, `md`, `lg`, `xl` (center placement)
  - Custom `width`, `height`, `maxWidth`, `maxHeight` props
  - **ModalHeader** sub-component with `title`, `subtitle`, `leftSection`, `rightSection`, `centerSection`
  - **ModalFooter** sub-component for action buttons
  - Close icon: absolute top-right, customizable via `closeIcon` prop, show/hide via `showCloseIcon`
  - Body content height control: `contentHeight`, `contentMinHeight`, `contentMaxHeight`
  - Ghost/skeleton: `isGhost` on Modal (body shimmer), ModalHeader (`isGhost`, `isTitleGhost`, `isSubtitleGhost`), ModalFooter (`isGhost`)
  - Ghost auto-sizes to title/subtitle text width; override with `ghostTitleWidth`/`ghostSubtitleWidth`
  - Backdrop click, escape key, body scroll lock, animations (scale/slide per placement)
  - Portal-based rendering, focus management, `aria-modal` accessibility

- **Table ghost/loading states**
  - `isGhost` prop on Table — renders shimmer rows matching column count
  - `ghostRowsCount` — number of ghost rows to show (default: 5)
  - `ghostRows` — array of row indices to show as ghost (per-row loading)
  - `column.isGhost` — per-column ghost shimmer for individual cells
  - `column.ghostWidth` — explicit ghost shimmer width per column
  - `TableCell isGhost` — per-cell ghost with auto-sizing to content
  - `TableCell ghostWidth`/`ghostHeight` — explicit cell shimmer dimensions
  - Structured content ghost: title/subtitle/extra render as separate shimmer lines
  - Checkbox/radio columns show shimmer in ghost mode

### Changed
- Table `ExTable` stories now use data-driven `Table` component for ghost examples
- Removed `ghostCells` prop from `TableRow` (unnecessary — use `Table isGhost` or explicit `TableCell isGhost`)

## 0.0.7

### Added
- **Table component** — data-driven table with antd-style `columns` + `dataSource` API
  - `TableColumn` config: title, subtitle, extra, dataIndex, render, align, width/minWidth/maxWidth, fixed (sticky), borderLeft/borderRight, sorter
  - **Row selection**: checkbox (multi) and radio (single) via `rowSelection` prop with `onChange(keys, rows)`
  - **Sorting**: `sorter` on columns + controlled `sortState`/`onSortChange`, cycles asc → desc → reset
  - **Expandable/Accordion rows**: `expandable` prop with `expandedRowRender`, toggle position (start/end/column key), custom toggle ReactNode, accordion mode
  - **Sticky header**: `stickyHeader` + `scroll.y` for vertical scroll with pinned header
  - **Sticky columns**: `fixed: "left" | "right"` on columns for horizontal scroll with pinned columns
  - **Scroll**: `scroll={{ x, y }}` for horizontal/vertical overflow
  - **Row states**: selected (brand-blue-50), disabled (brand-gray-200 + cursor not-allowed), borderless, hover (brand-tertiary-50)
  - **Header customization**: `bgColor`, `verticalAlign`, title/subtitle/extra structured content
  - **Cell features**: title/subtitle/extra, href (link), prefixIcon/suffixIcon, align, column borders with custom color/width
  - **Sizes**: sm, md, lg with distinct padding and font
  - **Variants**: bordered, rounded, striped, hoverable, compact
  - Composable sub-components also available: `ExTable`, `TableHeader`, `TableHeaderCell`, `TableBody`, `TableRow`, `TableRowLabel`, `TableCell`
  

### Changed
- Component exports updated: `Table` is now the data-driven component, `ExTable` is the low-level `<table>` wrapper

## 0.0.6 
    Missing details for this version
## 0.0.5

### Changed
- **LinkText default `as` is now `"span"`** — previously always rendered `<a>`. This makes it safe to use inside React Router `NavLink`/`Link` without nested anchor issues. Pass `as="a"` explicitly when you need a standalone anchor with `href`.

### Added
- **LinkText `as` prop** — accepts `"a"` or `"span"`. Storybook updated with new "As Prop" story.

### Migration from 0.0.4
If you used `<LinkText href="...">` before, add `as="a"`:
```diff
- <LinkText href="/about">About</LinkText>
+ <LinkText as="a" href="/about">About</LinkText>
```

---

## 0.0.4

### Initial Release
- Button, Text, Box, Shimmer, LinkText, Label, Input, Textarea
- Checkbox, Radio, Select, Switch, FormField
- Tag, Chip, Pill
- Calendar, TimeSelector, DatePicker, TimePicker, Popover
- Ghost/skeleton mode on all components
- Full accessibility (WAI-ARIA patterns)
- Supports React 17+
