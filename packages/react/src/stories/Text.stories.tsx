import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Text } from "../components/Text/Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],

  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6", "label", "small", "strong", "em"],
      description: "HTML element to render",
      table: { category: "Polymorphic", defaultValue: { summary: "p" } },
    },
    size: {
      control: "select",
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
      description: "Font size token key",
      table: { category: "Typography" },
    },
    weight: {
      control: "select",
      options: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      description: "Font weight token key",
      table: { category: "Typography" },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "disabled", "inverse", "link", "danger", "success", "warning"],
      description: "Semantic color token",
      table: { category: "Typography" },
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
      table: { category: "Typography" },
    },
    truncate: {
      control: "number",
      description: "Clamp to N lines (1 = single-line ellipsis)",
      table: { category: "Layout" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode — renders Shimmer matching text dimensions",
      table: { category: "State" },
    },
    ghostWidth: {
      control: "text",
      description: "Width of the ghost shimmer (e.g. \"80%\", \"200px\")",
      table: { category: "State" },
    },
    children: {
      control: "text",
      table: { category: "Content" },
    },
  },

  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    as: "p",
    size: "md",
    weight: "normal",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
};

// ── Type scale ────────────────────────────────────────────────────────────
export const TypeScale: Story = {
  name: "Type Scale",
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ["7xl", "6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs", "2xs"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: "flex", alignItems: "baseline", gap: "var(--tui-spacing-4)", borderBottom: "1px solid var(--tui-color-border-default)", paddingBottom: "var(--tui-spacing-3)" }}>
            <span style={{ width: 48, flexShrink: 0, fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", fontFamily: "var(--tui-font-family-mono)" }}>{size}</span>
            <Text size={size}>The quick brown fox</Text>
          </div>
        ))}
      </div>
    );
  },
};

// ── Font weights ──────────────────────────────────────────────────────────
export const FontWeights: Story = {
  name: "Font Weights",
  parameters: { controls: { disable: true } },
  render: () => {
    const weights = ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {weights.map((weight) => (
          <div key={weight} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
            <span style={{ width: 100, flexShrink: 0, fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", fontFamily: "var(--tui-font-family-mono)" }}>{weight}</span>
            <Text size="xl" weight={weight}>The quick brown fox</Text>
          </div>
        ))}
      </div>
    );
  },
};

// ── Colors ────────────────────────────────────────────────────────────────
export const Colors: Story = {
  name: "Colors",
  parameters: { controls: { disable: true } },
  render: () => {
    const colors = ["primary", "secondary", "tertiary", "disabled", "link", "danger", "success", "warning"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {colors.map((color) => (
          <div key={color} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
            <span style={{ width: 80, flexShrink: 0, fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", fontFamily: "var(--tui-font-family-mono)" }}>{color}</span>
            <Text color={color}>Sample text using the {color} color token</Text>
          </div>
        ))}
      </div>
    );
  },
};

// ── Heading hierarchy ─────────────────────────────────────────────────────
export const Headings: Story = {
  name: "Heading Hierarchy",
  parameters: { controls: { disable: true } },
  render: () => (
    <article style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 600 }}>
      <Text as="h1" size="4xl" weight="bold">H1 — Page Title</Text>
      <Text as="h2" size="3xl" weight="semibold">H2 — Section Heading</Text>
      <Text as="h3" size="2xl" weight="semibold">H3 — Subsection</Text>
      <Text as="h4" size="xl" weight="medium">H4 — Card Title</Text>
      <Text size="md" color="secondary">Body text — The quick brown fox jumps over the lazy dog. Sticks and stones may break my bones but words will never hurt me.</Text>
      <Text size="sm" color="tertiary">Caption — Small supporting text used for metadata, timestamps, or labels.</Text>
    </article>
  ),
};

// ── Truncation ────────────────────────────────────────────────────────────
export const Truncation: Story = {
  name: "Truncation",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 400 }}>
      <div>
        <Text size="xs" color="tertiary" style={{ marginBottom: 4 }}>Single line (truncate=true)</Text>
        <Text truncate>The quick brown fox jumps over the lazy dog. This text is long and will be truncated after one line.</Text>
      </div>
      <div>
        <Text size="xs" color="tertiary" style={{ marginBottom: 4 }}>Two lines (truncate=2)</Text>
        <Text truncate={2}>The quick brown fox jumps over the lazy dog. This text is long and will be truncated after two lines of visible content.</Text>
      </div>
      <div>
        <Text size="xs" color="tertiary" style={{ marginBottom: 4 }}>Three lines (truncate=3)</Text>
        <Text truncate={3}>The quick brown fox jumps over the lazy dog. This text is long and will be truncated after three lines. Keep adding words to see the effect in action — it should clamp here.</Text>
      </div>
    </div>
  ),
};

// ── Ghost / Skeleton ──────────────────────────────────────────────────────
export const GhostSkeleton: Story = {
  name: "Ghost / Skeleton",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-6)", maxWidth: 500 }}>
      <div>
        <Text size="xs" color="tertiary" style={{ marginBottom: 8 }}>Different sizes</Text>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <Text key={size} size={size} isGhost ghostWidth="60%">{size}</Text>
          ))}
        </div>
      </div>
      <div>
        <Text size="xs" color="tertiary" style={{ marginBottom: 8 }}>Different widths</Text>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          <Text isGhost ghostWidth="100%">Full width</Text>
          <Text isGhost ghostWidth="75%">75% width</Text>
          <Text isGhost ghostWidth="50%">50% width</Text>
          <Text isGhost ghostWidth="200px">200px width</Text>
        </div>
      </div>
      <div>
        <Text size="xs" color="tertiary" style={{ marginBottom: 8 }}>Multi-line ghost</Text>
        <Text isGhost ghostWidth="100%" style={{ height: "4.5em" }}>
          Multi-line ghost placeholder that preserves multiple lines of height for paragraph skeleton loading.
        </Text>
      </div>
    </div>
  ),
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <style>{`
        .my-highlight { color: #e11d48; font-style: italic; text-decoration: underline; }
        .my-gradient-text { background: linear-gradient(90deg, #6366f1, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 2rem; font-weight: 800; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. Text as a plain wrapper.
      </p>
      <Text className="my-highlight">Highlighted with custom class</Text>
      <Text className="my-gradient-text">Gradient text via className</Text>
      <Text>No props at all (bare paragraph)</Text>
    </div>
  ),
};
