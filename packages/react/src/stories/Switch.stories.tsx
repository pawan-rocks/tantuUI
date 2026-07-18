import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Switch } from "../components/Switch/Switch";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Switch size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent / semantic meaning",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    trackColor: {
      control: "select",
      options: ["intentBased", "gray"],
      description: "Unchecked track color: intentBased uses light tint of the intent, gray uses neutral",
      table: { category: "Appearance", defaultValue: { summary: "intentBased" } },
    },
    checked: {
      control: "boolean",
      description: "Checked (on) state",
      table: { category: "State" },
    },
    label: {
      control: "text",
      description: "Label text displayed alongside the switch",
      table: { category: "Content" },
    },
    labelPlacement: {
      control: "select",
      options: ["start", "end"],
      description: "Position of the label relative to the switch",
      table: { category: "Layout", defaultValue: { summary: "end" } },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode — renders Shimmer matching switch dimensions",
      table: { category: "State" },
    },
    onChange: { action: "changed" },
  },

  args: {
    size: "md",
    intent: "default",
    trackColor: "intentBased",
    checked: false,
    label: "",
    labelPlacement: "end",
    disabled: false,
    isGhost: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(val) => {
          setChecked(val);
          args.onChange?.(val);
        }}
      />
    );
  },
  args: {
    label: "Enable notifications",
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    return (
      <div style={{ display: "flex", gap: "var(--tui-spacing-4)", flexWrap: "wrap", alignItems: "center" }}>
        {sizes.map((size) => {
          const SwitchItem = () => {
            const [checked, setChecked] = useState(false);
            return <Switch key={size} size={size} checked={checked} onChange={setChecked} label={size.toUpperCase()} />;
          };
          return <SwitchItem key={size} />;
        })}
      </div>
    );
  },
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {intents.map((intent) => {
          const IntentItem = () => {
            const [checked, setChecked] = useState(true);
            return (
              <Switch
                key={intent}
                intent={intent}
                checked={checked}
                onChange={setChecked}
                label={intent.charAt(0).toUpperCase() + intent.slice(1)}
              />
            );
          };
          return <IntentItem key={intent} />;
        })}
      </div>
    );
  },
};

// ── With Label ────────────────────────────────────────────────────────────
export const WithLabel: Story = {
  name: "WithLabel",
  parameters: { controls: { disable: true } },
  render: () => {
    const WithLabelExample = () => {
      const [darkMode, setDarkMode] = useState(false);
      const [notifications, setNotifications] = useState(true);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
          <Switch checked={darkMode} onChange={setDarkMode} label="Dark mode" />
          <Switch checked={notifications} onChange={setNotifications} label="Push notifications" />
          <Switch label="No handler (static)" />
        </div>
      );
    };
    return <WithLabelExample />;
  },
};

// ── Label Placement ───────────────────────────────────────────────────────
export const LabelPlacement: Story = {
  name: "LabelPlacement",
  parameters: { controls: { disable: true } },
  render: () => {
    const LabelPlacementExample = () => {
      const [startChecked, setStartChecked] = useState(true);
      const [endChecked, setEndChecked] = useState(false);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
          <Switch checked={startChecked} onChange={setStartChecked} label="Label at start" labelPlacement="start" />
          <Switch checked={endChecked} onChange={setEndChecked} label="Label at end (default)" labelPlacement="end" />
        </div>
      );
    };
    return <LabelPlacementExample />;
  },
};

// ── All States ────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: "All States",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    const states = ["off", "on", "disabled (off)", "disabled (on)", "ghost"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
        {/* Intent-based track */}
        <div>
          <h3 style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
            trackColor = "intentBased" (default)
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "700px", fontFamily: "var(--tui-font-family-sans)" }}>
              <thead>
                <tr>
                  <th style={{ width: "80px", padding: "var(--tui-spacing-2)", textAlign: "left", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>intent</th>
                  {states.map((s) => (
                    <th key={s} style={{ padding: "var(--tui-spacing-2)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", textTransform: "capitalize" }}>{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {intents.map((intent) => (
                  <tr key={intent}>
                    <td style={{ padding: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: 500 }}>{intent}</td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} checked={false} onChange={() => {}} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} checked={true} onChange={() => {}} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} disabled checked={false} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} disabled checked={true} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} isGhost /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gray track */}
        <div>
          <h3 style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
            trackColor = "gray"
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "700px", fontFamily: "var(--tui-font-family-sans)" }}>
              <thead>
                <tr>
                  <th style={{ width: "80px", padding: "var(--tui-spacing-2)", textAlign: "left", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>intent</th>
                  {states.map((s) => (
                    <th key={s} style={{ padding: "var(--tui-spacing-2)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", textTransform: "capitalize" }}>{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {intents.map((intent) => (
                  <tr key={intent}>
                    <td style={{ padding: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontWeight: 500 }}>{intent}</td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} trackColor="gray" checked={false} onChange={() => {}} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} trackColor="gray" checked={true} onChange={() => {}} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} trackColor="gray" disabled checked={false} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} trackColor="gray" disabled checked={true} /></td>
                    <td style={{ padding: "var(--tui-spacing-2)", textAlign: "center" }}><Switch intent={intent} trackColor="gray" isGhost /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const CustomExample = () => {
      const [checked, setChecked] = useState(false);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 400 }}>
          <style>{`
            .my-custom-switch { border: 2px solid hotpink; border-radius: 9999px; }
          `}</style>
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
            Zero design props — only className. TantuUI Switch as a plain wrapper.
          </p>
          <Switch className="my-custom-switch" checked={checked} onChange={setChecked} />
          <Switch>No props at all (defaults apply)</Switch>
        </div>
      );
    };
    return <CustomExample />;
  },
};
