import { ElementType, forwardRef, CSSProperties } from "react";
import type { HTMLAttributes } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Box.css";

type SpacingKey =
  | "0" | "px" | "0.5" | "1" | "1.5" | "2" | "2.5" | "3" | "3.5"
  | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12" | "14" | "16"
  | "20" | "24" | "32" | "40" | "48" | "64";

type RadiusKey = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type ShadowKey = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";

export interface BoxProps extends BaseProps, HTMLAttributes<HTMLElement> {
  as?: ElementType;

  // Padding
  p?:  SpacingKey;
  px?: SpacingKey;
  py?: SpacingKey;
  pt?: SpacingKey;
  pr?: SpacingKey;
  pb?: SpacingKey;
  pl?: SpacingKey;

  // Margin
  m?:  SpacingKey;
  mx?: SpacingKey;
  my?: SpacingKey;
  mt?: SpacingKey;
  mr?: SpacingKey;
  mb?: SpacingKey;
  ml?: SpacingKey;

  // Visual
  rounded?: RadiusKey;
  shadow?:  ShadowKey;
  bg?:      string;
  color?:   string;

  // Display
  display?: "block" | "inline" | "inline-block" | "flex" | "inline-flex" | "grid" | "none";

  // Flex / Grid
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?:     "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justify?:   "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  wrap?:      "nowrap" | "wrap" | "wrap-reverse";
  gap?:       SpacingKey;

  /** Ghost/skeleton mode — renders Shimmer matching box dimensions */
  isGhost?: boolean;
  /** Width of ghost shimmer (e.g. "200px", "100%"). Defaults to content width */
  ghostWidth?: string;
  /** Height of ghost shimmer (e.g. "120px", "50%"). Defaults to content height */
  ghostHeight?: string;
}

/** Resolve a spacing key to its CSS variable reference */
function sp(key: SpacingKey): string {
  return `var(--tui-spacing-${key.replace(".", "_")})`;
}

/** Resolve a color string — pass-through CSS values, otherwise treat as token suffix */
function colorVal(val: string): string {
  return val.startsWith("var(") || val.startsWith("#") || val.startsWith("rgb")
    ? val
    : `var(--tui-color-${val})`;
}

const justifyClassMap: Record<NonNullable<BoxProps["justify"]>, string> = {
  "flex-start":    "tui-box--justify-start",
  "flex-end":      "tui-box--justify-end",
  "center":        "tui-box--justify-center",
  "space-between": "tui-box--justify-between",
  "space-around":  "tui-box--justify-around",
  "space-evenly":  "tui-box--justify-evenly",
};

const alignClassMap: Record<NonNullable<BoxProps["align"]>, string> = {
  "flex-start": "tui-box--align-start",
  "flex-end":   "tui-box--align-end",
  "center":     "tui-box--align-center",
  "stretch":    "tui-box--align-stretch",
  "baseline":   "tui-box--align-baseline",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Box = forwardRef<any, BoxProps>(
  (
    {
      as: Tag = "div",
      p, px, py, pt, pr, pb, pl,
      m, mx, my, mt, mr, mb, ml,
      rounded, shadow, bg, color,
      display, direction, align, justify, wrap, gap,
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
    // CSS custom property declarations for spacing/visual
    const cssVars: Record<string, string> = {};

    if (p)  cssVars["--tui-box-p"]  = sp(p);
    if (px) cssVars["--tui-box-px"] = sp(px);
    if (py) cssVars["--tui-box-py"] = sp(py);
    if (pt) cssVars["--tui-box-pt"] = sp(pt);
    if (pr) cssVars["--tui-box-pr"] = sp(pr);
    if (pb) cssVars["--tui-box-pb"] = sp(pb);
    if (pl) cssVars["--tui-box-pl"] = sp(pl);

    if (m)  cssVars["--tui-box-m"]  = sp(m);
    if (mx) cssVars["--tui-box-mx"] = sp(mx);
    if (my) cssVars["--tui-box-my"] = sp(my);
    if (mt) cssVars["--tui-box-mt"] = sp(mt);
    if (mr) cssVars["--tui-box-mr"] = sp(mr);
    if (mb) cssVars["--tui-box-mb"] = sp(mb);
    if (ml) cssVars["--tui-box-ml"] = sp(ml);

    if (rounded) cssVars["--tui-box-radius"] = `var(--tui-radius-${rounded})`;
    if (shadow)  cssVars["--tui-box-shadow"] = `var(--tui-shadow-${shadow})`;
    if (bg)      cssVars["--tui-box-bg"]     = colorVal(bg);
    if (color)   cssVars["--tui-box-color"]  = colorVal(color);
    if (gap)     cssVars["--tui-box-gap"]    = sp(gap);

    const mergedStyle: CSSProperties =
      Object.keys(cssVars).length > 0
        ? { ...(cssVars as CSSProperties), ...style }
        : style ?? {};

    const finalStyle = Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined;

    // Ghost mode → render Shimmer with same layout classes and spacing
    if (isGhost) {
      const hasContent = children != null;
      return (
        <Shimmer
          as="div"
          className={cn(
            "tui-box",
            display   && `tui-box--${display}`,
            direction && `tui-box--${direction}`,
            className,
          )}
          style={{
            minWidth: "20px",
            minHeight: "20px",
            width: ghostWidth || undefined,
            height: ghostHeight || undefined,
            ...finalStyle,
          }}
          radius={rounded ? `var(--tui-radius-${rounded})` : undefined}
          data-testid={testId}
        >
          {children}
        </Shimmer>
      );
    }

    return (
      <Tag
        ref={ref}
        className={cn(
          "tui-box",
          display   && `tui-box--${display}`,
          direction && `tui-box--${direction}`,
          align     && alignClassMap[align],
          justify   && justifyClassMap[justify],
          wrap      && `tui-box--${wrap}`,
          className,
        )}
        style={finalStyle}
        data-testid={testId}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Box.displayName = "Box";
