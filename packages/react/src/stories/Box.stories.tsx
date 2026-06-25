import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box } from "../components/Box/Box";
import { Text } from "../components/Text/Text";
import { Button } from "../components/Button/Button";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],

  argTypes: {
    as: { control: "text", description: "HTML element or component to render as", table: { category: "Polymorphic" } },
    p:  { control: "select", options: ["0","1","2","3","4","5","6","7","8","10","12","16"], description: "Padding (all sides)", table: { category: "Spacing" } },
    px: { control: "select", options: ["0","1","2","3","4","5","6","8","10","12","16"], description: "Padding (horizontal)", table: { category: "Spacing" } },
    py: { control: "select", options: ["0","1","2","3","4","5","6","8","10","12","16"], description: "Padding (vertical)",   table: { category: "Spacing" } },
    rounded: { control: "select", options: ["none","xs","sm","md","lg","xl","2xl","3xl","full"], description: "Border radius token", table: { category: "Appearance" } },
    shadow:  { control: "select", options: ["none","xs","sm","md","lg","xl","2xl","inner"],       description: "Box shadow token",   table: { category: "Appearance" } },
    display: { control: "select", options: ["block","inline","inline-block","flex","inline-flex","grid","none"], table: { category: "Layout" } },
    direction: { control: "select", options: ["row","column","row-reverse","column-reverse"], table: { category: "Layout" } },
    align:   { control: "select", options: ["flex-start","flex-end","center","stretch","baseline"], table: { category: "Layout" } },
    justify: { control: "select", options: ["flex-start","flex-end","center","space-between","space-around","space-evenly"], table: { category: "Layout" } },
    gap:     { control: "select", options: ["0","1","2","3","4","5","6","8","10","12","16"], table: { category: "Layout" } },
    bg:    { control: "text", description: "Background: CSS value, #hex, or token key", table: { category: "Appearance" } },
    color: { control: "text", description: "Text color: CSS value, #hex, or token key",  table: { category: "Appearance" } },
    isGhost: { control: "boolean", description: "Ghost/skeleton mode — renders Shimmer matching box dimensions", table: { category: "State" } },
  },

  args: {
    p: "4",
    rounded: "lg",
    shadow: "sm",
    bg: "var(--tui-color-bg-subtle)",
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

const Placeholder = ({ label, height = 48 }: { label: string; height?: number }) => (
  <div style={{ height, background: "var(--tui-color-brand-subtle)", borderRadius: "var(--tui-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-brand-default)", fontWeight: "var(--tui-font-weight-medium)" }}>
    {label}
  </div>
);

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => (
    <Box {...args}>
      <Text>Box content — adjust controls to explore spacing, radius, shadow and more.</Text>
    </Box>
  ),
};

// ── Surface / elevation ───────────────────────────────────────────────────
export const Elevation: Story = {
  name: "Elevation (Shadow)",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box display="flex" gap="6" style={{ flexWrap: "wrap" }}>
      {(["none","xs","sm","md","lg","xl","2xl"] as const).map((s) => (
        <Box key={s} p="6" rounded="lg" shadow={s} bg="var(--tui-color-surface-default)" style={{ minWidth: 120, textAlign: "center" }}>
          <Text size="sm" weight="medium">{s}</Text>
          <Text size="xs" color="tertiary">shadow-{s}</Text>
        </Box>
      ))}
    </Box>
  ),
};

// ── Border radius ─────────────────────────────────────────────────────────
export const BorderRadius: Story = {
  name: "Border Radius",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box display="flex" gap="4" style={{ flexWrap: "wrap", alignItems: "center" }}>
      {(["none","xs","sm","md","lg","xl","2xl","3xl","full"] as const).map((r) => (
        <Box key={r} p="4" rounded={r} bg="var(--tui-color-brand-subtle)" style={{ minWidth: 80, textAlign: "center" }}>
          <Text size="xs" weight="medium" color="link">{r}</Text>
        </Box>
      ))}
    </Box>
  ),
};

// ── Flex layout ───────────────────────────────────────────────────────────
export const FlexLayout: Story = {
  name: "Flex Layout",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box display="flex" direction="column" gap="4">
      <Text weight="semibold" size="sm" color="tertiary">Row / space-between</Text>
      <Box display="flex" justify="space-between" align="center" p="4" rounded="lg" bg="var(--tui-color-bg-subtle)" style={{ border: "1px solid var(--tui-color-border-default)" }}>
        <Placeholder label="Left" />
        <Placeholder label="Center" />
        <Placeholder label="Right" />
      </Box>

      <Text weight="semibold" size="sm" color="tertiary" style={{ marginTop: "var(--tui-spacing-4)" }}>Column / gap-3</Text>
      <Box display="flex" direction="column" gap="3" p="4" rounded="lg" bg="var(--tui-color-bg-subtle)" style={{ border: "1px solid var(--tui-color-border-default)" }}>
        <Placeholder label="Item 1" />
        <Placeholder label="Item 2" />
        <Placeholder label="Item 3" />
      </Box>
    </Box>
  ),
};

// ── Card pattern ──────────────────────────────────────────────────────────
export const CardPattern: Story = {
  name: "Card Pattern",
  parameters: { controls: { disable: true } },
  render: () => (
    <Box p="6" rounded="xl" shadow="md" bg="var(--tui-color-surface-default)" style={{ maxWidth: 360, border: "1px solid var(--tui-color-border-default)" }}>
      <Box display="flex" justify="space-between" align="center" pb="4" style={{ borderBottom: "1px solid var(--tui-color-border-default)", marginBottom: "var(--tui-spacing-4)" }}>
        <Text weight="semibold" size="lg">Card Title</Text>
        <Text size="xs" color="tertiary">Just now</Text>
      </Box>
      <Text color="secondary" size="sm" style={{ marginBottom: "var(--tui-spacing-4)", lineHeight: "var(--tui-leading-relaxed)" }}>
        This card is composed entirely using Box + Text with token-based spacing, shadow, and radius.
      </Text>
      <Box display="flex" gap="3" justify="flex-end">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </Box>
    </Box>
  ),
};

// ── Ghost / Skeleton ──────────────────────────────────────────────────────
export const GhostSkeleton: Story = {
  name: "Ghost / Skeleton",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-6)", flexWrap: "wrap" }}>
      <Box isGhost p="6" rounded="lg" style={{ width: 200, height: 120 }} />
      <Box isGhost p="4" rounded="md" style={{ width: 160, height: 80 }} />
      <Box isGhost p="8" rounded="xl" style={{ width: 240, height: 160 }} />
      <Box isGhost p="3" rounded="sm" style={{ width: 100, height: 100 }} />
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
        .my-card { background: linear-gradient(145deg, #1e293b, #334155); color: white; padding: 24px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .my-banner { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. Box as a plain wrapper.
      </p>
      <Box className="my-card">Dark gradient card via custom class</Box>
      <Box className="my-banner">Warning banner via custom class</Box>
      <Box>No props at all (bare div)</Box>
    </div>
  ),
};
