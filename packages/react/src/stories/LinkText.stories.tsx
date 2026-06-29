import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LinkText } from "../components/LinkText/LinkText";

const meta: Meta<typeof LinkText> = {
  title: "Components/LinkText",
  component: LinkText,
  tags: ["autodocs"],

  argTypes: {
    as: {
      control: "select",
      options: ["span", "a"],
      description: "HTML element to render. Use \"span\" inside NavLink/Link to avoid nested anchors.",
      table: { category: "Element", defaultValue: { summary: "span" } },
    },
    variant: {
      control: "select",
      options: ["blue", "black", "white", "navy"],
      description: "Color variant",
      table: { category: "Appearance", defaultValue: { summary: "blue" } },
    },
    size: {
      control: "select",
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
      description: "Font size",
      table: { category: "Appearance" },
    },
    weight: {
      control: "select",
      options: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      description: "Font weight",
      table: { category: "Appearance" },
    },
    noHoverUnderline: {
      control: "boolean",
      description: "Hide underline on hover",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode",
      table: { category: "State" },
    },
    ghostWidth: {
      control: "text",
      description: "Width of ghost shimmer",
      table: { category: "State" },
    },
    children: {
      control: "text",
      table: { category: "Content" },
    },
  },

  args: {
    children: "Learn more",
    as: "span",
    variant: "blue",
    noHoverUnderline: false,
    disabled: false,
    isGhost: false,
  },
};

export default meta;
type Story = StoryObj<typeof LinkText>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { children: "Click this link", as: "a", href: "#" },
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <div style={{ display: "flex", gap: "var(--tui-spacing-6)", alignItems: "center" }}>
        <LinkText as="a" href="#" variant="blue">Blue (default)</LinkText>
        <LinkText as="a" href="#" variant="black">Black</LinkText>
        <LinkText as="a" href="#" variant="navy">Navy</LinkText>
      </div>
      <div style={{ background: "var(--tui-color-brand-black-900)", padding: "var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", display: "inline-flex" }}>
        <LinkText as="a" href="#" variant="white">White (on dark bg)</LinkText>
      </div>
    </div>
  ),
};

// ── Hover States ──────────────────────────────────────────────────────────
export const HoverStates: Story = {
  name: "Hover Behavior",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <div>
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", display: "block", marginBottom: "var(--tui-spacing-1)" }}>With hover underline (default)</span>
        <LinkText as="a" href="#" variant="blue">Hover me to see underline</LinkText>
      </div>
      <div>
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", display: "block", marginBottom: "var(--tui-spacing-1)" }}>No hover underline</span>
        <LinkText as="a" href="#" variant="blue" noHoverUnderline>Hover me — no underline</LinkText>
      </div>
    </div>
  ),
};

// ── Focus & Pressed ───────────────────────────────────────────────────────
export const FocusAndPressed: Story = {
  name: "Focus & Pressed",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Tab to focus (shows ring + indigo color). Click/hold to see pressed state (indigo-600).
      </p>
      <LinkText as="a" href="#" variant="blue" size="lg" weight="semibold">Blue — tab or click me</LinkText>
      <LinkText as="a" href="#" variant="black" size="lg" weight="semibold">Black — tab or click me</LinkText>
      <LinkText as="a" href="#" variant="navy" size="lg" weight="semibold">Navy — tab or click me</LinkText>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-4)", flexWrap: "wrap", alignItems: "baseline" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <LinkText key={size} as="a" href="#" size={size}>{size.toUpperCase()} link</LinkText>
      ))}
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-6)", alignItems: "center" }}>
      <LinkText as="a" href="#" disabled variant="blue">Disabled blue</LinkText>
      <LinkText as="a" href="#" disabled variant="black">Disabled black</LinkText>
      <LinkText as="a" href="#" disabled variant="navy">Disabled coal</LinkText>
    </div>
  ),
};

// ── Ghost / Skeleton ──────────────────────────────────────────────────────
export const GhostSkeleton: Story = {
  name: "Ghost / Skeleton",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <LinkText isGhost ghostWidth="80px" size="xs" />
      <LinkText isGhost ghostWidth="100px" size="sm" />
      <LinkText isGhost ghostWidth="120px" size="md" />
      <LinkText isGhost ghostWidth="150px" size="lg" />
    </div>
  ),
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <style>{`
        .my-link { color: #e11d48; font-weight: 700; text-decoration: none; }
        .my-link:hover { text-decoration: wavy underline #e11d48; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children.
      </p>
      <LinkText as="a" href="#" className="my-link">Custom styled link</LinkText>
      <LinkText as="a" href="#">No props at all (default blue)</LinkText>
    </div>
  ),
};

// ── As Prop (span vs a) ───────────────────────────────────────────────────
export const AsElement: Story = {
  name: "As Prop (span vs a)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <div>
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", display: "block", marginBottom: "var(--tui-spacing-1)" }}>
          as="span" (default) — use inside NavLink/Link
        </span>
        <LinkText as="span" variant="navy" size="sm" weight="medium">Dashboard</LinkText>
      </div>
      <div>
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", display: "block", marginBottom: "var(--tui-spacing-1)" }}>
          as="a" — standalone anchor link
        </span>
        <LinkText as="a" href="#" variant="navy" size="sm" weight="medium">External Link</LinkText>
      </div>
    </div>
  ),
};
