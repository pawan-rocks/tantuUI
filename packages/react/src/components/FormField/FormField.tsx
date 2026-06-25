import React, { forwardRef, useId, isValidElement, cloneElement } from "react";
import type { HTMLAttributes, ReactElement } from "react";
import type { Size, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Label } from "../Label/Label";
import "./FormField.css";

export interface FormFieldProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Label text rendered above the children slot */
  label?: React.ReactNode;
  /** Mark the field as required (shows asterisk in label) */
  required?: boolean;
  /** Helper text displayed below the children slot */
  helperText?: React.ReactNode;
  /** Error text displayed below the children slot (replaces helperText when present) */
  errorText?: React.ReactNode;
  /** Size passed to the Label component */
  size?: Size;
  /** Disabled state — muted colors and not-allowed cursor */
  disabled?: boolean;
  /** ID for the associated form control (used for label htmlFor) */
  htmlFor?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      helperText,
      errorText,
      size = "md",
      disabled = false,
      htmlFor,
      children,
      className,
      style,
      testId,
      ...rest
    },
    ref,
  ) => {
    const uniqueId = useId();
    const helperId = `formfield-helper-${uniqueId}`;
    const errorId = `formfield-error-${uniqueId}`;

    // Determine which description ID to inject into children
    const showError = !!errorText;
    const showHelper = !!helperText && !showError;
    const describedById = showError ? errorId : showHelper ? helperId : undefined;

    // Clone first child element to inject aria-describedby
    let renderedChildren = children;
    if (describedById && isValidElement(children)) {
      renderedChildren = cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-describedby": describedById,
      });
    }

    return (
      <div
        ref={ref}
        className={cn(
          "tui-form-field",
          disabled && "tui-form-field--disabled",
          className,
        )}
        style={style}
        data-testid={testId}
        {...rest}
      >
        {label && (
          <Label
            size={size}
            required={required}
            disabled={disabled}
          >
            {label}
          </Label>
        )}

        {renderedChildren}

        {showError && (
          <div
            id={errorId}
            className="tui-form-field__error"
            role="alert"
          >
            {errorText}
          </div>
        )}

        {showHelper && (
          <div
            id={helperId}
            className="tui-form-field__helper"
          >
            {helperText}
          </div>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
