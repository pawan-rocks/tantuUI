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
 *   @import "@tantu/tokens/css";
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
];

const tokensCss = header + sections.join("\n");
fs.writeFileSync(path.join(distDir, "tokens.css"), tokensCss, "utf-8");
console.log("✅  dist/tokens.css written");

// ─── base.css  (CSS reset + base styles using token variables) ────────

const baseCss = `/**
 * TantuUI Base Styles
 * Minimal CSS reset that uses --tui-* variables.
 * @import "@tantu/tokens/css/base"
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
 *   const tuiPreset = require("@tantu/tokens/tailwind-preset");
 *   module.exports = { presets: [tuiPreset], ... };
 *
 * Or ESM:
 *   import tuiPreset from "@tantu/tokens/tailwind-preset";
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
 *   @import "@tantu/tokens/css/utilities";
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
  lines.push(`.tui-max-w-full { max-width: 100%; }`);
  lines.push(`.tui-max-w-none { max-width: none; }`);
  lines.push(`.tui-max-w-screen { max-width: 100vw; }`);
  lines.push(`.tui-min-h-0 { min-height: 0; }`);
  lines.push(`.tui-min-h-full { min-height: 100%; }`);
  lines.push(`.tui-min-h-screen { min-height: 100vh; }`);
  lines.push(`.tui-max-h-full { max-height: 100%; }`);
  lines.push(`.tui-max-h-screen { max-height: 100vh; }`);
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
    }
    lines.push(`.tui-border-${toKebab(key)} { border-width: var(${varName}); border-style: solid; }`);
    lines.push(`.tui-border-t-${toKebab(key)} { border-top-width: var(${varName}); border-top-style: solid; }`);
    lines.push(`.tui-border-r-${toKebab(key)} { border-right-width: var(${varName}); border-right-style: solid; }`);
    lines.push(`.tui-border-b-${toKebab(key)} { border-bottom-width: var(${varName}); border-bottom-style: solid; }`);
    lines.push(`.tui-border-l-${toKebab(key)} { border-left-width: var(${varName}); border-left-style: solid; }`);
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

  return lines.join("\n");
}

const utilitiesCss = generateUtilitiesCSS();
fs.writeFileSync(path.join(distDir, "utilities.css"), utilitiesCss, "utf-8");
console.log("✅  dist/utilities.css written");

console.log("\n🎉  All token artifacts generated successfully.");
