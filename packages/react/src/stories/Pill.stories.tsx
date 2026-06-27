import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Pill } from "../components/Pill/Pill";

// ── Icon helpers ──────────────────────────────────────────────────────────
const DotIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
    <circle cx="4" cy="4" r="3" fill="currentColor" />
  </svg>
);

const BoltIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M5.5 1L2 6h3l-.5 3L8 4H5l.5-3z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const INTENTS = ["default", "primary", "secondary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],

  argTypes: {
    label: {
      control: "text",
      description: "Text content of the pill",
      table: { category: "Content" },
    },
    variant: {
      control: "select",
      options: ["solid", "subtle", "outlined"],
      description: "Visual style variant",
      table: { category: "Appearance", defaultValue: { summary: "subtle" } },
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
    label: "Pill",
    variant: "subtle",
    intent: "default",
    size: "md",
    isDisabled: false,
    isGhost: false,
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { label: "Status Badge" },
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Pill label="Subtle" variant="subtle" />
      <Pill label="Solid" variant="solid" />
      <Pill label="Outlined" variant="outlined" />
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
          <Pill key={i} label={i} intent={i} variant="subtle" />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        {INTENTS.map((i) => (
          <Pill key={i} label={i} intent={i} variant="solid" />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        {INTENTS.map((i) => (
          <Pill key={i} label={i} intent={i} variant="outlined" />
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
      <Pill label="XS" size="xs" />
      <Pill label="Small" size="sm" />
      <Pill label="Medium" size="md" />
      <Pill label="Large" size="lg" />
      <Pill label="XL" size="xl" />
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Pill label="Active" intent="success" leadingIcon={<DotIcon />} />
      <Pill label="Info" intent="info" leadingIcon={<BoltIcon />} variant="solid" />
      <Pill label="Default" intent="default" trailingIcon={<DotIcon />} />
    </div>
  ),
};

// ── With Remove ───────────────────────────────────────────────────────────
export const WithRemove: Story = {
  name: "With Remove",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Pill label="Removable" onRemove={() => {}} />
      <Pill label="Success" intent="success" onRemove={() => {}} variant="solid" />
      <Pill label="With icon" intent="info" leadingIcon={<BoltIcon />} onRemove={() => {}} />
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Pill label="Disabled subtle" isDisabled />
      <Pill label="Disabled solid" variant="solid" isDisabled />
      <Pill label="Disabled with remove" onRemove={() => {}} isDisabled />
    </div>
  ),
};

// ── Ghost ─────────────────────────────────────────────────────────────────
export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Pill label="XS Ghost" size="xs" isGhost />
      <Pill label="SM Ghost" size="sm" isGhost />
      <Pill label="MD Ghost" size="md" isGhost />
      <Pill label="LG Ghost" size="lg" isGhost />
      <Pill label="XL Ghost" size="xl" isGhost />
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
            <th style={{ padding: "8px" }}>Subtle</th>
            <th style={{ padding: "8px" }}>Solid</th>
            <th style={{ padding: "8px" }}>Outlined</th>
            <th style={{ padding: "8px" }}>Disabled</th>
            <th style={{ padding: "8px" }}>Ghost</th>
          </tr>
        </thead>
        <tbody>
          {INTENTS.map((intent) => (
            <tr key={intent}>
              <td style={{ padding: "8px", fontWeight: 500 }}>{intent}</td>
              <td style={{ padding: "8px" }}><Pill label={intent} intent={intent} variant="subtle" /></td>
              <td style={{ padding: "8px" }}><Pill label={intent} intent={intent} variant="solid" /></td>
              <td style={{ padding: "8px" }}><Pill label={intent} intent={intent} variant="outlined" /></td>
              <td style={{ padding: "8px" }}><Pill label={intent} intent={intent} isDisabled /></td>
              <td style={{ padding: "8px" }}><Pill label={intent} intent={intent} isGhost /></td>
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
        .my-custom-pill { background: linear-gradient(90deg, #f97316, #ef4444); color: white; padding: 2px 10px; border-radius: 9999px; font-size: 10px; font-weight: 700; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI Pill as a plain wrapper.
      </p>
      <Pill className="my-custom-pill" label="Custom styled" />
      <Pill label="No props at all" />
    </div>
  ),
};
