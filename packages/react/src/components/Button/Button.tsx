import React, { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import type { Size, Variant, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
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
  /** Icon placed before children */
  leadingIcon?: React.ReactNode;
  /** Icon placed after children */
  trailingIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "solid",
      intent    = "primary",
      size      = "md",
      fullWidth = false,
      loading   = false,
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
  ) => (
    <button
      ref={ref}
      className={cn(
        "tui-btn",
        "tui-focus-ring",
        `tui-btn--${size}`,
        `tui-btn--${variant}`,
        `tui-btn--${intent}`,
        fullWidth             && "tui-btn--full",
        (disabled || loading) && "tui-btn--loading",
        className,
      )}
      style={style}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
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

      {trailingIcon && (
        <span className="tui-btn__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  ),
);

Button.displayName = "Button";
