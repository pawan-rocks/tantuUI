/**
 * Border width and style tokens
 * CSS custom property prefix: --tui-border-*
 */
export const borderWidth = {
  0:    "0px",
  0.5:  "0.5px",
  1:    "1px",
  1.5:  "1.5px",
  2:    "2px",
  2.5:  "2.5px",
  3:    "3px",
  3.5:  "3.5px",
  4:    "4px",
  4.5:  "4.5px",
  5:    "5px",
  5.5:  "5.5px",
  8:    "8px",
  none: "0px",
  xs:   "0.5px",
  sm:   "1px",
  md:   "2px",
  lg:   "4px",
  xl:   "6px",
  "2xl": "12px",
  "3xl": "18px",
  "4xl": "24px",
  "5xl": "30px",
  "6xl": "36px",
  "7xl": "42px",
  "8xl": "48px",

  // ── Semantic defaults ────────────────────────────────────────────────
  default:   "var(--tui-border-width-1)",   // default border width
  input:     "var(--tui-border-width-1)",   // input/select border
  card:      "var(--tui-border-width-1)",   // card border
  divider:   "var(--tui-border-width-1)",   // horizontal/vertical dividers
  thick:     "var(--tui-border-width-2)",   // emphasized borders
} as const;

export const borderStyle = {
  solid:  "solid",
  dashed: "dashed",
  dotted: "dotted",
  none:   "none",
} as const;

export const border = {
  width: borderWidth,
  style: borderStyle,
} as const;

export type BorderTokens = typeof border;
