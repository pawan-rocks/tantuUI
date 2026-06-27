#!/usr/bin/env node
/**
 * Export TantuUI tokens as Figma Variables JSON
 * Compatible with "Tokens Studio for Figma" plugin import format.
 *
 * Usage: node scripts/export-figma.js
 * Output: dist/figma-tokens.json
 */

const fs = require("fs");
const path = require("path");

const {
  color,
  spacing,
  typography,
  radius,
  shadow,
  border,
  opacity,
  sizing,
} = require("../dist/index.js");

const distDir = path.resolve(__dirname, "../dist");
fs.mkdirSync(distDir, { recursive: true });

// Helper: convert rem to px number for Figma
function remToPx(value) {
  if (typeof value !== "string") return value;
  if (value.endsWith("rem")) {
    return parseFloat(value) * 16;
  }
  if (value.endsWith("px")) {
    return parseFloat(value);
  }
  return value;
}

// Build Figma tokens in Tokens Studio format
const figmaTokens = {
  // ── Colors ────────────────────────────────────────────────────────────
  color: {
    primitive: {},
  },
  // ── Spacing ───────────────────────────────────────────────────────────
  spacing: {},
  // ── Sizing ────────────────────────────────────────────────────────────
  sizing: {},
  // ── Border Radius ─────────────────────────────────────────────────────
  borderRadius: {},
  // ── Border Width ──────────────────────────────────────────────────────
  borderWidth: {},
  // ── Typography ────────────────────────────────────────────────────────
  fontSize: {},
  fontWeight: {},
  lineHeight: {},
  fontFamily: {},
  letterSpacing: {},
  // ── Opacity ───────────────────────────────────────────────────────────
  opacity: {},
};

// ── Colors (primitives only, hex values) ─────────────────────────────────
for (const [key, value] of Object.entries(color.primitive)) {
  if (typeof value === "string" && value.startsWith("#")) {
    // Convert camelCase to slash-separated groups for Figma
    const name = key.replace(/([A-Z])/g, "/$1").toLowerCase().replace(/^\//, "");
    figmaTokens.color.primitive[key] = {
      value: value,
      type: "color",
    };
  }
}

// ── Spacing ──────────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(spacing)) {
  // Skip semantic aliases (they reference other vars)
  if (typeof value === "string" && !value.startsWith("var(")) {
    figmaTokens.spacing[key] = {
      value: remToPx(value),
      type: "spacing",
    };
  }
}

// ── Sizing ───────────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(sizing)) {
  figmaTokens.sizing[key] = {
    value: remToPx(value),
    type: "sizing",
  };
}

// ── Border Radius ────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(radius)) {
  if (typeof value === "string" && !value.startsWith("var(")) {
    figmaTokens.borderRadius[key] = {
      value: remToPx(value),
      type: "borderRadius",
    };
  }
}

// ── Border Width ─────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(border.width)) {
  figmaTokens.borderWidth[key] = {
    value: remToPx(value),
    type: "borderWidth",
  };
}

// ── Font Size ────────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(typography.fontSize)) {
  figmaTokens.fontSize[key] = {
    value: remToPx(value),
    type: "fontSizes",
  };
}

// ── Font Weight ──────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(typography.fontWeight)) {
  figmaTokens.fontWeight[key] = {
    value: value,
    type: "fontWeights",
  };
}

// ── Line Height ──────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(typography.lineHeight)) {
  figmaTokens.lineHeight[key] = {
    value: value.endsWith("rem") ? remToPx(value) : value,
    type: "lineHeights",
  };
}

// ── Font Family ──────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(typography.fontFamily)) {
  figmaTokens.fontFamily[key] = {
    value: value,
    type: "fontFamilies",
  };
}

// ── Letter Spacing ───────────────────────────────────────────────────────
for (const [key, value] of Object.entries(typography.letterSpacing)) {
  figmaTokens.letterSpacing[key] = {
    value: value,
    type: "letterSpacing",
  };
}

// ── Opacity ──────────────────────────────────────────────────────────────
for (const [key, value] of Object.entries(opacity)) {
  figmaTokens.opacity[key] = {
    value: value,
    type: "opacity",
  };
}

// ── Write output ─────────────────────────────────────────────────────────
const output = {
  "TantuUI": figmaTokens,
};

const outPath = path.join(distDir, "figma-tokens.json");
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`✅  ${outPath} written`);
console.log(`\n📋  Import into Figma:`);
console.log(`   1. Install "Tokens Studio for Figma" plugin`);
console.log(`   2. Open plugin → Settings → Import → paste or upload this JSON`);
console.log(`   3. All tokens appear as Figma variables/styles\n`);
