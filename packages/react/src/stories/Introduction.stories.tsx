import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const IntroPage = () => (
  <div style={{ width: "100%", padding: "16px", fontFamily: "var(--tui-font-family-sans, Inter, sans-serif)" }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: "6px", marginBottom: "var(--tui-spacing-3)" }}>
      <img src="./brand_logo.png" alt="TantuUI" style={{ width: 40, height: 40, borderRadius: 6 }} />
      <h1 style={{ fontSize: "var(--tui-font-size-2xl)", fontWeight: "var(--tui-font-weight-semibold)", margin: 0, background: "linear-gradient(135deg, #b927f1, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        TantuUI
      </h1>
    </div>

    {/* Tagline */}
    <p style={{  width: "100%", paddingTop: "30px", fontSize: "var(--tui-font-size-lg)", textAlign:"center", color: "var(--tui-color-text-secondary)", marginBottom: "var(--tui-spacing-8)", lineHeight: "var(--tui-leading-relaxed)", }}>
      A token-based design system built for consistency across any framework.
      Every visual decision lives as a <br /> <code style={{ background: "var(--tui-color-bg-muted)", padding: "2px 6px", borderRadius: "var(--tui-radius-sm)", fontSize: "var(--tui-font-size-sm)" }}>--tui-*</code> CSS variable — use them in React, Vue, Angular, or plain HTML.
    </p>

    {/* Features grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--tui-spacing-4)", marginBottom: "var(--tui-spacing-8)" }}>
      {[
        { title: "Token-first", desc: "Color, spacing, typography, radius, shadow — all driven by CSS variables" },
        { title: "Framework-agnostic", desc: "Tokens work everywhere. React components are an optional layer on top" },
        { title: "Tailwind-ready", desc: "Drop-in preset maps bg-tui-*, text-tui-*, rounded-* to token vars" },
        { title: "No inline styles", desc: "Components use CSS classes only. Zero inline style properties" },
        { title: "Runtime JIT", desc: "Optional script enables tui-p-[10px] bracket syntax — no build tool needed" },
        { title: "Ghost / Shimmer", desc: "Every component supports isGhost prop for skeleton loading states" },
      ].map((card) => (
        <div key={card.title} style={{ padding: "var(--tui-spacing-4)", background: "var(--tui-color-bg-subtle)", borderRadius: "var(--tui-radius-lg)", border: "1px solid var(--tui-color-border-default)" }}>
          <div style={{ fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-1)", color: "var(--tui-color-text-primary)", fontSize: "var(--tui-font-size-sm)" }}>{card.title}</div>
          <div style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", lineHeight: "var(--tui-leading-relaxed)" }}>{card.desc}</div>
        </div>
      ))}
    </div>

    {/* Quick start */}
    <h2 style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
      Quick Start
    </h2>
    <pre style={{ background: "var(--tui-color-bg-muted)", padding: "var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", fontSize: "var(--tui-font-size-xs)", overflowX: "auto", color: "var(--tui-color-text-primary)", marginBottom: "var(--tui-spacing-8)", lineHeight: "var(--tui-leading-relaxed)" }}>
{`npm install @tantuui/tokens @tantuui/react

// 1. Import token CSS + component styles
import "@tantuui/tokens/css/base";
import "@tantuui/react/css";

// 2. (Optional) Enable bracket syntax: tui-p-[10px]
import "@tantuui/tokens/runtime";

// 3. Use components
import { Button, Text, Box, LinkText, Shimmer } from "@tantuui/react";`}
    </pre>

    {/* Usage modes */}
    <h2 style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
      Three ways to use
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--tui-spacing-4)", marginBottom: "var(--tui-spacing-8)" }}>
      <div style={{ padding: "var(--tui-spacing-4)", borderRadius: "var(--tui-radius-lg)", border: "1px solid var(--tui-color-border-default)" }}>
        <div style={{ fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-2)", color: "var(--tui-color-text-primary)", fontSize: "var(--tui-font-size-sm)" }}>React Components</div>
        <pre style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}>
{`<Button intent="primary" size="md">
  Click me
</Button>`}
        </pre>
      </div>
      <div style={{ padding: "var(--tui-spacing-4)", borderRadius: "var(--tui-radius-lg)", border: "1px solid var(--tui-color-border-default)" }}>
        <div style={{ fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-2)", color: "var(--tui-color-text-primary)", fontSize: "var(--tui-font-size-sm)" }}>Utility Classes (no Tailwind)</div>
        <pre style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}>
{`<div class="tui-bg-primary-600 tui-text-white tui-p-4 tui-rounded-lg">
  Hello
</div>`}
        </pre>
      </div>
      <div style={{ padding: "var(--tui-spacing-4)", borderRadius: "var(--tui-radius-lg)", border: "1px solid var(--tui-color-border-default)" }}>
        <div style={{ fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-2)", color: "var(--tui-color-text-primary)", fontSize: "var(--tui-font-size-sm)" }}>With Tailwind Preset</div>
        <pre style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}>
{`<div class="bg-tui-primary-600 text-tui-white p-4 rounded-lg">
  Hello
</div>`}
        </pre>
      </div>
    </div>

    {/* Components list */}
    <h2 style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
      Components
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--tui-spacing-2)", marginBottom: "var(--tui-spacing-8)" }}>
      {[
        { name: "Button", path: "?path=/docs/components-button--docs", desc: "Interactive button with variants" },
        { name: "Input", path: "?path=/docs/components-input--docs", desc: "Text input with icons, clear" },
        { name: "Textarea", path: "?path=/docs/components-textarea--docs", desc: "Multi-line text input" },
        { name: "Select", path: "?path=/docs/components-select--docs", desc: "Native select dropdown" },
        { name: "Checkbox", path: "?path=/docs/components-checkbox--docs", desc: "Checkbox with label" },
        { name: "Radio", path: "?path=/docs/components-radio--docs", desc: "Radio button" },
        { name: "Switch", path: "?path=/docs/components-switch--docs", desc: "Toggle switch" },
        { name: "Label", path: "?path=/docs/components-label--docs", desc: "Form label" },
        { name: "FormField", path: "?path=/docs/components-formfield--docs", desc: "Label + input + error" },
        { name: "Text", path: "?path=/docs/components-text--docs", desc: "Typography component" },
        { name: "Box", path: "?path=/docs/components-box--docs", desc: "Layout container" },
        { name: "LinkText", path: "?path=/docs/components-linktext--docs", desc: "Styled anchor/link" },
        { name: "Tag", path: "?path=/docs/components-tag--docs", desc: "Status tag/badge" },
        { name: "Chip", path: "?path=/docs/components-chip--docs", desc: "Interactive chip" },
        { name: "Pill", path: "?path=/docs/components-pill--docs", desc: "Rounded pill badge" },
        { name: "Calendar", path: "?path=/docs/components-calendar--docs", desc: "Date calendar with range" },
        { name: "TimeSelector", path: "?path=/docs/components-timeselector--docs", desc: "Scrollable time picker" },
        { name: "DatePicker", path: "?path=/docs/components-datepicker--docs", desc: "Full date/time picker" },
        { name: "Popover", path: "?path=/docs/components-popover--docs", desc: "Portal floating container" },
        { name: "Table", path: "?path=/docs/components-table--docs", desc: "Data table with sorting, selection, expand" },
        { name: "Modal", path: "?path=/docs/components-modal--docs", desc: "Dialog/drawer — center, left, right, top, bottom, fullscreen" },
        { name: "Shimmer", path: "?path=/docs/components-shimmer--docs", desc: "Skeleton loading" },
      ].map((item) => (
        <a
          key={item.name}
          href={item.path}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--tui-spacing-0_5)",
            padding: "var(--tui-spacing-3)",
            background: "var(--tui-color-bg-subtle)",
            borderRadius: "var(--tui-radius-md)",
            border: "1px solid var(--tui-color-border-default)",
            textDecoration: "none",
            transition: "border-color 150ms, background 150ms",
          }}
        >
          <span style={{ fontWeight: "var(--tui-font-weight-semibold)", fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-brand-pink-700)" }}>
            {item.name}
          </span>
          <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>
            {item.desc}
          </span>
        </a>
      ))}
    </div>

    {/* Hooks & Utilities */}
    <h2 style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
      Hooks & Utilities
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--tui-spacing-2)", marginBottom: "var(--tui-spacing-8)" }}>
      {[
        { name: "useDropdownPosition", desc: "Auto-positions portal dropdowns" },
        { name: "cn()", desc: "Merge CSS class names" },
        { name: "getCSSVar() / setCSSVar()", desc: "Read/write CSS variables" },
        { name: "tokenVar()", desc: "Get token variable reference" },
      ].map((item) => (
        <div
          key={item.name}
          style={{
            padding: "var(--tui-spacing-3)",
            background: "var(--tui-color-bg-subtle)",
            borderRadius: "var(--tui-radius-md)",
            border: "1px solid var(--tui-color-border-default)",
          }}
        >
          <span style={{ fontWeight: "var(--tui-font-weight-medium)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-primary)", fontFamily: "monospace" }}>
            {item.name}
          </span>
          <div style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginTop: "var(--tui-spacing-0_5)" }}>
            {item.desc}
          </div>
        </div>
      ))}
    </div>

    {/* Token categories */}
    <h2 style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
      Token Categories
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "var(--tui-spacing-2)" }}>
      {[
        "Color", "Spacing", "Font Size", "Font Weight", "Line Height",
        "Letter Spacing", "Border Radius", "Box Shadow", "Border Width",
        "Z-Index", "Duration", "Easing", "Opacity", "Breakpoints",
      ].map((cat) => (
        <div key={cat} style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", background: "var(--tui-color-bg-subtle)", borderRadius: "var(--tui-radius-sm)" }}>
          {cat}
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: "Introduction",
  component: IntroPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

export const Welcome: StoryObj = {
  render: () => <IntroPage />,
};
