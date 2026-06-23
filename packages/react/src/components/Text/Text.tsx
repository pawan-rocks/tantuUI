import React, { forwardRef } from "react";
import type { HTMLAttributes, CSSProperties } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import "./Text.css";

type TextTag =
  | "p" | "span" | "div"
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "label" | "small" | "strong" | "em";

export interface TextProps extends BaseProps, HTMLAttributes<HTMLElement> {
  /** HTML element to render */
  as?: TextTag;
  /** Font size token key */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  /** Font weight token key */
  weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  /** Semantic color */
  color?: "primary" | "secondary" | "tertiary" | "disabled" | "inverse" | "link" | "danger" | "success" | "warning";
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /**
   * Truncate with ellipsis.
   * - `true`  → single-line truncation
   * - `number` → multi-line clamp at N lines
   */
  truncate?: number | boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Text = forwardRef<any, TextProps>(
  (
    {
      as: Tag = "p",
      size,
      weight,
      color,
      align,
      truncate,
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    // The only inline style needed is --tui-text-clamp-lines for multi-line clamp,
    // since CSS cannot read a dynamic integer any other way.
    const clampStyle: CSSProperties | undefined =
      typeof truncate === "number" && truncate > 1
        ? { "--tui-text-clamp-lines": truncate } as CSSProperties
        : undefined;

    return (
      <Tag
        ref={ref}
        className={cn(
          "tui-text",
          size   && `tui-text--${size}`,
          weight && `tui-text--${weight}`,
          color  && `tui-text--color-${color}`,
          align  && `tui-text--${align}`,
          truncate === true                             && "tui-text--truncate",
          typeof truncate === "number" && truncate > 1 && "tui-text--clamp",
          className,
        )}
        style={clampStyle ? { ...clampStyle, ...style } : style}
        data-testid={testId}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Text.displayName = "Text";
