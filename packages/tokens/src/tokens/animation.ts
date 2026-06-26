/**
 * Animation / transition tokens
 * CSS custom property prefix: --tui-duration-*, --tui-ease-*
 */
export const duration = {
  instant:    "0ms",
  fast:       "100ms",
  normal:     "200ms",
  slow:       "300ms",
  slower:     "500ms",
  slowest:    "700ms",

  // ── Semantic defaults ────────────────────────────────────────────────
  default:    "var(--tui-duration-normal)",   // default transition duration
  hover:      "var(--tui-duration-fast)",     // hover state transitions
  modal:      "var(--tui-duration-slow)",     // modal open/close
  tooltip:    "var(--tui-duration-fast)",     // tooltip show/hide
  collapse:   "var(--tui-duration-slow)",     // accordion/collapse
} as const;

export const easing = {
  linear:       "linear",
  in:           "cubic-bezier(0.4, 0, 1, 1)",
  out:          "cubic-bezier(0, 0, 0.2, 1)",
  inOut:        "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce:       "cubic-bezier(0.34, 1.56, 0.64, 1)",
  spring:       "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  // ── Semantic defaults ────────────────────────────────────────────────
  default:      "var(--tui-ease-in-out)",     // default easing
  enter:        "var(--tui-ease-out)",        // elements entering
  exit:         "var(--tui-ease-in)",         // elements exiting
} as const;

export const animation = {
  duration,
  easing,
} as const;

export type AnimationTokens = typeof animation;
