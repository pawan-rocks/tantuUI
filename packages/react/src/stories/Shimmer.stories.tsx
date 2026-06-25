import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Shimmer } from "../components/Shimmer/Shimmer";
import { Button } from "../components/Button/Button";
import { Text } from "../components/Text/Text";
import { Box } from "../components/Box/Box";

const meta: Meta<typeof Shimmer> = {
  title: "Components/Shimmer",
  component: Shimmer,
  tags: ["autodocs"],

  argTypes: {
    width: {
      control: "text",
      description: "Width — any CSS value (\"100%\", \"200px\", \"8rem\")",
      table: { category: "Dimensions" },
    },
    height: {
      control: "text",
      description: "Height — any CSS value (\"40px\", \"2rem\")",
      table: { category: "Dimensions" },
    },
    shape: {
      control: "select",
      options: ["rounded", "pill", "circle"],
      description: "Border radius shortcut",
      table: { category: "Appearance" },
    },
  },

  args: {
    width: "200px",
    height: "40px",
    shape: "rounded",
  },
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
};

// ── Shapes ────────────────────────────────────────────────────────────────
export const Shapes: Story = {
  name: "Shapes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-6)", flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
        <Shimmer width="120px" height="40px" shape="rounded" />
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>rounded</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
        <Shimmer width="120px" height="40px" shape="pill" />
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>pill</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
        <Shimmer width="48px" height="48px" shape="circle" />
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>circle</span>
      </div>
    </div>
  ),
};

// ── Skeleton Card ─────────────────────────────────────────────────────────
export const SkeletonCard: Story = {
  name: "Skeleton Card",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box
      p="6"
      rounded="xl"
      shadow="md"
      bg="var(--tui-color-surface-default)"
      style={{ maxWidth: 360, border: "1px solid var(--tui-color-border-default)" }}
    >
      {/* Header */}
      <Box display="flex" gap="3" align="center" style={{ marginBottom: "var(--tui-spacing-4)" }}>
        <Shimmer width="40px" height="40px" shape="circle" />
        <Box display="flex" direction="column" gap="2" style={{ flex: 1 }}>
          <Text isGhost ghostWidth="60%" size="sm">Name</Text>
          <Text isGhost ghostWidth="40%" size="xs">Subtitle</Text>
        </Box>
      </Box>

      {/* Body */}
      <Box display="flex" direction="column" gap="2" style={{ marginBottom: "var(--tui-spacing-5)" }}>
        <Text isGhost ghostWidth="100%" size="sm">Line 1</Text>
        <Text isGhost ghostWidth="100%" size="sm">Line 2</Text>
        <Text isGhost ghostWidth="75%" size="sm">Line 3</Text>
      </Box>

      {/* Image placeholder */}
      <Box isGhost rounded="lg" style={{ width: "100%", height: 160, marginBottom: "var(--tui-spacing-5)" }} />

      {/* Actions */}
      <Box display="flex" gap="3" justify="flex-end">
        <Button isGhost size="sm">Cancel</Button>
        <Button isGhost size="sm">Confirm</Button>
      </Box>
    </Box>
  ),
};
