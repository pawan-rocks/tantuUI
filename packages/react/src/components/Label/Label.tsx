import React, { forwardRef } from "react";
import type { LabelHTMLAttributes } from "react";
import type { Size, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Label.css";

export interface LabelProps
  extends BaseProps,
    Omit<LabelHTMLAttributes<HTMLLabelElement>, "className" | "style"> {
  /** Size controlling font size via design tokens */
  size?: Size;
  /** Renders a required asterisk after the label text */
  required?: boolean;
  /** Associates the label with a form control */
  htmlFor?: string;
  /** Disabled state — muted text color and not-allowed cursor */
  disabled?: boolean;
  /** Ghost/skeleton mode — renders Shimmer matching label dimensions */
  isGhost?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size = "md",
      required = false,
      disabled = false,
      isGhost = false,
      htmlFor,
      children,
      className,
      style,
      testId,
      ...rest
    },
    ref,
  ) => {
    // Ghost mode → render Shimmer sized to content
    if (isGhost) {
      return (
        <Shimmer
          as="span"
          className={cn(
            "tui-label",
            `tui-label--${size}`,
            className,
          )}
          style={{
            display: "inline-block",
            minWidth: "20px",
            ...style,
          }}
          shape="rounded"
          data-testid={testId}
        >
          {/* Invisible content preserves exact dimensions */}
          {children || "\u00A0\u00A0\u00A0\u00A0\u00A0"}
        </Shimmer>
      );
    }

    return (
      <label
        ref={ref}
        className={cn(
          "tui-label",
          `tui-label--${size}`,
          disabled && "tui-label--disabled",
          className,
        )}
        style={style}
        htmlFor={htmlFor}
        data-testid={testId}
        {...rest}
      >
        {children}
        {required && (
          <span className="tui-label__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";
