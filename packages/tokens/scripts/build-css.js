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
  font-family: var(--tui-font-family-sans);
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
 * using CSS variable references.
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
        // Primitive scale
        ...flatToTailwind(color.primitive, "--tui-color"),
        // Semantic aliases
        bg:      flatToTailwind({ base: color.semantic.bgBase, subtle: color.semantic.bgSubtle, muted: color.semantic.bgMuted }, "--tui-color"),
        text:    { primary: "var(--tui-color-text-primary)", secondary: "var(--tui-color-text-secondary)", tertiary: "var(--tui-color-text-tertiary)", disabled: "var(--tui-color-text-disabled)", inverse: "var(--tui-color-text-inverse)", link: "var(--tui-color-text-link)" },
        border:  { default: "var(--tui-color-border-default)", strong: "var(--tui-color-border-strong)", focus: "var(--tui-color-border-focus)" },
        brand:   { DEFAULT: "var(--tui-color-brand-default)", hover: "var(--tui-color-brand-hover)", active: "var(--tui-color-brand-active)", subtle: "var(--tui-color-brand-subtle)" },
        success: { DEFAULT: "var(--tui-color-success-default)", subtle: "var(--tui-color-success-subtle)", text: "var(--tui-color-success-text)" },
        warning: { DEFAULT: "var(--tui-color-warning-default)", subtle: "var(--tui-color-warning-subtle)", text: "var(--tui-color-warning-text)" },
        danger:  { DEFAULT: "var(--tui-color-danger-default)",  subtle: "var(--tui-color-danger-subtle)",  text: "var(--tui-color-danger-text)"  },
        info:    { DEFAULT: "var(--tui-color-info-default)",    subtle: "var(--tui-color-info-subtle)",    text: "var(--tui-color-info-text)"    },
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
console.log("\n🎉  All token artifacts generated successfully.");
