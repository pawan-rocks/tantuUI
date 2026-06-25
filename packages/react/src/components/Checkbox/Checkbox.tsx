import React, { forwardRef, useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import { Label } from "../Label/Label";
import "./Checkbox.css";

export interface CheckboxProps
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size" | "type"> {
  /** Size scale */
  size?: Size;
  /** Color intent */
  intent?: Intent;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Label text */
  label?: ReactNode;
  /** Label position relative to checkbox */
  labelPlacement?: "start" | "end";
  /** Invalid/error state (shortcut for intent="danger") */
  isInvalid?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
}

/** Checkmark SVG icon */
const CheckIcon = () => (
  <svg
    className="tui-checkbox__icon"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Indeterminate dash SVG icon */
const DashIcon = () => (
  <svg
    className="tui-checkbox__icon"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 6H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      intent = "default",
      indeterminate = false,
      label,
      labelPlacement = "end",
      isInvalid = false,
      isGhost = false,
      disabled,
      checked,
      className,
      style,
      testId,
      children,
      id: externalId,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = externalId || `checkbox-${generatedId}`;

    // Internal ref to set the indeterminate property on the native input
    const internalRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Merge external ref with internal ref
    const setRefs = (el: HTMLInputElement | null) => {
      internalRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    };

    // Ghost mode → render Shimmer with explicit indicator dimensions
    if (isGhost) {
      const indicatorSizes = { xs: 14, sm: 16, md: 18, lg: 20, xl: 22 };
      const px = indicatorSizes[size];
      return (
        <Shimmer
          className={cn("tui-checkbox", `tui-checkbox--${size}`, className)}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...style }}
          data-testid={testId}
          shape="rounded"
        >
          <span style={{ visibility: "hidden", display: "inline-block", minWidth: `${px}px`, minHeight: `${px}px`, flexShrink: 0 }} />
          {label && <span style={{ visibility: "hidden" }}>{label}</span>}
        </Shimmer>
      );
    }

    // Determine visual state: indeterminate takes precedence
    const showIndeterminate = indeterminate;
    const showChecked = !indeterminate && checked;

    // Determine aria-checked value
    const ariaChecked = indeterminate ? "mixed" : checked ? "true" : "false";

    const indicator = (
      <span
        className={cn(
          "tui-checkbox__indicator",
          showChecked && "tui-checkbox__indicator--checked",
          showIndeterminate && "tui-checkbox__indicator--indeterminate",
        )}
      >
        {showChecked && <CheckIcon />}
        {showIndeterminate && <DashIcon />}
      </span>
    );

    const labelText = label ? (
      <span className={cn("tui-label", `tui-label--${size}`, disabled && "tui-label--disabled")}>
        {label}
      </span>
    ) : null;

    // Resolve effective intent
    const effectiveIntent = isInvalid ? "danger" : intent;

    return (
      <label
        className={cn(
          "tui-checkbox",
          `tui-checkbox--${size}`,
          effectiveIntent !== "default" && `tui-checkbox--${effectiveIntent}`,
          disabled && "tui-checkbox--disabled",
          className,
        )}
        style={style}
        data-testid={testId}
        htmlFor={inputId}
      >
        <input
          ref={setRefs}
          type="checkbox"
          id={inputId}
          className="tui-checkbox__native"
          checked={checked}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-checked={ariaChecked}
          aria-invalid={isInvalid || undefined}
          tabIndex={disabled ? -1 : undefined}
          onChange={onChange}
          {...rest}
        />

        {labelPlacement === "start" && labelText}
        {indicator}
        {labelPlacement === "end" && labelText}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
