import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Select } from "../components/Select/Select";

// ── Helper: example options ───────────────────────────────────────────────
const ExampleOptions = () => (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
    <option value="date">Date</option>
    <option value="elderberry">Elderberry</option>
  </>
);

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size scale",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    variant: {
      control: "select",
      options: ["outline", "soft", "plain"],
      description: "Visual variant",
      table: { category: "Appearance", defaultValue: { summary: "outline" } },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent / semantic meaning",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder shown as first disabled option",
      table: { category: "Content" },
    },
    isInvalid: {
      control: "boolean",
      description: "Invalid/error state",
      table: { category: "State" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode — renders Shimmer matching select dimensions",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State" },
    },
  },

  args: {
    size: "md",
    variant: "outline",
    intent: "default",
    placeholder: "",
    isInvalid: false,
    isGhost: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { placeholder: "Choose a fruit…" },
  render: (args) => (
    <Select {...args}>
      <ExampleOptions />
    </Select>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Select key={size} size={size} placeholder={size.toUpperCase()}>
          <ExampleOptions />
        </Select>
      ))}
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      {(["outline", "soft", "plain"] as const).map((variant) => (
        <Select key={variant} variant={variant} placeholder={variant}>
          <ExampleOptions />
        </Select>
      ))}
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
      {(["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
        <Select key={intent} intent={intent} placeholder={intent.charAt(0).toUpperCase() + intent.slice(1)}>
          <ExampleOptions />
        </Select>
      ))}
    </div>
  ),
};

// ── With Placeholder ──────────────────────────────────────────────────────
export const WithPlaceholder: Story = {
  name: "WithPlaceholder",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
      <Select placeholder="Select a fruit…">
        <ExampleOptions />
      </Select>
      <Select placeholder="Pick a size…" size="lg">
        <ExampleOptions />
      </Select>
    </div>
  ),
};

// ── All States ────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    const variants = ["outline", "soft", "plain"] as const;
    const states = ["base", "hover", "focused", "disabled", "ghost"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-6)" }}>
        <style>{`
          .tui-force-hover .tui-select--outline { border-color: var(--tui-color-brand-black-400); }
          .tui-force-hover .tui-select--soft { border-color: var(--tui-color-brand-black-200); }
          .tui-force-hover .tui-select--plain { border-color: var(--tui-color-brand-black-100); }
          .tui-force-hover .tui-select--primary.tui-select--outline { border-color: var(--tui-color-brand-pink-600); }
          .tui-force-hover .tui-select--success.tui-select--outline { border-color: var(--tui-color-success-600); }
          .tui-force-hover .tui-select--warning.tui-select--outline { border-color: var(--tui-color-warning-600); }
          .tui-force-hover .tui-select--danger.tui-select--outline { border-color: var(--tui-color-danger-600); }
          .tui-force-hover .tui-select--info.tui-select--outline { border-color: var(--tui-color-info-600); }
          .tui-force-hover .tui-select--white.tui-select--outline { border-color: var(--tui-color-brand-black-300); }
          .tui-force-hover .tui-select--black.tui-select--outline { border-color: var(--tui-color-brand-black-900); }
          .tui-force-focus .tui-select { box-shadow: 0 0 0 0.5px var(--tui-color-focus-ring-gap), 0 0 1px 2px var(--tui-ring-color, var(--tui-color-focus-ring)); }
          .tui-force-focus .tui-select--primary { --tui-ring-color: var(--tui-color-brand-pink-400); }
          .tui-force-focus .tui-select--success { --tui-ring-color: var(--tui-color-success-400); }
          .tui-force-focus .tui-select--warning { --tui-ring-color: var(--tui-color-warning-400); }
          .tui-force-focus .tui-select--danger { --tui-ring-color: var(--tui-color-danger-400); }
          .tui-force-focus .tui-select--info { --tui-ring-color: var(--tui-color-info-400); }
          .tui-force-focus .tui-select--white { --tui-ring-color: var(--tui-color-brand-black-300); }
          .tui-force-focus .tui-select--black { --tui-ring-color: var(--tui-color-brand-black-600); }
        `}</style>
        {variants.map((variant) => (
          <div key={variant}>
            <h3 style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: 600, marginBottom: "var(--tui-spacing-2)", color: "var(--tui-color-text-primary)", textTransform: "capitalize" }}>
              variant: {variant}
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed", minWidth: "1200px", fontFamily: "var(--tui-font-family-sans)" }}>
                <thead>
                  <tr>
                    <th style={{ width: "100px", padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "left", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>intent</th>
                    {states.map((s) => (
                      <th key={s} style={{ width: "200px", padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", textTransform: "capitalize" }}>{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {intents.map((intent) => (
                    <tr key={intent}>
                      <td style={{ padding: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: 500 }}>{intent}</td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Select intent={intent} variant={variant} placeholder={intent} size="sm"><ExampleOptions /></Select></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><div className="tui-force-hover"><Select intent={intent} variant={variant} placeholder={intent} size="sm"><ExampleOptions /></Select></div></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><div className="tui-force-focus"><Select intent={intent} variant={variant} placeholder={intent} size="sm"><ExampleOptions /></Select></div></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Select intent={intent} variant={variant} placeholder={intent} size="sm" disabled><ExampleOptions /></Select></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Select intent={intent} variant={variant} isGhost size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 300 }}>
      <style>{`
        .my-custom-select { border: 2px solid #667eea; border-radius: 12px; background: linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%); }
        .my-rounded-select { border-radius: 9999px; background: #1a1a1a; }
        .my-rounded-select select { color: #fafafa; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI select as a plain wrapper.
      </p>
      <Select className="my-custom-select">
        <ExampleOptions />
      </Select>
      <Select className="my-rounded-select">
        <ExampleOptions />
      </Select>
    </div>
  ),
};
