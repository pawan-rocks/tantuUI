import React, { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./LinkText.css";

type LinkTextTag = "a" | "span";

export interface LinkTextProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style"> {
  /** HTML element to render. Use "span" when wrapping inside NavLink/Link to avoid nested anchors */
  as?: LinkTextTag;
  /** Color variant */
  variant?: "blue" | "black" | "white" | "navy";
  /** Font size */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  /** Font weight */
  weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  /** Hide underline on hover */
  noHoverUnderline?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
  /** Width of ghost shimmer. If children present, auto-sizes to content */
  ghostWidth?: string;
  /** Height of ghost shimmer */
  ghostHeight?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LinkText = forwardRef<any, LinkTextProps>(
  (
    {
      as: Tag = "span",
      variant = "blue",
      size,
      weight,
      noHoverUnderline = false,
      disabled = false,
      isGhost = false,
      ghostWidth,
      ghostHeight,
      children,
      className,
      style,
      testId,
      target,
      rel,
      ...rest
    },
    ref,
  ) => {
    // Ghost mode
    if (isGhost) {
      const hasContent = children != null && children !== "";
      return (
        <Shimmer
          as="span"
          className={cn(
            "tui-link-text",
            size && `tui-link-text--${size}`,
            className,
          )}
          style={{
            display: "inline-block",
            minWidth: "20px",
            width: ghostWidth || (hasContent ? undefined : "80px"),
            height: ghostHeight || undefined,
            ...style,
          }}
          shape="rounded"
          data-testid={testId}
        >
          {children || "\u00A0\u00A0\u00A0\u00A0"}
        </Shimmer>
      );
    }

    // Only pass anchor-specific props when rendering as <a>
    const anchorProps = Tag === "a" ? { target, rel, ...rest } : rest;

    return (
      <Tag
        ref={ref}
        className={cn(
          "tui-link-text",
          `tui-link-text--${variant}`,
          size     && `tui-link-text--${size}`,
          weight   && `tui-link-text--w-${weight}`,
          noHoverUnderline && "tui-link-text--no-hover-underline",
          disabled && "tui-link-text--disabled",
          className,
        )}
        style={style}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        data-testid={testId}
        {...anchorProps}
      >
        {children}
      </Tag>
    );
  },
);

LinkText.displayName = "LinkText";
