/**
 * Shared prop types for TantuUI React components.
 */
import type { CSSProperties, ReactNode } from "react";

// ── Size variants ─────────────────────────────────────────────────────
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// ── Variant / intent ──────────────────────────────────────────────────
export type Variant =
  | "solid"
  | "outline"
  | "soft"
  | "plain";

export type Intent =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "teal"
  | "orange"
  | "rose"
  | "indigo"
  | "mint"
  | "coal"
  | "white"
  | "black";

// ── Base props shared by all components ───────────────────────────────
export interface BaseProps {
  /** Extra CSS class names */
  className?: string;
  /** Inline styles (applied after token styles) */
  style?: CSSProperties;
  /** Children */
  children?: ReactNode;
  /** `data-testid` attribute */
  testId?: string;
}
