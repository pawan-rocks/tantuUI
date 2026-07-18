import React, { forwardRef } from "react";
import type { Size, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { RadioGroupContext } from "./RadioGroupContext";
import type { RadioGroupContextValue } from "./RadioGroupContext";

export interface RadioGroupProps extends BaseProps {
  /** Name attribute for all child radios */
  name?: string;
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Size passed to all child radios */
  size?: Size;
  /** Invalid state applied to all child radios */
  isInvalid?: boolean;
  /** Disabled state applied to all child radios */
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      onChange,
      orientation = "vertical",
      size = "md",
      isInvalid = false,
      disabled = false,
      className,
      style,
      children,
      testId,
    },
    ref,
  ) => {
    const contextValue: RadioGroupContextValue = {
      name,
      value,
      onChange,
      size,
      isInvalid,
      disabled,
    };

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn(
            "tui-radio-group",
            `tui-radio-group--${orientation}`,
            className,
          )}
          style={style}
          data-testid={testId}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
