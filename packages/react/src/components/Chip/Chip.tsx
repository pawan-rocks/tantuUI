import React, { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Chip.css";

export type ChipBorderRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ChipProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style" | "onClick"> {
  /** Text content of the chip */
  label?: string;
  /** Visual style variant */
  variant?: "filled" | "outlined";
  /** Intent color theme */
  intent?: Intent;
  /** Size */
  size?: Size;
  /** Border radius */
  borderRadius?: ChipBorderRadius;
  /** Icon placed before label */
  leadingIcon?: ReactNode;
  /** Icon placed after label */
  trailingIcon?: ReactNode;
  /** Custom remove icon node */
  removeIcon?: ReactNode;
  /** Selected state */
  isSelected?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** Ghost / skeleton loading state */
  isGhost?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Remove handler — fires independently from onClick */
  onRemove?: () => void;
  /** data-testid attribute */
  testId?: string;
}

/** Default X icon for remove button */
const DefaultRemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      label,
      variant = "filled",
      intent = "default",
      size = "md",
      borderRadius = "md",
      leadingIcon,
      trailingIcon,
      removeIcon,
      isSelected = false,
      isDisabled = false,
      isGhost = false,
      onClick,
      onRemove,
      className,
      style,
      testId,
      children,
      ...rest
    },
    ref,
  ) => {
    if (isGhost) {
      return (
        <Shimmer
          className={cn("tui-chip", `tui-chip--${size}`, `tui-chip--radius-${borderRadius}`, className)}
          style={style}
          shape="rounded"
          data-testid={testId}
        >
          <span style={{ visibility: "hidden" }}>{label || "Ghost"}</span>
        </Shimmer>
      );
    }

    const handleClick = () => {
      if (isDisabled || !onClick) return;
      onClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDisabled || !onRemove) return;
      onRemove();
    };

    return (
      <span
        ref={ref}
        className={cn(
          "tui-chip",
          "tui-focus-ring",
          `tui-chip--${variant}`,
          `tui-chip--${intent}`,
          `tui-chip--${size}`,
          `tui-chip--radius-${borderRadius}`,
          isSelected && "tui-chip--selected",
          isDisabled && "tui-chip--disabled",
          className,
        )}
        style={style}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={isDisabled || undefined}
        aria-pressed={isSelected}
        data-testid={testId}
        {...rest}
      >
        {leadingIcon && (
          <span className="tui-chip__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <span className="tui-chip__label">
          {label ?? children}
        </span>

        {trailingIcon && (
          <span className="tui-chip__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}

        {onRemove && (
          <button
            type="button"
            className="tui-chip__remove"
            onClick={handleRemove}
            aria-label={`Remove ${label ?? ""}`}
            tabIndex={isDisabled ? -1 : 0}
            disabled={isDisabled}
          >
            {removeIcon ?? <DefaultRemoveIcon />}
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";
