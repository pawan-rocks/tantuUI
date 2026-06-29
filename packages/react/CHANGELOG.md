# Changelog

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
