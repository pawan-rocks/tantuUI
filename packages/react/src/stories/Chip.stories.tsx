import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Chip } from "../components/Chip/Chip";

// ── Icon helpers ──────────────────────────────────────────────────────────
const HashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5h7M2.5 7.5h7M4.5 2v8M7.5 2v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 3h9M3 6h6M4.5 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const INTENTS = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],

  argTypes: {
    label: {
      control: "text",
      description: "Text content of the chip",
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
    label: "Chip",
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
type Story = StoryObj<typeof Chip>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { label: "Example Chip", onClick: undefined },
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Chip label="Filled" variant="filled" onClick={() => {}} />
      <Chip label="Outlined" variant="outlined" onClick={() => {}} />
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
          <Chip key={i} label={i} intent={i} onClick={() => {}} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        {INTENTS.map((i) => (
          <Chip key={i} label={i} intent={i} variant="outlined" onClick={() => {}} />
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
      <Chip label="XS" size="xs" onClick={() => {}} />
      <Chip label="Small" size="sm" onClick={() => {}} />
      <Chip label="Medium" size="md" onClick={() => {}} />
      <Chip label="Large" size="lg" onClick={() => {}} />
      <Chip label="XL" size="xl" onClick={() => {}} />
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Chip label="Leading icon" leadingIcon={<HashIcon />} onClick={() => {}} />
      <Chip label="Trailing icon" trailingIcon={<FilterIcon />} onClick={() => {}} />
      <Chip label="Both icons" leadingIcon={<HashIcon />} trailingIcon={<FilterIcon />} onClick={() => {}} />
    </div>
  ),
};

// ── With Remove ───────────────────────────────────────────────────────────
export const WithRemove: Story = {
  name: "With Remove",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Chip label="Removable" onClick={() => {}} onRemove={() => {}} />
      <Chip label="With icon" leadingIcon={<HashIcon />} onClick={() => {}} onRemove={() => {}} intent="primary" />
      <Chip label="Outlined" variant="outlined" onClick={() => {}} onRemove={() => {}} intent="danger" />
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
        <Chip label="Normal" intent="primary" onClick={() => {}} />
        <Chip label="Selected" intent="primary" isSelected onClick={() => {}} />
      </div>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        <Chip label="Normal" intent="success" variant="outlined" onClick={() => {}} />
        <Chip label="Selected" intent="success" variant="outlined" isSelected onClick={() => {}} />
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
      <Chip label="Disabled filled" isDisabled onClick={() => {}} />
      <Chip label="Disabled outlined" variant="outlined" isDisabled onClick={() => {}} />
      <Chip label="Disabled with remove" onClick={() => {}} onRemove={() => {}} isDisabled />
    </div>
  ),
};

// ── Ghost ─────────────────────────────────────────────────────────────────
export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Chip label="XS Ghost" size="xs" isGhost />
      <Chip label="SM Ghost" size="sm" isGhost />
      <Chip label="MD Ghost" size="md" isGhost />
      <Chip label="LG Ghost" size="lg" isGhost />
      <Chip label="XL Ghost" size="xl" isGhost />
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
              <td style={{ padding: "8px" }}><Chip label={intent} intent={intent} onClick={() => {}} /></td>
              <td style={{ padding: "8px" }}><Chip label={intent} intent={intent} isSelected onClick={() => {}} /></td>
              <td style={{ padding: "8px" }}><Chip label={intent} intent={intent} isDisabled onClick={() => {}} /></td>
              <td style={{ padding: "8px" }}><Chip label={intent} intent={intent} isGhost /></td>
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
        .my-custom-chip { background: #1a1a1a; color: #fafafa; padding: 4px 16px; border-radius: 9999px; font-size: 12px; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI Chip as a plain wrapper.
      </p>
      <Chip className="my-custom-chip" label="Custom styled" />
      <Chip label="No props at all" />
    </div>
  ),
};
