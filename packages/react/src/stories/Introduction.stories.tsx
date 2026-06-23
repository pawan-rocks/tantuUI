import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// ── Intro page — not a real component story ───────────────────────────────
const IntroPage = () => (
  <div style={{ maxWidth: 720, padding: "2rem", fontFamily: "var(--tui-font-family-sans, Inter, sans-serif)" }}>
    <h1 style={{ fontSize: "var(--tui-font-size-4xl)", fontWeight: "var(--tui-font-weight-bold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>
      TantuUI
    </h1>
    <p style={{ fontSize: "var(--tui-font-size-lg)", color: "var(--tui-color-text-secondary)", marginBottom: "var(--tui-spacing-6)", lineHeight: "var(--tui-leading-relaxed)" }}>
      A token-based design system. All visual decisions — color, spacing, typography,
      radius, shadow — are stored as <code style={{ background: "var(--tui-color-bg-muted)", padding: "2px 6px", borderRadius: "var(--tui-radius-sm)", fontSize: "var(--tui-font-size-sm)" }}>--tui-*</code> CSS variables,
      making them consumable in any framework.
    </p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--tui-spacing-4)", marginBottom: "var(--tui-spacing-8)" }}>
      {[
        { title: "Token-first", desc: "Every style maps to a --tui-* CSS variable" },
        { title: "Framework-agnostic", desc: "Use tokens in React, Vue, Angular or plain CSS" },
        { title: "Tailwind-ready", desc: "Drop-in preset maps all utilities to tokens" },
      ].map((card) => (
        <div key={card.title} style={{ padding: "var(--tui-spacing-4)", background: "var(--tui-color-bg-subtle)", borderRadius: "var(--tui-radius-lg)", border: "1px solid var(--tui-color-border-default)" }}>
          <div style={{ fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-1)", color: "var(--tui-color-text-primary)" }}>{card.title}</div>
          <div style={{ fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)" }}>{card.desc}</div>
        </div>
      ))}
    </div>

    <h2 style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-3)", color: "var(--tui-color-text-primary)" }}>
      Getting started
    </h2>
    <pre style={{ background: "var(--tui-color-bg-muted)", padding: "var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", fontSize: "var(--tui-font-size-sm)", overflowX: "auto", color: "var(--tui-color-text-primary)" }}>
{`// 1. Import token CSS (required — works with any framework)
import "@tantu/tokens/css/base";

// 2. Use React components
import { Button, Text, Box } from "@tantu/react";

// 3. Or use raw CSS variables in any framework
<div style="background: var(--tui-color-brand-default); padding: var(--tui-spacing-4)">
  Hello TantuUI
</div>`}
    </pre>
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
