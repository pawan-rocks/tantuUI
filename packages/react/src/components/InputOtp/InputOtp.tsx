import React, { forwardRef, useRef, useState } from "react";
import type {
  ChangeEvent,
  ClipboardEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Input, type InputVariant } from "../Input/Input";
import "./InputOtp.css";

export interface InputOtpProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "style" | "children" | "onChange"> {
  /** Number of OTP input cells. Defaults to four. */
  length?: number;
  /** Controlled OTP value. */
  value?: string;
  /** Initial OTP value for uncontrolled usage. */
  defaultValue?: string;
  /** Called whenever the OTP value changes. */
  onChange?: (value: string) => void;
  /** Called when all OTP cells contain a value. */
  onComplete?: (value: string) => void;
  /** Input size passed to every cell. */
  size?: Size;
  /** Input visual variant passed to every cell. */
  variant?: InputVariant;
  /** Input color intent passed to every cell. */
  intent?: Intent;
  /** Minimum value passed to every underlying Input. */
  min?: InputHTMLAttributes<HTMLInputElement>["min"];
  /** Maximum value passed to every underlying Input. */
  max?: InputHTMLAttributes<HTMLInputElement>["max"];
  /** Input type used by every cell. */
  type?: "text" | "password";
  /** Input mode used by every cell. Numeric mode accepts digits only. */
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  /** Placeholder shown in every empty cell. */
  placeholder?: string;
  /** Disable all cells. */
  disabled?: boolean;
  /** Show the danger intent on all cells. */
  isInvalid?: boolean;
  /** Render shimmer cells instead of inputs. */
  isGhost?: boolean;
  /** Name prefix used to generate names for each cell. */
  name?: string;
  /** Autofocus the first cell. */
  autoFocus?: boolean;
}

export const InputOtp = forwardRef<HTMLDivElement, InputOtpProps>(
  (
    {
      length = 4,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      size = "md",
      variant = "outline",
      intent = "default",
      min,
      max,
      type = "text",
      inputMode = "numeric",
      placeholder,
      disabled = false,
      isInvalid = false,
      isGhost = false,
      name,
      autoFocus = false,
      className,
      style,
      testId,
      id,
      children,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const cellCount = Number.isFinite(length) ? Math.max(1, Math.floor(length)) : 4;
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = value ?? internalValue;

    const sanitize = (nextValue: string) => {
      const normalized = inputMode === "numeric"
        ? nextValue.replace(/\D/g, "")
        : nextValue;
      return normalized.slice(0, cellCount);
    };

    const focusCell = (index: number) => {
      inputRefs.current[index]?.focus();
    };

    const commit = (nextValue: string) => {
      const next = sanitize(nextValue);
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
      if (next.length === cellCount) {
        onComplete?.(next);
      }
    };

    const updateCell = (index: number, rawValue: string) => {
      const incoming = sanitize(rawValue);
      const nextCells = currentValue.padEnd(cellCount, "").split("");
      const chars = incoming || "";

      if (chars.length > 1) {
        chars.split("").forEach((char, offset) => {
          if (index + offset < cellCount) {
            nextCells[index + offset] = char;
          }
        });
      } else {
        nextCells[index] = chars;
      }

      commit(nextCells.join(""));
      if (chars.length > 0) {
        focusCell(Math.min(index + chars.length, cellCount - 1));
      }
    };

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
      updateCell(index, event.target.value);
    };

    const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      updateCell(index, event.clipboardData.getData("text"));
    };

    const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
      const cellValue = currentValue[index] ?? "";
      if (event.key === "Backspace" && !cellValue && index > 0) {
        focusCell(index - 1);
      } else if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        focusCell(index - 1);
      } else if (event.key === "ArrowRight" && index < cellCount - 1) {
        event.preventDefault();
        focusCell(index + 1);
      }
    };

    return (
      <div
        {...rest}
        ref={ref}
        id={id}
        role="group"
        aria-label={ariaLabel ?? "One-time password"}
        className={cn("tui-input-otp", `tui-input-otp--${size}`, className)}
        style={style}
        data-testid={testId}
      >
        {Array.from({ length: cellCount }, (_, index) => (
          <Input
            key={index}
            ref={(element) => { inputRefs.current[index] = element; }}
            id={id ? `${id}-${index}` : undefined}
            name={name ? `${name}-${index}` : undefined}
            className="tui-input-otp__cell"
            size={size}
            variant={variant}
            intent={intent}
            min={min}
            max={max}
            type={type}
            inputMode={inputMode}
            maxLength={1}
            placeholder={placeholder}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            autoFocus={autoFocus && index === 0}
            disabled={disabled}
            isInvalid={isInvalid}
            isGhost={isGhost}
            aria-label={`${ariaLabel ?? "One-time password"} digit ${index + 1}`}
            value={currentValue[index] ?? ""}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
          />
        ))}
        {children}
      </div>
    );
  },
);

InputOtp.displayName = "InputOtp";
