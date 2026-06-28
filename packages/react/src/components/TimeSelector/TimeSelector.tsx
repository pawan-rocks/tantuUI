import React, { forwardRef, useState, useCallback, useRef, useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { Intent, Size, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import "./TimeSelector.css";

// ── Helpers ───────────────────────────────────────────────────────────────

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function to12Hour(hours: number): { display: number; period: "AM" | "PM" } {
  const period: "AM" | "PM" = hours >= 12 ? "PM" : "AM";
  let display = hours % 12;
  if (display === 0) display = 12;
  return { display, period };
}

function to24Hour(display: number, period: "AM" | "PM"): number {
  if (period === "AM") {
    return display === 12 ? 0 : display;
  }
  return display === 12 ? 12 : display + 12;
}

// ── Scroller Column ───────────────────────────────────────────────────────

interface ScrollColumnProps {
  items: { value: number | string; label: string; disabled?: boolean }[];
  selectedValue: number | string;
  onSelect: (value: number | string) => void;
  ariaLabel: string;
  disabled?: boolean;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({
  items,
  selectedValue,
  onSelect,
  ariaLabel,
  disabled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      const container = containerRef.current;
      const item = selectedRef.current;
      // Calculate offset relative to container, not page
      container.scrollTop = item.offsetTop - container.offsetTop;
    }
  }, [selectedValue]);

  return (
    <div
      ref={containerRef}
      className="tui-timeselector__scroll-column"
      role="listbox"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        return (
          <button
            key={item.value}
            ref={isSelected ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={cn(
              "tui-timeselector__scroll-item",
              isSelected && "tui-timeselector__scroll-item--selected",
              item.disabled && "tui-timeselector__scroll-item--disabled",
            )}
            onClick={() => !item.disabled && !disabled && onSelect(item.value)}
            disabled={disabled || item.disabled}
            tabIndex={isSelected ? 0 : -1}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

// ── Types ─────────────────────────────────────────────────────────────────

export interface TimeSelectorProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "style" | "onChange"> {
  /** Current time value */
  value?: { hours: number; minutes: number; seconds?: number } | null;
  /** Called when time changes (on every scroll selection) */
  onChange?: (time: { hours: number; minutes: number; seconds: number }) => void;
  /** Called when user clicks Save/confirm */
  onSave?: (time: { hours: number; minutes: number; seconds: number }) => void;
  /** Called when user clicks Cancel */
  onCancel?: () => void;
  /** 12-hour or 24-hour format */
  format?: "12h" | "24h";
  /** Minute step interval */
  minuteStep?: number;
  /** Second step interval */
  secondStep?: number;
  /** Show seconds column */
  showSeconds?: boolean;
  /** Intent color */
  intent?: Intent;
  /** Size */
  size?: Size;
  /** Disabled state (entire component) */
  isDisabled?: boolean;
  /** Min time constraint */
  minTime?: { hours: number; minutes: number };
  /** Max time constraint */
  maxTime?: { hours: number; minutes: number };
  /** Function to disable specific time slots */
  isTimeDisabled?: (time: { hours: number; minutes: number; seconds: number }) => boolean;
  /** Selected date — used with minDateTime/maxDateTime to auto-calculate time constraints */
  selectedDate?: Date | null;
  /** Minimum datetime — when selectedDate matches this date, minTime is derived */
  minDateTime?: Date;
  /** Maximum datetime — when selectedDate matches this date, maxTime is derived */
  maxDateTime?: Date;
  /** Show header section */
  showHeader?: boolean;
  /** Custom header content (default: shows current selected time) */
  header?: ReactNode;
  /** Show footer section */
  showFooter?: boolean;
  /** Custom footer content (default: Cancel + Save buttons) */
  footer?: ReactNode;
  /** Custom height for the entire component (e.g. "300px", "100%"). Content area will fill remaining space after header/footer. */
  height?: string | number;
}

export const TimeSelector = forwardRef<HTMLDivElement, TimeSelectorProps>(
  (
    {
      className,
      style,
      testId,
      value,
      onChange,
      onSave,
      onCancel,
      format = "12h",
      minuteStep = 1,
      secondStep = 1,
      showSeconds = false,
      intent = "default",
      size = "md",
      isDisabled = false,
      minTime: minTimeProp,
      maxTime: maxTimeProp,
      isTimeDisabled,
      selectedDate,
      minDateTime,
      maxDateTime,
      showHeader = true,
      header,
      showFooter = true,
      footer,
      height,
      ...rest
    },
    ref,
  ) => {
    const hours = value?.hours ?? -1;
    const minutes = value?.minutes ?? -1;
    const seconds = value?.seconds ?? -1;
    const hasValue = value != null;
    const [period, setPeriod] = useState<"AM" | "PM">(() => (hours >= 12 ? "PM" : "AM"));

    // Compute effective minTime/maxTime based on selectedDate + minDateTime/maxDateTime
    const isSameDate = (a: Date | null | undefined, b: Date | null | undefined): boolean => {
      if (!a || !b) return false;
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };

    const effectiveMinTime = (() => {
      if (minTimeProp) return minTimeProp;
      if (selectedDate && minDateTime && isSameDate(selectedDate, minDateTime)) {
        return { hours: minDateTime.getHours(), minutes: minDateTime.getMinutes() };
      }
      return undefined;
    })();

    const effectiveMaxTime = (() => {
      if (maxTimeProp) return maxTimeProp;
      if (selectedDate && maxDateTime && isSameDate(selectedDate, maxDateTime)) {
        return { hours: maxDateTime.getHours(), minutes: maxDateTime.getMinutes() };
      }
      return undefined;
    })();

    useEffect(() => {
      if (value) {
        setPeriod(value.hours >= 12 ? "PM" : "AM");
      }
    }, [value]);

    const emitChange = useCallback(
      (h: number, m: number, s: number) => {
        if (effectiveMinTime) {
          const total = h * 60 + m;
          const minTotal = effectiveMinTime.hours * 60 + effectiveMinTime.minutes;
          if (total < minTotal) return;
        }
        if (effectiveMaxTime) {
          const total = h * 60 + m;
          const maxTotal = effectiveMaxTime.hours * 60 + effectiveMaxTime.minutes;
          if (total > maxTotal) return;
        }
        if (isTimeDisabled?.({ hours: h, minutes: m, seconds: s })) return;
        onChange?.({ hours: h, minutes: m, seconds: s });
      },
      [onChange, effectiveMinTime, effectiveMaxTime, isTimeDisabled],
    );

    const isHourDisabled = useCallback(
      (h: number): boolean => {
        if (effectiveMinTime && h < effectiveMinTime.hours) return true;
        if (effectiveMaxTime && h > effectiveMaxTime.hours) return true;
        if (isTimeDisabled) {
          for (let m = 0; m < 60; m += minuteStep) {
            if (!isTimeDisabled({ hours: h, minutes: m, seconds: 0 })) return false;
          }
          return true;
        }
        return false;
      },
      [effectiveMinTime, effectiveMaxTime, isTimeDisabled, minuteStep],
    );

    const isMinuteDisabled = useCallback(
      (m: number): boolean => {
        const h = Math.max(0, hours);
        const total = h * 60 + m;
        if (effectiveMinTime) {
          const minTotal = effectiveMinTime.hours * 60 + effectiveMinTime.minutes;
          if (total < minTotal) return true;
        }
        if (effectiveMaxTime) {
          const maxTotal = effectiveMaxTime.hours * 60 + effectiveMaxTime.minutes;
          if (total > maxTotal) return true;
        }
        if (isTimeDisabled?.({ hours: h, minutes: m, seconds: 0 })) return true;
        return false;
      },
      [hours, effectiveMinTime, effectiveMaxTime, isTimeDisabled],
    );

    const isSecondDisabled = useCallback(
      (s: number): boolean => {
        const h = Math.max(0, hours);
        const m = Math.max(0, minutes);
        if (isTimeDisabled?.({ hours: h, minutes: m, seconds: s })) return true;
        return false;
      },
      [hours, minutes, isTimeDisabled],
    );

    // Build items
    const hourItems = (() => {
      if (format === "24h") {
        return Array.from({ length: 24 }, (_, i) => ({ value: i, label: pad(i), disabled: isHourDisabled(i) }));
      }
      return Array.from({ length: 12 }, (_, i) => {
        const h = i === 0 ? 12 : i;
        const h24 = to24Hour(h, period);
        return { value: h, label: pad(h), disabled: isHourDisabled(h24) };
      });
    })();

    const minuteItems = (() => {
      const items: { value: number; label: string; disabled?: boolean }[] = [];
      for (let m = 0; m < 60; m += minuteStep) {
        items.push({ value: m, label: pad(m), disabled: isMinuteDisabled(m) });
      }
      return items;
    })();

    const secondItems = (() => {
      const items: { value: number; label: string; disabled?: boolean }[] = [];
      for (let s = 0; s < 60; s += secondStep) {
        items.push({ value: s, label: pad(s), disabled: isSecondDisabled(s) });
      }
      return items;
    })();

    const periodItems = [
      { value: "AM" as const, label: "AM" },
      { value: "PM" as const, label: "PM" },
    ];

    const displayHours = hasValue ? (format === "12h" ? to12Hour(hours).display : hours) : -1;

    const handleHourSelect = useCallback(
      (val: number | string) => {
        const h = typeof val === "number" ? val : parseInt(val as string, 10);
        const m = Math.max(0, minutes);
        const s = Math.max(0, seconds);
        if (format === "12h") {
          emitChange(to24Hour(h, period), m, s);
        } else {
          emitChange(h, m, s);
        }
      },
      [format, period, minutes, seconds, emitChange],
    );

    const handleMinuteSelect = useCallback(
      (val: number | string) => {
        const m = typeof val === "number" ? val : parseInt(val as string, 10);
        const h = Math.max(0, hours);
        const s = Math.max(0, seconds);
        emitChange(h, m, s);
      },
      [hours, seconds, emitChange],
    );

    const handleSecondSelect = useCallback(
      (val: number | string) => {
        const s = typeof val === "number" ? val : parseInt(val as string, 10);
        const h = Math.max(0, hours);
        const m = Math.max(0, minutes);
        emitChange(h, m, s);
      },
      [hours, minutes, emitChange],
    );

    const handlePeriodSelect = useCallback(
      (val: number | string) => {
        const newPeriod = val as "AM" | "PM";
        if (newPeriod === period) return;
        setPeriod(newPeriod);
        const h = displayHours === -1 ? 12 : displayHours;
        const m = Math.max(0, minutes);
        const s = Math.max(0, seconds);
        emitChange(to24Hour(h, newPeriod), m, s);
      },
      [period, displayHours, minutes, seconds, emitChange],
    );

    // Default header: column labels (Hr, Min, Sec, AM/PM)
    const defaultHeader = (
      <div className="tui-timeselector__header-labels">
        <span className="tui-timeselector__header-label">Hr</span>
        <span className="tui-timeselector__header-label">Min</span>
        {showSeconds && <span className="tui-timeselector__header-label">Sec</span>}
        {format === "12h" && <span className="tui-timeselector__header-label">{"\u00A0"}</span>}
      </div>
    );

    // Default footer: Cancel + Save
    const defaultFooter = (
      <>
        <button
          type="button"
          className="tui-timeselector__footer-btn tui-timeselector__footer-btn--cancel"
          onClick={onCancel}
          disabled={isDisabled}
        >
          Cancel
        </button>
        <button
          type="button"
          className="tui-timeselector__footer-btn tui-timeselector__footer-btn--save"
          onClick={() => onSave?.({ hours, minutes, seconds })}
          disabled={isDisabled}
        >
          Save
        </button>
      </>
    );

    const hasCustomHeight = height != null;

    return (
      <div
        ref={ref}
        className={cn(
          "tui-timeselector",
          `tui-timeselector--${size}`,
          `tui-timeselector--${intent}`,
          hasCustomHeight && "tui-timeselector--custom-height",
          isDisabled && "tui-timeselector--disabled",
          className,
        )}
        style={{ ...style, ...(hasCustomHeight ? { height: typeof height === "number" ? `${height}px` : height } : {}) }}
        data-testid={testId}
        role="group"
        aria-label="Time picker"
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {/* Header */}
        {showHeader && (
          <div className="tui-timeselector__header">
            {header ?? defaultHeader}
          </div>
        )}

        {/* Content: scroll columns */}
        <div className="tui-timeselector__content">
          <div className="tui-timeselector__column">
            <ScrollColumn items={hourItems} selectedValue={displayHours} onSelect={handleHourSelect} ariaLabel="Hours" disabled={isDisabled} />
          </div>
          <div className="tui-timeselector__column">
            <ScrollColumn items={minuteItems} selectedValue={hasValue ? minutes : -1} onSelect={handleMinuteSelect} ariaLabel="Minutes" disabled={isDisabled} />
          </div>
          {showSeconds && (
            <div className="tui-timeselector__column">
              <ScrollColumn items={secondItems} selectedValue={hasValue ? seconds : -1} onSelect={handleSecondSelect} ariaLabel="Seconds" disabled={isDisabled} />
            </div>
          )}
          {format === "12h" && (
            <div className="tui-timeselector__column tui-timeselector__column--period">
              <ScrollColumn items={periodItems} selectedValue={hasValue ? period : ""} onSelect={handlePeriodSelect} ariaLabel="Period" disabled={isDisabled} />
            </div>
          )}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="tui-timeselector__footer">
            {footer ?? defaultFooter}
          </div>
        )}
      </div>
    );
  },
);

TimeSelector.displayName = "TimeSelector";
