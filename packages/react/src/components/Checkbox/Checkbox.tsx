import React, { forwardRef, useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Checkbox.css";

export interface CheckboxProps
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size" | "type" | "title"> {
  /** Size scale */
  size?: Size;
  /** Color intent */
  intent?: Intent;
  /** Display type: default inline or "box" card style */
  type?: "box";
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Label text (simple inline label) */
  label?: ReactNode;
  /** Title text (primary label, displayed above subtitle) */
  title?: ReactNode;
  /** Subtitle / description text (secondary text below title) */
  subtitle?: ReactNode;
  /** Label position relative to checkbox */
  labelPlacement?: "start" | "end";
  /** Invalid/error state (shortcut for intent="danger") */
  isInvalid?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
  /** Color the label/title/subtitle text according to intent color */
  textColorAsIntent?: boolean;
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
      type,
      indeterminate = false,
      label,
      title,
      subtitle,
      labelPlacement = "end",
      isInvalid = false,
      isGhost = false,
      textColorAsIntent = false,
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
      const isBox = type === "box";
      return (
        <Shimmer
          className={cn(
            "tui-checkbox",
            `tui-checkbox--${size}`,
            isBox && "tui-checkbox--box",
            className,
          )}
          style={{
            display: isBox ? "flex" : "inline-flex",
            alignItems: "center",
            gap: "8px",
            ...style,
          }}
          data-testid={testId}
          shape="rounded"
        >
          <span style={{ visibility: "hidden", display: "inline-block", minWidth: `${px}px`, minHeight: `${px}px`, flexShrink: 0 }} />
          {(label || title) && (
            <span style={{ visibility: "hidden", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span>{label || title}</span>
              {subtitle && <span style={{ fontSize: "var(--tui-font-size-xs)" }}>{subtitle}</span>}
            </span>
          )}
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

    // Title + subtitle block (takes precedence over simple label if both provided)
    const labelContent = (title || subtitle) ? (
      <span className={cn("tui-checkbox__text", disabled && "tui-checkbox__text--disabled")}>
        {title && <span className="tui-checkbox__title">{title}</span>}
        {subtitle && <span className="tui-checkbox__subtitle">{subtitle}</span>}
      </span>
    ) : labelText;

    // Resolve effective intent
    const effectiveIntent = isInvalid ? "danger" : intent;

    return (
      <label
        className={cn(
          "tui-checkbox",
          `tui-checkbox--${size}`,
          effectiveIntent !== "default" && `tui-checkbox--${effectiveIntent}`,
          disabled && "tui-checkbox--disabled",
          (title || subtitle) ? "tui-checkbox--has-description" : undefined,
          type === "box" && "tui-checkbox--box",
          type === "box" && checked && "tui-checkbox--box-checked",
          textColorAsIntent && "tui-checkbox--text-intent",
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

        {labelPlacement === "start" && labelContent}
        {indicator}
        {labelPlacement === "end" && labelContent}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
