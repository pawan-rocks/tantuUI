import { useState, useCallback, useEffect, useRef } from "react";
import type { RefObject, CSSProperties } from "react";

// ── Types ─────────────────────────────────────────────────────────────────

export type DropdownPlacement =
  | "auto"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

export interface UseDropdownPositionOptions {
  /** Preferred placement. Defaults to "auto" (picks bottom-start, flips if no space). */
  placement?: DropdownPlacement;
  /** Gap between trigger and dropdown (px). Defaults to 4. */
  offset?: number;
  /** Whether the dropdown is currently open. Position is only calculated when true. */
  isOpen: boolean;
}

export interface DropdownPositionResult {
  /** Computed inline styles for the portal-rendered dropdown (position: absolute on body) */
  styles: CSSProperties;
  /** The actual resolved placement after auto-flip */
  resolvedPlacement: DropdownPlacement;
  /** Call this to manually recalculate position */
  update: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function getAvailableSpace(triggerRect: DOMRect) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return {
    top: triggerRect.top,
    bottom: viewportHeight - triggerRect.bottom,
    left: triggerRect.left,
    right: viewportWidth - triggerRect.right,
  };
}

function resolveAutoPlacement(
  triggerRect: DOMRect,
  dropdownRect: { width: number; height: number },
  preferred: DropdownPlacement,
  offset: number,
): DropdownPlacement {
  if (preferred !== "auto") {
    const space = getAvailableSpace(triggerRect);
    const base = preferred.split("-")[0] as "top" | "bottom" | "left" | "right";

    switch (base) {
      case "bottom":
        if (space.bottom >= dropdownRect.height + offset) return preferred;
        if (space.top >= dropdownRect.height + offset) return preferred.replace("bottom", "top") as DropdownPlacement;
        return preferred;
      case "top":
        if (space.top >= dropdownRect.height + offset) return preferred;
        if (space.bottom >= dropdownRect.height + offset) return preferred.replace("top", "bottom") as DropdownPlacement;
        return preferred;
      case "left":
        if (space.left >= dropdownRect.width + offset) return preferred;
        if (space.right >= dropdownRect.width + offset) return preferred.replace("left", "right") as DropdownPlacement;
        return preferred;
      case "right":
        if (space.right >= dropdownRect.width + offset) return preferred;
        if (space.left >= dropdownRect.width + offset) return preferred.replace("right", "left") as DropdownPlacement;
        return preferred;
      default:
        return preferred;
    }
  }

  // Auto: prefer bottom-start, flip as needed
  const space = getAvailableSpace(triggerRect);

  if (space.bottom >= dropdownRect.height + offset) return "bottom-start";
  if (space.top >= dropdownRect.height + offset) return "top-start";
  if (space.right >= dropdownRect.width + offset) return "right-start";
  if (space.left >= dropdownRect.width + offset) return "left-start";

  return space.bottom >= space.top ? "bottom-start" : "top-start";
}

function computeStyles(
  triggerRect: DOMRect,
  placement: DropdownPlacement,
  offset: number,
): CSSProperties {
  const base = placement.split("-")[0] as "top" | "bottom" | "left" | "right";
  const alignment = placement.split("-")[1] as "start" | "end" | undefined;

  // Use page scroll offsets so the dropdown is positioned in document coordinates
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const styles: CSSProperties = {
    position: "absolute",
    // Ant Design pattern: explicit inset values
  };

  switch (base) {
    case "bottom":
      styles.top = triggerRect.bottom + offset + scrollY;
      if (alignment === "end") {
        styles.left = triggerRect.right + scrollX;
        styles.transform = "translateX(-100%)";
      } else {
        styles.left = triggerRect.left + scrollX;
      }
      break;

    case "top":
      styles.top = triggerRect.top - offset + scrollY;
      styles.transform = "translateY(-100%)";
      if (alignment === "end") {
        styles.left = triggerRect.right + scrollX;
        styles.transform = "translate(-100%, -100%)";
      } else {
        styles.left = triggerRect.left + scrollX;
      }
      break;

    case "left":
      styles.left = triggerRect.left - offset + scrollX;
      styles.transform = "translateX(-100%)";
      if (alignment === "end") {
        styles.top = triggerRect.bottom + scrollY;
        styles.transform = "translate(-100%, -100%)";
      } else {
        styles.top = triggerRect.top + scrollY;
      }
      break;

    case "right":
      styles.left = triggerRect.right + offset + scrollX;
      if (alignment === "end") {
        styles.top = triggerRect.bottom + scrollY;
        styles.transform = "translateY(-100%)";
      } else {
        styles.top = triggerRect.top + scrollY;
      }
      break;

    default:
      styles.top = triggerRect.bottom + offset + scrollY;
      styles.left = triggerRect.left + scrollX;
      break;
  }

  return styles;
}

// ── Hook ──────────────────────────────────────────────────────────────────

/**
 * useDropdownPosition — positions a dropdown rendered via portal on `<body>`.
 *
 * The dropdown is rendered outside the component tree (via React Portal) so it
 * completely escapes any `overflow: hidden` ancestors. Uses `position: absolute`
 * relative to the document body with calculated `top`/`left` from the trigger's
 * bounding rect + scroll offsets.
 *
 * @param triggerRef - Ref to the trigger element
 * @param dropdownRef - Ref to the dropdown/popup element (rendered in a portal)
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * const triggerRef = useRef<HTMLDivElement>(null);
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * const { styles } = useDropdownPosition(triggerRef, dropdownRef, {
 *   placement: "auto",
 *   offset: 4,
 *   isOpen,
 * });
 *
 * return (
 *   <>
 *     <div ref={triggerRef}>
 *       <button onClick={() => setIsOpen(!isOpen)}>Open</button>
 *     </div>
 *     {isOpen && createPortal(
 *       <div ref={dropdownRef} style={styles}>Dropdown content</div>,
 *       document.body
 *     )}
 *   </>
 * );
 * ```
 */
export function useDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
  options: UseDropdownPositionOptions,
): DropdownPositionResult {
  const { placement = "auto", offset = 4, isOpen } = options;

  const [styles, setStyles] = useState<CSSProperties>({ position: "absolute", top: -9999, left: -9999 });
  const [resolvedPlacement, setResolvedPlacement] = useState<DropdownPlacement>(
    placement === "auto" ? "bottom-start" : placement,
  );

  const rafId = useRef<number | null>(null);

  const update = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownEl = dropdownRef.current;
    const dropdownRect = { width: dropdownEl.offsetWidth, height: dropdownEl.offsetHeight };

    const resolved = resolveAutoPlacement(triggerRect, dropdownRect, placement, offset);
    const newStyles = computeStyles(triggerRect, resolved, offset);

    setResolvedPlacement(resolved);
    setStyles(newStyles);
  }, [triggerRef, dropdownRef, placement, offset]);

  useEffect(() => {
    if (!isOpen) return;

    // Calculate position on next frame (dropdown needs to be rendered first)
    rafId.current = requestAnimationFrame(() => {
      update();
      // Second frame to ensure dimensions are correct after CSS applies
      rafId.current = requestAnimationFrame(update);
    });

    const handleReposition = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen, update]);

  return { styles, resolvedPlacement, update };
}
