/**
 * Typography tokens — font family, size, weight, line-height, letter-spacing
 * CSS custom property prefix: --tui-font-*
 */

export const fontFamily = {
  sans:  "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
  serif: "'Georgia', ui-serif, serif",
  mono:  "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",
} as const;

/**
 * Font size scale (rem)
 * Base: 16px = 1rem
 */
export const fontSize = {
  "2xs":  "0.625rem",   // 10px
  xs:     "0.75rem",    // 12px
  sm:     "0.875rem",   // 14px
  md:     "1rem",       // 16px  ← base
  lg:     "1.125rem",   // 18px
  xl:     "1.25rem",    // 20px
  "2xl":  "1.5rem",     // 24px
  "3xl":  "1.875rem",   // 30px
  "4xl":  "2.25rem",    // 36px
  "5xl":  "3rem",       // 48px
  "6xl":  "3.75rem",    // 60px
  "7xl":  "4.5rem",     // 72px
} as const;

export const fontWeight = {
  thin:       "100",
  extralight: "200",
  light:      "300",
  normal:     "400",
  medium:     "500",
  semibold:   "600",
  bold:       "700",
  extrabold:  "800",
  black:      "900",
} as const;

export const lineHeight = {
  none:     "1",
  tight:    "1.25",
  snug:     "1.375",
  normal:   "1.5",
  relaxed:  "1.625",
  loose:    "2",
  "3":      "0.75rem",
  "3.5":    "0.875rem",
  "4":      "1rem",
  "4.5":    "1.125rem",
  "5":      "1.25rem",
  "5.5":    "1.375rem",
  "6":      "1.5rem",
  "6.5":    "1.625rem",
  "7":      "1.75rem",
  "7.5":    "1.875rem",
  "8":      "2rem",
  "8.5":    "2.125rem",
  "9":      "2.25rem",
  "9.5":    "2.375rem",
  "10":     "2.5rem",
} as const;

export const letterSpacing = {
  tighter:  "-0.05em",
  tight:    "-0.025em",
  normal:   "0em",
  wide:     "0.025em",
  wider:    "0.05em",
  widest:   "0.1em",
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;

export type TypographyTokens = typeof typography;
