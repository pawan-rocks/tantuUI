import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tag } from "../components/Tag/Tag";

// ── Icon helpers ──────────────────────────────────────────────────────────
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4L6 1z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const INTENTS = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],

  argTypes: {
    label: {
      control: "text",
      description: "Text content of the tag",
      table: { category: "Content" },
    },
    variant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "Visual style variant",
      table: { category: "Appearance", defaultValue: { summary: "filled" } },
    },
    intent: {
      control: "select",
      options: [...INTENTS],
      description: "Intent color theme",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    borderRadius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Border radius",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    isSelected: {
      control: "boolean",
      description: "Selected state",
      table: { category: "State" },
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost / skeleton loading state",
      table: { category: "State" },
    },
    onClick: { action: "clicked" },
    onRemove: { action: "removed" },
  },

  args: {
    label: "Tag",
    variant: "filled",
    intent: "default",
    size: "md",
    borderRadius: "md",
    isSelected: false,
    isDisabled: false,
    isGhost: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { label: "Example Tag" },
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Tag label="Filled" variant="filled" />
      <Tag label="Outlined" variant="outlined" />
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        {INTENTS.map((i) => (
          <Tag key={i} label={i} intent={i} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        {INTENTS.map((i) => (
          <Tag key={i} label={i} intent={i} variant="outlined" />
        ))}
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Tag label="XS" size="xs" />
      <Tag label="Small" size="sm" />
      <Tag label="Medium" size="md" />
      <Tag label="Large" size="lg" />
      <Tag label="XL" size="xl" />
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Tag label="Leading icon" leadingIcon={<StarIcon />} />
      <Tag label="Trailing icon" trailingIcon={<CheckIcon />} />
      <Tag label="Both icons" leadingIcon={<StarIcon />} trailingIcon={<CheckIcon />} />
    </div>
  ),
};

// ── With Remove ───────────────────────────────────────────────────────────
export const WithRemove: Story = {
  name: "With Remove",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Tag label="Removable" onRemove={() => {}} />
      <Tag label="With icon" leadingIcon={<StarIcon />} onRemove={() => {}} intent="primary" />
      <Tag label="Outlined" variant="outlined" onRemove={() => {}} intent="danger" />
    </div>
  ),
};

// ── Selected State ────────────────────────────────────────────────────────
export const SelectedState: Story = {
  name: "Selected State",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        <Tag label="Normal" intent="primary" onClick={() => {}} />
        <Tag label="Selected" intent="primary" isSelected onClick={() => {}} />
      </div>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        <Tag label="Normal" intent="success" variant="outlined" onClick={() => {}} />
        <Tag label="Selected" intent="success" variant="outlined" isSelected onClick={() => {}} />
      </div>
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Tag label="Disabled filled" isDisabled />
      <Tag label="Disabled outlined" variant="outlined" isDisabled />
      <Tag label="Disabled with remove" onRemove={() => {}} isDisabled />
    </div>
  ),
};

// ── Ghost ─────────────────────────────────────────────────────────────────
export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Tag label="XS Ghost" size="xs" isGhost />
      <Tag label="SM Ghost" size="sm" isGhost />
      <Tag label="MD Ghost" size="md" isGhost />
      <Tag label="LG Ghost" size="lg" isGhost />
      <Tag label="XL Ghost" size="xl" isGhost />
    </div>
  ),
};

// ── All States ────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <table style={{ borderCollapse: "collapse", fontSize: "var(--tui-font-size-xs)" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px", textAlign: "left" }}>Intent</th>
            <th style={{ padding: "8px" }}>Default</th>
            <th style={{ padding: "8px" }}>Selected</th>
            <th style={{ padding: "8px" }}>Disabled</th>
            <th style={{ padding: "8px" }}>Ghost</th>
          </tr>
        </thead>
        <tbody>
          {INTENTS.map((intent) => (
            <tr key={intent}>
              <td style={{ padding: "8px", fontWeight: 500 }}>{intent}</td>
              <td style={{ padding: "8px" }}><Tag label={intent} intent={intent} onClick={() => {}} /></td>
              <td style={{ padding: "8px" }}><Tag label={intent} intent={intent} isSelected onClick={() => {}} /></td>
              <td style={{ padding: "8px" }}><Tag label={intent} intent={intent} isDisabled /></td>
              <td style={{ padding: "8px" }}><Tag label={intent} intent={intent} isGhost /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 400 }}>
      <style>{`
        .my-custom-tag { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 12px; border-radius: 9999px; font-size: 11px; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI Tag as a plain wrapper.
      </p>
      <Tag className="my-custom-tag" label="Custom styled" />
      <Tag label="No props at all" />
    </div>
  ),
};
