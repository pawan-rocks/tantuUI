#!/usr/bin/env node
/**
 * Build script: generates dist/tokens.css, dist/base.css, and dist/tailwind-preset.js
 * from the compiled JS token files.
 *
 * Run after tsup: `node scripts/build-css.js`
 */

const fs   = require("fs");
const path = require("path");

// Import compiled tokens (tsup must have run first)
const {
  color,
  spacing,
  typography,
  radius,
  shadow,
  border,
  zIndex,
  animation,
  breakpoint,
  opacity,
  sizing,
  flattenTokens,
  toCSSRoot,
} = require("../dist/index.js");

const distDir = path.resolve(__dirname, "../dist");
fs.mkdirSync(distDir, { recursive: true });

// ─── Helper ──────────────────────────────────────────────────────────

function toKebab(str) {
  return str
    // Decimal dots → underscores: "0.5" → "0_5"
    // (dots are technically valid in CSS custom props but esbuild's minifier rejects them)
    .replace(/\./g, "_")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    // letter→digit only — "2xl" stays "2xl"
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase();
}

function buildCategory(name, obj, selector = ":root") {
  const prefix = `--tui-${toKebab(name)}`;
  const flat   = flattenTokens(obj, prefix);
  return toCSSRoot(flat, selector);
}

/**
 * Converts a hex color to "R G B" space-separated channels.
 * #ffffff → "255 255 255"
 */
function hexToRGB(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}

/**
 * Generates companion --tui-color-*-rgb variables for all primitive colors.
 * Usage: rgb(var(--tui-color-primary-600-rgb) / 0.5)
 */
function buildColorRGB(primitiveObj, selector = ":root") {
  const prefix = "--tui-color";
  const flat = flattenTokens(primitiveObj, prefix);
  const rgbLines = [];

  for (const [varName, value] of Object.entries(flat)) {
    // Only convert actual hex values
    if (value && value.startsWith("#")) {
      rgbLines.push(`  ${varName}-rgb: ${hexToRGB(value)};`);
    }
  }

  if (rgbLines.length === 0) return "";
  return `/* Color RGB channels — use with: rgb(var(--tui-color-*-rgb) / opacity) */\n${selector} {\n${rgbLines.join("\n")}\n}\n`;
}

// ─── tokens.css  (all CSS variables in :root) ────────────────────────

const header = `/**
 * TantuUI Design Tokens
 * Generated — do not edit manually.
 * Prefix: --tui-*
 *
 * Usage (any framework):
 *   @import "@tantuui/tokens/css";
 */\n\n`;

const sections = [
  buildCategory("color",     color.primitive),
  buildColorRGB(color.primitive),  // companion --tui-color-*-rgb: R G B channels
  buildCategory("color",     color.semantic),
  buildCategory("spacing",   spacing),
  buildCategory("font",      { family: typography.fontFamily }),
  buildCategory("font-size", typography.fontSize),
  buildCategory("font-weight", typography.fontWeight),
  buildCategory("leading",   typography.lineHeight),
  buildCategory("tracking",  typography.letterSpacing),
  buildCategory("radius",    radius),
  buildCategory("shadow",    shadow),
  buildCategory("border",    border),
  buildCategory("z",         zIndex),
  buildCategory("duration",  animation.duration),
  buildCategory("ease",      animation.easing),
  buildCategory("screen",    breakpoint),
  buildCategory("opacity",   opacity),
  buildCategory("size",      sizing),
];

const tokensCss = header + sections.join("\n");
fs.writeFileSync(path.join(distDir, "tokens.css"), tokensCss, "utf-8");
console.log("✅  dist/tokens.css written");

// ─── base.css  (CSS reset + base styles using token variables) ────────

const baseCss = `/**
 * TantuUI Base Styles
 * Minimal CSS reset that uses --tui-* variables.
 * @import "@tantuui/tokens/css/base"
 */

@import "./tokens.css";

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%; /* 16px base */
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
}

body {
  font-family: var(--tui-font-family-sans, system-ui, sans-serif);
  font-size: var(--tui-font-size-md);
  font-weight: var(--tui-font-weight-normal);
  line-height: var(--tui-leading-normal);
  color: var(--tui-color-text-primary);
  background-color: var(--tui-color-bg-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus visible ring */
:focus-visible {
  outline: 2px solid var(--tui-color-border-focus);
  outline-offset: 2px;
}

/* Remove default list styles */
ol, ul {
  list-style: none;
}

/* Images */
img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  max-width: 100%;
}

/* Form elements inherit font */
button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
}

/* Button reset */
button {
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
}

/* Anchor */
a {
  color: var(--tui-color-text-link);
  text-decoration: none;
}

a:hover {
  color: var(--tui-color-text-link-hover);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--tui-font-weight-semibold);
  line-height: var(--tui-leading-tight);
}

h1 { font-size: var(--tui-font-size-4xl); }
h2 { font-size: var(--tui-font-size-3xl); }
h3 { font-size: var(--tui-font-size-2xl); }
h4 { font-size: var(--tui-font-size-xl); }
h5 { font-size: var(--tui-font-size-lg); }
h6 { font-size: var(--tui-font-size-md); }

/* Code */
code, kbd, pre, samp {
  font-family: var(--tui-font-family-mono);
  font-size: var(--tui-font-size-sm);
}
`;

fs.writeFileSync(path.join(distDir, "base.css"), baseCss, "utf-8");
console.log("✅  dist/base.css written");

// ─── tailwind-preset.js ───────────────────────────────────────────────

/**
 * Converts a flat token object to Tailwind-compatible values
 * using CSS variable references with alpha support.
 * Tailwind uses the returned function to compose: rgb(channels / <alpha-value>)
 */
function toTailwindValues(obj, cssPrefix) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const cssKey = toKebab(key);
    const varRef = `var(${cssPrefix}-${cssKey})`;
    result[key] = varRef;
  }
  return result;
}

/**
 * Builds color values that support Tailwind's opacity modifier (bg-red-500/50).
 * Uses the -rgb companion variables: rgb(var(--tui-color-*-rgb) / <alpha-value>)
 */
function flatToTailwindColors(obj, cssPrefix) {
  const result = {};
  function walk(node, prefix) {
    for (const [k, v] of Object.entries(node)) {
      const segment = toKebab(k);
      const fullPrefix = `${prefix}-${segment}`;
      if (typeof v === "object" && v !== null) {
        walk(v, fullPrefix);
      } else if (typeof v === "string" && v.startsWith("#")) {
        // Hex color → use rgb channels with alpha placeholder
        result[k] = `rgb(var(${fullPrefix}-rgb) / <alpha-value>)`;
      } else {
        // Non-hex (e.g. semantic references) → plain var
        result[k] = `var(${fullPrefix})`;
      }
    }
  }
  walk(obj, cssPrefix);
  return result;
}

function flatToTailwind(obj, cssPrefix) {
  const result = {};
  function walk(node, prefix) {
    for (const [k, v] of Object.entries(node)) {
      const segment = toKebab(k);
      const fullPrefix = `${prefix}-${segment}`;
      if (typeof v === "object" && v !== null) {
        walk(v, fullPrefix);
      } else {
        result[k] = `var(${fullPrefix})`;
      }
    }
  }
  walk(obj, cssPrefix);
  return result;
}

const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        // All TantuUI colors namespaced under "tui": bg-tui-primary-600, text-tui-white, etc.
        tui: {
          // Primitive scales
          ...flatToTailwindColors(color.primitive, "--tui-color"),
          // Semantic
          bg:      { base: "var(--tui-color-bg-base)", subtle: "var(--tui-color-bg-subtle)", muted: "var(--tui-color-bg-muted)" },
          text:    { primary: "var(--tui-color-text-primary)", secondary: "var(--tui-color-text-secondary)", tertiary: "var(--tui-color-text-tertiary)", disabled: "var(--tui-color-text-disabled)", inverse: "var(--tui-color-text-inverse)", link: "var(--tui-color-text-link)" },
          border:  { default: "var(--tui-color-border-default)", strong: "var(--tui-color-border-strong)", focus: "var(--tui-color-border-focus)" },
          brand:   { DEFAULT: "var(--tui-color-brand-default)", hover: "var(--tui-color-brand-hover)", active: "var(--tui-color-brand-active)", subtle: "var(--tui-color-brand-subtle)" },
          success: { DEFAULT: "var(--tui-color-success-default)", subtle: "var(--tui-color-success-subtle)", text: "var(--tui-color-success-text)" },
          warning: { DEFAULT: "var(--tui-color-warning-default)", subtle: "var(--tui-color-warning-subtle)", text: "var(--tui-color-warning-text)" },
          danger:  { DEFAULT: "var(--tui-color-danger-default)",  subtle: "var(--tui-color-danger-subtle)",  text: "var(--tui-color-danger-text)"  },
          info:    { DEFAULT: "var(--tui-color-info-default)",    subtle: "var(--tui-color-info-subtle)",    text: "var(--tui-color-info-text)"    },
        },
      },

      spacing: flatToTailwind(spacing, "--tui-spacing"),

      fontFamily: {
        sans:  "var(--tui-font-family-sans)",
        serif: "var(--tui-font-family-serif)",
        mono:  "var(--tui-font-family-mono)",
      },

      fontSize: Object.fromEntries(
        Object.keys(typography.fontSize).map((k) => [
          k,
          [`var(--tui-font-size-${toKebab(k)})`, { lineHeight: "var(--tui-leading-normal)" }],
        ])
      ),

      fontWeight: Object.fromEntries(
        Object.keys(typography.fontWeight).map((k) => [
          k,
          `var(--tui-font-weight-${toKebab(k)})`,
        ])
      ),

      lineHeight: Object.fromEntries(
        Object.keys(typography.lineHeight).map((k) => [
          k,
          `var(--tui-leading-${toKebab(k)})`,
        ])
      ),

      letterSpacing: Object.fromEntries(
        Object.keys(typography.letterSpacing).map((k) => [
          k,
          `var(--tui-tracking-${toKebab(k)})`,
        ])
      ),

      borderRadius: Object.fromEntries(
        Object.keys(radius).map((k) => [
          k,
          `var(--tui-radius-${toKebab(k)})`,
        ])
      ),

      boxShadow: Object.fromEntries(
        Object.keys(shadow).map((k) => [
          k,
          `var(--tui-shadow-${toKebab(k)})`,
        ])
      ),

      borderWidth: Object.fromEntries(
        Object.keys(border.width).map((k) => [
          k,
          `var(--tui-border-width-${toKebab(k)})`,
        ])
      ),

      zIndex: Object.fromEntries(
        Object.keys(zIndex).map((k) => [
          k,
          `var(--tui-z-${toKebab(k)})`,
        ])
      ),

      transitionDuration: Object.fromEntries(
        Object.keys(animation.duration).map((k) => [
          k,
          `var(--tui-duration-${toKebab(k)})`,
        ])
      ),

      transitionTimingFunction: Object.fromEntries(
        Object.keys(animation.easing).map((k) => [
          k,
          `var(--tui-ease-${toKebab(k)})`,
        ])
      ),

      opacity: Object.fromEntries(
        Object.keys(opacity).map((k) => [
          k,
          `var(--tui-opacity-${toKebab(k)})`,
        ])
      ),

      screens: breakpoint,
    },
  },
};

