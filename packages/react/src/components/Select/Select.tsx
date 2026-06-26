import React, { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Select.css";

export type SelectVariant = "outline" | "soft" | "plain";

export interface SelectProps
  extends BaseProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "style" | "size"> {
  /** Size scale */
  size?: Size;
  /** Visual variant */
  variant?: SelectVariant;
  /** Color intent */
  intent?: Intent;
  /** Placeholder text shown as first disabled option */
  placeholder?: string;
  /** Invalid/error state (shortcut for intent="danger") */
  isInvalid?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = "md",
      variant = "outline",
      intent = "default",
      placeholder,
      isInvalid = false,
      isGhost = false,
      disabled,
      className,
      style,
      testId,
      children,
      ...rest
    },
    ref,
  ) => {
    // Ghost mode → render Shimmer with matching select size classes
    if (isGhost) {
      return (
        <Shimmer
          className={cn(
            "tui-select",
            `tui-select--${size}`,
            className,
          )}
          style={style}
          shape="rounded"
          data-testid={testId}
        >
          <span
            className="tui-select__native"
            style={{ visibility: "hidden" }}
          >
            {"\u00A0"}
          </span>
        </Shimmer>
      );
    }

    // Resolve effective intent
    const effectiveIntent = isInvalid ? "danger" : intent;

    return (
      <div
        className={cn(
          "tui-select",
          `tui-select--${size}`,
          `tui-select--${variant}`,
          effectiveIntent !== "default" && `tui-select--${effectiveIntent}`,
          disabled && "tui-select--disabled",
          className,
        )}
        style={style}
        data-testid={testId}
      >
        <select
          ref={ref}
          className="tui-select__native"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-invalid={effectiveIntent === "danger" || undefined}
          tabIndex={disabled ? -1 : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <span className="tui-select__icon" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    );
  },
);

Select.displayName = "Select";
