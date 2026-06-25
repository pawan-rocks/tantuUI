---
inclusion: always
---

# Storybook Sync Rule

Whenever you make any change to TantuUI — components, tokens, props, CSS, or new features — you MUST update the corresponding Storybook stories FIRST, before or alongside the implementation change.

## What triggers a Storybook update

- Adding/removing/renaming a component prop
- Adding a new component
- Changing token values (colors, spacing, typography, etc.)
- Adding/removing CSS utility classes
- Changing component behavior (loading, ghost, disabled states)
- Updating the design system API in any way

## What to update

1. **New prop added** → Add the control in argTypes + show it in a relevant story
2. **New component** → Create a full `ComponentName.stories.tsx` in `packages/react/src/stories/` with:
   - Meta with `tags: ["autodocs"]`
   - Playground story (interactive, all controls)
   - At least 2-3 focused stories showing key variants/states
3. **Token changes** → Update `Foundations.stories.tsx` (Colors, Spacing, etc.)
4. **Prop removed** → Remove from argTypes and stories that used it
5. **Component renamed** → Rename story file and update title

## Story file location

All stories live in: `packages/react/src/stories/*.stories.tsx`

## Story conventions

- Title format: `"Components/ComponentName"` or `"Foundations/Tokens"`
- Import components from relative paths: `"../components/Button/Button"`
- Use `import type { Meta, StoryObj } from "@storybook/react"`
- Playground story should have name `"⚡ Playground"`
- CSS variable references use underscore for decimals: `--tui-spacing-0_5`
- Token names like 2xl/3xl have no hyphen: `--tui-radius-2xl`

## Required story: "Custom Class Only"

Every component MUST have a story called "Custom Class Only" that demonstrates:
- Using the component with ZERO design props — only `className` and `children`
- Shows that the component works as a plain wrapper when no props are passed
- Demonstrates overriding styles via user's own CSS class

Example pattern:
```tsx
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-custom-btn { background: hotpink; color: white; padding: 12px 24px; border-radius: 8px; }`}</style>
      <Button className="my-custom-btn">Custom styled</Button>
    </>
  ),
};
```
