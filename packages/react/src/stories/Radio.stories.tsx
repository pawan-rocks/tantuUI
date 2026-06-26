import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Radio } from "../components/Radio/Radio";
import { RadioGroup } from "../components/Radio/RadioGroup";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Radio size scale",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    label: {
      control: "text",
      description: "Label text displayed next to the radio",
      table: { category: "Content" },
    },
    value: {
      control: "text",
      description: "Radio value (required)",
      table: { category: "Content" },
    },
    isInvalid: {
      control: "boolean",
      description: "Invalid/error state",
      table: { category: "State" },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent / semantic meaning",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode — renders Shimmer",
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
    value: "option-1",
    label: "Option 1",
    isInvalid: false,
    isGhost: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const PlaygroundDemo = () => {
      const [selected, setSelected] = useState("apple");
      return (
        <RadioGroup name="playground" value={selected} onChange={setSelected} size={args.size} disabled={args.disabled}>
          <Radio value="apple" label="Apple" intent={args.intent} isInvalid={args.isInvalid} isGhost={args.isGhost} />
          <Radio value="banana" label="Banana" intent={args.intent} isInvalid={args.isInvalid} isGhost={args.isGhost} />
          <Radio value="cherry" label="Cherry" intent={args.intent} isInvalid={args.isInvalid} isGhost={args.isGhost} />
        </RadioGroup>
      );
    };
    return <PlaygroundDemo />;
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-4)", flexWrap: "wrap", alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <RadioGroup key={size} name={`sizes-${size}`} value="selected" size={size}>
          <Radio value="selected" label={size.toUpperCase()} />
        </RadioGroup>
      ))}
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      {(["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
        <RadioGroup key={intent} name={`intent-${intent}`} value="a">
          <Radio value="a" intent={intent} label={`${intent.charAt(0).toUpperCase() + intent.slice(1)} (selected)`} />
          <Radio value="b" intent={intent} label={`${intent.charAt(0).toUpperCase() + intent.slice(1)} (unselected)`} />
        </RadioGroup>
      ))}
    </div>
  ),
};



// ── Horizontal ────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  name: "Horizontal",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState("red");
    return (
      <RadioGroup
        name="horizontal"
        value={selected}
        onChange={setSelected}
        orientation="horizontal"
      >
        <Radio value="red" label="Red" />
        <Radio value="green" label="Green" />
        <Radio value="blue" label="Blue" />
      </RadioGroup>
    );
  },
};

// ── With Labels ───────────────────────────────────────────────────────────
export const WithLabels: Story = {
  name: "WithLabels",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState("standard");
    return (
      <RadioGroup name="with-labels" value={selected} onChange={setSelected}>
        <Radio value="standard" label="Standard shipping (5-7 days)" />
        <Radio value="express" label="Express shipping (2-3 days)" />
        <Radio value="overnight" label="Overnight shipping (next day)" />
      </RadioGroup>
    );
  },
};

// ── All States ────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    const states = ["base", "selected", "hover", "disabled", "ghost"] as const;
    return (
      <div style={{ overflowX: "auto" }}>
        <style>{`
          .tui-force-hover .tui-radio__indicator { border-color: var(--tui-color-brand-black-500); }
          .tui-force-hover .tui-radio--primary .tui-radio__indicator { border-color: var(--tui-color-brand-pink-600); }
          .tui-force-hover .tui-radio--success .tui-radio__indicator { border-color: var(--tui-color-success-600); }
          .tui-force-hover .tui-radio--warning .tui-radio__indicator { border-color: var(--tui-color-warning-600); }
          .tui-force-hover .tui-radio--danger .tui-radio__indicator { border-color: var(--tui-color-danger-600); }
          .tui-force-hover .tui-radio--info .tui-radio__indicator { border-color: var(--tui-color-info-600); }
          .tui-force-hover .tui-radio--white .tui-radio__indicator { border-color: var(--tui-color-brand-black-300); }
          .tui-force-hover .tui-radio--black .tui-radio__indicator { border-color: var(--tui-color-brand-black-900); }
          .tui-force-focus .tui-radio__indicator { box-shadow: 0 0 0 0.5px var(--tui-color-focus-ring-gap), 0 0 1px 2px var(--tui-ring-color, var(--tui-color-focus-ring)); }
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
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Radio value="off" intent={intent} checked={false} onChange={() => {}} /></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Radio value="on" intent={intent} checked={true} onChange={() => {}} /></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><div className="tui-force-hover"><Radio value="hov" intent={intent} checked={false} onChange={() => {}} /></div></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Radio value="dis" intent={intent} disabled checked={true} onChange={() => {}} /></td>
                <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Radio value="ghost" intent={intent} isGhost /></td>
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
        .my-custom-radio { border: 2px solid #667eea; padding: 8px 12px; border-radius: 8px; }
        .my-custom-group { background: #f8f9fa; padding: 16px; border-radius: 12px; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + children. TantuUI Radio as a plain wrapper.
      </p>
      <RadioGroup name="custom" className="my-custom-group">
        <Radio value="custom-1" label="Custom styled radio" className="my-custom-radio" />
        <Radio value="custom-2" label="Another custom radio" className="my-custom-radio" />
      </RadioGroup>
    </div>
  ),
};
