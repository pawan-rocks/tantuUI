/**
 * Color tokens
 * CSS custom property prefix: --tui-color-*
 */
export const color = {
  // ── Primitives (raw scale) ──────────────────────────────────────────
  primitive: {
    // Neutral
    neutral0:   "#ffffff",
    neutral50:  "#f9fafb",
    neutral100: "#f3f4f6",
    neutral200: "#e5e7eb",
    neutral300: "#d1d5db",
    neutral400: "#9ca3af",
    neutral500: "#6b7280",
    neutral600: "#4b5563",
    neutral700: "#374151",
    neutral800: "#1f2937",
    neutral900: "#111827",
    neutral950: "#030712",

    // Primary (brand blue)
    primary50:  "#eff6ff",
    primary100: "#dbeafe",
    primary200: "#bfdbfe",
    primary300: "#93c5fd",
    primary400: "#60a5fa",
    primary500: "#3b82f6",
    primary600: "#2563eb",
    primary700: "#1d4ed8",
    primary800: "#1e40af",
    primary900: "#1e3a8a",
    primary950: "#172554",

    // Success
    success50:  "#f0fdf4",
    success500: "#22c55e",
    success700: "#15803d",

    // Warning
    warning50:  "#fffbeb",
    warning500: "#f59e0b",
    warning700: "#b45309",

    // Danger / Error
    danger50:   "#fef2f2",
    danger500:  "#ef4444",
    danger700:  "#b91c1c",

    // Info
    info50:     "#eff6ff",
    info500:    "#3b82f6",
    info700:    "#1d4ed8",
  },

  // ── Semantic aliases ────────────────────────────────────────────────
  semantic: {
    // Background
    bgBase:       "var(--tui-color-neutral-0)",
    bgSubtle:     "var(--tui-color-neutral-50)",
    bgMuted:      "var(--tui-color-neutral-100)",
    bgInverse:    "var(--tui-color-neutral-900)",

    // Surface (cards, panels)
    surfaceDefault:  "var(--tui-color-neutral-0)",
    surfaceRaised:   "var(--tui-color-neutral-50)",
    surfaceOverlay:  "var(--tui-color-neutral-100)",

    // Text
    textPrimary:     "var(--tui-color-neutral-900)",
    textSecondary:   "var(--tui-color-neutral-600)",
    textTertiary:    "var(--tui-color-neutral-400)",
    textDisabled:    "var(--tui-color-neutral-300)",
    textInverse:     "var(--tui-color-neutral-0)",
    textLink:        "var(--tui-color-primary-600)",
    textLinkHover:   "var(--tui-color-primary-700)",

    // Border
    borderDefault:   "var(--tui-color-neutral-200)",
    borderStrong:    "var(--tui-color-neutral-400)",
    borderFocus:     "var(--tui-color-primary-500)",

    // Focus ring — flush box-shadow ring on keyboard focus
    focusRing:       "var(--tui-color-neutral-500)",  // gray-500
    focusRingGap:    "var(--tui-color-neutral-0)",    // gap color (white in light, dark bg in dark mode)

    // Brand interactive
    brandDefault:    "var(--tui-color-primary-600)",
    brandHover:      "var(--tui-color-primary-700)",
    brandActive:     "var(--tui-color-primary-800)",
    brandSubtle:     "var(--tui-color-primary-50)",
    brandText:       "var(--tui-color-neutral-0)",

    // Status
    successDefault:  "var(--tui-color-success-500)",
    successSubtle:   "var(--tui-color-success-50)",
    successText:     "var(--tui-color-success-700)",

    warningDefault:  "var(--tui-color-warning-500)",
    warningSubtle:   "var(--tui-color-warning-50)",
    warningText:     "var(--tui-color-warning-700)",

    dangerDefault:   "var(--tui-color-danger-500)",
    dangerSubtle:    "var(--tui-color-danger-50)",
    dangerText:      "var(--tui-color-danger-700)",

    infoDefault:     "var(--tui-color-info-500)",
    infoSubtle:      "var(--tui-color-info-50)",
    infoText:        "var(--tui-color-info-700)",
  },
} as const;

export type ColorTokens = typeof color;
