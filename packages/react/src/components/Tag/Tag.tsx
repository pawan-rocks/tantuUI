import React, { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Tag.css";

export type TagBorderRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface TagProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLSpanElement>, "className" | "style" | "onClick"> {
  /** Text content of the tag */
  label?: string;
  /** Visual style variant */
  variant?: "filled" | "outlined";
  /** Intent color theme */
  intent?: Intent;
  /** Size */
  size?: Size;
  /** Border radius */
  borderRadius?: TagBorderRadius;
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
  /** Click handler — makes the tag interactive */
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

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
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
          className={cn("tui-tag", `tui-tag--${size}`, `tui-tag--radius-${borderRadius}`, className)}
          style={style}
          shape="rounded"
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
          "tui-tag",
          "tui-focus-ring",
          `tui-tag--${variant}`,
          `tui-tag--${intent}`,
          `tui-tag--${size}`,
          `tui-tag--radius-${borderRadius}`,
          isSelected && "tui-tag--selected",
          isDisabled && "tui-tag--disabled",
          isInteractive && "tui-tag--interactive",
          className,
        )}
        style={style}
        role={isInteractive ? "button" : undefined}
        tabIndex={isDisabled ? -1 : isInteractive ? 0 : undefined}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        aria-disabled={isDisabled || undefined}
        data-testid={testId}
        {...rest}
      >
        {leadingIcon && (
          <span className="tui-tag__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <span className="tui-tag__label">
          {label ?? children}
        </span>

        {trailingIcon && (
          <span className="tui-tag__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}

        {onRemove && (
          <button
            type="button"
            className="tui-tag__remove"
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

Tag.displayName = "Tag";
