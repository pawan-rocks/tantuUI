import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { Tag } from "../components/Tag/Tag";
import type { DropdownOption } from "../components/Dropdown/Dropdown";

const fruitOptions: DropdownOption[] = [
  { value: "apple", label: "Apple", subtitle: "Red or green" },
  { value: "banana", label: "Banana", subtitle: "Rich in potassium" },
  { value: "cherry", label: "Cherry", subtitle: "Sweet and tart" },
  { value: "date", label: "Date", subtitle: "Naturally sweet" },
  { value: "elderberry", label: "Elderberry", subtitle: "Dark purple berry" },
];

const userOptions: DropdownOption[] = [
  { value: "alice", label: "Alice Johnson", subtitle: "Product Designer" },
  { value: "bob", label: "Bob Smith", subtitle: "Software Engineer" },
  { value: "carol", label: "Carol White", subtitle: "Project Manager" },
  { value: "david", label: "David Brown", subtitle: "Product Manager" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    options: { control: false, description: "Options rendered as ListItem rows", table: { category: "Content" } },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"], table: { category: "Appearance", defaultValue: { summary: "md" } } },
    variant: { control: "select", options: ["outline", "soft", "plain"], table: { category: "Appearance", defaultValue: { summary: "outline" } } },
    intent: { control: "select", options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"], description: "Intent colors the input, option dividers, and dropdown menu border", table: { category: "Appearance", defaultValue: { summary: "default" } } },
    placeholder: { control: "text", table: { category: "Content" } },
    autocomplete: { control: "boolean", description: "Enable editable input filtering", table: { category: "Behavior", defaultValue: { summary: "false" } } },
    multiple: { control: "boolean", description: "Enable multiple values with left checkboxes and removable tags", table: { category: "Behavior", defaultValue: { summary: "false" } } },
    divider: { control: "boolean", description: "Show dividers between dropdown options; the final option divider is always hidden", table: { category: "Appearance", defaultValue: { summary: "true" } } },
    displayFn: { control: false, description: "Convert an option to the input and default tag text", table: { category: "Rendering" } },
    tagRenderOption: { control: false, description: "Render custom removable tags for selected options", table: { category: "Rendering" } },
    maxTagsVisible: { control: { type: "number", min: 0, step: 1 }, description: "Maximum selected tags shown before a +count summary tag", table: { category: "Rendering" } },
    renderOption: { control: false, description: "Render custom option content while preserving selection and keyboard behavior", table: { category: "Rendering" } },
    clearable: { control: "boolean", description: "Show clear selection button", table: { category: "Behavior", defaultValue: { summary: "false" } } },
    loading: { control: "boolean", description: "Show loading state", table: { category: "State", defaultValue: { summary: "false" } } },
    noOptions: { control: "text", description: "Content shown when there are no options", table: { category: "Content" } },
    noResults: { control: "text", description: "Content shown when filtering returns no results", table: { category: "Content" } },
    dropdownWidth: { control: "select", options: ["trigger", "content", "320px"], description: "Trigger width, content width, or custom CSS width", table: { category: "Menu" } },
    dropdownMinWidth: { control: "text", description: "Minimum menu width; defaults to 0px for edge-to-edge trigger alignment", table: { category: "Menu", defaultValue: { summary: "0px" } } },
    isInvalid: { control: "boolean", table: { category: "State", defaultValue: { summary: "false" } } },
    isGhost: { control: "boolean", table: { category: "State", defaultValue: { summary: "false" } } },
  },
  args: {
    options: fruitOptions,
    size: "md",
    variant: "outline",
    intent: "default",
    placeholder: "Choose a fruit",
    autocomplete: false,
    multiple: false,
    clearable: true,
    loading: false,
    noOptions: "No options",
    noResults: "No results found",
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => <Dropdown {...args} />,
};

export const SingleSelect: Story = {
  name: "Single Select",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <Dropdown
        options={fruitOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select one fruit"
        clearable
      />
    );
  },
};

export const MultipleSelect: Story = {
  name: "Multiple Select with Checkboxes",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple"]);
    return (
      <Dropdown
        options={fruitOptions}
        multiple
        values={selected}
        onValuesChange={(nextValues) => setSelected(nextValues)}
        placeholder="Select fruits"
        clearable
      />
    );
  },
};

