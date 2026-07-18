import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Label } from "../components/Label/Label";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Font size controlled via design tokens",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent. default and primary use the same primary token color.",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    required: {
      control: "boolean",
      description: "Renders a required asterisk after the label text",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state — muted text color and not-allowed cursor",
      table: { category: "State" },
    },
    htmlFor: {
      control: "text",
      description: "Associates the label with a form control",
      table: { category: "Accessibility" },
    },
    children: {
      control: "text",
      description: "Label text content",
      table: { category: "Content" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode",
      table: { category: "State" },
    },
  },

  args: {
    children: "Label",
    size: "md",
    intent: "default",
    required: false,
    disabled: false,
    isGhost: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { children: "Email address" },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-4)", flexWrap: "wrap", alignItems: "baseline" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Label key={size} size={size}>{size.toUpperCase()}</Label>
      ))}
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      {(["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
        <Label key={intent} intent={intent} size="md">
          {intent.charAt(0).toUpperCase() + intent.slice(1)} label
        </Label>
      ))}
    </div>
  ),
};

// ── Required ──────────────────────────────────────────────────────────────
export const Required: Story = {
  name: "Required",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <Label required>Required field</Label>
      <Label required size="lg">Large required</Label>
      <Label>Optional field</Label>
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <Label disabled>Disabled label</Label>
      <Label disabled required>Disabled required</Label>
      <Label>Enabled label</Label>
    </div>
  ),
};

// ── Ghost ─────────────────────────────────────────────────────────────────
export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <Label isGhost>Email address</Label>
      <Label isGhost size="lg">Large ghost label</Label>
      <Label isGhost size="xs">XS ghost</Label>
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
        .my-fancy-label { color: #7c3aed; font-weight: 700; font-size: 18px; letter-spacing: 0.5px; text-transform: uppercase; }
        .my-underline-label { border-bottom: 2px solid currentColor; padding-bottom: 2px; color: #0ea5e9; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI label as a plain wrapper.
      </p>
      <Label className="my-fancy-label">Fancy Label</Label>
      <Label className="my-underline-label">Underline Label</Label>
      <Label>No props at all (defaults apply)</Label>
    </div>
  ),
};
