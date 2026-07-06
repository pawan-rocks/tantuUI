# Changelog

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
  - **Row states**: selected (brand-blue-50), disabled (brand-gray-200 + cursor not-allowed), borderless, hover (brand-navy-50)
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
