import React, { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, CSSProperties } from "react";
import { useDropdownPosition } from "../../hooks/useDropdownPosition";
import type { DropdownPlacement } from "../../hooks/useDropdownPosition";
import "./Popover.css";

// ── Types ─────────────────────────────────────────────────────────────────

export interface PopoverProps {
  /** The trigger element ref — popover positions relative to this */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Whether the popover is open */
  isOpen: boolean;
  /** Called when popover should close (outside click, escape key) */
  onClose?: () => void;
  /** Popover content */
  children: ReactNode;
  /** Preferred placement */
  placement?: DropdownPlacement;
  /** Gap between trigger and popover (px) */
  offset?: number;
  /** Extra CSS class on the popover container */
  className?: string;
  /** Extra inline styles on the popover container */
  style?: CSSProperties;
  /** Close on outside click. Defaults to true. */
  closeOnOutsideClick?: boolean;
  /** Close on Escape key. Defaults to true. */
  closeOnEscape?: boolean;
  /** z-index override */
  zIndex?: number;
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * Popover — a portal-based floating container rendered on `<body>`,
 * positioned relative to a trigger element.
 *
 * Handles auto-positioning, outside-click close, and escape key close.
 * Use this as the base layer for any floating UI: date pickers, selects,
 * tooltips, context menus, etc.
 *
 * @example
 * ```tsx
 * const triggerRef = useRef<HTMLButtonElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * return (
 *   <>
 *     <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
 *       Open
 *     </button>
 *     <Popover triggerRef={triggerRef} isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *       <p>Floating content</p>
 *     </Popover>
 *   </>
 * );
 * ```
 */
export const Popover: React.FC<PopoverProps> = ({
  triggerRef,
  isOpen,
  onClose,
  children,
  placement = "auto",
  offset = 4,
  className,
  style,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  zIndex,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const { styles: positionStyles } = useDropdownPosition(triggerRef, popoverRef, {
    placement,
    offset,
    isOpen,
  });

  // Outside click handler
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, closeOnOutsideClick, onClose, triggerRef]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose?.();
      }
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const mergedStyles: CSSProperties = {
    ...positionStyles,
    ...style,
    ...(zIndex != null ? { zIndex } : {}),
  };

  return createPortal(
    <div
      ref={popoverRef}
      className={`tui-popover ${className || ""}`.trim()}
      style={mergedStyles}
      role="dialog"
    >
      {children}
    </div>,
    document.body,
  );
};

Popover.displayName = "Popover";
