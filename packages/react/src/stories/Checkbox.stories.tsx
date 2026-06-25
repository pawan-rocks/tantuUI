import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Checkbox } from "../components/Checkbox/Checkbox";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Checkbox size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    label: {
      control: "text",
      description: "Label text",
      table: { category: "Content" },
    },
    labelPlacement: {
      control: "select",
      options: ["start", "end"],
      description: "Label position relative to checkbox",
      table: { category: "Layout", defaultValue: { summary: "end" } },
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate state (displays dash icon)",
      table: { category: "State" },
    },
    checked: {
      control: "boolean",
      description: "Checked state",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State" },
    },
    isInvalid: {
      control: "boolean",
      description: "Invalid/error state",
      table: { category: "State" },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger", "info", "white", "black"],
      description: "Color intent / semantic meaning",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode — renders Shimmer",
      table: { category: "State" },
    },
    onChange: { action: "changed" },
  },

  args: {
    size: "md",
    label: "Accept terms",
    labelPlacement: "end",
    indeterminate: false,
    checked: false,
    disabled: false,
    isInvalid: false,
    isGhost: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => {
    const SizesDemo = () => {
      const [checked, setChecked] = useState<Record<string, boolean>>({});
      return (
        <div style={{ display: "flex", gap: "var(--tui-spacing-4)", flexWrap: "wrap", alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <Checkbox
              key={size}
              size={size}
              label={size.toUpperCase()}
              checked={checked[size] ?? false}
              onChange={(e) => setChecked((prev) => ({ ...prev, [size]: e.target.checked }))}
            />
          ))}
        </div>
      );
    };
    return <SizesDemo />;
  },
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      {(["default", "primary", "secondary", "success", "warning", "danger", "info", "white", "black"] as const).map((intent) => (
        <Checkbox key={intent} intent={intent} label={intent.charAt(0).toUpperCase() + intent.slice(1)} checked={false} onChange={() => {}} />
      ))}
    </div>
  ),
};



// ── With Label ────────────────────────────────────────────────────────────
export const WithLabel: Story = {
  name: "WithLabel",
  parameters: { controls: { disable: true } },
  render: () => {
    const WithLabelDemo = () => {
      const [checked, setChecked] = useState<Record<string, boolean>>({});
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          <Checkbox
            label="I agree to the terms and conditions"
            checked={checked["terms"] ?? false}
            onChange={(e) => setChecked((prev) => ({ ...prev, terms: e.target.checked }))}
          />
          <Checkbox
            label="Subscribe to newsletter"
            checked={checked["newsletter"] ?? false}
            onChange={(e) => setChecked((prev) => ({ ...prev, newsletter: e.target.checked }))}
          />
          <Checkbox
            label="Remember me"
            checked={checked["remember"] ?? false}
            onChange={(e) => setChecked((prev) => ({ ...prev, remember: e.target.checked }))}
          />
        </div>
      );
    };
    return <WithLabelDemo />;
  },
};

// ── Label Placement ───────────────────────────────────────────────────────
export const LabelPlacement: Story = {
  name: "LabelPlacement",
  parameters: { controls: { disable: true } },
  render: () => {
    const LabelPlacementDemo = () => {
      const [checked, setChecked] = useState<Record<string, boolean>>({});
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          <Checkbox
            label="Label at end (default)"
            labelPlacement="end"
            checked={checked["end"] ?? false}
            onChange={(e) => setChecked((prev) => ({ ...prev, end: e.target.checked }))}
          />
          <Checkbox
            label="Label at start"
            labelPlacement="start"
            checked={checked["start"] ?? false}
            onChange={(e) => setChecked((prev) => ({ ...prev, start: e.target.checked }))}
          />
        </div>
      );
    };
    return <LabelPlacementDemo />;
  },
};

// ── Indeterminate ─────────────────────────────────────────────────────────
export const Indeterminate: Story = {
  name: "Indeterminate",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-4)", alignItems: "center" }}>
      <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked={true} onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate checked={false} onChange={() => {}} />
    </div>
  ),
};

// ── All States ────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "success", "warning", "danger", "info", "white", "black"] as const;
    const states = ["base", "checked", "hover", "disabled", "ghost"] as const;
    return (
      <div style={{ overflowX: "auto" }}>
        <style>{`
          .tui-force-hover .tui-checkbox__indicator { border-color: var(--tui-color-neutral-500); }
          .tui-force-hover .tui-checkbox--primary .tui-checkbox__indicator { border-color: var(--tui-color-primary-600); }
          .tui-force-hover .tui-checkbox--secondary .tui-checkbox__indicator { border-color: var(--tui-color-secondary-400); }
          .tui-force-hover .tui-checkbox--success .tui-checkbox__indicator { border-color: var(--tui-color-success-600); }
          .tui-force-hover .tui-checkbox--warning .tui-checkbox__indicator { border-color: var(--tui-color-warning-600); }
          .tui-force-hover .tui-checkbox--danger .tui-checkbox__indicator { border-color: var(--tui-color-danger-600); }
          .tui-force-hover .tui-checkbox--info .tui-checkbox__indicator { border-color: var(--tui-color-info-600); }
          .tui-force-hover .tui-checkbox--white .tui-checkbox__indicator { border-color: var(--tui-color-neutral-300); }
          .tui-force-hover .tui-checkbox--black .tui-checkbox__indicator { border-color: var(--tui-color-neutral-900); }
          .tui-force-focus .tui-checkbox__indicator { box-shadow: 0 0 0 0.5px var(--tui-color-focus-ring-gap), 0 0 1px 2px var(--tui-ring-color, var(--tui-color-focus-ring)); }
        `}</style>
        <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed", minWidth: "900px", fontFamily: "var(--tui-font-family-sans)" }}>
          <thead>
            <tr>
              <th style={{ width: "100px", padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "left", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>intent</th>
              {states.map((s) => (
                <th key={s} style={{ width: "150px", padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", textTransform: "capitalize" }}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intents.map((intent) => (
              <tr key={intent}>
                <td style={{ padding: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: 500 }}>{intent}</td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Checkbox intent={intent} checked={false} onChange={() => {}} /></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Checkbox intent={intent} checked={true} onChange={() => {}} /></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><div className="tui-force-hover"><Checkbox intent={intent} checked={false} onChange={() => {}} /></div></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Checkbox intent={intent} disabled checked={true} onChange={() => {}} /></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Checkbox intent={intent} isGhost /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 400 }}>
      <style>{`
        .my-round-checkbox .tui-checkbox__indicator {
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
        }
        .my-large-checkbox {
          transform: scale(1.5);
          transform-origin: left center;
        }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI checkbox as a plain wrapper.
      </p>
      <Checkbox className="my-round-checkbox" label="Round gradient indicator" checked={true} onChange={() => {}} />
      <Checkbox className="my-large-checkbox" label="Scaled up checkbox" checked={false} onChange={() => {}} />
    </div>
  ),
};
