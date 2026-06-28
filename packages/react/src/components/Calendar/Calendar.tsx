import React, { forwardRef, useState, useCallback, useMemo, useRef } from "react";
import type { HTMLAttributes, KeyboardEvent } from "react";
import type { Intent, Size, BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import "./Calendar.css";

// ── Date helpers ──────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(date: Date, start: Date | null | undefined, end: Date | null | undefined): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = start.getTime();
  const e = end.getTime();
  const min = Math.min(s, e);
  const max = Math.max(s, e);
  return t > min && t < max;
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAY_LABELS_SUNDAY = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAY_LABELS_MONDAY = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type CalendarView = "days" | "months" | "years";

// ── Types ─────────────────────────────────────────────────────────────────

export interface CalendarProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "style" | "onSelect"> {
  /** Currently selected date */
  value?: Date | null;
  /** For range selection: start date */
  rangeStart?: Date | null;
  /** For range selection: end date */
  rangeEnd?: Date | null;
  /** Whether this is in range selection mode */
  isRange?: boolean;
  /** Month to display (controlled) */
  month?: Date;
  /** Default month to display (uncontrolled) */
  defaultMonth?: Date;
  /** Called when a date is selected */
  onSelect?: (date: Date) => void;
  /** Called when month changes */
  onMonthChange?: (date: Date) => void;
  /** Function to determine if a date is disabled */
  isDateDisabled?: (date: Date) => boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Week starts on (0 = Sunday, 1 = Monday) */
  weekStartsOn?: 0 | 1;
  /** Intent color for selected state */
  intent?: Intent;
  /** Size */
  size?: Size;
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Today's date override (for testing) */
  today?: Date;
  /** Year range for year selector (defaults to ±12 from current year) */
  yearRange?: { start: number; end: number };
  /** Remove border and border-radius from wrapper. Defaults to false. */
  isBorderless?: boolean;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      style,
      testId,
      value,
      rangeStart,
      rangeEnd,
      isRange = false,
      month: controlledMonth,
      defaultMonth,
      onSelect,
      onMonthChange,
      isDateDisabled,
      minDate,
      maxDate,
      weekStartsOn = 0,
      intent = "default",
      size = "md",
      showWeekNumbers = false,
      today: todayOverride,
      yearRange,
      isBorderless = false,
      ...rest
    },
    ref,
  ) => {
    const today = todayOverride || new Date();
    const initialMonth = controlledMonth || defaultMonth || value || today;

    const [internalMonth, setInternalMonth] = useState<Date>(
      new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
    );

    const [view, setView] = useState<CalendarView>("days");

    const displayMonth = controlledMonth
      ? new Date(controlledMonth.getFullYear(), controlledMonth.getMonth(), 1)
      : internalMonth;

    const year = displayMonth.getFullYear();
    const monthIndex = displayMonth.getMonth();

    const gridRef = useRef<HTMLDivElement>(null);
    const [focusedDay, setFocusedDay] = useState<number | null>(null);

    const navigateMonth = useCallback(
      (direction: -1 | 1) => {
        const newMonth = new Date(year, monthIndex + direction, 1);
        if (!controlledMonth) {
          setInternalMonth(newMonth);
        }
        onMonthChange?.(newMonth);
      },
      [year, monthIndex, controlledMonth, onMonthChange],
    );

    const navigateYear = useCallback(
      (direction: -1 | 1) => {
        const newMonth = new Date(year + direction, monthIndex, 1);
        if (!controlledMonth) {
          setInternalMonth(newMonth);
        }
        onMonthChange?.(newMonth);
      },
      [year, monthIndex, controlledMonth, onMonthChange],
    );

    // Year range for year view
    const yearStart = yearRange?.start ?? year - 12;
    const yearEnd = yearRange?.end ?? year + 12;

    const handleMonthSelect = useCallback(
      (m: number) => {
        const newMonth = new Date(year, m, 1);
        if (!controlledMonth) {
          setInternalMonth(newMonth);
        }
        onMonthChange?.(newMonth);
        setView("days");
      },
      [year, controlledMonth, onMonthChange],
    );

    const handleYearSelect = useCallback(
      (y: number) => {
        const newMonth = new Date(y, monthIndex, 1);
        if (!controlledMonth) {
          setInternalMonth(newMonth);
        }
        onMonthChange?.(newMonth);
        setView("months");
      },
      [monthIndex, controlledMonth, onMonthChange],
    );

    const isDisabled = useCallback(
      (date: Date): boolean => {
        if (isDateDisabled?.(date)) return true;
        if (minDate) {
          const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
          if (date < min) return true;
        }
        if (maxDate) {
          const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
          if (date > max) return true;
        }
        return false;
      },
      [isDateDisabled, minDate, maxDate],
    );

    // Build the 42-cell grid
    const cells = useMemo(() => {
      const daysInMonth = getDaysInMonth(year, monthIndex);
      const firstDay = getFirstDayOfMonth(year, monthIndex);

      // Adjust for week start
      let startOffset = firstDay - weekStartsOn;
      if (startOffset < 0) startOffset += 7;

      const result: { date: Date; outside: boolean }[] = [];

      // Previous month days
      const prevMonthDays = getDaysInMonth(year, monthIndex - 1);
      for (let i = startOffset - 1; i >= 0; i--) {
        result.push({
          date: new Date(year, monthIndex - 1, prevMonthDays - i),
          outside: true,
        });
      }

      // Current month days
      for (let d = 1; d <= daysInMonth; d++) {
        result.push({ date: new Date(year, monthIndex, d), outside: false });
      }

      // Next month days (fill to 42)
      const remaining = 42 - result.length;
      for (let d = 1; d <= remaining; d++) {
        result.push({ date: new Date(year, monthIndex + 1, d), outside: true });
      }

      return result;
    }, [year, monthIndex, weekStartsOn]);

    const handleDayClick = useCallback(
      (date: Date) => {
        if (isDisabled(date)) return;
        onSelect?.(date);
      },
      [isDisabled, onSelect],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (view !== "days") return;

        const current = focusedDay ?? value?.getDate() ?? today.getDate();
        let newDay = current;

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            newDay = current - 1;
            break;
          case "ArrowRight":
            e.preventDefault();
            newDay = current + 1;
            break;
          case "ArrowUp":
            e.preventDefault();
            newDay = current - 7;
            break;
          case "ArrowDown":
            e.preventDefault();
            newDay = current + 7;
            break;
          case "PageUp":
            e.preventDefault();
            navigateMonth(-1);
            return;
          case "PageDown":
            e.preventDefault();
            navigateMonth(1);
            return;
          case "Enter":
          case " ":
            e.preventDefault();
            if (current > 0 && current <= getDaysInMonth(year, monthIndex)) {
              const date = new Date(year, monthIndex, current);
              if (!isDisabled(date)) {
                onSelect?.(date);
              }
            }
            return;
          default:
            return;
        }

        const daysInMonth = getDaysInMonth(year, monthIndex);
        if (newDay < 1) {
          navigateMonth(-1);
          return;
        }
        if (newDay > daysInMonth) {
          navigateMonth(1);
          return;
        }

        setFocusedDay(newDay);

        // Focus the day button
        const btn = gridRef.current?.querySelector(
          `[data-day="${newDay}"]`,
        ) as HTMLButtonElement | null;
        btn?.focus();
      },
      [focusedDay, value, today, year, monthIndex, navigateMonth, isDisabled, onSelect, view],
    );

    const weekdayLabels = weekStartsOn === 1 ? WEEKDAY_LABELS_MONDAY : WEEKDAY_LABELS_SUNDAY;

    return (
      <div
        ref={ref}
        className={cn(
          "tui-calendar",
          `tui-calendar--${size}`,
          `tui-calendar--${intent}`,
          showWeekNumbers && "tui-calendar--with-weeks",
          isBorderless && "tui-calendar--borderless",
          className,
        )}
        style={style}
        data-testid={testId}
        role="application"
        aria-label="Calendar"
        {...rest}
      >
        {/* Header */}
        {view === "days" && (
          <div className="tui-calendar__header">
            <button
              type="button"
              className="tui-calendar__nav-btn"
              onClick={() => navigateMonth(-1)}
              aria-label="Previous month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <span className="tui-calendar__title">
              <button type="button" className="tui-calendar__title-btn" onClick={() => setView("months")} aria-label="Select month">
                {MONTH_NAMES[monthIndex]}
              </button>
              {" "}
              <button type="button" className="tui-calendar__title-btn" onClick={() => setView("years")} aria-label="Select year">
                {year}
              </button>
            </span>

            <button
              type="button"
              className="tui-calendar__nav-btn"
              onClick={() => navigateMonth(1)}
              aria-label="Next month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {view === "months" && (
          <div className="tui-calendar__header">
            <button type="button" className="tui-calendar__nav-btn" onClick={() => navigateYear(-1)} aria-label="Previous year">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="tui-calendar__title">
              <button type="button" className="tui-calendar__title-btn" onClick={() => setView("years")} aria-label="Select year">
                {year}
              </button>
            </span>
            <button type="button" className="tui-calendar__nav-btn" onClick={() => navigateYear(1)} aria-label="Next year">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {view === "years" && (
          <div className="tui-calendar__header">
            <button
              type="button"
              className="tui-calendar__nav-btn"
              onClick={() => { const nm = new Date(year - 24, monthIndex, 1); if (!controlledMonth) setInternalMonth(nm); onMonthChange?.(nm); }}
              aria-label="Previous years"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="tui-calendar__title">{yearStart} – {yearEnd}</span>
            <button
              type="button"
              className="tui-calendar__nav-btn"
              onClick={() => { const nm = new Date(year + 24, monthIndex, 1); if (!controlledMonth) setInternalMonth(nm); onMonthChange?.(nm); }}
              aria-label="Next years"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Days view — always rendered */}
        <>
          {/* Weekday headers */}
          <div
            className={cn("tui-calendar__weekdays", showWeekNumbers && "tui-calendar__weekdays--with-weeks")}
            role="row"
          >
            {showWeekNumbers && <span className="tui-calendar__weeknumber-header">#</span>}
            {weekdayLabels.map((label) => (
              <span key={label} className="tui-calendar__weekday" role="columnheader" aria-label={label}>
                {label}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div
            ref={gridRef}
            className={cn("tui-calendar__grid", showWeekNumbers && "tui-calendar__grid--with-weeks")}
            role="grid"
            onKeyDown={handleKeyDown}
          >
            {cells.map((cell, idx) => {
              const disabled = isDisabled(cell.date);
              const isToday = isSameDay(cell.date, today);
              const isSelected = !isRange && isSameDay(cell.date, value);
              const isRangeStart = isRange && isSameDay(cell.date, rangeStart);
              const isRangeEnd = isRange && isSameDay(cell.date, rangeEnd);
              const inRange = isRange && isBetween(cell.date, rangeStart, rangeEnd);
              const dayNum = cell.date.getDate();
              const showWeekNum = showWeekNumbers && idx % 7 === 0;

              return (
                <React.Fragment key={idx}>
                  {showWeekNum && (
                    <span className="tui-calendar__weeknumber">{getWeekNumber(cell.date)}</span>
                  )}
                  <button
                    type="button"
                    className={cn(
                      "tui-calendar__day",
                      cell.outside && "tui-calendar__day--outside",
                      isToday && "tui-calendar__day--today",
                      isSelected && "tui-calendar__day--selected",
                      isRangeStart && "tui-calendar__day--range-start",
                      isRangeEnd && "tui-calendar__day--range-end",
                      inRange && "tui-calendar__day--in-range",
                      disabled && "tui-calendar__day--disabled",
                    )}
                    onClick={() => handleDayClick(cell.date)}
                    disabled={disabled}
                    tabIndex={
                      !cell.outside && !disabled && (isSelected || isToday || dayNum === (focusedDay ?? 1))
                        ? 0
                        : -1
                    }
                    data-day={!cell.outside ? dayNum : undefined}
                    aria-label={cell.date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    aria-selected={isSelected || isRangeStart || isRangeEnd || undefined}
                    aria-disabled={disabled || undefined}
                  >
                    {dayNum}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </>

        {/* Month overlay */}
        {view === "months" && (
          <div className="tui-calendar__overlay">
            <div className="tui-calendar__month-grid" role="grid" aria-label="Month selection">
              {MONTH_NAMES_SHORT.map((name, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={cn(
                    "tui-calendar__month-cell",
                    idx === monthIndex && "tui-calendar__month-cell--selected",
                    idx === today.getMonth() && year === today.getFullYear() && idx !== monthIndex && "tui-calendar__month-cell--today",
                  )}
                  onClick={() => handleMonthSelect(idx)}
                  aria-label={MONTH_NAMES[idx]}
                  aria-selected={idx === monthIndex || undefined}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="tui-calendar__overlay-footer">
              <button type="button" className="tui-calendar__overlay-cancel" onClick={() => setView("days")}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Year overlay */}
        {view === "years" && (
          <div className="tui-calendar__overlay">
            <div className="tui-calendar__year-grid" role="grid" aria-label="Year selection">
              {Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => yearStart + i).map((y) => (
                <button
                  key={y}
                  type="button"
                  className={cn(
                    "tui-calendar__year-cell",
                    y === year && "tui-calendar__year-cell--selected",
                    y === today.getFullYear() && y !== year && "tui-calendar__year-cell--today",
                  )}
                  onClick={() => handleYearSelect(y)}
                  aria-label={String(y)}
                  aria-selected={y === year || undefined}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="tui-calendar__overlay-footer">
              <button type="button" className="tui-calendar__overlay-cancel" onClick={() => setView("days")}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
