/**
 * Border radius tokens
 * CSS custom property prefix: --tui-radius-*
 */
export const radius = {
  none:  "0px",
  xs:    "0.125rem",  //  2px
  sm:    "0.25rem",   //  4px
  md:    "0.375rem",  //  6px
  lg:    "0.5rem",    //  8px
  xl:    "0.75rem",   // 12px
  "2xl": "1rem",      // 16px
  "3xl": "1.5rem",    // 24px
  full:  "9999px",    // pill / circle

  // ── Semantic defaults ────────────────────────────────────────────────
  default:   "var(--tui-radius-md)",     // default component radius
  button:    "var(--tui-radius-md)",     // buttons
  input:     "var(--tui-radius-md)",     // inputs, selects, textareas
  card:      "var(--tui-radius-lg)",     // cards, panels
  badge:     "var(--tui-radius-full)",   // badges, tags, pills
  avatar:    "var(--tui-radius-full)",   // avatar circles
  modal:     "var(--tui-radius-xl)",     // modals, dialogs
  tooltip:   "var(--tui-radius-sm)",     // tooltips, popovers
} as const;

export type RadiusTokens = typeof radius;
