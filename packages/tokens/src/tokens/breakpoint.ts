/**
 * Breakpoint tokens
 * Used for media queries and responsive utilities.
 * CSS custom property prefix: --tui-screen-*
 */
export const breakpoint = {
  xs:   "320px",
  sm:   "640px",
  md:   "768px",
  lg:   "1024px",
  xl:   "1280px",
  "2xl":"1536px",
} as const;

export type BreakpointTokens = typeof breakpoint;
