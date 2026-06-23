/**
 * Z-index tokens
 * CSS custom property prefix: --tui-z-*
 */
export const zIndex = {
  hide:       "-1",
  auto:       "auto",
  base:       "0",
  raised:     "1",
  dropdown:   "1000",
  sticky:     "1100",
  overlay:    "1200",
  modal:      "1300",
  popover:    "1400",
  toast:      "1500",
  tooltip:    "1600",
} as const;

export type ZIndexTokens = typeof zIndex;
