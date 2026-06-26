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
  const scale = [50,100,200,300,400,500,600,700,800,900,950];

  const colorGroups = [
    { title: "White / Black", prefix: null, steps: null, custom: [
      { varName: "--tui-color-white", label: "white" },
      { varName: "--tui-color-black", label: "black" },
    ]},
    { title: "Brand Navy", prefix: "brand-navy", steps: scale },
    { title: "Brand Blue", prefix: "brand-blue", steps: scale },
    { title: "Brand Purple", prefix: "brand-purple", steps: scale },
    { title: "Brand Pink", prefix: "brand-pink", steps: scale },
    { title: "Brand Gray", prefix: "brand-gray", steps: scale },
    { title: "Brand Light", prefix: "brand-light", steps: scale },
    { title: "Brand White", prefix: "brand-white", steps: scale },
    { title: "Brand Black", prefix: "brand-black", steps: scale },
    { title: "Success", prefix: "success", steps: scale },
    { title: "Warning", prefix: "warning", steps: scale },
    { title: "Danger", prefix: "danger", steps: scale },
    { title: "Info", prefix: "info", steps: scale },
    { title: "Teal", prefix: "teal", steps: scale },
    { title: "Orange", prefix: "orange", steps: scale },
    { title: "Rose", prefix: "rose", steps: scale },
    { title: "Indigo", prefix: "indigo", steps: scale },
    { title: "Mint", prefix: "mint", steps: scale },
    { title: "Coal", prefix: "coal", steps: scale },
  ];

  return (
    <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)", display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
      {colorGroups.map(({ title, prefix, steps, custom }) => (
        <section key={title}>
          <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>{title}</h2>
          <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap" }}>
            {custom
              ? custom.map(({ varName, label }) => <VarSwatch key={varName} varName={varName} label={label} />)
              : steps!.map((n) => <VarSwatch key={n} varName={`--tui-color-${prefix}-${n}`} label={`${prefix}-${n}`} />)
            }
          </div>
        </section>
      ))}

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

    <section>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Font Sizes</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {(["2xs","xs","sm","md","lg","xl","2xl","3xl","4xl","5xl","6xl","7xl"] as const).map((size) => (
          <div key={size} style={{ display: "flex", alignItems: "baseline", gap: "var(--tui-spacing-4)" }}>
            <span style={{ width: 40, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{size}</span>
            <span style={{ fontSize: `var(--tui-font-size-${size})`, color: "var(--tui-color-text-primary)", lineHeight: 1.2 }}>
              Tantu UI
            </span>
            <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-text-tertiary)" }}>--tui-font-size-{size}</span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Font Weights</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {(["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"] as const).map((w) => (
          <div key={w} style={{ display: "flex", alignItems: "baseline", gap: "var(--tui-spacing-4)" }}>
            <span style={{ width: 72, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{w}</span>
            <span style={{ fontSize: "var(--tui-font-size-xl)", fontWeight: `var(--tui-font-weight-${w})`, color: "var(--tui-color-text-primary)" }}>
              The quick brown fox jumps
            </span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Line Height</h2>
      <div style={{ display: "flex", gap: "var(--tui-spacing-6)", flexWrap: "wrap" }}>
        {(["none","tight","snug","normal","relaxed","loose"] as const).map((lh) => (
          <div key={lh} style={{ width: 180, display: "flex", flexDirection: "column", gap: "var(--tui-spacing-1)" }}>
            <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{lh}</span>
            <p style={{ fontSize: "var(--tui-font-size-sm)", lineHeight: `var(--tui-leading-${lh})`, color: "var(--tui-color-text-primary)", background: "var(--tui-color-brand-black-50)", padding: "var(--tui-spacing-2)", borderRadius: "var(--tui-radius-sm)" }}>
              The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
            </p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Letter Spacing</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {(["tighter","tight","normal","wide","wider","widest"] as const).map((ls) => (
          <div key={ls} style={{ display: "flex", alignItems: "baseline", gap: "var(--tui-spacing-4)" }}>
            <span style={{ width: 56, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{ls}</span>
            <span style={{ fontSize: "var(--tui-font-size-lg)", letterSpacing: `var(--tui-tracking-${ls})`, color: "var(--tui-color-text-primary)" }}>
              TANTU DESIGN SYSTEM
            </span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ── Border Width page ──────────────────────────────────────────────────────
const BorderWidthPage = () => {
  const numericWidths = ["0", "0_5", "1", "1_5", "2", "2_5", "3", "3_5", "4", "4_5", "5", "5_5", "8"];
  const namedWidths = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"];
  const semanticWidths = ["default", "input", "card", "divider", "thick"];

  return (
    <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)", display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Numeric Scale</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          {numericWidths.map((w) => (
            <div key={w} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
              <span style={{ width: 32, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{w.replace("_", ".")}</span>
              <div style={{ flex: 1, maxWidth: 300, height: `var(--tui-border-width-${w})`, background: "var(--tui-color-brand-black-900)", borderRadius: 1 }} />
              <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>--tui-border-width-{w}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Named Scale</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          {namedWidths.map((w) => (
            <div key={w} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
              <span style={{ width: 32, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{w}</span>
              <div style={{ flex: 1, maxWidth: 300, height: `var(--tui-border-width-${w})`, background: "var(--tui-color-brand-black-900)", borderRadius: 1, minHeight: 1 }} />
              <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>--tui-border-width-{w}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Semantic Defaults</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          {semanticWidths.map((w) => (
            <div key={w} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
              <span style={{ width: 60, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{w}</span>
              <div style={{ width: 200, height: 48, border: `var(--tui-border-width-${w}) solid var(--tui-color-brand-black-900)`, borderRadius: "var(--tui-radius-md)" }} />
              <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>--tui-border-width-{w}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

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

export const BorderWidths: StoryObj = {
  name: "Border Widths",
  render: () => <BorderWidthPage />,
};

export const Opacity: StoryObj = {
  name: "Opacity",
  render: () => {
    const steps = [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100];
    return (
      <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)" }}>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-6)", color: "var(--tui-color-text-primary)" }}>Opacity</h2>
        <div style={{ display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap" }}>
          {steps.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-2)", width: 64 }}>
              <div style={{ width: 48, height: 48, background: "var(--tui-color-brand-pink-600)", opacity: `var(--tui-opacity-${s})`, borderRadius: "var(--tui-radius-md)" }} />
              <span style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-text-secondary)", fontFamily: "var(--tui-font-family-mono)" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const ZIndex: StoryObj = {
  name: "Z-Index",
  render: () => {
    const layers = ["hide", "base", "raised", "dropdown", "sticky", "overlay", "modal", "popover", "toast", "tooltip"] as const;
    return (
      <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)" }}>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-6)", color: "var(--tui-color-text-primary)" }}>Z-Index Layers</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-2)" }}>
          {layers.map((layer, i) => (
            <div key={layer} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
              <span style={{ width: 70, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{layer}</span>
              <div style={{ height: 28, width: `${40 + i * 24}px`, background: `var(--tui-color-brand-pink-${Math.min(50 + i * 100, 950)})`, borderRadius: "var(--tui-radius-sm)", display: "flex", alignItems: "center", paddingInline: "var(--tui-spacing-2)" }}>
                <span style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-white)", fontFamily: "var(--tui-font-family-mono)" }}>--tui-z-{layer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Breakpoints: StoryObj = {
  name: "Breakpoints",
  render: () => {
    const bps = [
      { name: "xs", value: "320px" },
      { name: "sm", value: "640px" },
      { name: "md", value: "768px" },
      { name: "lg", value: "1024px" },
      { name: "xl", value: "1280px" },
      { name: "2xl", value: "1536px" },
    ];
    return (
      <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)" }}>
        <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-6)", color: "var(--tui-color-text-primary)" }}>Breakpoints</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
          {bps.map(({ name, value }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
              <span style={{ width: 32, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{name}</span>
              <div style={{ height: 24, background: "var(--tui-color-brand-blue-100)", borderRadius: "var(--tui-radius-sm)", border: "1px solid var(--tui-color-brand-blue-300)", width: `min(${value}, 100%)`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingInline: "var(--tui-spacing-2)" }}>
                <span style={{ fontSize: "var(--tui-font-size-2xs)", color: "var(--tui-color-brand-blue-700)", fontFamily: "var(--tui-font-family-mono)" }}>{value}</span>
              </div>
              <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>--tui-screen-{name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Animation: StoryObj = {
  name: "Animation",
  render: () => {
    const durations = ["instant", "fast", "normal", "slow", "slower", "slowest"] as const;
    const easings = ["linear", "in", "out", "in-out", "bounce", "spring"] as const;
    return (
      <div style={{ fontFamily: "var(--tui-font-family-sans)", padding: "var(--tui-spacing-6)", display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
        <section>
          <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Duration</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
            {durations.map((d) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)" }}>
                <span style={{ width: 60, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{d}</span>
                <div style={{ width: 200, height: 8, background: "var(--tui-color-brand-black-100)", borderRadius: "var(--tui-radius-full)", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "var(--tui-color-brand-pink-500)", borderRadius: "var(--tui-radius-full)", width: `${d === "instant" ? 2 : d === "fast" ? 15 : d === "normal" ? 30 : d === "slow" ? 45 : d === "slower" ? 70 : 100}%` }} />
                </div>
                <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>--tui-duration-{d}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", marginBottom: "var(--tui-spacing-4)", color: "var(--tui-color-text-primary)" }}>Easing</h2>
          <p style={{ fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)", marginBottom: "var(--tui-spacing-4)" }}>
            Hover each row to see the easing curve in action.
          </p>
          <style>{`
            .tui-ease-demo:hover .tui-ease-demo__ball { transform: translateX(180px); }
          `}</style>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
            {easings.map((e) => (
              <div key={e} className="tui-ease-demo" style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-4)", cursor: "pointer" }}>
                <span style={{ width: 60, flexShrink: 0, fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{e}</span>
                <div style={{ width: 200, height: 32, background: "var(--tui-color-brand-black-50)", borderRadius: "var(--tui-radius-md)", position: "relative", overflow: "hidden" }}>
                  <div className="tui-ease-demo__ball" style={{ width: 20, height: 20, background: "var(--tui-color-brand-pink-500)", borderRadius: "50%", position: "absolute", top: 6, left: 0, transition: `transform 600ms var(--tui-ease-${e})` }} />
                </div>
                <span style={{ fontFamily: "var(--tui-font-family-mono)", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>--tui-ease-{e}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  },
};
