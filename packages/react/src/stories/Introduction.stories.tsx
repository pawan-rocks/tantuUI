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
{`npm install @tantu/tokens @tantu/react

// 1. Import token CSS + component styles
import "@tantu/tokens/css/base";
import "@tantu/react/css";

// 2. (Optional) Enable bracket syntax: tui-p-[10px]
import "@tantu/tokens/runtime";

// 3. Use components
import { Button, Text, Box, LinkText, Shimmer } from "@tantu/react";`}
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--tui-spacing-2)", marginBottom: "var(--tui-spacing-8)" }}>
      {["Button", "Text", "Box", "LinkText", "Shimmer"].map((name) => (
        <span key={name} style={{ padding: "var(--tui-spacing-1) var(--tui-spacing-3)", background: "var(--tui-color-brand-pink-50)", color: "var(--tui-color-brand-pink-700)", borderRadius: "var(--tui-radius-full)", fontSize: "var(--tui-font-size-xs)", fontWeight: "var(--tui-font-weight-medium)" }}>
          {name}
        </span>
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
