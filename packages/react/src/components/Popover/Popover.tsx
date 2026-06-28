import React, { useRef, useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, CSSProperties } from "react";
import type { DropdownPlacement } from "../../hooks/useDropdownPosition";
import "./Popover.css";

// ── Position helpers (inline — no hook needed for initial calc) ────────────

function getAvailableSpace(triggerRect: DOMRect) {
  return {
    top: triggerRect.top,
    bottom: window.innerHeight - triggerRect.bottom,
    left: triggerRect.left,
    right: window.innerWidth - triggerRect.right,
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
  const space = getAvailableSpace(triggerRect);
  if (space.bottom >= dropdownRect.height + offset) return "bottom-start";
  if (space.top >= dropdownRect.height + offset) return "top-start";
  if (space.right >= dropdownRect.width + offset) return "right-start";
  if (space.left >= dropdownRect.width + offset) return "left-start";
  return space.bottom >= space.top ? "bottom-start" : "top-start";
}

function applyPosition(
  el: HTMLElement,
  triggerRect: DOMRect,
  placement: DropdownPlacement,
  offset: number,
) {
  const base = placement.split("-")[0] as "top" | "bottom" | "left" | "right";
  const alignment = placement.split("-")[1] as "start" | "end" | undefined;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  switch (base) {
    case "bottom":
      el.style.top = `${triggerRect.bottom + offset + scrollY}px`;
      el.style.left = alignment === "end"
        ? `${triggerRect.right + scrollX}px`
        : `${triggerRect.left + scrollX}px`;
      if (alignment === "end") el.style.transform = "translateX(-100%)";
      else el.style.transform = "";
      break;
    case "top":
      el.style.top = `${triggerRect.top - offset + scrollY}px`;
      el.style.transform = alignment === "end" ? "translate(-100%, -100%)" : "translateY(-100%)";
      el.style.left = alignment === "end"
        ? `${triggerRect.right + scrollX}px`
        : `${triggerRect.left + scrollX}px`;
      break;
    case "left":
      el.style.left = `${triggerRect.left - offset + scrollX}px`;
      el.style.top = alignment === "end"
        ? `${triggerRect.bottom + scrollY}px`
        : `${triggerRect.top + scrollY}px`;
      el.style.transform = alignment === "end" ? "translate(-100%, -100%)" : "translateX(-100%)";
      break;
    case "right":
      el.style.left = `${triggerRect.right + offset + scrollX}px`;
      el.style.top = alignment === "end"
        ? `${triggerRect.bottom + scrollY}px`
        : `${triggerRect.top + scrollY}px`;
      el.style.transform = alignment === "end" ? "translateY(-100%)" : "";
      break;
    default:
      el.style.top = `${triggerRect.bottom + offset + scrollY}px`;
      el.style.left = `${triggerRect.left + scrollX}px`;
      el.style.transform = "";
  }
}

// ── Types ─────────────────────────────────────────────────────────────────

export interface PopoverProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  placement?: DropdownPlacement;
  offset?: number;
  className?: string;
  style?: CSSProperties;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  zIndex?: number;
}

// ── Component ─────────────────────────────────────────────────────────────

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
  const rafId = useRef<number | null>(null);
  const [isPositioned, setIsPositioned] = useState(false);

  // Position update function
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const el = popoverRef.current;
    const dropdownRect = { width: el.offsetWidth, height: el.offsetHeight };
    const resolved = resolveAutoPlacement(triggerRect, dropdownRect, placement, offset);
    applyPosition(el, triggerRect, resolved, offset);
    // Make visible after positioning
    el.style.visibility = "visible";
  }, [triggerRef, placement, offset]);

  // Ref callback: positions after browser lays out the element
  const setPopoverRef = useCallback(
    (node: HTMLDivElement | null) => {
      (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (node && triggerRef.current) {
        setTimeout(() => {
          if (!node.isConnected || !triggerRef.current) return;
          const triggerRect = triggerRef.current.getBoundingClientRect();
          const dropdownRect = { width: node.offsetWidth, height: node.offsetHeight };
          const resolved = resolveAutoPlacement(triggerRect, dropdownRect, placement, offset);
          applyPosition(node, triggerRect, resolved, offset);
          setIsPositioned(true);
        }, 0);
      }
    },
    [triggerRef, placement, offset],
  );

  // Scroll/resize repositioning
  useEffect(() => {
    if (!isOpen) {
      setIsPositioned(false);
      return;
    }

    // Backup initial positioning
    const initialPosition = () => {
      if (!popoverRef.current || !triggerRef.current) return;
      const el = popoverRef.current;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = { width: el.offsetWidth, height: el.offsetHeight };
      const resolved = resolveAutoPlacement(triggerRect, dropdownRect, placement, offset);
      applyPosition(el, triggerRect, resolved, offset);
      setIsPositioned(true);
    };

    // Try immediately + rAF as fallback
    initialPosition();
    rafId.current = requestAnimationFrame(initialPosition);

    const handleReposition = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen, updatePosition, triggerRef, placement, offset]);

  // Outside click
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

  // Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const popoverStyle: CSSProperties = {
    position: "absolute",
    visibility: isPositioned ? "visible" : "hidden",
    ...style,
    ...(zIndex != null ? { zIndex } : {}),
  };

  return createPortal(
    <div
      ref={setPopoverRef}
      className={`tui-popover ${className || ""}`.trim()}
      style={popoverStyle}
      role="dialog"
    >
      {children}
    </div>,
    document.body,
  );
};

Popover.displayName = "Popover";
