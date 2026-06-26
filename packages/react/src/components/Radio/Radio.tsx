import React, { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import { useRadioGroupContext } from "./RadioGroupContext";
import "./Radio.css";

export interface RadioProps
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "style" | "size" | "type" | "title"> {
  /** Size scale */
  size?: Size;
  /** Color intent */
  intent?: Intent;
  /** Display type: default inline or "box" card style */
  type?: "box";
  /** Label text (simple inline label) */
  label?: ReactNode;
  /** Title text (primary label, displayed above subtitle) */
  title?: ReactNode;
  /** Subtitle / description text (secondary text below title) */
  subtitle?: ReactNode;
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
      type,
      label,
      title,
      subtitle,
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
      const isBox = type === "box";
      return (
        <Shimmer
          className={cn(
            "tui-radio",
            `tui-radio--${size}`,
            isBox && "tui-radio--box",
            className,
          )}
          style={{
            display: isBox ? "flex" : "inline-flex",
            alignItems: "center",
            gap: "8px",
            ...(!isBox ? { maxWidth: "max-content" } : {}),
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

    // Title + subtitle block (takes precedence over simple label if both provided)
    const labelContent = (title || subtitle) ? (
      <span className={cn("tui-radio__text", disabled && "tui-radio__text--disabled")}>
        {title && <span className="tui-radio__title">{title}</span>}
        {subtitle && <span className="tui-radio__subtitle">{subtitle}</span>}
      </span>
    ) : labelText;

    return (
      <label
        className={cn(
          "tui-radio",
          `tui-radio--${size}`,
          effectiveIntent !== "default" && `tui-radio--${effectiveIntent}`,
          disabled && "tui-radio--disabled",
          (title || subtitle) ? "tui-radio--has-description" : undefined,
          type === "box" && "tui-radio--box",
          type === "box" && isChecked && "tui-radio--box-checked",
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
        {labelContent}
      </label>
    );
  },
);

Radio.displayName = "Radio";
