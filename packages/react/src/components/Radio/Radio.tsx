import React, { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import { Label } from "../Label/Label";
import { useRadioGroupContext } from "./RadioGroupContext";
import "./Radio.css";

export interface RadioProps
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size" | "type"> {
  /** Size scale */
  size?: Size;
  /** Color intent */
  intent?: Intent;
  /** Label text */
  label?: ReactNode;
  /** Radio value */
  value: string;
  /** Invalid/error state (shortcut for intent="danger") */
  isInvalid?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size: sizeProp,
      intent: intentProp,
      label,
      value,
      isInvalid: isInvalidProp,
      isGhost = false,
      disabled: disabledProp,
      checked: checkedProp,
      name: nameProp,
      className,
      style,
      testId,
      onChange: onChangeProp,
      id: externalId,
      tabIndex: tabIndexProp,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = externalId || `radio-${generatedId}`;

    // Read from RadioGroup context if available
    const context = useRadioGroupContext();

    const name = nameProp ?? context?.name;
    const size = sizeProp ?? context?.size ?? "md";
    const isInvalid = isInvalidProp ?? context?.isInvalid ?? false;
    const disabled = disabledProp ?? context?.disabled ?? false;
    const intent = intentProp ?? "default";
    const effectiveIntent = isInvalid ? "danger" : intent;

    // Determine checked state: direct prop takes precedence, then context
    const isChecked =
      checkedProp !== undefined
        ? checkedProp
        : context?.value !== undefined
          ? context.value === value
          : false;

    // Handle change: fire context onChange or direct prop onChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (context?.onChange) {
        context.onChange(value);
      }
      if (onChangeProp) {
        onChangeProp(e);
      }
    };

    // Determine tabIndex for roving tabindex
    // In a group: checked radio gets tabIndex=0, others get -1
    // If nothing is checked, first non-disabled radio should be tabbable (handled by not setting -1 when no context value exists)
    let computedTabIndex: number | undefined;
    if (tabIndexProp !== undefined) {
      computedTabIndex = tabIndexProp;
    } else if (disabled) {
      computedTabIndex = -1;
    } else if (context) {
      // Inside a RadioGroup: only the checked radio (or first if none checked) is tabbable
      if (context.value) {
        computedTabIndex = isChecked ? 0 : -1;
      } else {
        // No value selected — leave undefined so browser picks the first
        computedTabIndex = undefined;
      }
    } else {
      // Standalone radio — always tabbable
      computedTabIndex = 0;
    }

    // Ghost mode → render Shimmer with explicit indicator dimensions
    if (isGhost) {
      const indicatorSizes = { xs: 14, sm: 16, md: 18, lg: 20, xl: 22 };
      const px = indicatorSizes[size];
      return (
        <Shimmer
          className={cn("tui-radio", `tui-radio--${size}`, className)}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", maxWidth:"max-content", ...style }}
          data-testid={testId}
          shape="rounded"
        >
          <span style={{ visibility: "hidden", display: "inline-block", minWidth: `${px}px`, minHeight: `${px}px`, flexShrink: 0 }} />
          {label && <span style={{ visibility: "hidden" }}>{label}</span>}
        </Shimmer>
      );
    }

    const indicator = (
      <span
        className={cn(
          "tui-radio__indicator",
          isChecked && "tui-radio__indicator--checked",
        )}
      >
        <span className="tui-radio__dot" />
      </span>
    );

    const labelText = label ? (
      <span className={cn("tui-label", `tui-label--${size}`, disabled && "tui-label--disabled")}>
        {label}
      </span>
    ) : null;

    return (
      <label
        className={cn(
          "tui-radio",
          `tui-radio--${size}`,
          effectiveIntent !== "default" && `tui-radio--${effectiveIntent}`,
          disabled && "tui-radio--disabled",
          className,
        )}
        style={style}
        data-testid={testId}
        htmlFor={inputId}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          className="tui-radio__native"
          checked={isChecked}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-checked={isChecked}
          aria-invalid={effectiveIntent === "danger" || undefined}
          tabIndex={computedTabIndex}
          onChange={handleChange}
          {...rest}
        />
        {indicator}
        {labelText}
      </label>
    );
  },
);

Radio.displayName = "Radio";
