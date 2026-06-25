import React, { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Input.css";

export type InputVariant = "outline" | "soft" | "plain";

export interface InputProps
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size" | "prefix"> {
  /** Size scale */
  size?: Size;
  /** Visual variant */
  variant?: InputVariant;
  /** Color intent */
  intent?: Intent;
  /** Icon before input */
  leadingIcon?: ReactNode;
  /** Icon after input */
  trailingIcon?: ReactNode;
  /** Text prefix (e.g., "$") */
  prefix?: ReactNode;
  /** Text suffix (e.g., "USD") */
  suffix?: ReactNode;
  /** Show clear button when value is non-empty */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Invalid/error state (shortcut for intent="danger") */
  isInvalid?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      variant = "outline",
      intent = "default",
      leadingIcon,
      trailingIcon,
      prefix,
      suffix,
      clearable = false,
      onClear,
      isInvalid = false,
      isGhost = false,
      disabled,
      value,
      defaultValue,
      className,
      style,
      testId,
      children,
      onChange,
      ...rest
    },
    ref,
  ) => {
    // Ghost mode → render Shimmer with matching input size classes
    if (isGhost) {
      return (
        <Shimmer
          className={cn(
            "tui-input",
            `tui-input--${size}`,
            className,
          )}
          style={{ display: "flex", width: "100%", ...style }}
          data-testid={testId}
        >
          {/* Invisible content preserves input height */}
          {"\u00A0"}
        </Shimmer>
      );
    }

    // Determine if clear button should show
    const hasValue = typeof value === "string" ? value.length > 0 : false;
    const showClear = clearable && hasValue;

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
      if (onChange) {
        // Create a synthetic-like event with empty value
        const nativeEvent = new Event("change", { bubbles: true });
        const syntheticEvent = {
          ...nativeEvent,
          target: { value: "" } as HTMLInputElement,
          currentTarget: { value: "" } as HTMLInputElement,
          nativeEvent,
          preventDefault: () => nativeEvent.preventDefault(),
          stopPropagation: () => nativeEvent.stopPropagation(),
          isDefaultPrevented: () => nativeEvent.defaultPrevented,
          isPropagationStopped: () => false,
          persist: () => {},
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: false,
          timeStamp: nativeEvent.timeStamp,
          type: "change",
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    // Resolve effective intent (isInvalid is a shortcut for danger)
    const effectiveIntent = isInvalid ? "danger" : intent;

    return (
      <div
        className={cn(
          "tui-input",
          `tui-input--${size}`,
          `tui-input--${variant}`,
          effectiveIntent !== "default" && `tui-input--${effectiveIntent}`,
          disabled && "tui-input--disabled",
          className,
        )}
        style={style}
        data-testid={testId}
      >
        {leadingIcon && (
          <span className="tui-input__leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        {prefix && (
          <span className="tui-input__prefix">
            {prefix}
          </span>
        )}

        <input
          ref={ref}
          className="tui-input__native"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-invalid={effectiveIntent === "danger" || undefined}
          tabIndex={disabled ? -1 : undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...rest}
        />

        {suffix && (
          <span className="tui-input__suffix">
            {suffix}
          </span>
        )}

        {showClear && (
          <button
            type="button"
            className="tui-input__clear"
            aria-label="Clear input"
            onClick={handleClear}
            tabIndex={-1}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11 3L3 11M3 3l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        {trailingIcon && (
          <span className="tui-input__trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
