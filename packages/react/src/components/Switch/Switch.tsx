import React, { forwardRef, useId } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Size, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import { Label } from "../Label/Label";
import "./Switch.css";

export interface SwitchProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style" | "onChange"> {
  /** Size scale */
  size?: Size;
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: ReactNode;
  /** Label position relative to switch */
  labelPlacement?: "start" | "end";
  /** Ghost/skeleton mode */
  isGhost?: boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      size = "md",
      checked = false,
      onChange,
      label,
      labelPlacement = "end",
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
    const generatedId = useId();
    const buttonId = `tui-switch-${generatedId}`;

    // Ghost mode → render Shimmer with explicit track dimensions
    if (isGhost) {
      const trackSizes = { xs: { w: 28, h: 16 }, sm: { w: 32, h: 18 }, md: { w: 36, h: 20 }, lg: { w: 42, h: 24 }, xl: { w: 48, h: 28 } };
      const track = trackSizes[size];
      return (
        <Shimmer
          className={cn("tui-switch", `tui-switch--${size}`, className)}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...style }}
          aria-hidden="true"
          tabIndex={-1}
          data-testid={testId}
          shape="rounded"
        >
       
          <span style={{ visibility: "hidden", display: "inline-block", minWidth: `${track.w}px`, height: `${track.h}px`, flexShrink: 0 }} />
          {label && <span className="tui-switch__label" style={{ visibility: "hidden" }}>{label}</span>}
        </Shimmer>
      );
    }

    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    const switchButton = (
      <button
        ref={ref}
        id={buttonId}
        type="button"
        role="switch"
        aria-checked={checked ? "true" : "false"}
        aria-disabled={disabled ? "true" : undefined}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "tui-switch",
          "tui-focus-ring",
          `tui-switch--${size}`,
          checked && "tui-switch--checked",
          disabled && "tui-switch--disabled",
          className,
        )}
        style={style}
        onClick={handleClick}
        data-testid={testId}
        {...rest}
      >
        <span className="tui-switch__track">
          <span className="tui-switch__thumb" />
        </span>
      </button>
    );

    if (!label) {
      return switchButton;
    }

    const labelElement = (
      <Label
        htmlFor={buttonId}
        disabled={disabled}
        size={size}
      >
        {label}
      </Label>
    );

    return (
      <div className="tui-switch-wrapper">
        {labelPlacement === "start" ? (
          <>
            {labelElement}
            {switchButton}
          </>
        ) : (
          <>
            {switchButton}
            {labelElement}
          </>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
