import React, { forwardRef } from "react";
import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import { Checkbox } from "../Checkbox/Checkbox";
import { Radio } from "../Radio/Radio";
import "./ListItem.css";

// ── Types ─────────────────────────────────────────────────────────────────

export type ListItemSelection =
  | { type: "checkbox"; checked?: boolean; onChange?: (checked: boolean) => void; indeterminate?: boolean }
  | { type: "radio"; checked?: boolean; onChange?: (checked: boolean) => void; name?: string; value?: string };

export interface ListItemProps extends BaseProps, Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Primary title text */
  title?: ReactNode;
  /** Secondary subtitle text */
  subtitle?: ReactNode;
  /** Icon or element before the title */
  titlePrefixIcon?: ReactNode;
  /** Icon or element after the title */
  titleSuffixIcon?: ReactNode;
  /** Icon or element before the subtitle */
  subtitlePrefixIcon?: ReactNode;
  /** Icon or element after the subtitle */
  subtitleSuffixIcon?: ReactNode;
  /** Content for the right section */
  rightSection?: ReactNode;
  /** Stable value used by a parent ListGroup for selection */
  value?: string;
  /** Checkbox or radio selection config */
  selection?: ListItemSelection;
  /** Position of checkbox/radio: left or right */
  selectionPosition?: "left" | "right";
  /** Vertical align of checkbox/radio: "center" or "title" (aligned with title row) */
  selectionAlign?: "center" | "title";
  /** Size variant */
  size?: Size;
  /** Color intent controlling hover, selected, separator, focus, and selection-control colors */
  intent?: Intent;
  /** Disabled state */
  disabled?: boolean;
  /** Selected/active state */
  selected?: boolean;
  /** Show hover highlight */
  hoverable?: boolean;
  /** Hover background color: intent light preset or custom CSS color */
  hoverBg?: "primary-light" | "secondary-light" | "tertiary-light" | (string & {});
  /** Selected background color: one-step-darker intent preset or custom CSS color */
  selectedBg?: "primary" | "secondary" | "tertiary" | "primary-light" | "secondary-light" | "tertiary-light" | (string & {});
  /** Show bottom border; legacy alias for divider */
  bordered?: boolean;
  /** Show the bottom divider; defaults to true */
  divider?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
  /** Make the entire item clickable */
  onClick?: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function resolveColor(value: string | undefined): string | undefined {
  if (!value) return undefined;
  switch (value) {
    case "primary-light": return "var(--tui-color-brand-primary-100)";
    case "primary": return "var(--tui-color-brand-primary-200)";
    case "secondary-light": return "var(--tui-color-brand-secondary-100)";
    case "secondary": return "var(--tui-color-brand-secondary-200)";
    case "tertiary-light": return "var(--tui-color-brand-tertiary-100)";
    case "tertiary": return "var(--tui-color-brand-tertiary-200)";
    default: return value;
  }
}

