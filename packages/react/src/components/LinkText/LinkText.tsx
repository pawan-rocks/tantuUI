import React, { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./LinkText.css";

export interface LinkTextProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style"> {
  /** Color variant */
  variant?: "blue" | "black" | "white" | "coal";
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

export const LinkText = forwardRef<HTMLAnchorElement, LinkTextProps>(
  (
    {
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

    return (
      <a
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
        target={target}
        rel={rel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        data-testid={testId}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

LinkText.displayName = "LinkText";
