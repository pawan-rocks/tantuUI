/**
 * Color tokens
 * CSS custom property prefix: --tui-color-*
 *
 * Brand colors use naming: brand-<colorname>-<scale|default>
 * Scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
 * Default = the base color from the brand palette
 */
export const color = {
  // ── Primitives (raw scale) ──────────────────────────────────────────

  primitive: {
    // ── White / Black (brand colors) ───────────────────────────────────
    white: "#ffffff",
    black: "#000000",

    // ── Brand Primary (#7C3AED base) ────────────────────────────────────
    brandPrimary50:  "#f5f3ff",
    brandPrimary100: "#ede8ff",
    brandPrimary200: "#ddd6fe",
    brandPrimary300: "#c4b5fc",
    brandPrimary400: "#a78bfa",
    brandPrimary500: "#8b5cf6",
    brandPrimary600: "#7c3aed",
    brandPrimary700: "#6d28d9",
    brandPrimary800: "#5b21b6",
    brandPrimary900: "#4c1d95",
    brandPrimary950: "#2e1065",
    brandPrimaryDefault: "#7C3AED",  // base from brand palette

    // ── Brand Secondary (#F3F4F6 base) ─────────────────────────────────────
    brandSecondary50:  "#fdfefe",
    brandSecondary100: "#f9fafb",
    brandSecondary200: "#f3f4f6",
    brandSecondary300: "#e5e7eb",
    brandSecondary400: "#d1d5db",
    brandSecondary500: "#9ca3af",
    brandSecondary600: "#6b7280",
    brandSecondary700: "#4b5563",
    brandSecondary800: "#374151",
    brandSecondary900: "#1f2937",
    brandSecondary950: "#111827",
    brandSecondaryDefault: "#F3F4F6",  // base from brand palette


    // ── Brand Tertiary (#0D132B base) ──────────────────────────────────────
    brandTertiary50:  "#f3f4f7",
    brandTertiary100: "#e7e8ef",
    brandTertiary200: "#cacfe2",
    brandTertiary300: "#9da8d2",
    brandTertiary400: "#6377c5",
    brandTertiary500: "#354eb0",
    brandTertiary600: "#2c4091",
    brandTertiary700: "#223272",
    brandTertiary800: "#1a2656",
    brandTertiary900: "#121a3b",
    brandTertiary950: "#0a0e1f",
    brandTertiaryDefault: "#2c4091",  // base from brand palette

    // ── Brand White (scale from pure white) ────────────────────────────
    brandWhite50:  "#ffffff",
    brandWhite100: "#fefefe",
    brandWhite200: "#fafafa",
    brandWhite300: "#f5f5f5",
    brandWhite400: "#ededed",
    brandWhite500: "#e0e0e0",
    brandWhite600: "#c2c2c2",
    brandWhite700: "#9e9e9e",
    brandWhite800: "#757575",
    brandWhite900: "#4a4a4a",
    brandWhite950: "#2b2b2b",
    brandWhiteDefault: "#ffffff",  // base from brand palette

    // ── Brand Black (scale from pure black) ────────────────────────────
    brandBlack50:  "#f5f5f5",
    brandBlack100: "#e8e8e8",
    brandBlack200: "#d4d4d4",
    brandBlack300: "#b0b0b0",
    brandBlack400: "#8a8a8a",
    brandBlack500: "#616161",
    brandBlack600: "#4a4a4a",
    brandBlack700: "#363636",
    brandBlack800: "#242424",
    brandBlack900: "#141414",
    brandBlack950: "#000000",
    brandBlackDefault: "#000000",  // base from brand palette


    // ── Brand Blue (#2563EB base) ──────────────────────────────────────
    brandBlue50:  "#eff4ff",
    brandBlue100: "#dbe6fe",
    brandBlue200: "#bfd3fe",
    brandBlue300: "#93b4fd",
    brandBlue400: "#6090fa",
    brandBlue500: "#3b6ef6",
    brandBlue600: "#2563eb",
    brandBlue700: "#1d50d8",
    brandBlue800: "#1e41af",
    brandBlue900: "#1e398a",
    brandBlue950: "#172554",
    brandBlueDefault: "#2563EB",  // base from brand palette

    // ── Brand Pink (#D946EF base) ──────────────────────────────────────
    brandPink50:  "#fdf4ff",
    brandPink100: "#fae8ff",
    brandPink200: "#f5d0fe",
    brandPink300: "#f0abfc",
    brandPink400: "#e879f9",
    brandPink500: "#d946ef",
    brandPink600: "#c026d3",
    brandPink700: "#a21caf",
    brandPink800: "#86198f",
    brandPink900: "#701a75",
    brandPink950: "#4a044e",
    brandPinkDefault: "#c026d3",  // base from brand palette

    // ── Brand Gray (#4B5563 base) ──────────────────────────────────────
    brandGray50:  "#f9fafb",
    brandGray100: "#f3f4f6",
    brandGray200: "#e5e7eb",
    brandGray300: "#d1d5db",
    brandGray400: "#9ca3af",
    brandGray500: "#6b7280",
    brandGray600: "#4b5563",
    brandGray700: "#374151",
    brandGray800: "#1f2937",
    brandGray900: "#111827",
    brandGray950: "#030712",
    brandGrayDefault: "#4B5563",  // base from brand palette

    // ── Success (green) ───────────────────────────────────────────────
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
    successDefault: "#16a34a",

    // ── Warning (amber) ────────────────────────────────────────────────
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
    warningDefault: "#d97706",

    // ── Danger (red) ───────────────────────────────────────────────────
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
    dangerDefault: "#dc2626",

    // ── Info (blue) ────────────────────────────────────────────────────
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
    infoDefault: "#2563eb",

    // ── Teal (cyan/teal) ───────────────────────────────────────────────
    teal50:  "#f0fdfa",
    teal100: "#ccfbf1",
    teal200: "#99f6e4",
    teal300: "#5eead4",
    teal400: "#2dd4bf",
    teal500: "#14b8a6",
    teal600: "#0d9488",
    teal700: "#0f766e",
    teal800: "#115e59",
    teal900: "#134e4a",
    teal950: "#042f2e",
    tealDefault: "#0d9488",

    // ── Orange (deep orange) ───────────────────────────────────────────
    orange50:  "#fff7ed",
    orange100: "#ffedd5",
    orange200: "#fed7aa",
    orange300: "#fdba74",
    orange400: "#fb923c",
    orange500: "#f97316",
    orange600: "#ea580c",
    orange700: "#c2410c",
    orange800: "#9a3412",
    orange900: "#7c2d12",
    orange950: "#431407",
    orangeDefault: "#ea580c",

    // ── Rose (soft red/pink) ───────────────────────────────────────────
    rose50:  "#fff1f2",
    rose100: "#ffe4e6",
    rose200: "#fecdd3",
    rose300: "#fda4af",
    rose400: "#fb7185",
    rose500: "#f43f5e",
    rose600: "#e11d48",
    rose700: "#be123c",
    rose800: "#9f1239",
    rose900: "#881337",
    rose950: "#4c0519",
    roseDefault: "#e11d48",

    // ── Indigo (deep blue-purple) ──────────────────────────────────────
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
    indigoDefault: "#4f46e5",

    // ── Mint (fresh green) ─────────────────────────────────────────────
    mint50:  "#ecfdf5",
    mint100: "#d1fae5",
    mint200: "#a7f3d0",
    mint300: "#6ee7b7",
    mint400: "#34d399",
    mint500: "#10b981",
    mint600: "#059669",
    mint700: "#047857",
    mint800: "#065f46",
    mint900: "#064e3b",
    mint950: "#022c22",
    mintDefault: "#059669",

    // ── Coal (dark neutral state) ──────────────────────────────────────
    coal50:  "#f8fafc",
    coal100: "#f1f5f9",
    coal200: "#e2e8f0",
    coal300: "#cbd5e1",
    coal400: "#94a3b8",
    coal500: "#64748b",
    coal600: "#475569",
    coal700: "#334155",
    coal800: "#1e293b",
    coal900: "#0f172a",
    coal950: "#020617",
    coalDefault: "#475569",
  },

  // ── Semantic aliases ────────────────────────────────────────────────
  semantic: {
    // Background
    bgBase:       "var(--tui-color-white)",
    bgSubtle:     "var(--tui-color-brand-black-50)",
    bgMuted:      "var(--tui-color-brand-black-100)",
    bgInverse:    "var(--tui-color-brand-black-900)",

    // Surface (cards, panels)
    surfaceDefault:  "var(--tui-color-white)",
    surfaceRaised:   "var(--tui-color-brand-black-50)",
    surfaceOverlay:  "var(--tui-color-brand-black-100)",

    // Text
    textPrimary:     "var(--tui-color-brand-black-900)",
    textSecondary:   "var(--tui-color-brand-gray-600)",
    textTertiary:    "var(--tui-color-brand-gray-400)",
    textDisabled:    "var(--tui-color-brand-black-300)",
    textInverse:     "var(--tui-color-white)",
    textLink:        "var(--tui-color-brand-blue-600)",
    textLinkHover:   "var(--tui-color-brand-blue-700)",

    // Border
    borderDefault:   "var(--tui-color-secondary-200)",
    borderStrong:    "var(--tui-color-secondary-400)",
    borderFocus:     "var(--tui-color-primary-500)",

    // Focus ring
    focusRing:       "var(--tui-color-brand-black-500)",
    focusRingGap:    "var(--tui-color-white)",

    // Brand interactive (uses brand-pink as primary)
    brandDefault:    "var(--tui-color-brand-primary-600)",
    brandHover:      "var(--tui-color-brand-primary-700)",
    brandActive:     "var(--tui-color-brand-primary-800)",
    brandSubtle:     "var(--tui-color-brand-primary-50)",
    brandText:       "var(--tui-color-white)",

    // Primary → Brand Primary (purple)
    primaryDefault:  "var(--tui-color-brand-primary-600)",
    primaryHover:    "var(--tui-color-brand-primary-700)",
    primaryActive:   "var(--tui-color-brand-primary-800)",
    primarySubtle:   "var(--tui-color-brand-primary-50)",
    primaryLight:    "var(--tui-color-brand-primary-100)",
    primaryText:     "var(--tui-color-white)",

    // Secondary → Brand Secondary (light gray)
    secondaryDefault: "var(--tui-color-brand-secondary-200)",
    secondaryHover:   "var(--tui-color-brand-secondary-300)",
    secondaryActive:  "var(--tui-color-brand-secondary-400)",
    secondarySubtle:  "var(--tui-color-brand-secondary-50)",
    secondaryLight:   "var(--tui-color-brand-secondary-100)",
    secondaryText:    "var(--tui-color-brand-black-800)",

    // Tertiary → Brand Tertiary (navy)
    tertiaryDefault: "var(--tui-color-brand-tertiary-600)",
    tertiaryHover:   "var(--tui-color-brand-tertiary-700)",
    tertiaryActive:  "var(--tui-color-brand-tertiary-800)",
    tertiarySubtle:  "var(--tui-color-brand-tertiary-50)",
    tertiaryLight:   "var(--tui-color-brand-tertiary-100)",
    tertiaryText:    "var(--tui-color-white)",

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

    tealDefault:     "var(--tui-color-teal-600)",
    tealSubtle:      "var(--tui-color-teal-50)",
    tealText:        "var(--tui-color-teal-700)",

    orangeDefault:   "var(--tui-color-orange-600)",
    orangeSubtle:    "var(--tui-color-orange-50)",
    orangeText:      "var(--tui-color-orange-700)",

    roseDefault:     "var(--tui-color-rose-600)",
    roseSubtle:      "var(--tui-color-rose-50)",
    roseText:        "var(--tui-color-rose-700)",

    indigoDefault:   "var(--tui-color-indigo-600)",
    indigoSubtle:    "var(--tui-color-indigo-50)",
    indigoText:      "var(--tui-color-indigo-700)",

    mintDefault:     "var(--tui-color-mint-600)",
    mintSubtle:      "var(--tui-color-mint-50)",
    mintText:        "var(--tui-color-mint-700)",

    coalDefault:     "var(--tui-color-coal-600)",
    coalSubtle:      "var(--tui-color-coal-50)",
    coalText:        "var(--tui-color-coal-700)",
  },
} as const;

export type ColorTokens = typeof color;
