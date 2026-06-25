/**
 * Color tokens
 * CSS custom property prefix: --tui-color-*
 *
 * DEFAULT for each color = 900 shade
 */
export const color = {
  // ── Primitives (raw scale) ──────────────────────────────────────────

  primitive: {
    // ── White / Black ──────────────────────────────────────────────────
    white: "#ffffff",
    black: "#000000",

    // ── Neutral (zinc-based) ───────────────────────────────────────────
    neutral50:  "#fafafa",
    neutral100: "#f4f4f5",
    neutral200: "#e4e4e7",
    neutral300: "#d4d4d8",
    neutral400: "#a1a1aa",
    neutral500: "#71717a",
    neutral600: "#52525b",
    neutral700: "#3f3f46",
    neutral800: "#27272a",
    neutral900: "#18181b",
    neutral950: "#09090b",
    neutralDefault: "#18181b",  // → neutral-900

    // ── Gray (cool gray) ──────────────────────────────────────────────
    gray50:  "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",
    gray950: "#030712",
    grayDefault: "#111827",  // → gray-900

    // ── Primary — Magenta Purple (#B927F1 base) ────────────────────────
    primary50:  "#fdf4ff",
    primary100: "#fae8ff",
    primary200: "#f5d0fe",
    primary300: "#f0abfc",
    primary400: "#e879f9",
    primary500: "#d946ef",
    primary600: "#b927f1",
    primary700: "#a21caf",
    primary800: "#86198f",
    primary900: "#701a75",
    primary950: "#4a044e",
    primaryDefault: "#701a75",  // → primary-900

    // ── Brand Blue (#2360FF base) ──────────────────────────────────────
    brandBlue50:  "#eff4ff",
    brandBlue100: "#dbeaff",
    brandBlue200: "#bfd7fe",
    brandBlue300: "#93bbfd",
    brandBlue400: "#6096fa",
    brandBlue500: "#3a72f6",
    brandBlue600: "#2360ff",
    brandBlue700: "#1e68ff",
    brandBlue800: "#1a4fd4",
    brandBlue900: "#1c43a7",
    brandBlue950: "#162a66",
    brandBlueDefault: "#1c43a7",  // → brand-blue-900

    // ── Indigo (#4f46e5 base) ──────────────────────────────────────────
    indigo50:  "#eef2ff",
    indigo100: "#e0e7ff",
    indigo200: "#c7d2fe",
    indigo300: "#a5b4fc",
    indigo400: "#818cf8",
    indigo500: "#6366f1",
    indigo600: "#4f46e5",
    indigo700: "#4338ca",
    indigo800: "#3730a3",
    indigo900: "#312e81",
    indigo950: "#1e1b4b",
    indigoDefault: "#312e81",  // → indigo-900

    // ── Purple (#AF27F0 base) ──────────────────────────────────────────
    purple50:  "#faf5ff",
    purple100: "#f3e8ff",
    purple200: "#e9d5ff",
    purple300: "#d8b4fe",
    purple400: "#c084fc",
    purple500: "#af27f0",
    purple600: "#9333ea",
    purple700: "#7e22ce",
    purple800: "#6b21a8",
    purple900: "#581c87",
    purple950: "#3b0764",
    purpleDefault: "#581c87",  // → purple-900

    // ── Secondary — Coal (slate-based) ─────────────────────────────────
    secondary50:  "#f8fafc",
    secondary100: "#f1f5f9",
    secondary200: "#e2e8f0",
    secondary300: "#cbd5e1",
    secondary400: "#94a3b8",
    secondary500: "#64748b",
    secondary600: "#475569",
    secondary700: "#334155",
    secondary800: "#1e293b",
    secondary900: "#0f172a",
    secondary950: "#020617",
    secondaryDefault: "#0f172a",  // → secondary-900

    // ── Success ────────────────────────────────────────────────────────
    success50:  "#f0fdf4",
    success100: "#dcfce7",
    success200: "#bbf7d0",
    success300: "#86efac",
    success400: "#4ade80",
    success500: "#22c55e",
    success600: "#16a34a",
    success700: "#15803d",
    success800: "#166534",
    success900: "#14532d",
    success950: "#052e16",
    successDefault: "#14532d",  // → success-900

    // ── Warning ────────────────────────────────────────────────────────
    warning50:  "#fffbeb",
    warning100: "#fef3c7",
    warning200: "#fde68a",
    warning300: "#fcd34d",
    warning400: "#fbbf24",
    warning500: "#f59e0b",
    warning600: "#d97706",
    warning700: "#b45309",
    warning800: "#92400e",
    warning900: "#78350f",
    warning950: "#451a03",
    warningDefault: "#78350f",  // → warning-900

    // ── Danger ─────────────────────────────────────────────────────────
    danger50:  "#fef2f2",
    danger100: "#fee2e2",
    danger200: "#fecaca",
    danger300: "#fca5a5",
    danger400: "#f87171",
    danger500: "#ef4444",
    danger600: "#dc2626",
    danger700: "#b91c1c",
    danger800: "#991b1b",
    danger900: "#7f1d1d",
    danger950: "#450a0a",
    dangerDefault: "#7f1d1d",  // → danger-900

    // ── Info ───────────────────────────────────────────────────────────
    info50:  "#eff6ff",
    info100: "#dbeafe",
    info200: "#bfdbfe",
    info300: "#93c5fd",
    info400: "#60a5fa",
    info500: "#3b82f6",
    info600: "#2563eb",
    info700: "#1d4ed8",
    info800: "#1e40af",
    info900: "#1e3a8a",
    info950: "#172554",
    infoDefault: "#1e3a8a",  // → info-900
  },

  // ── Semantic aliases ────────────────────────────────────────────────
  semantic: {
    // Background
    bgBase:       "var(--tui-color-white)",
    bgSubtle:     "var(--tui-color-neutral-50)",
    bgMuted:      "var(--tui-color-neutral-100)",
    bgInverse:    "var(--tui-color-neutral-900)",

    // Surface (cards, panels)
    surfaceDefault:  "var(--tui-color-white)",
    surfaceRaised:   "var(--tui-color-neutral-50)",
    surfaceOverlay:  "var(--tui-color-neutral-100)",

    // Text
    textPrimary:     "var(--tui-color-neutral-900)",
    textSecondary:   "var(--tui-color-secondary-600)",
    textTertiary:    "var(--tui-color-secondary-400)",
    textDisabled:    "var(--tui-color-neutral-300)",
    textInverse:     "var(--tui-color-white)",
    textLink:        "var(--tui-color-primary-600)",
    textLinkHover:   "var(--tui-color-primary-700)",

    // Border
    borderDefault:   "var(--tui-color-neutral-200)",
    borderStrong:    "var(--tui-color-neutral-400)",
    borderFocus:     "var(--tui-color-primary-500)",

    // Focus ring
    focusRing:       "var(--tui-color-neutral-500)",
    focusRingGap:    "var(--tui-color-white)",

    // Brand interactive (uses primary = magenta-purple)
    brandDefault:    "var(--tui-color-primary-600)",
    brandHover:      "var(--tui-color-primary-700)",
    brandActive:     "var(--tui-color-primary-800)",
    brandSubtle:     "var(--tui-color-primary-50)",
    brandText:       "var(--tui-color-white)",

    // Status
    successDefault:  "var(--tui-color-success-600)",
    successSubtle:   "var(--tui-color-success-50)",
    successText:     "var(--tui-color-success-700)",

    warningDefault:  "var(--tui-color-warning-600)",
    warningSubtle:   "var(--tui-color-warning-50)",
    warningText:     "var(--tui-color-warning-700)",

    dangerDefault:   "var(--tui-color-danger-600)",
    dangerSubtle:    "var(--tui-color-danger-50)",
    dangerText:      "var(--tui-color-danger-700)",

    infoDefault:     "var(--tui-color-info-600)",
    infoSubtle:      "var(--tui-color-info-50)",
    infoText:        "var(--tui-color-info-700)",
  },
} as const;

export type ColorTokens = typeof color;
