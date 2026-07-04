/**
 * TantuUI token data for IntelliSense
 * Each entry: [className, cssOutput, description, colorHex?]
 */

export interface TokenEntry {
  label: string;
  css: string;
  description: string;
  color?: string;
}

// ── Color palette definitions ───────────────────────────────────────────────

const brandColors: Record<string, Record<string, string>> = {
  "brand-white": { "50": "#ffffff", "100": "#fefefe", "200": "#fafafa", "300": "#f5f5f5", "400": "#ededed", "500": "#e0e0e0", "600": "#c2c2c2", "700": "#9e9e9e", "800": "#757575", "900": "#4a4a4a", "950": "#2b2b2b" },
  "brand-black": { "50": "#f5f5f5", "100": "#e8e8e8", "200": "#d4d4d4", "300": "#b0b0b0", "400": "#8a8a8a", "500": "#616161", "600": "#4a4a4a", "700": "#363636", "800": "#242424", "900": "#141414", "950": "#000000" },
  "brand-navy": { "50": "#f3f4f7", "100": "#e7e8ef", "200": "#cacfe2", "300": "#9da8d2", "400": "#6377c5", "500": "#354eb0", "600": "#2c4091", "700": "#223272", "800": "#1a2656", "900": "#121a3b", "950": "#0a0e1f" },
  "brand-blue": { "50": "#eff4ff", "100": "#dbe6fe", "200": "#bfd3fe", "300": "#93b4fd", "400": "#6090fa", "500": "#3b6ef6", "600": "#2563eb", "700": "#1d50d8", "800": "#1e41af", "900": "#1e398a", "950": "#172554" },
  "brand-purple": { "50": "#f5f3ff", "100": "#ede8ff", "200": "#ddd6fe", "300": "#c4b5fc", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95", "950": "#2e1065" },
  "brand-pink": { "50": "#fdf4ff", "100": "#fae8ff", "200": "#f5d0fe", "300": "#f0abfc", "400": "#e879f9", "500": "#d946ef", "600": "#c026d3", "700": "#a21caf", "800": "#86198f", "900": "#701a75", "950": "#4a044e" },
  "brand-gray": { "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db", "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151", "800": "#1f2937", "900": "#111827", "950": "#030712" },
  "brand-light": { "50": "#fdfefe", "100": "#f9fafb", "200": "#f3f4f6", "300": "#e5e7eb", "400": "#d1d5db", "500": "#9ca3af", "600": "#6b7280", "700": "#4b5563", "800": "#374151", "900": "#1f2937", "950": "#111827" },
};

const semanticColors: Record<string, Record<string, string>> = {
  success: { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d", "950": "#052e16" },
  warning: { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f", "950": "#451a03" },
  danger: { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d", "950": "#450a0a" },
  info: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
  teal: { "50": "#f0fdfa", "100": "#ccfbf1", "200": "#99f6e4", "300": "#5eead4", "400": "#2dd4bf", "500": "#14b8a6", "600": "#0d9488", "700": "#0f766e", "800": "#115e59", "900": "#134e4a", "950": "#042f2e" },
  orange: { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12", "950": "#431407" },
  rose: { "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af", "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239", "900": "#881337", "950": "#4c0519" },
  indigo: { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81", "950": "#1e1b4b" },
  mint: { "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b", "950": "#022c22" },
  coal: { "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1", "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b", "900": "#0f172a", "950": "#020617" },
};

// ── Generate token entries ──────────────────────────────────────────────────

function generateColorTokens(): TokenEntry[] {
  const entries: TokenEntry[] = [];

  // Special: white, black
  entries.push(
    { label: "tui-bg-white", css: "background-color: var(--tui-color-white); /* #ffffff */", description: "Background: white", color: "#ffffff" },
    { label: "tui-bg-black", css: "background-color: var(--tui-color-black); /* #000000 */", description: "Background: black", color: "#000000" },
    { label: "tui-text-white", css: "color: var(--tui-color-white); /* #ffffff */", description: "Text color: white", color: "#ffffff" },
    { label: "tui-text-black", css: "color: var(--tui-color-black); /* #000000 */", description: "Text color: black", color: "#000000" },
    { label: "tui-border-white", css: "border-color: var(--tui-color-white); /* #ffffff */", description: "Border color: white", color: "#ffffff" },
    { label: "tui-border-black", css: "border-color: var(--tui-color-black); /* #000000 */", description: "Border color: black", color: "#000000" },
  );

  const allColors = { ...brandColors, ...semanticColors };

  for (const [group, scales] of Object.entries(allColors)) {
    for (const [scale, hex] of Object.entries(scales)) {
      const token = `--tui-color-${group}-${scale}`;
      entries.push(
        { label: `tui-bg-${group}-${scale}`, css: `background-color: var(${token}); /* ${hex} */`, description: `Background: ${group}-${scale}`, color: hex },
        { label: `tui-text-${group}-${scale}`, css: `color: var(${token}); /* ${hex} */`, description: `Text color: ${group}-${scale}`, color: hex },
        { label: `tui-border-${group}-${scale}`, css: `border-color: var(${token}); /* ${hex} */`, description: `Border color: ${group}-${scale}`, color: hex },
      );
    }
  }

  return entries;
}

function generateSpacingTokens(): TokenEntry[] {
  const spacingScale: Record<string, string> = {
    "0": "0px", "px": "1px", "0_5": "2px", "1": "4px", "1_5": "6px",
    "2": "8px", "2_5": "10px", "3": "12px", "3_5": "14px", "4": "16px",
    "5": "20px", "6": "24px", "7": "28px", "8": "32px", "9": "36px",
    "10": "40px", "11": "44px", "12": "48px", "14": "56px", "16": "64px",
    "20": "80px", "24": "96px", "28": "112px", "32": "128px", "36": "144px",
    "40": "160px", "44": "176px", "48": "192px", "52": "208px", "56": "224px",
    "60": "240px", "64": "256px", "72": "288px", "80": "320px", "96": "384px",
  };

  const entries: TokenEntry[] = [];
  const props = [
    { prefix: "tui-p", prop: "padding" },
    { prefix: "tui-px", prop: "padding-inline" },
    { prefix: "tui-py", prop: "padding-block" },
    { prefix: "tui-pt", prop: "padding-top" },
    { prefix: "tui-pr", prop: "padding-right" },
    { prefix: "tui-pb", prop: "padding-bottom" },
    { prefix: "tui-pl", prop: "padding-left" },
    { prefix: "tui-m", prop: "margin" },
    { prefix: "tui-mx", prop: "margin-inline" },
    { prefix: "tui-my", prop: "margin-block" },
    { prefix: "tui-mt", prop: "margin-top" },
    { prefix: "tui-mr", prop: "margin-right" },
    { prefix: "tui-mb", prop: "margin-bottom" },
    { prefix: "tui-ml", prop: "margin-left" },
    { prefix: "tui-gap", prop: "gap" },
    { prefix: "tui-gap-x", prop: "column-gap" },
    { prefix: "tui-gap-y", prop: "row-gap" },
    { prefix: "tui-w", prop: "width" },
    { prefix: "tui-h", prop: "height" },
  ];

  for (const { prefix, prop } of props) {
    for (const [key, px] of Object.entries(spacingScale)) {
      entries.push({
        label: `${prefix}-${key}`,
        css: `${prop}: var(--tui-spacing-${key}); /* ${px} */`,
        description: `${prop}: ${px}`,
      });
    }
  }

  return entries;
}

function generateTypographyTokens(): TokenEntry[] {
  const entries: TokenEntry[] = [];

  const fontSizes: Record<string, string> = {
    "3xs": "8px", "2xs": "10px", xs: "12px", sm: "14px", md: "16px",
    lg: "18px", xl: "20px", "2xl": "24px", "3xl": "30px", "4xl": "36px",
    "5xl": "48px", "6xl": "60px", "7xl": "72px",
  };

  const fontWeights: Record<string, string> = {
    thin: "100", extralight: "200", light: "300", normal: "400",
    medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900",
  };

  const lineHeights: Record<string, string> = {
    none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2",
  };

  for (const [key, px] of Object.entries(fontSizes)) {
    entries.push({
      label: `tui-text-${key}`,
      css: `font-size: var(--tui-font-size-${key}); /* ${px} */`,
      description: `Font size: ${px}`,
    });
  }

  for (const [key, val] of Object.entries(fontWeights)) {
    entries.push({
      label: `tui-font-${key}`,
      css: `font-weight: var(--tui-font-weight-${key}); /* ${val} */`,
      description: `Font weight: ${val}`,
    });
  }

  for (const [key, val] of Object.entries(lineHeights)) {
    entries.push({
      label: `tui-leading-${key}`,
      css: `line-height: var(--tui-leading-${key}); /* ${val} */`,
      description: `Line height: ${val}`,
    });
  }

  return entries;
}

function generateBorderRadiusTokens(): TokenEntry[] {
  const radii: Record<string, string> = {
    none: "0px", xs: "2px", sm: "4px", md: "6px", lg: "8px",
    xl: "12px", "2xl": "16px", "3xl": "24px", full: "9999px",
  };

  return Object.entries(radii).map(([key, px]) => ({
    label: `tui-rounded-${key}`,
    css: `border-radius: var(--tui-radius-${key}); /* ${px} */`,
    description: `Border radius: ${px}`,
  }));
}

function generateShadowTokens(): TokenEntry[] {
  const shadows: Record<string, string> = {
    none: "none",
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.10)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.10)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.10)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.10)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  };

  return Object.entries(shadows).map(([key, val]) => ({
    label: `tui-shadow-${key}`,
    css: `box-shadow: var(--tui-shadow-${key}); /* ${val} */`,
    description: `Box shadow: ${key}`,
  }));
}

function generateBorderWidthTokens(): TokenEntry[] {
  const widths: Record<string, string> = {
    "0": "0px", "1": "1px", "2": "2px", "3": "3px", "4": "4px", "5": "5px", "8": "8px",
  };

  const entries: TokenEntry[] = [];

  // Shorthand: tui-border = 1px
  entries.push({ label: "tui-border", css: "border-width: 1px; border-style: solid;", description: "Border: 1px solid" });

  for (const [key, px] of Object.entries(widths)) {
    entries.push({ label: `tui-border-${key}`, css: `border-width: var(--tui-border-width-${key}); border-style: solid; /* ${px} */`, description: `Border width: ${px}` });
    entries.push({ label: `tui-border-t-${key}`, css: `border-top-width: ${px}; border-top-style: solid;`, description: `Border top: ${px}` });
    entries.push({ label: `tui-border-r-${key}`, css: `border-right-width: ${px}; border-right-style: solid;`, description: `Border right: ${px}` });
    entries.push({ label: `tui-border-b-${key}`, css: `border-bottom-width: ${px}; border-bottom-style: solid;`, description: `Border bottom: ${px}` });
    entries.push({ label: `tui-border-l-${key}`, css: `border-left-width: ${px}; border-left-style: solid;`, description: `Border left: ${px}` });
    entries.push({ label: `tui-border-x-${key}`, css: `border-left-width: ${px}; border-right-width: ${px}; border-style: solid;`, description: `Border horizontal: ${px}` });
    entries.push({ label: `tui-border-y-${key}`, css: `border-top-width: ${px}; border-bottom-width: ${px}; border-style: solid;`, description: `Border vertical: ${px}` });
  }

  // Shorthands (1px default)
  entries.push({ label: "tui-border-t", css: "border-top-width: 1px; border-top-style: solid;", description: "Border top: 1px solid" });
  entries.push({ label: "tui-border-r", css: "border-right-width: 1px; border-right-style: solid;", description: "Border right: 1px solid" });
  entries.push({ label: "tui-border-b", css: "border-bottom-width: 1px; border-bottom-style: solid;", description: "Border bottom: 1px solid" });
  entries.push({ label: "tui-border-l", css: "border-left-width: 1px; border-left-style: solid;", description: "Border left: 1px solid" });
  entries.push({ label: "tui-border-x", css: "border-left-width: 1px; border-right-width: 1px; border-style: solid;", description: "Border horizontal: 1px solid" });
  entries.push({ label: "tui-border-y", css: "border-top-width: 1px; border-bottom-width: 1px; border-style: solid;", description: "Border vertical: 1px solid" });

  // Border style
  entries.push({ label: "tui-border-solid", css: "border-style: solid;", description: "Border style: solid" });
  entries.push({ label: "tui-border-dashed", css: "border-style: dashed;", description: "Border style: dashed" });
  entries.push({ label: "tui-border-dotted", css: "border-style: dotted;", description: "Border style: dotted" });
  entries.push({ label: "tui-border-hidden", css: "border-style: hidden;", description: "Border style: hidden" });
  entries.push({ label: "tui-border-none", css: "border: none;", description: "Remove border" });

  return entries;
}

function generateLayoutTokens(): TokenEntry[] {
  return [
    // Display
    { label: "tui-block", css: "display: block;", description: "Display: block" },
    { label: "tui-inline-block", css: "display: inline-block;", description: "Display: inline-block" },
    { label: "tui-inline", css: "display: inline;", description: "Display: inline" },
    { label: "tui-flex", css: "display: flex;", description: "Display: flex" },
    { label: "tui-inline-flex", css: "display: inline-flex;", description: "Display: inline-flex" },
    { label: "tui-grid", css: "display: grid;", description: "Display: grid" },
    { label: "tui-hidden", css: "display: none;", description: "Display: none" },

    // Flex direction
    { label: "tui-flex-row", css: "flex-direction: row;", description: "Flex direction: row" },
    { label: "tui-flex-col", css: "flex-direction: column;", description: "Flex direction: column" },
    { label: "tui-flex-row-reverse", css: "flex-direction: row-reverse;", description: "Flex direction: row-reverse" },
    { label: "tui-flex-col-reverse", css: "flex-direction: column-reverse;", description: "Flex direction: column-reverse" },

    // Flex wrap
    { label: "tui-flex-wrap", css: "flex-wrap: wrap;", description: "Flex wrap" },
    { label: "tui-flex-nowrap", css: "flex-wrap: nowrap;", description: "Flex no-wrap" },

    // Align items
    { label: "tui-items-start", css: "align-items: flex-start;", description: "Align items: start" },
    { label: "tui-items-center", css: "align-items: center;", description: "Align items: center" },
    { label: "tui-items-end", css: "align-items: flex-end;", description: "Align items: end" },
    { label: "tui-items-stretch", css: "align-items: stretch;", description: "Align items: stretch" },
    { label: "tui-items-baseline", css: "align-items: baseline;", description: "Align items: baseline" },

    // Justify content
    { label: "tui-justify-start", css: "justify-content: flex-start;", description: "Justify: start" },
    { label: "tui-justify-center", css: "justify-content: center;", description: "Justify: center" },
    { label: "tui-justify-end", css: "justify-content: flex-end;", description: "Justify: end" },
    { label: "tui-justify-between", css: "justify-content: space-between;", description: "Justify: space-between" },
    { label: "tui-justify-around", css: "justify-content: space-around;", description: "Justify: space-around" },
    { label: "tui-justify-evenly", css: "justify-content: space-evenly;", description: "Justify: space-evenly" },

    // Flex grow/shrink
    { label: "tui-flex-1", css: "flex: 1 1 0%;", description: "Flex: 1" },
    { label: "tui-flex-auto", css: "flex: 1 1 auto;", description: "Flex: auto" },
    { label: "tui-flex-none", css: "flex: none;", description: "Flex: none" },
    { label: "tui-grow", css: "flex-grow: 1;", description: "Flex grow" },
    { label: "tui-shrink-0", css: "flex-shrink: 0;", description: "Flex shrink: 0" },

    // Grid columns
    { label: "tui-grid-cols-1", css: "grid-template-columns: repeat(1, minmax(0, 1fr));", description: "Grid: 1 column" },
    { label: "tui-grid-cols-2", css: "grid-template-columns: repeat(2, minmax(0, 1fr));", description: "Grid: 2 columns" },
    { label: "tui-grid-cols-3", css: "grid-template-columns: repeat(3, minmax(0, 1fr));", description: "Grid: 3 columns" },
    { label: "tui-grid-cols-4", css: "grid-template-columns: repeat(4, minmax(0, 1fr));", description: "Grid: 4 columns" },
    { label: "tui-grid-cols-6", css: "grid-template-columns: repeat(6, minmax(0, 1fr));", description: "Grid: 6 columns" },
    { label: "tui-grid-cols-12", css: "grid-template-columns: repeat(12, minmax(0, 1fr));", description: "Grid: 12 columns" },

    // Position
    { label: "tui-relative", css: "position: relative;", description: "Position: relative" },
    { label: "tui-absolute", css: "position: absolute;", description: "Position: absolute" },
    { label: "tui-fixed", css: "position: fixed;", description: "Position: fixed" },
    { label: "tui-sticky", css: "position: sticky;", description: "Position: sticky" },

    // Overflow
    { label: "tui-overflow-hidden", css: "overflow: hidden;", description: "Overflow: hidden" },
    { label: "tui-overflow-auto", css: "overflow: auto;", description: "Overflow: auto" },
    { label: "tui-overflow-scroll", css: "overflow: scroll;", description: "Overflow: scroll" },

    // Text align
    { label: "tui-text-left", css: "text-align: left;", description: "Text align: left" },
    { label: "tui-text-center", css: "text-align: center;", description: "Text align: center" },
    { label: "tui-text-right", css: "text-align: right;", description: "Text align: right" },

    // Misc
    { label: "tui-truncate", css: "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;", description: "Truncate text with ellipsis" },
    { label: "tui-no-underline", css: "text-decoration: none;", description: "No underline" },
    { label: "tui-underline", css: "text-decoration: underline;", description: "Underline" },
    { label: "tui-cursor-pointer", css: "cursor: pointer;", description: "Cursor: pointer" },
    { label: "tui-cursor-not-allowed", css: "cursor: not-allowed;", description: "Cursor: not-allowed" },
    { label: "tui-select-none", css: "user-select: none;", description: "User select: none" },
    { label: "tui-transition-colors", css: "transition-property: color, background-color, border-color;", description: "Transition colors" },
    { label: "tui-transition-all", css: "transition-property: all;", description: "Transition all" },
  ];
}

function generateOpacityTokens(): TokenEntry[] {
  const opacities = [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100];
  return opacities.map((val) => ({
    label: `tui-opacity-${val}`,
    css: `opacity: var(--tui-opacity-${val}); /* ${val / 100} */`,
    description: `Opacity: ${val}%`,
  }));
}

function generateZIndexTokens(): TokenEntry[] {
  const zIndexes: Record<string, string> = {
    auto: "auto", "0": "0", "10": "10", "20": "20", "30": "30",
    "40": "40", "50": "50", dropdown: "1000", sticky: "1100",
    fixed: "1200", "modal-backdrop": "1300", modal: "1400",
    popover: "1500", tooltip: "1600",
  };

  return Object.entries(zIndexes).map(([key, val]) => ({
    label: `tui-z-${key}`,
    css: `z-index: var(--tui-z-${key}); /* ${val} */`,
    description: `Z-index: ${val}`,
  }));
}

// ── Export all tokens ─────────────────────────────────────────────────────

function generateTransformTokens(): TokenEntry[] {
  const entries: TokenEntry[] = [];

  // Scale
  for (const s of [0, 50, 75, 90, 95, 100, 105, 110, 125, 150]) {
    entries.push({ label: `tui-scale-${s}`, css: `transform: scale(${s / 100});`, description: `Scale: ${s}%` });
  }

  // Rotate
  for (const r of [0, 1, 2, 3, 6, 12, 45, 90, 180]) {
    entries.push({ label: `tui-rotate-${r}`, css: `transform: rotate(${r}deg);`, description: `Rotate: ${r}deg` });
    if (r > 0) entries.push({ label: `tui--rotate-${r}`, css: `transform: rotate(-${r}deg);`, description: `Rotate: -${r}deg` });
  }

  // Translate
  entries.push({ label: "tui-translate-x-0", css: "transform: translateX(0);", description: "Translate X: 0" });
  entries.push({ label: "tui-translate-y-0", css: "transform: translateY(0);", description: "Translate Y: 0" });
  entries.push({ label: "tui-translate-x-full", css: "transform: translateX(100%);", description: "Translate X: 100%" });
  entries.push({ label: "tui-translate-y-full", css: "transform: translateY(100%);", description: "Translate Y: 100%" });
  entries.push({ label: "tui--translate-x-full", css: "transform: translateX(-100%);", description: "Translate X: -100%" });
  entries.push({ label: "tui--translate-y-full", css: "transform: translateY(-100%);", description: "Translate Y: -100%" });
  entries.push({ label: "tui--translate-x-1/2", css: "transform: translateX(-50%);", description: "Translate X: -50%" });
  entries.push({ label: "tui--translate-y-1/2", css: "transform: translateY(-50%);", description: "Translate Y: -50%" });

  // Origin
  for (const o of ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"]) {
    entries.push({ label: `tui-origin-${o}`, css: `transform-origin: ${o.replace("-", " ")};`, description: `Origin: ${o}` });
  }

  // Transform none
  entries.push({ label: "tui-transform-none", css: "transform: none;", description: "No transform" });

  return entries;
}

function generateAnimationTokens(): TokenEntry[] {
  return [
    { label: "tui-animate-spin", css: "animation: tui-spin 1s linear infinite;", description: "Spinning animation" },
    { label: "tui-animate-ping", css: "animation: tui-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;", description: "Ping/pulse out animation" },
    { label: "tui-animate-pulse", css: "animation: tui-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;", description: "Fade pulse animation" },
    { label: "tui-animate-bounce", css: "animation: tui-bounce 1s infinite;", description: "Bounce animation" },
    { label: "tui-animate-none", css: "animation: none;", description: "No animation" },
  ];
}

function generateFilterTokens(): TokenEntry[] {
  const entries: TokenEntry[] = [];

  // Blur
  for (const [key, val] of Object.entries({ none: "0", sm: "4px", "": "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" })) {
    const label = key === "" ? "tui-blur" : `tui-blur-${key}`;
    entries.push({ label, css: `filter: blur(${val});`, description: `Blur: ${val}` });
  }

  // Backdrop blur
  for (const [key, val] of Object.entries({ none: "0", sm: "4px", "": "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px" })) {
    const label = key === "" ? "tui-backdrop-blur" : `tui-backdrop-blur-${key}`;
    entries.push({ label, css: `backdrop-filter: blur(${val});`, description: `Backdrop blur: ${val}` });
  }

  // Grayscale, invert, sepia
  entries.push({ label: "tui-grayscale", css: "filter: grayscale(100%);", description: "Grayscale" });
  entries.push({ label: "tui-grayscale-0", css: "filter: grayscale(0);", description: "No grayscale" });
  entries.push({ label: "tui-invert", css: "filter: invert(100%);", description: "Invert colors" });
  entries.push({ label: "tui-invert-0", css: "filter: invert(0);", description: "No invert" });
  entries.push({ label: "tui-sepia", css: "filter: sepia(100%);", description: "Sepia tone" });
  entries.push({ label: "tui-sepia-0", css: "filter: sepia(0);", description: "No sepia" });

  // Saturate
  for (const [key, val] of Object.entries({ "0": "0", "50": "0.5", "100": "1", "150": "1.5", "200": "2" })) {
    entries.push({ label: `tui-saturate-${key}`, css: `filter: saturate(${val});`, description: `Saturate: ${key}%` });
  }

  // Mix blend
  for (const mode of ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "difference", "exclusion"]) {
    entries.push({ label: `tui-mix-blend-${mode}`, css: `mix-blend-mode: ${mode};`, description: `Blend: ${mode}` });
  }

  return entries;
}

function generateExtraUtilityTokens(): TokenEntry[] {
  const entries: TokenEntry[] = [];

  // Margin auto
  entries.push({ label: "tui-mx-auto", css: "margin-left: auto; margin-right: auto;", description: "Margin horizontal: auto (center)" });
  entries.push({ label: "tui-my-auto", css: "margin-top: auto; margin-bottom: auto;", description: "Margin vertical: auto" });
  entries.push({ label: "tui-ml-auto", css: "margin-left: auto;", description: "Margin left: auto" });
  entries.push({ label: "tui-mr-auto", css: "margin-right: auto;", description: "Margin right: auto" });
  entries.push({ label: "tui-mt-auto", css: "margin-top: auto;", description: "Margin top: auto" });
  entries.push({ label: "tui-mb-auto", css: "margin-bottom: auto;", description: "Margin bottom: auto" });
  entries.push({ label: "tui-m-auto", css: "margin: auto;", description: "Margin: auto" });

  // Text wrap
  entries.push({ label: "tui-text-wrap", css: "text-wrap: wrap;", description: "Text wrap: wrap" });
  entries.push({ label: "tui-text-nowrap", css: "text-wrap: nowrap;", description: "Text wrap: nowrap" });
  entries.push({ label: "tui-text-balance", css: "text-wrap: balance;", description: "Text wrap: balance" });
  entries.push({ label: "tui-text-pretty", css: "text-wrap: pretty;", description: "Text wrap: pretty" });

  // Whitespace (additions)
  entries.push({ label: "tui-whitespace-normal", css: "white-space: normal;", description: "Whitespace: normal" });
  entries.push({ label: "tui-whitespace-nowrap", css: "white-space: nowrap;", description: "Whitespace: nowrap" });
  entries.push({ label: "tui-whitespace-pre", css: "white-space: pre;", description: "Whitespace: pre" });
  entries.push({ label: "tui-whitespace-pre-wrap", css: "white-space: pre-wrap;", description: "Whitespace: pre-wrap" });
  entries.push({ label: "tui-whitespace-pre-line", css: "white-space: pre-line;", description: "Whitespace: pre-line" });
  entries.push({ label: "tui-whitespace-break-spaces", css: "white-space: break-spaces;", description: "Whitespace: break-spaces" });

  // Font smoothing
  entries.push({ label: "tui-antialiased", css: "-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;", description: "Antialiased font smoothing" });
  entries.push({ label: "tui-subpixel-antialiased", css: "-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;", description: "Subpixel antialiased" });

  // Transition extras
  entries.push({ label: "tui-transition-opacity", css: "transition-property: opacity; transition-duration: 200ms;", description: "Transition: opacity" });
  entries.push({ label: "tui-transition-transform", css: "transition-property: transform; transition-duration: 200ms;", description: "Transition: transform" });
  entries.push({ label: "tui-transition-none", css: "transition-property: none;", description: "No transition" });

  // Divide
  entries.push({ label: "tui-divide-x", css: "& > * + * { border-left-width: 1px; border-left-style: solid; }", description: "Divide children horizontally" });
  entries.push({ label: "tui-divide-y", css: "& > * + * { border-top-width: 1px; border-top-style: solid; }", description: "Divide children vertically" });
  entries.push({ label: "tui-divide-x-2", css: "& > * + * { border-left-width: 2px; }", description: "Divide children: 2px horizontal" });
  entries.push({ label: "tui-divide-y-2", css: "& > * + * { border-top-width: 2px; }", description: "Divide children: 2px vertical" });

  // Letter spacing
  for (const [key, val] of Object.entries({ tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" })) {
    entries.push({ label: `tui-tracking-${key}`, css: `letter-spacing: var(--tui-tracking-${key}); /* ${val} */`, description: `Letter spacing: ${val}` });
  }

  // Font family
  entries.push({ label: "tui-font-sans", css: "font-family: var(--tui-font-family-sans);", description: "Font: sans-serif" });
  entries.push({ label: "tui-font-serif", css: "font-family: var(--tui-font-family-serif);", description: "Font: serif" });
  entries.push({ label: "tui-font-mono", css: "font-family: var(--tui-font-family-mono);", description: "Font: monospace" });

  // Overflow extras
  entries.push({ label: "tui-overflow-x-auto", css: "overflow-x: auto;", description: "Overflow X: auto" });
  entries.push({ label: "tui-overflow-y-auto", css: "overflow-y: auto;", description: "Overflow Y: auto" });
  entries.push({ label: "tui-overflow-x-hidden", css: "overflow-x: hidden;", description: "Overflow X: hidden" });
  entries.push({ label: "tui-overflow-y-hidden", css: "overflow-y: hidden;", description: "Overflow Y: hidden" });
  entries.push({ label: "tui-overflow-visible", css: "overflow: visible;", description: "Overflow: visible" });

  // Width/Height keywords
  entries.push({ label: "tui-w-full", css: "width: 100%;", description: "Width: 100%" });
  entries.push({ label: "tui-w-auto", css: "width: auto;", description: "Width: auto" });
  entries.push({ label: "tui-w-screen", css: "width: 100vw;", description: "Width: viewport" });
  entries.push({ label: "tui-w-min", css: "width: min-content;", description: "Width: min-content" });
  entries.push({ label: "tui-w-max", css: "width: max-content;", description: "Width: max-content" });
  entries.push({ label: "tui-w-fit", css: "width: fit-content;", description: "Width: fit-content" });
  entries.push({ label: "tui-h-full", css: "height: 100%;", description: "Height: 100%" });
  entries.push({ label: "tui-h-auto", css: "height: auto;", description: "Height: auto" });
  entries.push({ label: "tui-h-screen", css: "height: 100vh;", description: "Height: viewport" });
  entries.push({ label: "tui-h-min", css: "height: min-content;", description: "Height: min-content" });
  entries.push({ label: "tui-h-max", css: "height: max-content;", description: "Height: max-content" });
  entries.push({ label: "tui-h-fit", css: "height: fit-content;", description: "Height: fit-content" });
  entries.push({ label: "tui-min-w-0", css: "min-width: 0;", description: "Min-width: 0" });
  entries.push({ label: "tui-min-w-full", css: "min-width: 100%;", description: "Min-width: 100%" });
  entries.push({ label: "tui-min-w-min", css: "min-width: min-content;", description: "Min-width: min-content" });
  entries.push({ label: "tui-min-w-max", css: "min-width: max-content;", description: "Min-width: max-content" });
  entries.push({ label: "tui-min-w-fit", css: "min-width: fit-content;", description: "Min-width: fit-content" });
  entries.push({ label: "tui-max-w-full", css: "max-width: 100%;", description: "Max-width: 100%" });
  entries.push({ label: "tui-max-w-none", css: "max-width: none;", description: "Max-width: none" });
  entries.push({ label: "tui-max-w-screen", css: "max-width: 100vw;", description: "Max-width: viewport" });
  entries.push({ label: "tui-max-w-min", css: "max-width: min-content;", description: "Max-width: min-content" });
  entries.push({ label: "tui-max-w-max", css: "max-width: max-content;", description: "Max-width: max-content" });
  entries.push({ label: "tui-max-w-fit", css: "max-width: fit-content;", description: "Max-width: fit-content" });
  entries.push({ label: "tui-min-h-0", css: "min-height: 0;", description: "Min-height: 0" });
  entries.push({ label: "tui-min-h-full", css: "min-height: 100%;", description: "Min-height: 100%" });
  entries.push({ label: "tui-min-h-screen", css: "min-height: 100vh;", description: "Min-height: viewport" });
  entries.push({ label: "tui-min-h-min", css: "min-height: min-content;", description: "Min-height: min-content" });
  entries.push({ label: "tui-min-h-max", css: "min-height: max-content;", description: "Min-height: max-content" });
  entries.push({ label: "tui-min-h-fit", css: "min-height: fit-content;", description: "Min-height: fit-content" });
  entries.push({ label: "tui-max-h-full", css: "max-height: 100%;", description: "Max-height: 100%" });
  entries.push({ label: "tui-max-h-screen", css: "max-height: 100vh;", description: "Max-height: viewport" });
  entries.push({ label: "tui-max-h-none", css: "max-height: none;", description: "Max-height: none" });
  entries.push({ label: "tui-max-h-min", css: "max-height: min-content;", description: "Max-height: min-content" });
  entries.push({ label: "tui-max-h-max", css: "max-height: max-content;", description: "Max-height: max-content" });
  entries.push({ label: "tui-max-h-fit", css: "max-height: fit-content;", description: "Max-height: fit-content" });

  // SR only
  entries.push({ label: "tui-sr-only", css: "position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0);", description: "Screen reader only" });
  entries.push({ label: "tui-not-sr-only", css: "position: static; width: auto; height: auto; overflow: visible; clip: auto;", description: "Not screen reader only" });

  // Inherit / Initial / Transparent / Current
  entries.push({ label: "tui-w-inherit", css: "width: inherit;", description: "Width: inherit" });
  entries.push({ label: "tui-w-initial", css: "width: initial;", description: "Width: initial" });
  entries.push({ label: "tui-h-inherit", css: "height: inherit;", description: "Height: inherit" });
  entries.push({ label: "tui-h-initial", css: "height: initial;", description: "Height: initial" });
  entries.push({ label: "tui-min-w-inherit", css: "min-width: inherit;", description: "Min-width: inherit" });
  entries.push({ label: "tui-max-w-inherit", css: "max-width: inherit;", description: "Max-width: inherit" });
  entries.push({ label: "tui-min-h-inherit", css: "min-height: inherit;", description: "Min-height: inherit" });
  entries.push({ label: "tui-max-h-inherit", css: "max-height: inherit;", description: "Max-height: inherit" });
  entries.push({ label: "tui-text-inherit", css: "color: inherit;", description: "Text color: inherit" });
  entries.push({ label: "tui-text-transparent", css: "color: transparent;", description: "Text color: transparent" });
  entries.push({ label: "tui-text-current", css: "color: currentColor;", description: "Text color: currentColor" });
  entries.push({ label: "tui-bg-inherit", css: "background-color: inherit;", description: "Background: inherit" });
  entries.push({ label: "tui-bg-transparent", css: "background-color: transparent;", description: "Background: transparent" });
  entries.push({ label: "tui-bg-current", css: "background-color: currentColor;", description: "Background: currentColor" });
  entries.push({ label: "tui-border-inherit", css: "border-color: inherit;", description: "Border color: inherit" });
  entries.push({ label: "tui-border-transparent", css: "border-color: transparent;", description: "Border color: transparent" });
  entries.push({ label: "tui-border-current", css: "border-color: currentColor;", description: "Border color: currentColor" });
  entries.push({ label: "tui-font-inherit", css: "font-weight: inherit;", description: "Font weight: inherit" });
  entries.push({ label: "tui-leading-inherit", css: "line-height: inherit;", description: "Line height: inherit" });
  entries.push({ label: "tui-tracking-inherit", css: "letter-spacing: inherit;", description: "Letter spacing: inherit" });
  entries.push({ label: "tui-rounded-inherit", css: "border-radius: inherit;", description: "Border radius: inherit" });
  entries.push({ label: "tui-opacity-inherit", css: "opacity: inherit;", description: "Opacity: inherit" });
  entries.push({ label: "tui-p-inherit", css: "padding: inherit;", description: "Padding: inherit" });
  entries.push({ label: "tui-m-inherit", css: "margin: inherit;", description: "Margin: inherit" });
  entries.push({ label: "tui-gap-inherit", css: "gap: inherit;", description: "Gap: inherit" });

  return entries;
}

let _allTokens: TokenEntry[] | null = null;

export function getAllTokens(): TokenEntry[] {
  if (_allTokens) return _allTokens;

  _allTokens = [
    ...generateColorTokens(),
    ...generateSpacingTokens(),
    ...generateTypographyTokens(),
    ...generateBorderRadiusTokens(),
    ...generateShadowTokens(),
    ...generateBorderWidthTokens(),
    ...generateLayoutTokens(),
    ...generateOpacityTokens(),
    ...generateZIndexTokens(),
    ...generateTransformTokens(),
    ...generateAnimationTokens(),
    ...generateFilterTokens(),
    ...generateExtraUtilityTokens(),
  ];

  return _allTokens;
}

// ── Lookup map for hover ──────────────────────────────────────────────────

let _tokenMap: Map<string, TokenEntry> | null = null;

export function getTokenMap(): Map<string, TokenEntry> {
  if (_tokenMap) return _tokenMap;
  _tokenMap = new Map();
  for (const token of getAllTokens()) {
    _tokenMap.set(token.label, token);
  }
  return _tokenMap;
}
