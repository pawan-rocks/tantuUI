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
    const states = ["base (off)", "base (on)", "hover", "disabled", "ghost"] as const;
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed", minWidth: "800px", fontFamily: "var(--tui-font-family-sans)" }}>
          <thead>
            <tr>
              {states.map((s) => (
                <th key={s} style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", textAlign: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", textTransform: "capitalize" }}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "var(--tui-spacing-3)", textAlign: "center" }}><Switch checked={false} onChange={() => {}} /></td>
              <td style={{ padding: "var(--tui-spacing-3)", textAlign: "center" }}><Switch checked={true} onChange={() => {}} /></td>
              <td style={{ padding: "var(--tui-spacing-3)", textAlign: "center" }}><Switch checked={false} onChange={() => {}} label="Hover me" /></td>
              <td style={{ padding: "var(--tui-spacing-3)", textAlign: "center" }}><Switch disabled checked={true} /></td>
              <td style={{ padding: "var(--tui-spacing-3)", textAlign: "center" }}><Switch isGhost /></td>
            </tr>
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