export const Divider: Story = {
  name: "Option Dividers",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 320 }}>
      <Dropdown options={fruitOptions} divider placeholder="Default dividers (last hidden)" />
      <Dropdown options={fruitOptions} divider={false} placeholder="Dividers hidden" />
    </div>
  ),
};

export const MultipleSelectionTags: Story = {
  name: "Multiple Selection with Removable Tags",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "The autocomplete query starts empty in multiple mode because selected values are represented by removable tags instead of comma-separated input text.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple", "cherry"]);
    return (
      <Dropdown
        options={fruitOptions}
        multiple
        values={selected}
        onValuesChange={setSelected}
        intent="success"
        autocomplete
        clearable
        placeholder="Select fruits"
      />
    );
  },
};

export const CustomRenderers: Story = {
  name: "Custom Tags and Options",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string[]>(["alice"]);
    return (
      <Dropdown
        options={userOptions}
        multiple
        values={selected}
        onValuesChange={setSelected}
        autocomplete
        clearable
        placeholder="Search users"
        displayFn={(option) => String(option.label).toUpperCase()}
        tagRenderOption={(option, { onRemove }) => (
          <Tag
            label={`User: ${String(option.label)}`}
            intent="secondary"
            size="sm"
            onRemove={onRemove}
          />
        )}
        renderOption={(option, { selected: isSelected, highlighted }) => (
          <div aria-current={highlighted ? "true" : undefined}>
            <strong>{String(option.label)}</strong>
            {isSelected && <span aria-label="selected"> ✓</span>}
          </div>
        )}
      />
    );
  },
};

export const MaxVisibleTags: Story = {
  name: "Maximum Visible Tags",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple", "banana", "cherry", "date"]);
    return (
      <Dropdown
        options={fruitOptions}
        multiple
        values={selected}
        onValuesChange={setSelected}
        maxTagsVisible={2}
        intent="primary"
        clearable
        placeholder="Select fruits"
      />
    );
  },
};

export const Autocomplete: Story = {
  name: "Autocomplete",
  parameters: { controls: { disable: true } },
  render: () => (
    <Dropdown
      options={userOptions}
      autocomplete
      clearable
      placeholder="Search users"
      noResults={<span>No matching users</span>}
    />
  ),
};

export const AsyncOptions: Story = {
  name: "Async Options",
  parameters: { controls: { disable: true } },
  render: () => (
    <Dropdown
      autocomplete
      clearable
      placeholder="Search remote users"
      loadOptions={async (query) => {
        await new Promise((resolve) => setTimeout(resolve, 350));
        const normalizedQuery = query.toLowerCase();
        return userOptions.filter((option) =>
          option.label?.toString().toLowerCase().includes(normalizedQuery),
        );
      }}
      noOptions="Start typing to search"
      noResults="No remote users found"
    />
  ),
};

export const EmptyAndLoading: Story = {
  name: "Empty and Loading States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 320 }}>
      <Dropdown options={[]} placeholder="No available options" noOptions="There are no options" />
      <Dropdown options={fruitOptions} loading placeholder="Loading options" />
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  name: "Keyboard Navigation",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Dropdown
        options={fruitOptions}
        autocomplete
        placeholder="Use arrows and Enter"
        noResults="No matching fruit"
      />
      <p style={{ marginTop: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-brand-gray-500)" }}>
        Arrow Up/Down moves highlight, Home/End jumps, Enter selects, Escape closes. Pointer highlighting clears when the pointer leaves an option.
      </p>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Dropdown key={size} size={size} options={fruitOptions} placeholder={size.toUpperCase()} />
      ))}
    </div>
  ),
};

export const WidthModes: Story = {
  name: "Width Modes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 320 }}>
      <Dropdown options={fruitOptions} placeholder="Trigger width, edge-to-edge" dropdownWidth="trigger" />
      <Dropdown options={fruitOptions} placeholder="Content width" dropdownWidth="content" />
      <Dropdown options={fruitOptions} placeholder="Custom 280px width" dropdownWidth="280px" dropdownMinWidth="240px" />
    </div>
  ),
};

export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-dropdown { border-radius: var(--tui-radius-full); } .my-dropdown .tui-input { background: var(--tui-color-brand-primary-50); border-color: var(--tui-color-brand-primary-400); }`}</style>
      <Dropdown className="my-dropdown" />
    </>
  ),
};
