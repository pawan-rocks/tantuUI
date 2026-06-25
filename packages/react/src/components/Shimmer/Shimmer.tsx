import React, { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Shimmer.css";

export interface ShimmerProps extends HTMLAttributes<HTMLElement> {
  /** HTML tag to render */
  as?: "div" | "span" | "p" | "button";
  /** Width — any CSS value ("100%", "200px", "8rem") */
  width?: string;
  /** Height — any CSS value ("40px", "2rem") */
  height?: string;
  /** Border radius shortcut */
  shape?: "rounded" | "pill" | "circle";
  /** Custom border-radius (overrides shape) */
  radius?: string;
  /** Extra class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Shimmer — standalone skeleton loading placeholder.
 *
 * Use directly or via `isGhost` prop on Button/Text/Box.
 *
 * ```tsx
 * <Shimmer width="120px" height="36px" shape="rounded" />
 * <Shimmer width="200px" height="1em" />
 * <Shimmer width="48px" shape="circle" />
 * ```
 */
export const Shimmer = forwardRef<HTMLElement, ShimmerProps>(
  (
    {
      as: Tag = "div",
      width,
      height,
      shape,
      radius,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const inlineStyle: CSSProperties = {
      ...(width  && { width }),
      ...(height && { height }),
      ...(radius && { borderRadius: radius }),
      ...style,
    };

    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          "tui-shimmer",
          shape && `tui-shimmer--${shape}`,
          className,
        )}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
        aria-hidden="true"
        tabIndex={-1}
        {...rest}
      >
        {/* Children rendered invisibly to preserve layout dimensions */}
        {children}
      </Tag>
    );
  },
);

Shimmer.displayName = "Shimmer";
