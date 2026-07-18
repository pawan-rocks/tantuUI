import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../components/Button/Button";

// ── Arrow icon helper ─────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "soft", "plain"],
      description: "Visual style variant",
      table: { category: "Appearance", defaultValue: { summary: "solid" } },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent / semantic meaning. default and primary are the same (brand-primary/purple).",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Button size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner and disable interaction",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode — renders Shimmer matching button dimensions",
      table: { category: "State" },
    },
    fullWidth: {
      control: "boolean",
      description: "Stretch to fill container width",
      table: { category: "Layout" },
    },
    iconOnly: {
      control: "boolean",
      description: "Icon-only mode — renders a square button with no label",
      table: { category: "Layout" },
    },
    children: {
      control: "text",
      description: "Button label",
      table: { category: "Content" },
    },
    onClick: { action: "clicked" },
  },

  args: {
    children: "Button",
    variant: "solid",
    size: "md",
    loading: false,
    disabled: false,
    fullWidth: false,
    isGhost: false,
    iconOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { children: "Click me" },
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="plain">Plain</Button>
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      {(["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
        <Button key={intent} intent={intent}>{intent.charAt(0).toUpperCase() + intent.slice(1)}</Button>
      ))}
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} size={size}>{size.toUpperCase()}</Button>
      ))}
    </div>
  ),
};

// ── Variant × Intent matrix ───────────────────────────────────────────────
export const Matrix: Story = {
  name: "Variant × Intent Matrix",
  parameters: { controls: { disable: true } },
  render: () => {
    const variants = ["solid", "outline", "soft", "plain"] as const;
    const intents  = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "var(--tui-font-family-sans)" }}>
          <thead>
            <tr>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "left", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", fontWeight: "var(--tui-font-weight-semibold)", borderBottom: "1px solid var(--tui-color-border-default)" }}>
                intent ↓ / variant →
              </th>
              {variants.map((v) => (
                <th key={v} style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: "var(--tui-font-weight-semibold)", borderBottom: "1px solid var(--tui-color-border-default)" }}>
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intents.map((intent) => (
              <tr key={intent}>
                <td style={{ padding: "var(--tui-spacing-3)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: "var(--tui-font-weight-medium)", borderBottom: "1px solid var(--tui-color-border-default)" }}>
                  {intent}
                </td>
                {variants.map((variant) => (
                  <td key={variant} style={{ padding: "var(--tui-spacing-3)", textAlign: "center", borderBottom: "1px solid var(--tui-color-border-default)" }}>
                    <Button intent={intent} variant={variant} size="sm">{intent}</Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ── With Icons ────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Button leadingIcon={<PlusIcon />}>New item</Button>
      <Button trailingIcon={<ArrowRight />} variant="outline">Continue</Button>
      <Button leadingIcon={<PlusIcon />} trailingIcon={<ArrowRight />} variant="soft">Both icons</Button>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────
export const States: Story = {
  name: "States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Button>Default</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button loading variant="outline">Loading outline</Button>
    </div>
  ),
};

// ── Full width ────────────────────────────────────────────────────────────
export const FullWidth: Story = {
  name: "Full Width",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
      <Button fullWidth>Full width solid</Button>
      <Button fullWidth variant="outline">Full width outline</Button>
    </div>
  ),
};

// ── Ghost / Skeleton ──────────────────────────────────────────────────────
export const GhostSkeleton: Story = {
  name: "Ghost / Skeleton",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} size={size} isGhost>{size.toUpperCase()}</Button>
      ))}
    </div>
  ),
};

// ── Icon Only ─────────────────────────────────────────────────────────────
export const IconOnly: Story = {
  name: "Icon Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} size={size} iconOnly aria-label="Add item">
          <PlusIcon />
        </Button>
      ))}
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
        .my-gradient-btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; border-radius: 8px; border: none; font-weight: 600; }
        .my-gradient-btn:hover { opacity: 0.9; }
        .my-pill-btn { background: #1a1a1a; color: #fafafa; padding: 10px 32px; border-radius: 9999px; border: none; font-size: 13px; letter-spacing: 0.5px; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI button as a plain wrapper.
      </p>
      <Button className="my-gradient-btn">Gradient Button</Button>
      <Button className="my-pill-btn">Pill Button</Button>
      <Button>No props at all (defaults apply)</Button>
    </div>
  ),
};
