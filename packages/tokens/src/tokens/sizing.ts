/**
 * Sizing tokens — fixed heights for interactive controls
 * CSS custom property prefix: --tui-size-*
 */

export const sizing = {
  xxs:  "0.875rem",   // 14px
  xs1:  "1rem",       // 16px
  xs2:  "1.25rem",    // 20px
  xs:   "1.5rem",     // 24px
  sm:   "2rem",       // 32px
  md:   "2.25rem",    // 36px
  lg:   "2.625rem",   // 42px
  xl:   "2.875rem",   // 46px
} as const;

export type SizingTokens = typeof sizing;
