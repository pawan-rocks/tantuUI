/**
 * Spacing tokens — margin, padding, gap, inset
 * CSS custom property prefix: --tui-spacing-*
 *
 * Base unit: 4px (0.25rem)
 * Scale follows a 4pt grid.
 */
export const spacing = {
  0:    "0px",
  px:   "1px",
  0.5:  "0.125rem",  //  2px
  1:    "0.25rem",   //  4px
  1.5:  "0.375rem",  //  6px
  2:    "0.5rem",    //  8px
  2.5:  "0.625rem",  // 10px
  3:    "0.75rem",   // 12px
  3.5:  "0.875rem",  // 14px
  4:    "1rem",      // 16px
  5:    "1.25rem",   // 20px
  6:    "1.5rem",    // 24px
  7:    "1.75rem",   // 28px
  8:    "2rem",      // 32px
  9:    "2.25rem",   // 36px
  10:   "2.5rem",    // 40px
  11:   "2.75rem",   // 44px
  12:   "3rem",      // 48px
  14:   "3.5rem",    // 56px
  16:   "4rem",      // 64px
  20:   "5rem",      // 80px
  24:   "6rem",      // 96px
  28:   "7rem",      // 112px
  32:   "8rem",      // 128px
  36:   "9rem",      // 144px
  40:   "10rem",     // 160px
  44:   "11rem",     // 176px
  48:   "12rem",     // 192px
  52:   "13rem",     // 208px
  56:   "14rem",     // 224px
  60:   "15rem",     // 240px
  64:   "16rem",     // 256px
  72:   "18rem",     // 288px
  80:   "20rem",     // 320px
  96:   "24rem",     // 384px

  // ── Semantic defaults ────────────────────────────────────────────────
  componentXs:    "var(--tui-spacing-1)",    // tight inner padding (badges)
  componentSm:    "var(--tui-spacing-2)",    // small component padding
  componentMd:    "var(--tui-spacing-3)",    // default component padding
  componentLg:    "var(--tui-spacing-4)",    // large component padding
  componentXl:    "var(--tui-spacing-6)",    // extra-large component padding
  sectionSm:     "var(--tui-spacing-6)",    // small section spacing
  sectionMd:     "var(--tui-spacing-8)",    // default section spacing
  sectionLg:     "var(--tui-spacing-12)",   // large section spacing
  pagePadding:   "var(--tui-spacing-4)",    // page-level side padding
  cardPadding:   "var(--tui-spacing-4)",    // card/panel inner padding
  modalPadding:  "var(--tui-spacing-6)",    // modal/dialog inner padding
  stackSm:      "var(--tui-spacing-2)",    // small vertical stack gap
  stackMd:      "var(--tui-spacing-4)",    // default vertical stack gap
  stackLg:      "var(--tui-spacing-6)",    // large vertical stack gap
  inlineSm:     "var(--tui-spacing-2)",    // small horizontal gap
  inlineMd:     "var(--tui-spacing-3)",    // default horizontal gap
  inlineLg:     "var(--tui-spacing-4)",    // large horizontal gap
} as const;

export type SpacingTokens = typeof spacing;