// Write as CJS module
const presetContent = `/**
 * TantuUI Tailwind CSS Preset
 * Generated — do not edit manually.
 *
 * Usage in tailwind.config.js:
 *   const tuiPreset = require("@tantuui/tokens/tailwind-preset");
 *   module.exports = { presets: [tuiPreset], ... };
 *
 * Or ESM:
 *   import tuiPreset from "@tantuui/tokens/tailwind-preset";
 */
module.exports = ${JSON.stringify(tailwindPreset, null, 2)};\n`;

fs.writeFileSync(path.join(distDir, "tailwind-preset.js"), presetContent, "utf-8");
console.log("✅  dist/tailwind-preset.js written");

// ─── utilities.css (tui-* utility classes — works without Tailwind) ──────

function generateUtilitiesCSS() {
  const lines = [];

  lines.push(`/**
 * TantuUI Utility Classes
 * Generated — do not edit manually.
 * Prefix: tui-*
 *
 * Use these classes directly without Tailwind:
 *   @import "@tantuui/tokens/css/utilities";
 *
 *   <div class="tui-bg-primary-600 tui-text-white tui-p-4 tui-rounded-lg">
 */\n`);

  // ── Background colors: tui-bg-<name>
  const colorFlat = flattenTokens(color.primitive, "--tui-color");
  for (const [varName] of Object.entries(colorFlat)) {
    const cls = varName.replace("--tui-color-", "tui-bg-");
    lines.push(`.${cls} { background-color: var(${varName}); }`);
  }
  lines.push("");

  // ── Text colors: tui-text-<name>
  for (const [varName] of Object.entries(colorFlat)) {
    const cls = varName.replace("--tui-color-", "tui-text-");
    lines.push(`.${cls} { color: var(${varName}); }`);
  }
  lines.push("");

  // ── Border colors: tui-border-<name>
  for (const [varName] of Object.entries(colorFlat)) {
    const cls = varName.replace("--tui-color-", "tui-border-");
    lines.push(`.${cls} { border-color: var(${varName}); }`);
  }
  lines.push("");

  // ── Padding: tui-p-<n>, tui-px-<n>, tui-py-<n>, tui-pt/pr/pb/pl-<n>
  const spacingFlat = flattenTokens(spacing, "--tui-spacing");
  for (const [varName] of Object.entries(spacingFlat)) {
    const key = varName.replace("--tui-spacing-", "");
    lines.push(`.tui-p-${key} { padding: var(${varName}); }`);
    lines.push(`.tui-px-${key} { padding-left: var(${varName}); padding-right: var(${varName}); }`);
    lines.push(`.tui-py-${key} { padding-top: var(${varName}); padding-bottom: var(${varName}); }`);
    lines.push(`.tui-pt-${key} { padding-top: var(${varName}); }`);
    lines.push(`.tui-pr-${key} { padding-right: var(${varName}); }`);
    lines.push(`.tui-pb-${key} { padding-bottom: var(${varName}); }`);
    lines.push(`.tui-pl-${key} { padding-left: var(${varName}); }`);
  }
  lines.push("");

  // ── Margin: tui-m-<n>, tui-mx-<n>, tui-my-<n>, tui-mt/mr/mb/ml-<n>
  for (const [varName] of Object.entries(spacingFlat)) {
    const key = varName.replace("--tui-spacing-", "");
    lines.push(`.tui-m-${key} { margin: var(${varName}); }`);
    lines.push(`.tui-mx-${key} { margin-left: var(${varName}); margin-right: var(${varName}); }`);
    lines.push(`.tui-my-${key} { margin-top: var(${varName}); margin-bottom: var(${varName}); }`);
    lines.push(`.tui-mt-${key} { margin-top: var(${varName}); }`);
    lines.push(`.tui-mr-${key} { margin-right: var(${varName}); }`);
    lines.push(`.tui-mb-${key} { margin-bottom: var(${varName}); }`);
    lines.push(`.tui-ml-${key} { margin-left: var(${varName}); }`);
  }
  lines.push("");

  // ── Gap: tui-gap-<n>
  for (const [varName] of Object.entries(spacingFlat)) {
    const key = varName.replace("--tui-spacing-", "");
    lines.push(`.tui-gap-${key} { gap: var(${varName}); }`);
  }
  lines.push("");

  // ── Font size: tui-text-<size> — includes matched default line-height
  // Like Tailwind: text-sm sets both font-size + line-height
  const fontSizeLeadingMap = {
    "2xs": "var(--tui-leading-4)",    // 10px font → 1rem leading
    "xs":  "var(--tui-leading-4)",    // 12px font → 1rem leading
    "sm":  "var(--tui-leading-5)",    // 14px font → 1.25rem leading
    "md":  "var(--tui-leading-6)",    // 16px font → 1.5rem leading
    "lg":  "var(--tui-leading-7)",    // 18px font → 1.75rem leading
    "xl":  "var(--tui-leading-7)",    // 20px font → 1.75rem leading
    "2xl": "var(--tui-leading-8)",    // 24px font → 2rem leading
    "3xl": "var(--tui-leading-9)",    // 30px font → 2.25rem leading
    "4xl": "var(--tui-leading-10)",   // 36px font → 2.5rem leading
    "5xl": "var(--tui-leading-none)", // 48px font → 1 (tight)
    "6xl": "var(--tui-leading-none)", // 60px font → 1 (tight)
    "7xl": "var(--tui-leading-none)", // 72px font → 1 (tight)
  };
  for (const [key] of Object.entries(typography.fontSize)) {
    const k = toKebab(key);
    const varName = `--tui-font-size-${k}`;
    const defaultLeading = fontSizeLeadingMap[key] || "var(--tui-leading-normal)";
    lines.push(`.tui-text-${k} { font-size: var(${varName}); line-height: ${defaultLeading}; }`);
  }
  lines.push("");

  // ── Font weight: tui-font-<weight>
  for (const [key] of Object.entries(typography.fontWeight)) {
    const varName = `--tui-font-weight-${toKebab(key)}`;
    lines.push(`.tui-font-${toKebab(key)} { font-weight: var(${varName}); }`);
  }
  lines.push("");

  // ── Border radius: tui-rounded-<size>
  for (const [key] of Object.entries(radius)) {
    const varName = `--tui-radius-${toKebab(key)}`;
    lines.push(`.tui-rounded-${toKebab(key)} { border-radius: var(${varName}); }`);
  }
  lines.push("");

  // ── Box shadow: tui-shadow-<size>
  for (const [key] of Object.entries(shadow)) {
    const varName = `--tui-shadow-${toKebab(key)}`;
    lines.push(`.tui-shadow-${toKebab(key)} { box-shadow: var(${varName}); }`);
  }
  lines.push("");

  // ── Opacity: tui-opacity-<n>
  for (const [key] of Object.entries(opacity)) {
    const varName = `--tui-opacity-${toKebab(key)}`;
    lines.push(`.tui-opacity-${toKebab(key)} { opacity: var(${varName}); }`);
  }
  lines.push("");

  // ── Z-index: tui-z-<name>
  for (const [key] of Object.entries(zIndex)) {
    const varName = `--tui-z-${toKebab(key)}`;
    lines.push(`.tui-z-${toKebab(key)} { z-index: var(${varName}); }`);
  }
  lines.push("");

  // ── Display utilities
  lines.push(`.tui-block { display: block; }`);
  lines.push(`.tui-inline-block { display: inline-block; }`);
  lines.push(`.tui-inline { display: inline; }`);
  lines.push(`.tui-flex { display: flex; }`);
  lines.push(`.tui-inline-flex { display: inline-flex; }`);
  lines.push(`.tui-grid { display: grid; }`);
  lines.push(`.tui-hidden { display: none; }`);
  lines.push("");

  // ── Flex direction
  lines.push(`.tui-flex-row { flex-direction: row; }`);
  lines.push(`.tui-flex-col { flex-direction: column; }`);
  lines.push(`.tui-flex-row-reverse { flex-direction: row-reverse; }`);
  lines.push(`.tui-flex-col-reverse { flex-direction: column-reverse; }`);
  lines.push("");

  // ── Align / Justify
  lines.push(`.tui-items-start { align-items: flex-start; }`);
  lines.push(`.tui-items-end { align-items: flex-end; }`);
  lines.push(`.tui-items-center { align-items: center; }`);
  lines.push(`.tui-items-stretch { align-items: stretch; }`);
  lines.push(`.tui-items-baseline { align-items: baseline; }`);
  lines.push(`.tui-justify-start { justify-content: flex-start; }`);
  lines.push(`.tui-justify-end { justify-content: flex-end; }`);
  lines.push(`.tui-justify-center { justify-content: center; }`);
  lines.push(`.tui-justify-between { justify-content: space-between; }`);
  lines.push(`.tui-justify-around { justify-content: space-around; }`);
  lines.push(`.tui-justify-evenly { justify-content: space-evenly; }`);
  lines.push("");

  // ── Width / Height — using spacing tokens
  for (const [varName] of Object.entries(spacingFlat)) {
    const key = varName.replace("--tui-spacing-", "");
    lines.push(`.tui-w-${key} { width: var(${varName}); }`);
    lines.push(`.tui-h-${key} { height: var(${varName}); }`);
  }
  lines.push("");

  // ── Width / Height — keywords & fractions
  lines.push(`.tui-w-full { width: 100%; }`);
  lines.push(`.tui-w-auto { width: auto; }`);
  lines.push(`.tui-w-screen { width: 100vw; }`);
  lines.push(`.tui-w-min { width: min-content; }`);
  lines.push(`.tui-w-max { width: max-content; }`);
  lines.push(`.tui-w-fit { width: fit-content; }`);
  lines.push(`.tui-w-1\\/2 { width: 50%; }`);
  lines.push(`.tui-w-1\\/3 { width: 33.333333%; }`);
  lines.push(`.tui-w-2\\/3 { width: 66.666667%; }`);
  lines.push(`.tui-w-1\\/4 { width: 25%; }`);
  lines.push(`.tui-w-3\\/4 { width: 75%; }`);
  lines.push(`.tui-w-1\\/5 { width: 20%; }`);
  lines.push(`.tui-w-2\\/5 { width: 40%; }`);
  lines.push(`.tui-w-3\\/5 { width: 60%; }`);
  lines.push(`.tui-w-4\\/5 { width: 80%; }`);
  lines.push("");

  lines.push(`.tui-h-full { height: 100%; }`);
  lines.push(`.tui-h-auto { height: auto; }`);
  lines.push(`.tui-h-screen { height: 100vh; }`);
  lines.push(`.tui-h-min { height: min-content; }`);
  lines.push(`.tui-h-max { height: max-content; }`);
  lines.push(`.tui-h-fit { height: fit-content; }`);
  lines.push(`.tui-h-1\\/2 { height: 50%; }`);
  lines.push(`.tui-h-1\\/3 { height: 33.333333%; }`);
  lines.push(`.tui-h-2\\/3 { height: 66.666667%; }`);
  lines.push("");

  lines.push(`.tui-min-w-0 { min-width: 0; }`);
  lines.push(`.tui-min-w-full { min-width: 100%; }`);
  lines.push(`.tui-min-w-min { min-width: min-content; }`);
  lines.push(`.tui-min-w-max { min-width: max-content; }`);
  lines.push(`.tui-min-w-fit { min-width: fit-content; }`);
  lines.push(`.tui-max-w-full { max-width: 100%; }`);
  lines.push(`.tui-max-w-none { max-width: none; }`);
  lines.push(`.tui-max-w-screen { max-width: 100vw; }`);
  lines.push(`.tui-max-w-min { max-width: min-content; }`);
  lines.push(`.tui-max-w-max { max-width: max-content; }`);
  lines.push(`.tui-max-w-fit { max-width: fit-content; }`);
  lines.push(`.tui-min-h-0 { min-height: 0; }`);
  lines.push(`.tui-min-h-full { min-height: 100%; }`);
  lines.push(`.tui-min-h-screen { min-height: 100vh; }`);
  lines.push(`.tui-min-h-min { min-height: min-content; }`);
  lines.push(`.tui-min-h-max { min-height: max-content; }`);
  lines.push(`.tui-min-h-fit { min-height: fit-content; }`);
  lines.push(`.tui-max-h-full { max-height: 100%; }`);
  lines.push(`.tui-max-h-screen { max-height: 100vh; }`);
  lines.push(`.tui-max-h-none { max-height: none; }`);
  lines.push(`.tui-max-h-min { max-height: min-content; }`);
  lines.push(`.tui-max-h-max { max-height: max-content; }`);
  lines.push(`.tui-max-h-fit { max-height: fit-content; }`);
  lines.push("");

  // ── Max-width container sizes
  lines.push(`.tui-max-w-xs { max-width: 20rem; }`);     // 320px
  lines.push(`.tui-max-w-sm { max-width: 24rem; }`);     // 384px
  lines.push(`.tui-max-w-md { max-width: 28rem; }`);     // 448px
  lines.push(`.tui-max-w-lg { max-width: 32rem; }`);     // 512px
  lines.push(`.tui-max-w-xl { max-width: 36rem; }`);     // 576px
  lines.push(`.tui-max-w-2xl { max-width: 42rem; }`);    // 672px
  lines.push(`.tui-max-w-3xl { max-width: 48rem; }`);    // 768px
  lines.push(`.tui-max-w-4xl { max-width: 56rem; }`);    // 896px
  lines.push(`.tui-max-w-5xl { max-width: 64rem; }`);    // 1024px
  lines.push(`.tui-max-w-6xl { max-width: 72rem; }`);    // 1152px
  lines.push(`.tui-max-w-7xl { max-width: 80rem; }`);    // 1280px
  lines.push("");

  // ── Border width: tui-border, tui-border-<n>
  for (const [key] of Object.entries(border.width)) {
    const varName = `--tui-border-width-${toKebab(key)}`;
    if (key === "1") {
      lines.push(`.tui-border { border-width: var(${varName}); border-style: solid; }`);
      lines.push(`.tui-border-t { border-top-width: var(${varName}); border-top-style: solid; }`);
      lines.push(`.tui-border-r { border-right-width: var(${varName}); border-right-style: solid; }`);
      lines.push(`.tui-border-b { border-bottom-width: var(${varName}); border-bottom-style: solid; }`);
      lines.push(`.tui-border-l { border-left-width: var(${varName}); border-left-style: solid; }`);
      lines.push(`.tui-border-x { border-left-width: var(${varName}); border-left-style: solid; border-right-width: var(${varName}); border-right-style: solid; }`);
      lines.push(`.tui-border-y { border-top-width: var(${varName}); border-top-style: solid; border-bottom-width: var(${varName}); border-bottom-style: solid; }`);
    }
    lines.push(`.tui-border-${toKebab(key)} { border-width: var(${varName}); border-style: solid; }`);
    lines.push(`.tui-border-t-${toKebab(key)} { border-top-width: var(${varName}); border-top-style: solid; }`);
    lines.push(`.tui-border-r-${toKebab(key)} { border-right-width: var(${varName}); border-right-style: solid; }`);
    lines.push(`.tui-border-b-${toKebab(key)} { border-bottom-width: var(${varName}); border-bottom-style: solid; }`);
    lines.push(`.tui-border-l-${toKebab(key)} { border-left-width: var(${varName}); border-left-style: solid; }`);
    lines.push(`.tui-border-x-${toKebab(key)} { border-left-width: var(${varName}); border-left-style: solid; border-right-width: var(${varName}); border-right-style: solid; }`);
    lines.push(`.tui-border-y-${toKebab(key)} { border-top-width: var(${varName}); border-top-style: solid; border-bottom-width: var(${varName}); border-bottom-style: solid; }`);
  }
  lines.push(`.tui-border-none { border: none; }`);
  lines.push("");

  // ── Border style
  lines.push(`.tui-border-solid { border-style: solid; }`);
  lines.push(`.tui-border-dashed { border-style: dashed; }`);
  lines.push(`.tui-border-dotted { border-style: dotted; }`);
  lines.push(`.tui-border-hidden { border-style: hidden; }`);
  lines.push("");

  // ── Border radius per-corner
  for (const [key] of Object.entries(radius)) {
    const k = toKebab(key);
    const varName = `--tui-radius-${k}`;
    lines.push(`.tui-rounded-t-${k} { border-top-left-radius: var(${varName}); border-top-right-radius: var(${varName}); }`);
    lines.push(`.tui-rounded-b-${k} { border-bottom-left-radius: var(${varName}); border-bottom-right-radius: var(${varName}); }`);
    lines.push(`.tui-rounded-l-${k} { border-top-left-radius: var(${varName}); border-bottom-left-radius: var(${varName}); }`);
    lines.push(`.tui-rounded-r-${k} { border-top-right-radius: var(${varName}); border-bottom-right-radius: var(${varName}); }`);
  }
  lines.push("");

  // ── Position
  lines.push(`.tui-static { position: static; }`);
  lines.push(`.tui-relative { position: relative; }`);
  lines.push(`.tui-absolute { position: absolute; }`);
  lines.push(`.tui-fixed { position: fixed; }`);
  lines.push(`.tui-sticky { position: sticky; }`);
  lines.push("");

  // ── Inset (top/right/bottom/left)
  lines.push(`.tui-inset-0 { inset: 0; }`);
  lines.push(`.tui-top-0 { top: 0; }`);
  lines.push(`.tui-right-0 { right: 0; }`);
  lines.push(`.tui-bottom-0 { bottom: 0; }`);
  lines.push(`.tui-left-0 { left: 0; }`);
  lines.push(`.tui-inset-auto { inset: auto; }`);
  lines.push("");

  // ── Overflow
  lines.push(`.tui-overflow-auto { overflow: auto; }`);
  lines.push(`.tui-overflow-hidden { overflow: hidden; }`);
  lines.push(`.tui-overflow-visible { overflow: visible; }`);
  lines.push(`.tui-overflow-scroll { overflow: scroll; }`);
  lines.push(`.tui-overflow-x-auto { overflow-x: auto; }`);
  lines.push(`.tui-overflow-x-hidden { overflow-x: hidden; }`);
  lines.push(`.tui-overflow-y-auto { overflow-y: auto; }`);
  lines.push(`.tui-overflow-y-hidden { overflow-y: hidden; }`);
  lines.push("");

  // ── Text align
  lines.push(`.tui-text-left { text-align: left; }`);
  lines.push(`.tui-text-center { text-align: center; }`);
  lines.push(`.tui-text-right { text-align: right; }`);
  lines.push(`.tui-text-justify { text-align: justify; }`);
  lines.push("");

  // ── Text decoration
  lines.push(`.tui-underline { text-decoration: underline; }`);
  lines.push(`.tui-line-through { text-decoration: line-through; }`);
  lines.push(`.tui-no-underline { text-decoration: none; }`);
  lines.push("");

  // ── Text transform
  lines.push(`.tui-uppercase { text-transform: uppercase; }`);
  lines.push(`.tui-lowercase { text-transform: lowercase; }`);
  lines.push(`.tui-capitalize { text-transform: capitalize; }`);
  lines.push(`.tui-normal-case { text-transform: none; }`);
  lines.push("");

  // ── Whitespace
  lines.push(`.tui-whitespace-normal { white-space: normal; }`);
  lines.push(`.tui-whitespace-nowrap { white-space: nowrap; }`);
  lines.push(`.tui-whitespace-pre { white-space: pre; }`);
  lines.push(`.tui-whitespace-pre-wrap { white-space: pre-wrap; }`);
  lines.push("");

  // ── Text overflow
  lines.push(`.tui-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`);
  lines.push(`.tui-text-ellipsis { text-overflow: ellipsis; }`);
  lines.push(`.tui-text-clip { text-overflow: clip; }`);
  lines.push("");

  // ── Flex wrap
  lines.push(`.tui-flex-wrap { flex-wrap: wrap; }`);
  lines.push(`.tui-flex-nowrap { flex-wrap: nowrap; }`);
  lines.push(`.tui-flex-wrap-reverse { flex-wrap: wrap-reverse; }`);
  lines.push("");

  // ── Flex grow/shrink
  lines.push(`.tui-flex-1 { flex: 1 1 0%; }`);
  lines.push(`.tui-flex-auto { flex: 1 1 auto; }`);
  lines.push(`.tui-flex-initial { flex: 0 1 auto; }`);
  lines.push(`.tui-flex-none { flex: none; }`);
  lines.push(`.tui-grow { flex-grow: 1; }`);
  lines.push(`.tui-grow-0 { flex-grow: 0; }`);
  lines.push(`.tui-shrink { flex-shrink: 1; }`);
  lines.push(`.tui-shrink-0 { flex-shrink: 0; }`);
  lines.push("");

  // ── Self alignment
  lines.push(`.tui-self-auto { align-self: auto; }`);
  lines.push(`.tui-self-start { align-self: flex-start; }`);
  lines.push(`.tui-self-end { align-self: flex-end; }`);
  lines.push(`.tui-self-center { align-self: center; }`);
  lines.push(`.tui-self-stretch { align-self: stretch; }`);
  lines.push("");

  // ── Cursor
  lines.push(`.tui-cursor-auto { cursor: auto; }`);
  lines.push(`.tui-cursor-default { cursor: default; }`);
  lines.push(`.tui-cursor-pointer { cursor: pointer; }`);
  lines.push(`.tui-cursor-wait { cursor: wait; }`);
  lines.push(`.tui-cursor-text { cursor: text; }`);
  lines.push(`.tui-cursor-move { cursor: move; }`);
  lines.push(`.tui-cursor-not-allowed { cursor: not-allowed; }`);
  lines.push(`.tui-cursor-grab { cursor: grab; }`);
  lines.push("");

  // ── Pointer events
  lines.push(`.tui-pointer-events-none { pointer-events: none; }`);
  lines.push(`.tui-pointer-events-auto { pointer-events: auto; }`);
  lines.push("");

  // ── User select
  lines.push(`.tui-select-none { user-select: none; }`);
  lines.push(`.tui-select-text { user-select: text; }`);
  lines.push(`.tui-select-all { user-select: all; }`);
  lines.push(`.tui-select-auto { user-select: auto; }`);
  lines.push("");

  // ── Visibility
  lines.push(`.tui-visible { visibility: visible; }`);
  lines.push(`.tui-invisible { visibility: hidden; }`);
  lines.push("");

  // ── Transition
  lines.push(`.tui-transition-all { transition-property: all; transition-timing-function: var(--tui-ease-in-out); transition-duration: var(--tui-duration-normal); }`);
  lines.push(`.tui-transition-colors { transition-property: color, background-color, border-color; transition-timing-function: var(--tui-ease-in-out); transition-duration: var(--tui-duration-normal); }`);
  lines.push(`.tui-transition-opacity { transition-property: opacity; transition-timing-function: var(--tui-ease-in-out); transition-duration: var(--tui-duration-normal); }`);
  lines.push(`.tui-transition-transform { transition-property: transform; transition-timing-function: var(--tui-ease-in-out); transition-duration: var(--tui-duration-normal); }`);
  lines.push(`.tui-transition-none { transition-property: none; }`);
  lines.push("");

  // ── Transform
  lines.push(`.tui-transform-none { transform: none; }`);
  lines.push("");

  // ── Object fit
  lines.push(`.tui-object-contain { object-fit: contain; }`);
  lines.push(`.tui-object-cover { object-fit: cover; }`);
  lines.push(`.tui-object-fill { object-fit: fill; }`);
  lines.push(`.tui-object-none { object-fit: none; }`);
  lines.push("");

  // ── Aspect ratio
  lines.push(`.tui-aspect-auto { aspect-ratio: auto; }`);
  lines.push(`.tui-aspect-square { aspect-ratio: 1; }`);
  lines.push(`.tui-aspect-video { aspect-ratio: 16 / 9; }`);
  lines.push("");

  // ── Line height: tui-leading-<name>
  for (const [key] of Object.entries(typography.lineHeight)) {
    const varName = `--tui-leading-${toKebab(key)}`;
    lines.push(`.tui-leading-${toKebab(key)} { line-height: var(${varName}); }`);
  }
  lines.push("");

  // ── Letter spacing: tui-tracking-<name>
  for (const [key] of Object.entries(typography.letterSpacing)) {
    const varName = `--tui-tracking-${toKebab(key)}`;
    lines.push(`.tui-tracking-${toKebab(key)} { letter-spacing: var(${varName}); }`);
  }
  lines.push("");

  // ── Font family
  lines.push(`.tui-font-sans { font-family: var(--tui-font-family-sans); }`);
  lines.push(`.tui-font-serif { font-family: var(--tui-font-family-serif); }`);
  lines.push(`.tui-font-mono { font-family: var(--tui-font-family-mono); }`);
  lines.push("");

  // ── List style
  lines.push(`.tui-list-none { list-style-type: none; }`);
  lines.push(`.tui-list-disc { list-style-type: disc; }`);
  lines.push(`.tui-list-decimal { list-style-type: decimal; }`);
  lines.push("");

  // ── Box sizing
  lines.push(`.tui-box-border { box-sizing: border-box; }`);
  lines.push(`.tui-box-content { box-sizing: content-box; }`);
  lines.push("");

  // ── Word break / overflow wrap
  lines.push(`.tui-break-normal { overflow-wrap: normal; word-break: normal; }`);
  lines.push(`.tui-break-words { overflow-wrap: break-word; }`);
  lines.push(`.tui-break-all { word-break: break-all; }`);
  lines.push(`.tui-break-keep { word-break: keep-all; }`);
  lines.push("");

  // ── Hyphens
  lines.push(`.tui-hyphens-none { hyphens: none; }`);
  lines.push(`.tui-hyphens-manual { hyphens: manual; }`);
  lines.push(`.tui-hyphens-auto { hyphens: auto; }`);
  lines.push("");

  // ── Float / Clear
  lines.push(`.tui-float-left { float: left; }`);
  lines.push(`.tui-float-right { float: right; }`);
  lines.push(`.tui-float-none { float: none; }`);
  lines.push(`.tui-clear-left { clear: left; }`);
  lines.push(`.tui-clear-right { clear: right; }`);
  lines.push(`.tui-clear-both { clear: both; }`);
  lines.push(`.tui-clear-none { clear: none; }`);
  lines.push("");

  // ── Table layout
  lines.push(`.tui-table-auto { table-layout: auto; }`);
  lines.push(`.tui-table-fixed { table-layout: fixed; }`);
  lines.push(`.tui-border-collapse { border-collapse: collapse; }`);
  lines.push(`.tui-border-separate { border-collapse: separate; }`);
  lines.push("");

  // ── Resize
  lines.push(`.tui-resize-none { resize: none; }`);
  lines.push(`.tui-resize { resize: both; }`);
  lines.push(`.tui-resize-x { resize: horizontal; }`);
  lines.push(`.tui-resize-y { resize: vertical; }`);
  lines.push("");

  // ── Appearance
  lines.push(`.tui-appearance-none { appearance: none; -webkit-appearance: none; }`);
  lines.push(`.tui-appearance-auto { appearance: auto; }`);
  lines.push("");

  // ── Outline
  lines.push(`.tui-outline-none { outline: 2px solid transparent; outline-offset: 2px; }`);
  lines.push(`.tui-outline { outline-style: solid; }`);
  lines.push(`.tui-outline-dashed { outline-style: dashed; }`);
  lines.push(`.tui-outline-dotted { outline-style: dotted; }`);
  lines.push(`.tui-outline-offset-0 { outline-offset: 0px; }`);
  lines.push(`.tui-outline-offset-1 { outline-offset: 1px; }`);
  lines.push(`.tui-outline-offset-2 { outline-offset: 2px; }`);
  lines.push(`.tui-outline-offset-4 { outline-offset: 4px; }`);
  lines.push(`.tui-outline-offset-8 { outline-offset: 8px; }`);
  lines.push("");

  // ── Ring (box-shadow based focus rings)
  lines.push(`.tui-ring-0 { box-shadow: 0 0 0 0px var(--tui-color-focus-ring); }`);
  lines.push(`.tui-ring-1 { box-shadow: 0 0 0 1px var(--tui-color-focus-ring); }`);
  lines.push(`.tui-ring-2 { box-shadow: 0 0 0 2px var(--tui-color-focus-ring); }`);
  lines.push(`.tui-ring-4 { box-shadow: 0 0 0 4px var(--tui-color-focus-ring); }`);
  lines.push(`.tui-ring-8 { box-shadow: 0 0 0 8px var(--tui-color-focus-ring); }`);
  lines.push(`.tui-ring-inset { --tui-ring-inset: inset; }`);
  lines.push("");

  // ── Isolation
  lines.push(`.tui-isolate { isolation: isolate; }`);
  lines.push(`.tui-isolation-auto { isolation: auto; }`);
  lines.push("");

  // ── Object position
  lines.push(`.tui-object-bottom { object-position: bottom; }`);
  lines.push(`.tui-object-center { object-position: center; }`);
  lines.push(`.tui-object-left { object-position: left; }`);
  lines.push(`.tui-object-right { object-position: right; }`);
  lines.push(`.tui-object-top { object-position: top; }`);
  lines.push("");

  // ── Vertical align
  lines.push(`.tui-align-baseline { vertical-align: baseline; }`);
  lines.push(`.tui-align-top { vertical-align: top; }`);
  lines.push(`.tui-align-middle { vertical-align: middle; }`);
  lines.push(`.tui-align-bottom { vertical-align: bottom; }`);
  lines.push(`.tui-align-text-top { vertical-align: text-top; }`);
  lines.push(`.tui-align-text-bottom { vertical-align: text-bottom; }`);
  lines.push(`.tui-align-sub { vertical-align: sub; }`);
  lines.push(`.tui-align-super { vertical-align: super; }`);
  lines.push("");

  // ── Content (grid/flex alignment)
  lines.push(`.tui-content-start { align-content: flex-start; }`);
  lines.push(`.tui-content-end { align-content: flex-end; }`);
  lines.push(`.tui-content-center { align-content: center; }`);
  lines.push(`.tui-content-between { align-content: space-between; }`);
  lines.push(`.tui-content-around { align-content: space-around; }`);
  lines.push(`.tui-content-evenly { align-content: space-evenly; }`);
  lines.push(`.tui-content-stretch { align-content: stretch; }`);
  lines.push("");

  // ── Place items / content / self
  lines.push(`.tui-place-items-start { place-items: start; }`);
  lines.push(`.tui-place-items-end { place-items: end; }`);
  lines.push(`.tui-place-items-center { place-items: center; }`);
  lines.push(`.tui-place-items-stretch { place-items: stretch; }`);
  lines.push(`.tui-place-content-start { place-content: start; }`);
  lines.push(`.tui-place-content-end { place-content: end; }`);
  lines.push(`.tui-place-content-center { place-content: center; }`);
  lines.push(`.tui-place-content-between { place-content: space-between; }`);
  lines.push(`.tui-place-content-around { place-content: space-around; }`);
  lines.push(`.tui-place-content-evenly { place-content: space-evenly; }`);
  lines.push(`.tui-place-content-stretch { place-content: stretch; }`);
  lines.push(`.tui-place-self-auto { place-self: auto; }`);
  lines.push(`.tui-place-self-start { place-self: start; }`);
  lines.push(`.tui-place-self-end { place-self: end; }`);
  lines.push(`.tui-place-self-center { place-self: center; }`);
  lines.push(`.tui-place-self-stretch { place-self: stretch; }`);
  lines.push("");

  // ── Order
  lines.push(`.tui-order-first { order: -9999; }`);
  lines.push(`.tui-order-last { order: 9999; }`);
  lines.push(`.tui-order-none { order: 0; }`);
  for (let i = 1; i <= 12; i++) {
    lines.push(`.tui-order-${i} { order: ${i}; }`);
  }
  lines.push("");

  // ── Grid template columns
  for (let i = 1; i <= 12; i++) {
    lines.push(`.tui-grid-cols-${i} { grid-template-columns: repeat(${i}, minmax(0, 1fr)); }`);
  }
  lines.push(`.tui-grid-cols-none { grid-template-columns: none; }`);
  lines.push(`.tui-grid-cols-subgrid { grid-template-columns: subgrid; }`);
  lines.push("");

  // ── Grid template rows
  for (let i = 1; i <= 6; i++) {
    lines.push(`.tui-grid-rows-${i} { grid-template-rows: repeat(${i}, minmax(0, 1fr)); }`);
  }
  lines.push(`.tui-grid-rows-none { grid-template-rows: none; }`);
  lines.push(`.tui-grid-rows-subgrid { grid-template-rows: subgrid; }`);
  lines.push("");

  // ── Grid column span
  lines.push(`.tui-col-auto { grid-column: auto; }`);
  for (let i = 1; i <= 12; i++) {
    lines.push(`.tui-col-span-${i} { grid-column: span ${i} / span ${i}; }`);
  }
  lines.push(`.tui-col-span-full { grid-column: 1 / -1; }`);
  lines.push(`.tui-col-start-auto { grid-column-start: auto; }`);
  for (let i = 1; i <= 13; i++) {
    lines.push(`.tui-col-start-${i} { grid-column-start: ${i}; }`);
  }
  lines.push(`.tui-col-end-auto { grid-column-end: auto; }`);
  for (let i = 1; i <= 13; i++) {
    lines.push(`.tui-col-end-${i} { grid-column-end: ${i}; }`);
  }
  lines.push("");

  // ── Grid row span
  lines.push(`.tui-row-auto { grid-row: auto; }`);
  for (let i = 1; i <= 6; i++) {
    lines.push(`.tui-row-span-${i} { grid-row: span ${i} / span ${i}; }`);
  }
  lines.push(`.tui-row-span-full { grid-row: 1 / -1; }`);
  lines.push(`.tui-row-start-auto { grid-row-start: auto; }`);
  for (let i = 1; i <= 7; i++) {
    lines.push(`.tui-row-start-${i} { grid-row-start: ${i}; }`);
  }
  lines.push(`.tui-row-end-auto { grid-row-end: auto; }`);
  for (let i = 1; i <= 7; i++) {
    lines.push(`.tui-row-end-${i} { grid-row-end: ${i}; }`);
  }
  lines.push("");

  // ── Grid auto flow
  lines.push(`.tui-grid-flow-row { grid-auto-flow: row; }`);
  lines.push(`.tui-grid-flow-col { grid-auto-flow: column; }`);
  lines.push(`.tui-grid-flow-dense { grid-auto-flow: dense; }`);
  lines.push(`.tui-grid-flow-row-dense { grid-auto-flow: row dense; }`);
  lines.push(`.tui-grid-flow-col-dense { grid-auto-flow: column dense; }`);
  lines.push("");

  // ── Gap (row-gap / column-gap)
  for (const [varName] of Object.entries(spacingFlat)) {
    const key = varName.replace("--tui-spacing-", "");
    lines.push(`.tui-gap-x-${key} { column-gap: var(${varName}); }`);
    lines.push(`.tui-gap-y-${key} { row-gap: var(${varName}); }`);
  }
  lines.push("");

  // ── Columns (multi-column layout)
  for (let i = 1; i <= 12; i++) {
    lines.push(`.tui-columns-${i} { columns: ${i}; }`);
  }
  lines.push(`.tui-columns-auto { columns: auto; }`);
  lines.push("");

  // ── Break inside / before / after (column/page breaks)
  lines.push(`.tui-break-before-auto { break-before: auto; }`);
  lines.push(`.tui-break-before-avoid { break-before: avoid; }`);
  lines.push(`.tui-break-before-page { break-before: page; }`);
  lines.push(`.tui-break-before-column { break-before: column; }`);
  lines.push(`.tui-break-after-auto { break-after: auto; }`);
  lines.push(`.tui-break-after-avoid { break-after: avoid; }`);
  lines.push(`.tui-break-after-page { break-after: page; }`);
  lines.push(`.tui-break-after-column { break-after: column; }`);
  lines.push(`.tui-break-inside-auto { break-inside: auto; }`);
  lines.push(`.tui-break-inside-avoid { break-inside: avoid; }`);
  lines.push(`.tui-break-inside-avoid-page { break-inside: avoid-page; }`);
  lines.push(`.tui-break-inside-avoid-column { break-inside: avoid-column; }`);
  lines.push("");

  // ── Box decoration break
  lines.push(`.tui-decoration-slice { box-decoration-break: slice; -webkit-box-decoration-break: slice; }`);
  lines.push(`.tui-decoration-clone { box-decoration-break: clone; -webkit-box-decoration-break: clone; }`);
  lines.push("");

  // ── Accent color
  lines.push(`.tui-accent-auto { accent-color: auto; }`);
  lines.push(`.tui-accent-current { accent-color: currentColor; }`);
  lines.push("");

  // ── Caret color
  lines.push(`.tui-caret-current { caret-color: currentColor; }`);
  lines.push(`.tui-caret-transparent { caret-color: transparent; }`);
  lines.push("");

  // ── Scroll behavior
  lines.push(`.tui-scroll-auto { scroll-behavior: auto; }`);
  lines.push(`.tui-scroll-smooth { scroll-behavior: smooth; }`);
  lines.push("");

  // ── Scroll snap
  lines.push(`.tui-snap-start { scroll-snap-align: start; }`);
  lines.push(`.tui-snap-end { scroll-snap-align: end; }`);
  lines.push(`.tui-snap-center { scroll-snap-align: center; }`);
  lines.push(`.tui-snap-none { scroll-snap-type: none; }`);
  lines.push(`.tui-snap-x { scroll-snap-type: x var(--tui-snap-strictness, proximity); }`);
  lines.push(`.tui-snap-y { scroll-snap-type: y var(--tui-snap-strictness, proximity); }`);
  lines.push(`.tui-snap-both { scroll-snap-type: both var(--tui-snap-strictness, proximity); }`);
  lines.push(`.tui-snap-mandatory { --tui-snap-strictness: mandatory; }`);
  lines.push(`.tui-snap-proximity { --tui-snap-strictness: proximity; }`);
  lines.push("");

  // ── Touch action
  lines.push(`.tui-touch-auto { touch-action: auto; }`);
  lines.push(`.tui-touch-none { touch-action: none; }`);
  lines.push(`.tui-touch-pan-x { touch-action: pan-x; }`);
  lines.push(`.tui-touch-pan-y { touch-action: pan-y; }`);
  lines.push(`.tui-touch-manipulation { touch-action: manipulation; }`);
  lines.push(`.tui-touch-pinch-zoom { touch-action: pinch-zoom; }`);
  lines.push("");

  // ── Will change
  lines.push(`.tui-will-change-auto { will-change: auto; }`);
  lines.push(`.tui-will-change-scroll { will-change: scroll-position; }`);
  lines.push(`.tui-will-change-contents { will-change: contents; }`);
  lines.push(`.tui-will-change-transform { will-change: transform; }`);
  lines.push("");

  // ── Contain
  lines.push(`.tui-contain-none { contain: none; }`);
  lines.push(`.tui-contain-content { contain: content; }`);
  lines.push(`.tui-contain-strict { contain: strict; }`);
  lines.push(`.tui-contain-size { contain: size; }`);
  lines.push(`.tui-contain-layout { contain: layout; }`);
  lines.push(`.tui-contain-paint { contain: paint; }`);
  lines.push("");

  // ── Line clamp
  for (let i = 1; i <= 6; i++) {
    lines.push(`.tui-line-clamp-${i} { display: -webkit-box; -webkit-line-clamp: ${i}; -webkit-box-orient: vertical; overflow: hidden; }`);
  }
  lines.push(`.tui-line-clamp-none { display: block; -webkit-line-clamp: unset; -webkit-box-orient: horizontal; overflow: visible; }`);
  lines.push("");

  // ── Screen reader only
  lines.push(`.tui-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }`);
  lines.push(`.tui-not-sr-only { position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal; }`);
  lines.push("");

  // ── Margin auto
  lines.push(`.tui-mx-auto { margin-left: auto; margin-right: auto; }`);
  lines.push(`.tui-my-auto { margin-top: auto; margin-bottom: auto; }`);
  lines.push(`.tui-ml-auto { margin-left: auto; }`);
  lines.push(`.tui-mr-auto { margin-right: auto; }`);
  lines.push(`.tui-mt-auto { margin-top: auto; }`);
  lines.push(`.tui-mb-auto { margin-bottom: auto; }`);
  lines.push(`.tui-m-auto { margin: auto; }`);
  lines.push("");

  // ── CSS global keyword utilities (inherit, initial, unset, revert)
  // Width / Height
  lines.push(`.tui-w-inherit { width: inherit; }`);
  lines.push(`.tui-w-initial { width: initial; }`);
  lines.push(`.tui-w-unset { width: unset; }`);
  lines.push(`.tui-h-inherit { height: inherit; }`);
  lines.push(`.tui-h-initial { height: initial; }`);
  lines.push(`.tui-h-unset { height: unset; }`);
  // Min/Max
  lines.push(`.tui-min-w-inherit { min-width: inherit; }`);
  lines.push(`.tui-max-w-inherit { max-width: inherit; }`);
  lines.push(`.tui-min-h-inherit { min-height: inherit; }`);
  lines.push(`.tui-max-h-inherit { max-height: inherit; }`);
  // Font
  lines.push(`.tui-text-inherit { font-size: inherit; color: inherit; }`);
  lines.push(`.tui-text-initial { font-size: initial; }`);
  lines.push(`.tui-font-inherit { font-weight: inherit; }`);
  lines.push(`.tui-font-initial { font-weight: initial; }`);
  lines.push(`.tui-leading-inherit { line-height: inherit; }`);
  lines.push(`.tui-leading-initial { line-height: initial; }`);
  lines.push(`.tui-tracking-inherit { letter-spacing: inherit; }`);
  lines.push(`.tui-tracking-initial { letter-spacing: initial; }`);
  // Color
  lines.push(`.tui-color-inherit { color: inherit; }`);
  lines.push(`.tui-bg-inherit { background-color: inherit; }`);
  lines.push(`.tui-bg-transparent { background-color: transparent; }`);
  lines.push(`.tui-bg-current { background-color: currentColor; }`);
  lines.push(`.tui-text-transparent { color: transparent; }`);
  lines.push(`.tui-text-current { color: currentColor; }`);
  lines.push(`.tui-border-inherit { border-color: inherit; }`);
  lines.push(`.tui-border-transparent { border-color: transparent; }`);
  lines.push(`.tui-border-current { border-color: currentColor; }`);
  // Display
  lines.push(`.tui-display-inherit { display: inherit; }`);
  // Padding/Margin
  lines.push(`.tui-p-inherit { padding: inherit; }`);
  lines.push(`.tui-m-inherit { margin: inherit; }`);
  // Gap
  lines.push(`.tui-gap-inherit { gap: inherit; }`);
  // Border radius
  lines.push(`.tui-rounded-inherit { border-radius: inherit; }`);
  // Opacity
  lines.push(`.tui-opacity-inherit { opacity: inherit; }`);
  lines.push("");

  // ── Text wrap (modern)
  lines.push(`.tui-text-wrap { text-wrap: wrap; }`);
  lines.push(`.tui-text-nowrap { text-wrap: nowrap; }`);
  lines.push(`.tui-text-balance { text-wrap: balance; }`);
  lines.push(`.tui-text-pretty { text-wrap: pretty; }`);
  lines.push("");

  // ── Whitespace (additional)
  lines.push(`.tui-whitespace-pre-line { white-space: pre-line; }`);
  lines.push(`.tui-whitespace-break-spaces { white-space: break-spaces; }`);
  lines.push("");

  // ── Font smoothing
  lines.push(`.tui-antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`);
  lines.push(`.tui-subpixel-antialiased { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }`);
  lines.push("");

  // ── Animations
  lines.push(`.tui-animate-spin { animation: tui-spin 1s linear infinite; }`);
  lines.push(`.tui-animate-ping { animation: tui-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }`);
  lines.push(`.tui-animate-pulse { animation: tui-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }`);
  lines.push(`.tui-animate-bounce { animation: tui-bounce 1s infinite; }`);
  lines.push(`.tui-animate-none { animation: none; }`);
  lines.push(`@keyframes tui-spin { to { transform: rotate(360deg); } }`);
  lines.push(`@keyframes tui-ping { 75%, 100% { transform: scale(2); opacity: 0; } }`);
  lines.push(`@keyframes tui-pulse { 50% { opacity: 0.5; } }`);
  lines.push(`@keyframes tui-bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }`);
  lines.push("");

  // ── Transform: Scale
  lines.push(`.tui-scale-0 { transform: scale(0); }`);
  lines.push(`.tui-scale-50 { transform: scale(0.5); }`);
  lines.push(`.tui-scale-75 { transform: scale(0.75); }`);
  lines.push(`.tui-scale-90 { transform: scale(0.9); }`);
  lines.push(`.tui-scale-95 { transform: scale(0.95); }`);
  lines.push(`.tui-scale-100 { transform: scale(1); }`);
  lines.push(`.tui-scale-105 { transform: scale(1.05); }`);
  lines.push(`.tui-scale-110 { transform: scale(1.1); }`);
  lines.push(`.tui-scale-125 { transform: scale(1.25); }`);
  lines.push(`.tui-scale-150 { transform: scale(1.5); }`);
  lines.push("");

  // ── Transform: Rotate
  lines.push(`.tui-rotate-0 { transform: rotate(0deg); }`);
  lines.push(`.tui-rotate-1 { transform: rotate(1deg); }`);
  lines.push(`.tui-rotate-2 { transform: rotate(2deg); }`);
  lines.push(`.tui-rotate-3 { transform: rotate(3deg); }`);
  lines.push(`.tui-rotate-6 { transform: rotate(6deg); }`);
  lines.push(`.tui-rotate-12 { transform: rotate(12deg); }`);
  lines.push(`.tui-rotate-45 { transform: rotate(45deg); }`);
  lines.push(`.tui-rotate-90 { transform: rotate(90deg); }`);
  lines.push(`.tui-rotate-180 { transform: rotate(180deg); }`);
  lines.push(`.tui--rotate-1 { transform: rotate(-1deg); }`);
  lines.push(`.tui--rotate-2 { transform: rotate(-2deg); }`);
  lines.push(`.tui--rotate-3 { transform: rotate(-3deg); }`);
  lines.push(`.tui--rotate-6 { transform: rotate(-6deg); }`);
  lines.push(`.tui--rotate-12 { transform: rotate(-12deg); }`);
  lines.push(`.tui--rotate-45 { transform: rotate(-45deg); }`);
  lines.push(`.tui--rotate-90 { transform: rotate(-90deg); }`);
  lines.push(`.tui--rotate-180 { transform: rotate(-180deg); }`);
  lines.push("");

  // ── Transform: Translate
  lines.push(`.tui-translate-x-0 { transform: translateX(0); }`);
  lines.push(`.tui-translate-y-0 { transform: translateY(0); }`);
  lines.push(`.tui-translate-x-full { transform: translateX(100%); }`);
  lines.push(`.tui-translate-y-full { transform: translateY(100%); }`);
  lines.push(`.tui--translate-x-full { transform: translateX(-100%); }`);
  lines.push(`.tui--translate-y-full { transform: translateY(-100%); }`);
  lines.push(`.tui-translate-x-1\\/2 { transform: translateX(50%); }`);
  lines.push(`.tui-translate-y-1\\/2 { transform: translateY(50%); }`);
  lines.push(`.tui--translate-x-1\\/2 { transform: translateX(-50%); }`);
  lines.push(`.tui--translate-y-1\\/2 { transform: translateY(-50%); }`);
  lines.push("");

  // ── Transform origin
  lines.push(`.tui-origin-center { transform-origin: center; }`);
  lines.push(`.tui-origin-top { transform-origin: top; }`);
  lines.push(`.tui-origin-top-right { transform-origin: top right; }`);
  lines.push(`.tui-origin-right { transform-origin: right; }`);
  lines.push(`.tui-origin-bottom-right { transform-origin: bottom right; }`);
  lines.push(`.tui-origin-bottom { transform-origin: bottom; }`);
  lines.push(`.tui-origin-bottom-left { transform-origin: bottom left; }`);
  lines.push(`.tui-origin-left { transform-origin: left; }`);
  lines.push(`.tui-origin-top-left { transform-origin: top left; }`);
  lines.push("");

  // ── Filters: Blur
  lines.push(`.tui-blur-none { filter: blur(0); }`);
  lines.push(`.tui-blur-sm { filter: blur(4px); }`);
  lines.push(`.tui-blur { filter: blur(8px); }`);
  lines.push(`.tui-blur-md { filter: blur(12px); }`);
  lines.push(`.tui-blur-lg { filter: blur(16px); }`);
  lines.push(`.tui-blur-xl { filter: blur(24px); }`);
  lines.push(`.tui-blur-2xl { filter: blur(40px); }`);
  lines.push(`.tui-blur-3xl { filter: blur(64px); }`);
  lines.push("");

  // ── Filters: Backdrop blur
  lines.push(`.tui-backdrop-blur-none { backdrop-filter: blur(0); -webkit-backdrop-filter: blur(0); }`);
  lines.push(`.tui-backdrop-blur-sm { backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }`);
  lines.push(`.tui-backdrop-blur { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }`);
  lines.push(`.tui-backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }`);
  lines.push(`.tui-backdrop-blur-lg { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }`);
  lines.push(`.tui-backdrop-blur-xl { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }`);
  lines.push(`.tui-backdrop-blur-2xl { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }`);
  lines.push("");

  // ── Filters: Grayscale, Invert, Sepia
  lines.push(`.tui-grayscale { filter: grayscale(100%); }`);
  lines.push(`.tui-grayscale-0 { filter: grayscale(0); }`);
  lines.push(`.tui-invert { filter: invert(100%); }`);
  lines.push(`.tui-invert-0 { filter: invert(0); }`);
  lines.push(`.tui-sepia { filter: sepia(100%); }`);
  lines.push(`.tui-sepia-0 { filter: sepia(0); }`);
  lines.push(`.tui-saturate-0 { filter: saturate(0); }`);
  lines.push(`.tui-saturate-50 { filter: saturate(0.5); }`);
  lines.push(`.tui-saturate-100 { filter: saturate(1); }`);
  lines.push(`.tui-saturate-150 { filter: saturate(1.5); }`);
  lines.push(`.tui-saturate-200 { filter: saturate(2); }`);
  lines.push("");

  // ── Mix blend mode
  lines.push(`.tui-mix-blend-normal { mix-blend-mode: normal; }`);
  lines.push(`.tui-mix-blend-multiply { mix-blend-mode: multiply; }`);
  lines.push(`.tui-mix-blend-screen { mix-blend-mode: screen; }`);
  lines.push(`.tui-mix-blend-overlay { mix-blend-mode: overlay; }`);
  lines.push(`.tui-mix-blend-darken { mix-blend-mode: darken; }`);
  lines.push(`.tui-mix-blend-lighten { mix-blend-mode: lighten; }`);
  lines.push(`.tui-mix-blend-color-dodge { mix-blend-mode: color-dodge; }`);
  lines.push(`.tui-mix-blend-color-burn { mix-blend-mode: color-burn; }`);
  lines.push(`.tui-mix-blend-difference { mix-blend-mode: difference; }`);
  lines.push(`.tui-mix-blend-exclusion { mix-blend-mode: exclusion; }`);
  lines.push("");

  // ── Space between children (via adjacent sibling combinator)
  for (const [varName] of Object.entries(spacingFlat)) {
    const key = varName.replace("--tui-spacing-", "");
    lines.push(`.tui-space-x-${key} > * + * { margin-left: var(${varName}); }`);
    lines.push(`.tui-space-y-${key} > * + * { margin-top: var(${varName}); }`);
  }
  lines.push("");

  // ── Divide (borders between children)
  lines.push(`.tui-divide-x > * + * { border-left-width: 1px; border-left-style: solid; }`);
  lines.push(`.tui-divide-y > * + * { border-top-width: 1px; border-top-style: solid; }`);
  lines.push(`.tui-divide-x-2 > * + * { border-left-width: 2px; border-left-style: solid; }`);
  lines.push(`.tui-divide-y-2 > * + * { border-top-width: 2px; border-top-style: solid; }`);
  lines.push(`.tui-divide-x-0 > * + * { border-left-width: 0; }`);
  lines.push(`.tui-divide-y-0 > * + * { border-top-width: 0; }`);
  lines.push(`.tui-divide-solid > * + * { border-style: solid; }`);
  lines.push(`.tui-divide-dashed > * + * { border-style: dashed; }`);
  lines.push(`.tui-divide-dotted > * + * { border-style: dotted; }`);
  lines.push(`.tui-divide-none > * + * { border-style: none; }`);
  lines.push("");

  // ── Transition duration: tui-duration-<ms>
  lines.push(`.tui-duration-75 { transition-duration: 75ms; }`);
  lines.push(`.tui-duration-100 { transition-duration: 100ms; }`);
  lines.push(`.tui-duration-150 { transition-duration: 150ms; }`);
  lines.push(`.tui-duration-200 { transition-duration: 200ms; }`);
  lines.push(`.tui-duration-300 { transition-duration: 300ms; }`);
  lines.push(`.tui-duration-500 { transition-duration: 500ms; }`);
  lines.push(`.tui-duration-700 { transition-duration: 700ms; }`);
  lines.push(`.tui-duration-1000 { transition-duration: 1000ms; }`);
  lines.push("");

  // ── Transition delay: tui-delay-<ms>
  lines.push(`.tui-delay-0 { transition-delay: 0ms; }`);
  lines.push(`.tui-delay-75 { transition-delay: 75ms; }`);
  lines.push(`.tui-delay-100 { transition-delay: 100ms; }`);
  lines.push(`.tui-delay-150 { transition-delay: 150ms; }`);
  lines.push(`.tui-delay-200 { transition-delay: 200ms; }`);
  lines.push(`.tui-delay-300 { transition-delay: 300ms; }`);
  lines.push(`.tui-delay-500 { transition-delay: 500ms; }`);
  lines.push(`.tui-delay-700 { transition-delay: 700ms; }`);
  lines.push(`.tui-delay-1000 { transition-delay: 1000ms; }`);
  lines.push("");

  // ── Transition timing function: tui-ease-<name>
  lines.push(`.tui-ease-linear { transition-timing-function: linear; }`);
  lines.push(`.tui-ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }`);
  lines.push(`.tui-ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }`);
  lines.push(`.tui-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }`);
  lines.push("");

  // ── Flex basis
  lines.push(`.tui-basis-0 { flex-basis: 0px; }`);
  lines.push(`.tui-basis-auto { flex-basis: auto; }`);
  lines.push(`.tui-basis-full { flex-basis: 100%; }`);
  lines.push(`.tui-basis-1\\/2 { flex-basis: 50%; }`);
  lines.push(`.tui-basis-1\\/3 { flex-basis: 33.333333%; }`);
  lines.push(`.tui-basis-2\\/3 { flex-basis: 66.666667%; }`);
  lines.push(`.tui-basis-1\\/4 { flex-basis: 25%; }`);
  lines.push(`.tui-basis-3\\/4 { flex-basis: 75%; }`);
  lines.push("");

  // ── Grid auto columns/rows
  lines.push(`.tui-auto-cols-auto { grid-auto-columns: auto; }`);
  lines.push(`.tui-auto-cols-min { grid-auto-columns: min-content; }`);
  lines.push(`.tui-auto-cols-max { grid-auto-columns: max-content; }`);
  lines.push(`.tui-auto-cols-fr { grid-auto-columns: minmax(0, 1fr); }`);
  lines.push(`.tui-auto-rows-auto { grid-auto-rows: auto; }`);
  lines.push(`.tui-auto-rows-min { grid-auto-rows: min-content; }`);
  lines.push(`.tui-auto-rows-max { grid-auto-rows: max-content; }`);
  lines.push(`.tui-auto-rows-fr { grid-auto-rows: minmax(0, 1fr); }`);
  lines.push("");

  // ── Position: auto
  lines.push(`.tui-top-auto { top: auto; }`);
  lines.push(`.tui-right-auto { right: auto; }`);
  lines.push(`.tui-bottom-auto { bottom: auto; }`);
  lines.push(`.tui-left-auto { left: auto; }`);
  lines.push(`.tui-inset-auto { inset: auto; }`);
  lines.push("");

  // ── Transform: skew
  lines.push(`.tui-skew-x-0 { transform: skewX(0deg); }`);
  lines.push(`.tui-skew-y-0 { transform: skewY(0deg); }`);
  lines.push(`.tui-skew-x-1 { transform: skewX(1deg); }`);
  lines.push(`.tui-skew-y-1 { transform: skewY(1deg); }`);
  lines.push(`.tui-skew-x-2 { transform: skewX(2deg); }`);
  lines.push(`.tui-skew-y-2 { transform: skewY(2deg); }`);
  lines.push(`.tui-skew-x-3 { transform: skewX(3deg); }`);
  lines.push(`.tui-skew-y-3 { transform: skewY(3deg); }`);
  lines.push(`.tui-skew-x-6 { transform: skewX(6deg); }`);
  lines.push(`.tui-skew-y-6 { transform: skewY(6deg); }`);
  lines.push(`.tui-skew-x-12 { transform: skewX(12deg); }`);
  lines.push(`.tui-skew-y-12 { transform: skewY(12deg); }`);
  lines.push("");

  // ── Backface visibility
  lines.push(`.tui-backface-visible { backface-visibility: visible; }`);
  lines.push(`.tui-backface-hidden { backface-visibility: hidden; }`);
  lines.push("");

  // ── Content
  lines.push(`.tui-content-none { content: none; }`);
  lines.push("");

  // ── SVG: Fill & Stroke
  lines.push(`.tui-fill-current { fill: currentColor; }`);
  lines.push(`.tui-fill-none { fill: none; }`);
  lines.push(`.tui-stroke-current { stroke: currentColor; }`);
  lines.push(`.tui-stroke-none { stroke: none; }`);
  lines.push(`.tui-stroke-0 { stroke-width: 0; }`);
  lines.push(`.tui-stroke-1 { stroke-width: 1; }`);
  lines.push(`.tui-stroke-2 { stroke-width: 2; }`);
  lines.push("");

  // ── Filter: Brightness
  lines.push(`.tui-brightness-0 { filter: brightness(0); }`);
  lines.push(`.tui-brightness-50 { filter: brightness(0.5); }`);
  lines.push(`.tui-brightness-75 { filter: brightness(0.75); }`);
  lines.push(`.tui-brightness-90 { filter: brightness(0.9); }`);
  lines.push(`.tui-brightness-95 { filter: brightness(0.95); }`);
  lines.push(`.tui-brightness-100 { filter: brightness(1); }`);
  lines.push(`.tui-brightness-105 { filter: brightness(1.05); }`);
  lines.push(`.tui-brightness-110 { filter: brightness(1.1); }`);
  lines.push(`.tui-brightness-125 { filter: brightness(1.25); }`);
  lines.push(`.tui-brightness-150 { filter: brightness(1.5); }`);
  lines.push(`.tui-brightness-200 { filter: brightness(2); }`);
  lines.push("");

  // ── Filter: Contrast
  lines.push(`.tui-contrast-0 { filter: contrast(0); }`);
  lines.push(`.tui-contrast-50 { filter: contrast(0.5); }`);
  lines.push(`.tui-contrast-75 { filter: contrast(0.75); }`);
  lines.push(`.tui-contrast-90 { filter: contrast(0.9); }`);
  lines.push(`.tui-contrast-95 { filter: contrast(0.95); }`);
  lines.push(`.tui-contrast-100 { filter: contrast(1); }`);
  lines.push(`.tui-contrast-105 { filter: contrast(1.05); }`);
  lines.push(`.tui-contrast-110 { filter: contrast(1.1); }`);
  lines.push(`.tui-contrast-125 { filter: contrast(1.25); }`);
  lines.push(`.tui-contrast-150 { filter: contrast(1.5); }`);
  lines.push(`.tui-contrast-200 { filter: contrast(2); }`);
  lines.push("");

  // ── Filter: Drop shadow
  lines.push(`.tui-drop-shadow-sm { filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05)); }`);
  lines.push(`.tui-drop-shadow { filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06)); }`);
  lines.push(`.tui-drop-shadow-md { filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06)); }`);
  lines.push(`.tui-drop-shadow-lg { filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1)); }`);
  lines.push(`.tui-drop-shadow-xl { filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08)); }`);
  lines.push(`.tui-drop-shadow-2xl { filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)); }`);
  lines.push(`.tui-drop-shadow-none { filter: drop-shadow(0 0 #0000); }`);
  lines.push("");

  // ── Filter: Hue rotate
  lines.push(`.tui-hue-rotate-0 { filter: hue-rotate(0deg); }`);
  lines.push(`.tui-hue-rotate-15 { filter: hue-rotate(15deg); }`);
  lines.push(`.tui-hue-rotate-30 { filter: hue-rotate(30deg); }`);
  lines.push(`.tui-hue-rotate-60 { filter: hue-rotate(60deg); }`);
  lines.push(`.tui-hue-rotate-90 { filter: hue-rotate(90deg); }`);
  lines.push(`.tui-hue-rotate-180 { filter: hue-rotate(180deg); }`);
  lines.push("");

  // ── Text decoration style
  lines.push(`.tui-decoration-solid { text-decoration-style: solid; }`);
  lines.push(`.tui-decoration-dashed { text-decoration-style: dashed; }`);
  lines.push(`.tui-decoration-dotted { text-decoration-style: dotted; }`);
  lines.push(`.tui-decoration-double { text-decoration-style: double; }`);
  lines.push(`.tui-decoration-wavy { text-decoration-style: wavy; }`);
  lines.push("");

  // ── Underline offset
  lines.push(`.tui-underline-offset-0 { text-underline-offset: 0px; }`);
  lines.push(`.tui-underline-offset-1 { text-underline-offset: 1px; }`);
  lines.push(`.tui-underline-offset-2 { text-underline-offset: 2px; }`);
  lines.push(`.tui-underline-offset-4 { text-underline-offset: 4px; }`);
  lines.push(`.tui-underline-offset-8 { text-underline-offset: 8px; }`);
  lines.push(`.tui-underline-offset-auto { text-underline-offset: auto; }`);
  lines.push("");

  // ── Text indent
  lines.push(`.tui-indent-0 { text-indent: 0; }`);
  lines.push(`.tui-indent-4 { text-indent: var(--tui-spacing-4); }`);
  lines.push(`.tui-indent-8 { text-indent: var(--tui-spacing-8); }`);
  lines.push(`.tui-indent-16 { text-indent: var(--tui-spacing-16); }`);
  lines.push("");

  // ── Dynamic viewport units
  lines.push(`.tui-h-dvh { height: 100dvh; }`);
  lines.push(`.tui-h-svh { height: 100svh; }`);
  lines.push(`.tui-h-lvh { height: 100lvh; }`);
  lines.push(`.tui-min-h-dvh { min-height: 100dvh; }`);
  lines.push(`.tui-min-h-svh { min-height: 100svh; }`);
  lines.push("");

  // ── Sizing: auto for min/max
  lines.push(`.tui-min-w-auto { min-width: auto; }`);
  lines.push(`.tui-max-w-auto { max-width: auto; }`);
  lines.push(`.tui-min-h-auto { min-height: auto; }`);
  lines.push(`.tui-max-h-auto { max-height: auto; }`);
  lines.push("");

  // ── Display (additional)
  lines.push(`.tui-inline-grid { display: inline-grid; }`);
  lines.push(`.tui-contents { display: contents; }`);
  lines.push(`.tui-table { display: table; }`);
  lines.push(`.tui-table-row { display: table-row; }`);
  lines.push(`.tui-table-cell { display: table-cell; }`);
  lines.push(`.tui-flow-root { display: flow-root; }`);
  lines.push("");

  // ── Justify items / self
  lines.push(`.tui-justify-items-auto { justify-items: auto; }`);
  lines.push(`.tui-justify-items-start { justify-items: start; }`);
  lines.push(`.tui-justify-items-end { justify-items: end; }`);
  lines.push(`.tui-justify-items-center { justify-items: center; }`);
  lines.push(`.tui-justify-items-stretch { justify-items: stretch; }`);
  lines.push(`.tui-justify-self-auto { justify-self: auto; }`);
  lines.push(`.tui-justify-self-start { justify-self: start; }`);
  lines.push(`.tui-justify-self-end { justify-self: end; }`);
  lines.push(`.tui-justify-self-center { justify-self: center; }`);
  lines.push(`.tui-justify-self-stretch { justify-self: stretch; }`);
  lines.push("");

  // ── Space reverse (for RTL or reversed flex)
  lines.push(`.tui-space-x-reverse > * + * { --tui-space-x-reverse: 1; }`);
  lines.push(`.tui-space-y-reverse > * + * { --tui-space-y-reverse: 1; }`);
  lines.push("");

  // ── Font style
  lines.push(`.tui-italic { font-style: italic; }`);
  lines.push(`.tui-not-italic { font-style: normal; }`);
  lines.push("");

  // ── Font variant numeric
  lines.push(`.tui-ordinal { font-variant-numeric: ordinal; }`);
  lines.push(`.tui-tabular-nums { font-variant-numeric: tabular-nums; }`);
  lines.push(`.tui-oldstyle-nums { font-variant-numeric: oldstyle-nums; }`);
  lines.push(`.tui-lining-nums { font-variant-numeric: lining-nums; }`);
  lines.push(`.tui-proportional-nums { font-variant-numeric: proportional-nums; }`);
  lines.push("");

  // ── Text decoration thickness
  lines.push(`.tui-decoration-auto { text-decoration-thickness: auto; }`);
  lines.push(`.tui-decoration-from-font { text-decoration-thickness: from-font; }`);
  lines.push(`.tui-decoration-0 { text-decoration-thickness: 0px; }`);
  lines.push(`.tui-decoration-1 { text-decoration-thickness: 1px; }`);
  lines.push(`.tui-decoration-2 { text-decoration-thickness: 2px; }`);
  lines.push(`.tui-decoration-4 { text-decoration-thickness: 4px; }`);
  lines.push(`.tui-decoration-8 { text-decoration-thickness: 8px; }`);
  lines.push("");

  // ── Divide color keywords
  lines.push(`.tui-divide-transparent > * + * { border-color: transparent; }`);
  lines.push(`.tui-divide-current > * + * { border-color: currentColor; }`);
  lines.push(`.tui-divide-inherit > * + * { border-color: inherit; }`);
  lines.push("");

  // ── Ring offset
  lines.push(`.tui-ring-offset-0 { --tui-ring-offset-width: 0px; box-shadow: 0 0 0 var(--tui-ring-offset-width) var(--tui-color-white, #fff), var(--tui-ring-shadow, 0 0 #0000); }`);
  lines.push(`.tui-ring-offset-1 { --tui-ring-offset-width: 1px; box-shadow: 0 0 0 var(--tui-ring-offset-width) var(--tui-color-white, #fff), var(--tui-ring-shadow, 0 0 #0000); }`);
  lines.push(`.tui-ring-offset-2 { --tui-ring-offset-width: 2px; box-shadow: 0 0 0 var(--tui-ring-offset-width) var(--tui-color-white, #fff), var(--tui-ring-shadow, 0 0 #0000); }`);
  lines.push(`.tui-ring-offset-4 { --tui-ring-offset-width: 4px; box-shadow: 0 0 0 var(--tui-ring-offset-width) var(--tui-color-white, #fff), var(--tui-ring-shadow, 0 0 #0000); }`);
  lines.push("");

  // ── Transform GPU
  lines.push(`.tui-transform-gpu { transform: translateZ(0); }`);
  lines.push("");

  // ── Scale per-axis
  lines.push(`.tui-scale-x-100 { transform: scaleX(1); }`);
  lines.push(`.tui-scale-y-100 { transform: scaleY(1); }`);
  lines.push(`.tui--scale-x-100 { transform: scaleX(-1); }`);
  lines.push(`.tui--scale-y-100 { transform: scaleY(-1); }`);
  lines.push("");

  // ── Cursor (additional)
  lines.push(`.tui-cursor-crosshair { cursor: crosshair; }`);
  lines.push(`.tui-cursor-help { cursor: help; }`);
  lines.push(`.tui-cursor-col-resize { cursor: col-resize; }`);
  lines.push(`.tui-cursor-row-resize { cursor: row-resize; }`);
  lines.push(`.tui-cursor-zoom-in { cursor: zoom-in; }`);
  lines.push(`.tui-cursor-zoom-out { cursor: zoom-out; }`);
  lines.push("");

  // ── Scroll margin/padding
  lines.push(`.tui-scroll-m-0 { scroll-margin: 0; }`);
  lines.push(`.tui-scroll-p-0 { scroll-padding: 0; }`);
  lines.push("");

  // ── Forced colors
  lines.push(`.tui-forced-color-adjust-auto { forced-color-adjust: auto; }`);
  lines.push(`.tui-forced-color-adjust-none { forced-color-adjust: none; }`);
  lines.push("");

  // ── Background size
  lines.push(`.tui-bg-auto { background-size: auto; }`);
  lines.push(`.tui-bg-cover { background-size: cover; }`);
  lines.push(`.tui-bg-contain { background-size: contain; }`);
  lines.push("");

  // ── Background position
  lines.push(`.tui-bg-center { background-position: center; }`);
  lines.push(`.tui-bg-top { background-position: top; }`);
  lines.push(`.tui-bg-bottom { background-position: bottom; }`);
  lines.push(`.tui-bg-left { background-position: left; }`);
  lines.push(`.tui-bg-right { background-position: right; }`);
  lines.push(`.tui-bg-left-top { background-position: left top; }`);
  lines.push(`.tui-bg-left-bottom { background-position: left bottom; }`);
  lines.push(`.tui-bg-right-top { background-position: right top; }`);
  lines.push(`.tui-bg-right-bottom { background-position: right bottom; }`);
  lines.push("");

  // ── Background repeat
  lines.push(`.tui-bg-repeat { background-repeat: repeat; }`);
  lines.push(`.tui-bg-no-repeat { background-repeat: no-repeat; }`);
  lines.push(`.tui-bg-repeat-x { background-repeat: repeat-x; }`);
  lines.push(`.tui-bg-repeat-y { background-repeat: repeat-y; }`);
  lines.push(`.tui-bg-repeat-round { background-repeat: round; }`);
  lines.push(`.tui-bg-repeat-space { background-repeat: space; }`);
  lines.push("");

  // ── Background attachment
  lines.push(`.tui-bg-fixed { background-attachment: fixed; }`);
  lines.push(`.tui-bg-local { background-attachment: local; }`);
  lines.push(`.tui-bg-scroll { background-attachment: scroll; }`);
  lines.push("");

  // ── Background clip
  lines.push(`.tui-bg-clip-border { background-clip: border-box; }`);
  lines.push(`.tui-bg-clip-padding { background-clip: padding-box; }`);
  lines.push(`.tui-bg-clip-content { background-clip: content-box; }`);
  lines.push(`.tui-bg-clip-text { -webkit-background-clip: text; background-clip: text; }`);
  lines.push("");

  // ── Background origin
  lines.push(`.tui-bg-origin-border { background-origin: border-box; }`);
  lines.push(`.tui-bg-origin-padding { background-origin: padding-box; }`);
  lines.push(`.tui-bg-origin-content { background-origin: content-box; }`);
  lines.push("");

  // ── Table caption
  lines.push(`.tui-caption-top { caption-side: top; }`);
  lines.push(`.tui-caption-bottom { caption-side: bottom; }`);
  lines.push("");

  return lines.join("\n");
}

const utilitiesCss = generateUtilitiesCSS();
fs.writeFileSync(path.join(distDir, "utilities.css"), utilitiesCss, "utf-8");
console.log("✅  dist/utilities.css written");

console.log("\n🎉  All token artifacts generated successfully.");
