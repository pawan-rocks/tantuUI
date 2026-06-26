import React, { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import type { Size, Variant, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Button.css";

export interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  /** Visual style variant */
  variant?: Variant;
  /** Color intent */
  intent?: Intent;
  /** Size */
  size?: Size;
  /** Render as full-width block */
  fullWidth?: boolean;
  /** Loading state — shows spinner, disables interaction */
  loading?: boolean;
  /** Ghost/skeleton mode — renders Shimmer matching button dimensions */
  isGhost?: boolean;
  /** Icon-only mode — renders a square button with no label */
  iconOnly?: boolean;
  /** Width of ghost shimmer. Defaults to content width */
  ghostWidth?: string;
  /** Height of ghost shimmer. Defaults to content height */
  ghostHeight?: string;
  /** Icon placed before children */
  leadingIcon?: React.ReactNode;
  /** Icon placed after children */
  trailingIcon?: React.ReactNode;
  /** Accessible label for icon-only buttons */
  "aria-label"?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "solid",
      intent    = "default",
      size      = "md",
      fullWidth = false,
      loading   = false,
      isGhost   = false,
      iconOnly  = false,
      ghostWidth,
      ghostHeight,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      className,
      style,
      testId,
      ...rest
    },
    ref,
  ) => {
    // Ghost mode → render Shimmer with matching button size classes
    if (isGhost) {
      return (
        <Shimmer
          as="button"
          className={cn(
            "tui-btn",
            `tui-btn--${size}`,
            fullWidth && "tui-btn--full",
            iconOnly  && "tui-btn--icon-only",
            className,
          )}
          style={{
            minWidth: "20px",
            width: ghostWidth || undefined,
            height: ghostHeight || undefined,
            ...style,
          }}
          shape="rounded"
          data-testid={testId}
        >
          {/* Invisible content preserves exact width/height */}
          {children || "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
        </Shimmer>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "tui-btn",
          "tui-focus-ring",
          `tui-ring--${intent}`,
          `tui-btn--${size}`,
          `tui-btn--${variant}`,
          `tui-btn--${intent}`,
          fullWidth             && "tui-btn--full",
          iconOnly              && "tui-btn--icon-only",
          (disabled || loading) && "tui-btn--loading",
          className,
        )}
        style={style}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        tabIndex={disabled || loading ? -1 : undefined}
        data-testid={testId}
        {...rest}
      >
        {loading && <span className="tui-btn__spinner" aria-hidden="true" />}

        {!loading && leadingIcon && (
          <span className="tui-btn__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        {children}

        {!loading && trailingIcon && (
          <span className="tui-btn__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
