import React, { forwardRef } from "react";
import type { HTMLAttributes, CSSProperties } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
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
  /** Color intent, semantic color, or custom color value. `default` preserves the current inherited text color. */
  color?: "default" | "primary" | "secondary" | "tertiary" | "disabled" | "inverse" | "link" | "danger" | "success" | "warning" | "info" | "teal" | "orange" | "rose" | "indigo" | "mint" | "coal" | "white" | "black" | (string & {});
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /** Truncate with ellipsis (true = 1 line, number = multi-line clamp) */
  truncate?: number | boolean;
  /** Ghost/skeleton mode — renders Shimmer matching text dimensions */
  isGhost?: boolean;
  /** Width of the ghost shimmer (e.g. "80%", "200px"). If children present, auto-sizes to content */
  ghostWidth?: string;
  /** Height of the ghost shimmer (e.g. "2em", "48px"). Defaults to content height */
  ghostHeight?: string;
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
      isGhost = false,
      ghostWidth,
      ghostHeight,
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    // Ghost mode → render Shimmer with matching text size class
    if (isGhost) {
      // If children exist, shimmer auto-sizes to content (width/height from invisible children)
      // If no children, use ghostWidth (default 100%) and min-width 20px
      const hasContent = children != null && children !== "";
      return (
        <Shimmer
          as="span"
          className={cn(
            "tui-text",
            size && `tui-text--${size}`,
            className,
          )}
          style={{
            display: "inline-block",
            minWidth: "20px",
            width: ghostWidth || (hasContent ? undefined : "100%"),
            height: ghostHeight || undefined,
            lineHeight: "inherit",
            whiteSpace: "normal",
            ...style,
          }}
          shape="rounded"
          data-testid={testId}
        >
          {/* Invisible content preserves exact dimensions */}
          {children || "\u00A0"}
        </Shimmer>
      );
    }

    // Normal render
    const knownColors = [
      "default", "primary", "secondary", "tertiary", "disabled", "inverse", "link",
      "danger", "success", "warning", "info", "teal", "orange", "rose", "indigo",
      "mint", "coal", "white", "black",
    ];
    const isDefaultColor = color === "default";
    const isSemanticColor = Boolean(color && !isDefaultColor && knownColors.includes(color));
    const isCustomColor = Boolean(color && !isDefaultColor && !isSemanticColor);

    const cssVars: Record<string, string | number> = {};
    if (typeof truncate === "number" && truncate > 1) {
      cssVars["--tui-text-clamp-lines"] = truncate;
    }
    if (color && isCustomColor) {
      // Custom color: resolve as token variable or pass-through raw value
      const colorValue = color.startsWith("var(") || color.startsWith("#") || color.startsWith("rgb")
        ? color
        : `var(--tui-color-${color})`;
      cssVars["color"] = colorValue;
    }

    const mergedStyle: CSSProperties | undefined =
      Object.keys(cssVars).length > 0
        ? { ...(cssVars as CSSProperties), ...style }
        : style;

    return (
      <Tag
        ref={ref}
        className={cn(
          "tui-text",
          size     && `tui-text--${size}`,
          weight   && `tui-text--${weight}`,
          isSemanticColor && `tui-text--color-${color}`,
          align    && `tui-text--${align}`,
          truncate === true                             && "tui-text--truncate",
          typeof truncate === "number" && truncate > 1  && "tui-text--clamp",
          className,
        )}
        style={mergedStyle}
        data-testid={testId}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Text.displayName = "Text";
