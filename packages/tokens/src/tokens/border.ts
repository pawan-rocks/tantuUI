/**
 * Border width and style tokens
 * CSS custom property prefix: --tui-border-*
 */
export const borderWidth = {
  0:  "0px",
  1:  "1px",
  2:  "2px",
  4:  "4px",
  8:  "8px",
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
