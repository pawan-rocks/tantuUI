import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Textarea } from "../components/Textarea/Textarea";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
    autoResize: {
      control: "boolean",
      description: "Auto-resize height to fit content",
      table: { category: "Behavior" },
    },
    maxRows: {
      control: "number",
      description: "Maximum rows when autoResize is enabled",
      table: { category: "Behavior" },
    },
    characterCount: {
      control: "boolean",
      description: "Show character count",
      table: { category: "Behavior" },
    },
    maxLength: {
      control: "number",
      description: "Maximum character length (visual only, does not prevent input)",
      table: { category: "Behavior" },
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
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: { category: "Content" },
    },
    rows: {
      control: "number",
      description: "Number of visible text rows",
      table: { category: "Appearance" },
    },
  },

  args: {
    size: "md",
    variant: "outline",
    autoResize: false,
    characterCount: false,
    isInvalid: false,
    isGhost: false,
    disabled: false,
    placeholder: "Type something…",
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: {
    placeholder: "Write your message here…",
    rows: 3,
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Textarea key={size} size={size} placeholder={`Size: ${size}`} rows={2} />
      ))}
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
      <Textarea variant="outline" placeholder="Outline (default)" rows={2} />
      <Textarea variant="soft" placeholder="Soft" rows={2} />
      <Textarea variant="plain" placeholder="Plain" rows={2} />
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
      {(["default", "primary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const).map((intent) => (
        <Textarea key={intent} intent={intent} placeholder={intent.charAt(0).toUpperCase() + intent.slice(1)} rows={2} />
      ))}
    </div>
  ),
};

// ── AutoResize ────────────────────────────────────────────────────────────
export const AutoResize: Story = {
  name: "AutoResize",
  parameters: { controls: { disable: true } },
  render: () => {
    const AutoResizeDemo = () => {
      const [value, setValue] = useState("Type here and watch the textarea grow automatically.\n\nAdd more lines to see it expand.");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
            Grows with content, capped at 5 rows:
          </p>
          <Textarea
            autoResize
            maxRows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Auto-resize with maxRows=5"
          />
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
            Grows without limit:
          </p>
          <Textarea
            autoResize
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Auto-resize without limit"
          />
        </div>
      );
    };
    return <AutoResizeDemo />;
  },
};

// ── CharacterCount ────────────────────────────────────────────────────────
export const CharacterCount: Story = {
  name: "CharacterCount",
  parameters: { controls: { disable: true } },
  render: () => {
    const CharacterCountDemo = () => {
      const [value, setValue] = useState("Hello, world!");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
            With maxLength (shows current/max):
          </p>
          <Textarea
            characterCount
            maxLength={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Max 100 characters"
            rows={3}
          />
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
            Without maxLength (shows current count only):
          </p>
          <Textarea
            characterCount
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="No max length"
            rows={3}
          />
        </div>
      );
    };
    return <CharacterCountDemo />;
  },
};

// ── Overlimit ─────────────────────────────────────────────────────────────
export const Overlimit: Story = {
  name: "Overlimit",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 400 }}>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Value exceeds maxLength — danger styling applied, input still allowed:
      </p>
      <Textarea
        characterCount
        maxLength={20}
        value="This text clearly exceeds the maximum allowed character count"
        placeholder="Over the limit"
        rows={3}
      />
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
          .tui-force-hover .tui-textarea--outline .tui-textarea__native { border-color: var(--tui-color-brand-black-400); }
          .tui-force-hover .tui-textarea--soft .tui-textarea__native { border-color: var(--tui-color-brand-black-200); }
          .tui-force-hover .tui-textarea--plain .tui-textarea__native { border-color: var(--tui-color-brand-black-100); }
          .tui-force-hover .tui-textarea--primary .tui-textarea__native { border-color: var(--tui-color-brand-pink-600); }
          .tui-force-hover .tui-textarea--success .tui-textarea__native { border-color: var(--tui-color-success-600); }
          .tui-force-hover .tui-textarea--warning .tui-textarea__native { border-color: var(--tui-color-warning-600); }
          .tui-force-hover .tui-textarea--danger .tui-textarea__native { border-color: var(--tui-color-danger-600); }
          .tui-force-hover .tui-textarea--info .tui-textarea__native { border-color: var(--tui-color-info-600); }
          .tui-force-hover .tui-textarea--white .tui-textarea__native { border-color: var(--tui-color-brand-black-300); }
          .tui-force-hover .tui-textarea--black .tui-textarea__native { border-color: var(--tui-color-brand-black-900); }
          .tui-force-focus .tui-textarea__native { box-shadow: 0 0 0 0.5px var(--tui-color-focus-ring-gap), 0 0 1px 2px var(--tui-ring-color, var(--tui-color-focus-ring)); }
          .tui-force-focus .tui-textarea--primary .tui-textarea__native { --tui-ring-color: var(--tui-color-brand-pink-400); }
          .tui-force-focus .tui-textarea--success .tui-textarea__native { --tui-ring-color: var(--tui-color-success-400); }
          .tui-force-focus .tui-textarea--warning .tui-textarea__native { --tui-ring-color: var(--tui-color-warning-400); }
          .tui-force-focus .tui-textarea--danger .tui-textarea__native { --tui-ring-color: var(--tui-color-danger-400); }
          .tui-force-focus .tui-textarea--info .tui-textarea__native { --tui-ring-color: var(--tui-color-info-400); }
          .tui-force-focus .tui-textarea--white .tui-textarea__native { --tui-ring-color: var(--tui-color-brand-black-300); }
          .tui-force-focus .tui-textarea--black .tui-textarea__native { --tui-ring-color: var(--tui-color-brand-black-600); }
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
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Textarea intent={intent} variant={variant} placeholder={intent} rows={1} size="sm" /></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><div className="tui-force-hover"><Textarea intent={intent} variant={variant} placeholder={intent} rows={1} size="sm" /></div></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><div className="tui-force-focus"><Textarea intent={intent} variant={variant} placeholder={intent} rows={1} size="sm" /></div></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Textarea intent={intent} variant={variant} placeholder={intent} rows={1} size="sm" disabled /></td>
                      <td style={{ padding: "var(--tui-spacing-2)" }}><Textarea intent={intent} variant={variant} isGhost rows={1} size="sm" /></td>
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
        .my-custom-textarea { border: 2px dashed hotpink; border-radius: 12px; padding: 16px; background: #fff0f5; }
        .my-minimal-textarea { border: none; border-bottom: 2px solid #333; border-radius: 0; padding: 8px 0; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
        Zero design props — only className + placeholder. TantuUI textarea as a plain wrapper.
      </p>
      <Textarea className="my-custom-textarea" placeholder="Dashed pink textarea" />
      <Textarea className="my-minimal-textarea" placeholder="Minimal underline textarea" />
      <Textarea placeholder="No props at all (defaults apply)" />
    </div>
  ),
};
