/**
 * Box shadow tokens
 * CSS custom property prefix: --tui-shadow-*
 *
 * Each shadow uses CSS variables internally so dark-mode overrides
 * only need to change the base variables, not every shadow value.
 */
export const shadow = {
  none: "none",

  // Elevation scale
  xs:   "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm:   "0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)",
  md:   "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)",
  lg:   "0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)",
  xl:   "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)",
  "2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",

  // Inner
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",

  // Focus ring (used for keyboard focus)
  focus: "0 0 0 3px var(--tui-color-primary-300, #93c5fd)",

  // Brand focus ring
  focusBrand: "0 0 0 3px var(--tui-color-primary-400, #60a5fa)",
} as const;

export type ShadowTokens = typeof shadow;
