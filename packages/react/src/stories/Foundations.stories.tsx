import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// ─── Color Swatch ──────────────────────────────────────────────────────────
const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 80 }}>
    <div style={{ width: "100%", height: 48, background: value, borderRadius: "var(--tui-radius-md)", border: "1px solid var(--tui-color-border-default)" }} />
    <div style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-text-secondary)", fontFamily: "var(--tui-font-family-mono)", wordBreak: "break-all", lineHeight: 1.4 }}>{name}</div>
    <div style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-text-tertiary)" }}>{value}</div>
  </div>
);

const VarSwatch = ({ varName, label }: { varName: string; label: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 80 }}>
    <div style={{ width: "100%", height: 48, background: `var(${varName})`, borderRadius: "var(--tui-radius-md)", border: "1px solid var(--tui-color-border-default)" }} />
    <div style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-text-secondary)", fontWeight: "var(--tui-font-weight-medium)" }}>{label}</div>
    <div style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-text-tertiary)", fontFamily: "var(--tui-font-family-mono)" }}>{varName}</div>
  </div>
);

// ── Colors page ────────────────────────────────────────────────────────────
const ColorsPage = () => {
  const neutrals = [0,50,100,200,300,400,500,600,700,800,900,950];
  const primaries = [50,100,200,300,400,500,600,700,800,900,950];

  return (
    <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)", display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Neutral Scale</h2>
        <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap" }}>
          {neutrals.map((n) => <VarSwatch key={n} varName={`--tui-color-neutral-${n}`} label={`neutral-${n}`} />)}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Primary Scale</h2>
        <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap" }}>
          {primaries.map((n) => <VarSwatch key={n} varName={`--tui-color-primary-${n}`} label={`primary-${n}`} />)}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Status Colors</h2>
        <div style={{ display: "flex", gap: "var(--tui-spacing-6)", flexWrap: "wrap" }}>
          {["success","warning","danger","info"].map((status) => (
            <div key={status}>
              <div style={{ fontSize: "var(--tui-font-size-xs)", fontWeight: "var(--tui-font-weight-semibold)", color: "var(--tui-color-text-secondary)", marginBottom: "var(--tui-spacing-2)", textTransform: "capitalize" }}>{status}</div>
              <div style={{ display: "flex", gap: "var(--tui-spacing-2)" }}>
                {[50,500,700].map((n) => <VarSwatch key={n} varName={`--tui-color-${status}-${n}`} label={`${n}`} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Semantic Colors</h2>
        <p style={{ fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)", marginBottom: "var(--tui-spacing-4)" }}>
          These respond to the current theme (light/dark). Toggle the theme in the toolbar above.
        </p>
        <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap" }}>
          {[
            { varName: "--tui-color-bg-base",         label: "bg-base" },
            { varName: "--tui-color-bg-subtle",        label: "bg-subtle" },
            { varName: "--tui-color-bg-muted",         label: "bg-muted" },
            { varName: "--tui-color-brand-default",    label: "brand" },
            { varName: "--tui-color-brand-subtle",     label: "brand-subtle" },
            { varName: "--tui-color-border-default",   label: "border" },
            { varName: "--tui-color-border-strong",    label: "border-strong" },
          ].map(({ varName, label }) => <VarSwatch key={varName} varName={varName} label={label} />)}
        </div>
      </section>
    </div>
  );
};

// ── Spacing page ───────────────────────────────────────────────────────────
const SpacingPage = () => {
  const steps = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 32];
  return (
    <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)" }}>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-6)", color: "var(--tui-color-text-primary)" }}>Spacing Scale</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {steps.map((step) => {
          const varName = `--tui-spacing-${String(step).replace(".", "_")}`;
          return (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
              <span style={{ width: 40, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{step}</span>
              <div style={{ height: 24, background: "var(--tui-color-brand-default)", borderRadius: 3, width: `var(${varName})`, minWidth: 2 }} />
              <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>{varName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Radius page ────────────────────────────────────────────────────────────
const RadiusPage = () => {
  const values = ["none","xs","sm","md","lg","xl","2xl","3xl","full"] as const;
  return (
    <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)" }}>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-6)", color: "var(--tui-color-text-primary)" }}>Border Radius</h2>
      <div style={{ display: "flex", gap: "var(--tui-spacing-6)", flexWrap: "wrap", alignItems: "flex-end" }}>
        {values.map((r) => (
          <div key={r} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
            <div style={{ width: 64, height: 64, background: "var(--tui-color-brand-default)", borderRadius: `var(--tui-radius-${r})` }} />
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontFamily: "var(--tui-font-family-mono)" }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Shadow page ────────────────────────────────────────────────────────────
const ShadowPage = () => {
  const values = ["none","xs","sm","md","lg","xl","2xl","inner"] as const;
  return (
    <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-8)" }}>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-8)", color: "var(--tui-color-text-primary)" }}>Shadows</h2>
      <div style={{ display: "flex", gap: "var(--tui-spacing-8)", flexWrap: "wrap", alignItems: "center" }}>
        {values.map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-3)" }}>
            <div style={{ width: 96, height: 96, background: "var(--tui-color-surface-default, #fff)", borderRadius: "var(--tui-radius-lg)", boxShadow: `var(--tui-shadow-${s})`, border: s === "none" ? "1px dashed var(--tui-color-border-default)" : "none" }} />
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", fontFamily: "var(--tui-font-family-mono)" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Typography page ────────────────────────────────────────────────────────
const TypographyPage = () => (
  <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)", display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
    <section>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Font Families</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {[
          { label: "Sans", varName: "--tui-font-family-sans" },
          { label: "Serif", varName: "--tui-font-family-serif" },
          { label: "Mono", varName: "--tui-font-family-mono" },
        ].map(({ label, varName }) => (
          <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "var(--tui-spacing-4)" }}>
            <span style={{ width: 48, flexShrink: 0, fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", fontFamily: "var(--tui-font-family-mono)" }}>{label}</span>
            <span style={{ fontSize: "var(--tui-font-size-2xl)", fontFamily: `var(${varName})`, color: "var(--tui-color-text-primary)" }}>
              The quick brown fox
            </span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ── Meta + Stories ─────────────────────────────────────────────────────────
const meta: Meta = {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Colors: StoryObj = {
  name: "Colors",
  render: () => <ColorsPage />,
};

export const Spacing: StoryObj = {
  name: "Spacing",
  render: () => <SpacingPage />,
};

export const Radius: StoryObj = {
  name: "Radius",
  render: () => <RadiusPage />,
};

export const Shadows: StoryObj = {
  name: "Shadows",
  render: () => <ShadowPage />,
};

export const Typography: StoryObj = {
  name: "Typography",
  render: () => <TypographyPage />,
};
