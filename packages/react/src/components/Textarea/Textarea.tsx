import React, { forwardRef, useLayoutEffect, useRef, useCallback } from "react";
import type { TextareaHTMLAttributes } from "react";
import type { Size, Intent, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Textarea.css";

export interface TextareaProps
  extends BaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "style"> {
  /** Size scale */
  size?: Size;
  /** Visual variant */
  variant?: "outline" | "soft" | "plain";
  /** Color intent */
  intent?: Intent;
  /** Auto-resize height to fit content */
  autoResize?: boolean;
  /** Maximum rows when autoResize is enabled */
  maxRows?: number;
  /** Show character count */
  characterCount?: boolean;
  /** Invalid/error state (shortcut for intent="danger") */
  isInvalid?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      variant = "outline",
      intent = "default",
      autoResize = false,
      maxRows,
      characterCount = false,
      isInvalid = false,
      isGhost = false,
      disabled,
      className,
      style,
      testId,
      children,
      value,
      defaultValue,
      maxLength,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref],
    );

    // Auto-resize logic
    useLayoutEffect(() => {
      if (!autoResize || !internalRef.current) return;

      const textarea = internalRef.current;
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.5;

      if (maxRows) {
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
        const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
        const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
        const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom + borderTop + borderBottom;

        if (textarea.scrollHeight > maxHeight) {
          textarea.style.height = `${maxHeight}px`;
          textarea.style.overflowY = "auto";
        } else {
          textarea.style.height = `${textarea.scrollHeight}px`;
          textarea.style.overflowY = "hidden";
        }
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }, [autoResize, maxRows, value, defaultValue]);

    // Determine current text value for character count
    const currentValue = (value ?? defaultValue ?? "") as string;
    const currentLength = currentValue.length;
    const isOverlimit = maxLength !== undefined && currentLength > maxLength;

    // Ghost mode
    if (isGhost) {
      return (
        <Shimmer
          as="div"
          className={cn(
            "tui-textarea",
            `tui-textarea--${size}`,
            className,
          )}
          style={{ minHeight: "4.5em", borderRadius: "var(--tui-radius-md)", ...style }}
          shape="rounded"
          data-testid={testId}
        >
          {"\u00A0\n\u00A0"}
        </Shimmer>
      );
    }

    // Resolve effective intent (isInvalid is a shortcut for danger)
    const effectiveIntent = isInvalid ? "danger" : intent;

    return (
      <div
        className={cn(
          "tui-textarea",
          `tui-textarea--${size}`,
          `tui-textarea--${variant}`,
          effectiveIntent !== "default" && `tui-textarea--${effectiveIntent}`,
          isOverlimit && "tui-textarea--overlimit",
          disabled && "tui-textarea--disabled",
          className,
        )}
        style={style}
        data-testid={testId}
      >
        <textarea
          ref={setRefs}
          className="tui-textarea__native"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-invalid={effectiveIntent === "danger" || undefined}
          tabIndex={disabled ? -1 : undefined}
          value={value}
          defaultValue={defaultValue}
          maxLength={undefined}
          onChange={onChange}
          {...rest}
        />
        {characterCount && (
          <span className="tui-textarea__count">
            {maxLength !== undefined
              ? `${currentLength}/${maxLength}`
              : `${currentLength}`}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
