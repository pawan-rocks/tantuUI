import React, { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Pill.css";

export interface PillProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style" | "onClick"> {
  /** Text content of the pill */
  label?: string;
  /** Visual style variant */
  variant?: "solid" | "subtle" | "outlined";
  /** Intent color */
  intent?: Intent;
  /** Size */
  size?: Size;
  /** Icon placed before label */
  leadingIcon?: ReactNode;
  /** Icon placed after label */
  trailingIcon?: ReactNode;
  /** Custom remove icon node */
  removeIcon?: ReactNode;
  /** Disabled state */
  isDisabled?: boolean;
  /** Ghost / skeleton loading state */
  isGhost?: boolean;
  /** Click handler — makes the pill interactive */
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

export const Pill = forwardRef<HTMLSpanElement, PillProps>(
  (
    {
      label,
      variant = "subtle",
      intent = "default",
      size = "md",
      leadingIcon,
      trailingIcon,
      removeIcon,
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
          className={cn("tui-pill", `tui-pill--${size}`, className)}
          style={style}
          shape="pill"
          data-testid={testId}
        >
          <span style={{ visibility: "hidden" }}>{label || "Ghost"}</span>
        </Shimmer>
      );
    }

    const isInteractive = !!onClick;

    const handleClick = () => {
      if (isDisabled || !onClick) return;
      onClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled || !onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
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
          "tui-pill",
          "tui-focus-ring",
          `tui-pill--${variant}`,
          `tui-pill--${intent}`,
          `tui-pill--${size}`,
          isDisabled && "tui-pill--disabled",
          isInteractive && "tui-pill--interactive",
          className,
        )}
        style={style}
        role={isInteractive ? "button" : "status"}
        tabIndex={isDisabled ? -1 : isInteractive ? 0 : undefined}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        aria-disabled={isDisabled || undefined}
        data-testid={testId}
        {...rest}
      >
        {leadingIcon && (
          <span className="tui-pill__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <span className="tui-pill__label">
          {label ?? children}
        </span>

        {trailingIcon && (
          <span className="tui-pill__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}

        {onRemove && (
          <button
            type="button"
            className="tui-pill__remove"
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

Pill.displayName = "Pill";
