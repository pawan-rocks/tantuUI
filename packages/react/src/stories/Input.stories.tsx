import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Input } from "../components/Input/Input";

// ── Icon helpers ──────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 3.5L7 8l5.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 7s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
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
      description: "Placeholder text",
      table: { category: "Content" },
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when value is non-empty",
      table: { category: "Behavior" },
    },
    isInvalid: {
      control: "boolean",
      description: "Invalid/error state",
      table: { category: "State" },
    },
    isGhost: {
      control: "boolean",
      description: "Ghost/skeleton mode",
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
    placeholder: "Enter text…",
    clearable: false,
    isInvalid: false,
    isGhost: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { placeholder: "Type something…" },
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "250px" }}>
      <Input {...args} />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 200px)", gap: "var(--tui-spacing-3)", alignItems: "start" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Input key={size} size={size} placeholder={`Size: ${size}`} />
      ))}
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 200px)", gap: "var(--tui-spacing-3)", alignItems: "start" }}>
      <Input variant="outline" placeholder="Outline (default)" />
      <Input variant="soft" placeholder="Soft" />
      <Input variant="plain" placeholder="Plain" />
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 200px)", gap: "var(--tui-spacing-3)", alignItems: "start" }}>
      {(["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
        <Input key={intent} intent={intent} placeholder={intent.charAt(0).toUpperCase() + intent.slice(1)} />
      ))}
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 200px)", gap: "var(--tui-spacing-3)", alignItems: "start" }}>
      <Input leadingIcon={<SearchIcon />} placeholder="Search…" />
      <Input trailingIcon={<EyeIcon />} placeholder="Password" type="password" />
      <Input leadingIcon={<MailIcon />} trailingIcon={<EyeIcon />} placeholder="Both icons" />
    </div>
  ),
};

// ── Prefix & Suffix ──────────────────────────────────────────────────────
export const PrefixSuffix: Story = {
  name: "Prefix & Suffix",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 200px)", gap: "var(--tui-spacing-3)", alignItems: "start" }}>
      <Input prefix="$" placeholder="Amount" />
      <Input suffix="USD" placeholder="Price" />
      <Input prefix="https://" suffix=".com" placeholder="domain" />
    </div>
  ),
};

// ── Clearable ─────────────────────────────────────────────────────────────
const ClearableDemo = () => {
  const [value, setValue] = useState("Hello, world!");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 200px)", gap: "var(--tui-spacing-3)", alignItems: "start" }}>
      <Input
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        placeholder="Type and clear…"
      />
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Current value: "{value}"
      </p>
    </div>
  );
};

export const Clearable: Story = {
  name: "Clearable",
  parameters: { controls: { disable: true } },
  render: () => <ClearableDemo />,
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
          .tui-force-hover .tui-input--outline { border-color: var(--tui-color-brand-black-400); }
          .tui-force-hover .tui-input--soft { border-color: var(--tui-color-brand-black-200); }
          .tui-force-hover .tui-input--plain { border-color: var(--tui-color-brand-black-100); }
          .tui-force-hover .tui-input--primary.tui-input--outline { border-color: var(--tui-color-brand-pink-600); }
          .tui-force-hover .tui-input--primary.tui-input--soft { border-color: var(--tui-color-brand-pink-300); }
          .tui-force-hover .tui-input--primary.tui-input--plain { border-color: var(--tui-color-brand-pink-100); }
          .tui-force-hover .tui-input--success.tui-input--outline { border-color: var(--tui-color-success-600); }
          .tui-force-hover .tui-input--success.tui-input--soft { border-color: var(--tui-color-success-300); }
          .tui-force-hover .tui-input--success.tui-input--plain { border-color: var(--tui-color-success-100); }
          .tui-force-hover .tui-input--warning.tui-input--outline { border-color: var(--tui-color-warning-600); }
          .tui-force-hover .tui-input--warning.tui-input--soft { border-color: var(--tui-color-warning-300); }
          .tui-force-hover .tui-input--warning.tui-input--plain { border-color: var(--tui-color-warning-100); }
          .tui-force-hover .tui-input--danger.tui-input--outline { border-color: var(--tui-color-danger-600); }
          .tui-force-hover .tui-input--danger.tui-input--soft { border-color: var(--tui-color-danger-300); }
          .tui-force-hover .tui-input--danger.tui-input--plain { border-color: var(--tui-color-danger-100); }
          .tui-force-hover .tui-input--info.tui-input--outline { border-color: var(--tui-color-info-600); }
          .tui-force-hover .tui-input--info.tui-input--soft { border-color: var(--tui-color-info-300); }
          .tui-force-hover .tui-input--info.tui-input--plain { border-color: var(--tui-color-info-100); }
          .tui-force-hover .tui-input--white.tui-input--outline { border-color: var(--tui-color-brand-black-300); }
          .tui-force-hover .tui-input--white.tui-input--soft { border-color: var(--tui-color-brand-black-200); }
          .tui-force-hover .tui-input--white.tui-input--plain { border-color: var(--tui-color-brand-black-100); }
          .tui-force-hover .tui-input--black.tui-input--outline { border-color: var(--tui-color-brand-black-900); }
          .tui-force-hover .tui-input--black.tui-input--soft { border-color: var(--tui-color-brand-black-700); }
          .tui-force-hover .tui-input--black.tui-input--plain { border-color: var(--tui-color-brand-black-500); }
          .tui-force-focus .tui-input { box-shadow: 0 0 0 0.5px var(--tui-color-focus-ring-gap), 0 0 1px 2px var(--tui-ring-color, var(--tui-color-focus-ring)); }
          .tui-force-focus .tui-input--primary { --tui-ring-color: var(--tui-color-brand-pink-400); }
          .tui-force-focus .tui-input--success { --tui-ring-color: var(--tui-color-success-400); }
          .tui-force-focus .tui-input--warning { --tui-ring-color: var(--tui-color-warning-400); }
          .tui-force-focus .tui-input--danger { --tui-ring-color: var(--tui-color-danger-400); }
          .tui-force-focus .tui-input--info { --tui-ring-color: var(--tui-color-info-400); }
          .tui-force-focus .tui-input--white { --tui-ring-color: var(--tui-color-brand-black-300); }
          .tui-force-focus .tui-input--black { --tui-ring-color: var(--tui-color-brand-black-600); }
        `}</style>
        {variants.map((variant) => (
          <div key={variant}>
            <h3 style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: 600, marginBottom: "var(--tui-spacing-2)", color: "var(--tui-color-text-primary)", textTransform: "capitalize" }}>
              variant: {variant}
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "var(--tui-font-family-sans)" }}>
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
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Input intent={intent} variant={variant} placeholder={intent} size="sm" /></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><div className="tui-force-hover"><Input intent={intent} variant={variant} placeholder={intent} size="sm" /></div></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><div className="tui-force-focus"><Input intent={intent} variant={variant} placeholder={intent} size="sm" /></div></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Input intent={intent} variant={variant} placeholder={intent} size="sm" disabled /></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Input intent={intent} variant={variant} isGhost size="sm" /></td>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)", maxWidth: 400 }}>
      <style>{`
        .my-rounded-input { border-radius: 9999px; border: 2px solid #667eea; padding: 10px 20px; }
        .my-dark-input { background: #1a1a1a; color: #fafafa; border: 1px solid #333; border-radius: 6px; padding: 12px 16px; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className. TantuUI Input as a plain wrapper.
      </p>
      <Input className="my-rounded-input" placeholder="Pill-shaped input" />
      <Input className="my-dark-input" placeholder="Dark themed input" />
    </div>
  ),
};