// ── Component ─────────────────────────────────────────────────────────────

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      style,
      children,
      testId,
      title,
      subtitle,
      titlePrefixIcon,
      titleSuffixIcon,
      subtitlePrefixIcon,
      subtitleSuffixIcon,
      rightSection,
      value,
      selection,
      selectionPosition = "left",
      selectionAlign = "title",
      size = "md",
      intent = "default",
      disabled = false,
      selected = false,
      hoverable = false,
      hoverBg,
      selectedBg,
      bordered,
      divider,
      isGhost = false,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const effectiveIntent = intent === "default" ? "primary" : intent;
    const showDivider = divider ?? bordered ?? true;

    // Build inline style with custom colors
    const itemStyle: CSSProperties = {
      ...(hoverBg && { "--tui-list-item-hover-bg": resolveColor(hoverBg) } as any),
      ...(selectedBg && { "--tui-list-item-selected-bg": resolveColor(selectedBg) } as any),
      ...style,
    };

    // Selection element (checkbox/radio)
    const renderSelection = () => {
      if (!selection) return null;
      if (isGhost) {
        return (
          <div className={cn("tui-list-item__selection", `tui-list-item__selection--${selectionAlign}`)}>
            <Shimmer width="16px" height="16px" shape="rounded" />
          </div>
        );
      }
      if (selection.type === "checkbox") {
        return (
          <div className={cn("tui-list-item__selection", `tui-list-item__selection--${selectionAlign}`)} onClick={(event) => event.stopPropagation()}>
            <Checkbox
              checked={selection.checked}
              indeterminate={selection.indeterminate}
              onChange={() => selection.onChange?.(!selection.checked)}
              disabled={disabled}
              intent={effectiveIntent}
              size="sm"
            />
          </div>
        );
      }
      if (selection.type === "radio") {
        return (
          <div className={cn("tui-list-item__selection", `tui-list-item__selection--${selectionAlign}`)} onClick={(event) => event.stopPropagation()}>
            <Radio
              checked={selection.checked}
              onChange={() => selection.onChange?.(!selection.checked)}
              disabled={disabled}
              intent={effectiveIntent}
              name={selection.name}
              value={selection.value || ""}
              size="sm"
            />
          </div>
        );
      }
      return null;
    };

    // If children is provided, render as a fully custom item
    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            "tui-list-item",
            `tui-list-item--${size}`,
            `tui-list-item--${effectiveIntent}`,
            disabled && "tui-list-item--disabled",
            selected && "tui-list-item--selected",
            hoverable && "tui-list-item--hoverable",
            showDivider && "tui-list-item--bordered",
            onClick && "tui-list-item--clickable",
            (hoverBg) && "tui-list-item--custom-hover",
            (selectedBg) && "tui-list-item--custom-selected",
            className,
          )}
          style={itemStyle}
          data-testid={testId}
          data-value={value}
          role={onClick ? "button" : undefined}
          tabIndex={onClick && !disabled ? 0 : undefined}
          aria-disabled={disabled || undefined}
          aria-selected={selected || undefined}
          onClick={!disabled ? onClick : undefined}
          onKeyDown={!disabled && onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
          {...rest}
        >
          {selectionPosition === "left" && renderSelection()}
          {children}
          {selectionPosition === "right" && renderSelection()}
        </div>
      );
    }

    // Ghost mode
    if (isGhost) {
      return (
        <div
          ref={ref}
          className={cn(
            "tui-list-item",
            `tui-list-item--${size}`,
            `tui-list-item--${effectiveIntent}`,
            showDivider && "tui-list-item--bordered",
            className,
          )}
          style={itemStyle}
          data-testid={testId}
          data-value={value}
          aria-hidden="true"
          {...rest}
        >
          {selectionPosition === "left" && renderSelection()}
          <div className="tui-list-item__left">
            <div className="tui-list-item__content">
              {title ? (
                <Shimmer shape="rounded">
                  <span className="tui-list-item__ghost-title" style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{title}</span>
                </Shimmer>
              ) : (
                <Shimmer width="140px" height="16px" shape="rounded" />
              )}
              {subtitle && (
                <Shimmer shape="rounded" style={{ marginTop: "var(--tui-spacing-0_5)" }}>
                  <span className="tui-list-item__ghost-subtitle" style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{subtitle}</span>
                </Shimmer>
              )}
            </div>
          </div>
          {selectionPosition === "right" && renderSelection()}
          {rightSection && (
            <div className="tui-list-item__right">
              <Shimmer width="60px" height="16px" shape="rounded" />
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "tui-list-item",
          `tui-list-item--${size}`,
          `tui-list-item--${effectiveIntent}`,
          disabled && "tui-list-item--disabled",
          selected && "tui-list-item--selected",
          hoverable && "tui-list-item--hoverable",
          showDivider && "tui-list-item--bordered",
          onClick && "tui-list-item--clickable",
          (hoverBg) && "tui-list-item--custom-hover",
          (selectedBg) && "tui-list-item--custom-selected",
          className,
        )}
        style={itemStyle}
        data-testid={testId}
        data-value={value}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        aria-selected={selected || undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={!disabled && onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
        {...rest}
      >
        {/* Left selection */}
        {selectionPosition === "left" && renderSelection()}

        {/* Left section */}
        <div className="tui-list-item__left">
          <div className="tui-list-item__content">
            {title && (
              <div className="tui-list-item__title-row">
                {titlePrefixIcon && <span className="tui-list-item__icon">{titlePrefixIcon}</span>}
                <span className="tui-list-item__title">{title}</span>
                {titleSuffixIcon && <span className="tui-list-item__icon">{titleSuffixIcon}</span>}
              </div>
            )}
            {subtitle && (
              <div className="tui-list-item__subtitle-row">
                {subtitlePrefixIcon && <span className="tui-list-item__icon tui-list-item__icon--sub">{subtitlePrefixIcon}</span>}
                <span className="tui-list-item__subtitle">{subtitle}</span>
                {subtitleSuffixIcon && <span className="tui-list-item__icon tui-list-item__icon--sub">{subtitleSuffixIcon}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Right selection */}
        {selectionPosition === "right" && renderSelection()}

        {/* Right section */}
        {rightSection && (
          <div className="tui-list-item__right">{rightSection}</div>
        )}
      </div>
    );
  },
);

ListItem.displayName = "ListItem";
