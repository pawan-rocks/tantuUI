import React, { forwardRef, useCallback, useRef } from "react";
import type { KeyboardEvent } from "react";
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
    const groupRef = useRef<HTMLDivElement | null>(null);

    // Merge external ref with internal ref
    const setRefs = (el: HTMLDivElement | null) => {
      groupRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    };

    const contextValue: RadioGroupContextValue = {
      name,
      value,
      onChange,
      size,
      isInvalid,
      disabled,
    };

    // Arrow key navigation with roving tabindex
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        const isArrowKey = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(
          e.key,
        );
        if (!isArrowKey) return;

        e.preventDefault();

        const container = groupRef.current;
        if (!container) return;

        // Get all radio inputs within this group that are not disabled
        const radios = Array.from(
          container.querySelectorAll<HTMLInputElement>(
            'input[type="radio"]:not(:disabled)',
          ),
        );

        if (radios.length === 0) return;

        const currentIndex = radios.findIndex(
          (radio) => radio === document.activeElement,
        );

        let nextIndex: number;

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          // Move to next, wrap around
          nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % radios.length;
        } else {
          // ArrowUp or ArrowLeft — move to previous, wrap around
          nextIndex =
            currentIndex === -1
              ? radios.length - 1
              : (currentIndex - 1 + radios.length) % radios.length;
        }

        const nextRadio = radios[nextIndex];
        nextRadio.focus();
        nextRadio.click();
      },
      [disabled],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={setRefs}
          role="radiogroup"
          className={cn(
            "tui-radio-group",
            `tui-radio-group--${orientation}`,
            className,
          )}
          style={style}
          data-testid={testId}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
