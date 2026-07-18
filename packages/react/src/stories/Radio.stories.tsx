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
    type: {
      control: "select",
      options: [undefined, "box"],
      description: "Display type: default inline or box card style",
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "Label text displayed next to the radio",
      table: { category: "Content" },
    },
    title: {
      control: "text",
      description: "Title text (primary label, shown above subtitle)",
      table: { category: "Content" },
    },
    subtitle: {
      control: "text",
      description: "Subtitle / description text below title",
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
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
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
    textColorAsIntent: {
      control: "boolean",
      description: "Color the label/title/subtitle text according to the intent color",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
  },

  args: {
    size: "md",
    value: "option-1",
    label: "Option 1",
    isInvalid: false,
    isGhost: false,
    disabled: false,
    textColorAsIntent: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [selected, setSelected] = useState("apple");
    return (
      <RadioGroup name="playground" value={selected} onChange={setSelected} size={args.size} disabled={args.disabled}>
        <Radio value="apple" label="Apple" intent={args.intent} isInvalid={args.isInvalid} isGhost={args.isGhost} textColorAsIntent={args.textColorAsIntent} />
        <Radio value="banana" label="Banana" intent={args.intent} isInvalid={args.isInvalid} isGhost={args.isGhost} textColorAsIntent={args.textColorAsIntent} />
        <Radio value="cherry" label="Cherry" intent={args.intent} isInvalid={args.isInvalid} isGhost={args.isGhost} textColorAsIntent={args.textColorAsIntent} />
      </RadioGroup>
    );
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
      {(["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
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
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
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

// ── Title & Subtitle ──────────────────────────────────────────────────────
export const TitleAndSubtitle: Story = {
  name: "Title & Subtitle",
  parameters: { controls: { disable: true } },
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState("standard");
      return (
        <RadioGroup name="title-sub" value={selected} onChange={setSelected}>
          <Radio
            value="standard"
            title="Standard shipping"
            subtitle="Delivered in 5-7 business days"
          />
          <Radio
            value="express"
            title="Express shipping"
            subtitle="Delivered in 2-3 business days"
          />
          <Radio
            value="overnight"
            title="Overnight shipping"
            subtitle="Delivered next business day"
          />
          <Radio
            value="disabled"
            title="Same-day delivery"
            subtitle="Not available in your area"
            disabled
          />
        </RadioGroup>
      );
    };
    return <Demo />;
  },
};

// ── Box Type ──────────────────────────────────────────────────────────────
export const BoxType: Story = {
  name: "Box Card Type",
  parameters: { controls: { disable: true } },
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState("starter");
      return (
        <RadioGroup name="box-type" value={selected} onChange={setSelected}>
          <Radio
            type="box"
            value="starter"
            title="Starter plan"
            subtitle="For individuals and small projects"
          />
          <Radio
            type="box"
            value="pro"
            title="Pro plan"
            subtitle="For teams with advanced features"
          />
          <Radio
            type="box"
            value="enterprise"
            title="Enterprise plan"
            subtitle="Custom solutions for large organizations"
          />
          <Radio
            type="box"
            value="disabled"
            title="Legacy plan"
            subtitle="No longer available for new users"
            disabled
          />
        </RadioGroup>
      );
    };
    return <Demo />;
  },
};

// ── Box Type with Intents ─────────────────────────────────────────────────
export const BoxTypeIntents: Story = {
  name: "Box Card Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState("primary");
      const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal"] as const;
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "var(--tui-spacing-3)" }}>
          {intents.map((intent) => (
            <Radio
              key={intent}
              type="box"
              intent={intent}
              name="box-intents"
              value={intent}
              title={intent.charAt(0).toUpperCase() + intent.slice(1)}
              subtitle={`Box card with ${intent} intent`}
              checked={selected === intent}
              onChange={() => setSelected(intent)}
            />
          ))}
        </div>
      );
    };
    return <Demo />;
  },
};

// ── Box States ────────────────────────────────────────────────────────────
export const BoxStates: Story = {
  name: "Box Card States",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal"] as const;
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "800px", fontFamily: "var(--tui-font-family-sans)" }}>
          <thead>
            <tr>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "left", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>Intent</th>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>Unchecked</th>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>Checked</th>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>Disabled</th>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>Disabled Checked</th>
              <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>Ghost</th>
            </tr>
          </thead>
          <tbody>
            {intents.map((intent) => (
              <tr key={intent}>
                <td style={{ padding: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: 500 }}>{intent}</td>
                <td style={{ padding: "var(--tui-spacing-2)" }}>
                  <Radio type="box" intent={intent} name={`box-${intent}-off`} value="off" title={intent} subtitle="Unselected" checked={false} onChange={() => {}} />
                </td>
                <td style={{ padding: "var(--tui-spacing-2)" }}>
                  <Radio type="box" intent={intent} name={`box-${intent}-on`} value="on" title={intent} subtitle="Selected" checked={true} onChange={() => {}} />
                </td>
                <td style={{ padding: "var(--tui-spacing-2)" }}>
                  <Radio type="box" intent={intent} name={`box-${intent}-dis`} value="dis" title={intent} subtitle="Disabled" disabled checked={false} onChange={() => {}} />
                </td>
                <td style={{ padding: "var(--tui-spacing-2)" }}>
                  <Radio type="box" intent={intent} name={`box-${intent}-dis-on`} value="dis-on" title={intent} subtitle="Disabled checked" disabled checked={true} onChange={() => {}} />
                </td>
                <td style={{ padding: "var(--tui-spacing-2)" }}>
                  <Radio type="box" intent={intent} name={`box-${intent}-ghost`} value="ghost" title={intent} subtitle="Ghost" isGhost />
                </td>
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

// ── Text Color As Intent ──────────────────────────────────────────────────
/**
 * When `textColorAsIntent` is true, the label/title/subtitle text color
 * matches the intent color.
 */
export const TextColorAsIntent: Story = {
  name: "Text Color As Intent",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
      <Radio intent="primary" textColorAsIntent checked value="p" label="Primary colored text" onChange={() => {}} />
      <Radio intent="secondary" textColorAsIntent value="s" label="Secondary colored text" onChange={() => {}} />
      <Radio intent="tertiary" textColorAsIntent value="t" label="Tertiary colored text" onChange={() => {}} />
      <Radio intent="success" textColorAsIntent checked value="su" label="Success colored text" onChange={() => {}} />
      <Radio intent="danger" textColorAsIntent value="d" label="Danger colored text" onChange={() => {}} />
      <Radio intent="primary" textColorAsIntent checked value="pt" title="Primary Title" subtitle="Subtitle in intent color too" onChange={() => {}} />
    </div>
  ),
};
