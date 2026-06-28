import React, { forwardRef, useState, useCallback, useRef, useMemo } from "react";
import type { ReactNode } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import type { InputVariant } from "../Input/Input";
import { cn } from "../../utils/cn";
import { Input } from "../Input/Input";
import { TimeSelector } from "../TimeSelector/TimeSelector";
import { Popover } from "../Popover/Popover";
import type { DropdownPlacement } from "../../hooks/useDropdownPosition";
import "./TimePicker.css";

// ── Clock icon ────────────────────────────────────────────────────────────

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────

function formatTime12h(h: number, m: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 || 12;
  return `${display}:${m.toString().padStart(2, "0")} ${period}`;
}

function formatTime24h(h: number, m: number): string {
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function formatTimeFull12h(h: number, m: number, s: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 || 12;
  return `${display}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} ${period}`;
}

function formatTimeFull24h(h: number, m: number, s: number): string {
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ── Types ─────────────────────────────────────────────────────────────────

export interface TimePickerProps extends BaseProps {
  /** Selected time value */
  value?: { hours: number; minutes: number; seconds?: number } | null;
  /** Called when time is applied. When footer shown: fires on OK. Without footer: fires on every change. */
  onChange?: (time: { hours: number; minutes: number; seconds: number } | null) => void;
  /** Called when OK button is clicked. Fires after onChange/onRangeChange. Only when footer is visible. */
  onOk?: (time: { hours: number; minutes: number; seconds: number } | null, rangeStart?: { hours: number; minutes: number; seconds: number } | null, rangeEnd?: { hours: number; minutes: number; seconds: number } | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Custom display format function */
  formatTime?: (time: { hours: number; minutes: number; seconds: number }) => string;
  /** Time format (12h or 24h) */
  format?: "12h" | "24h";
  /** Show seconds column */
  showSeconds?: boolean;
  /** Minute step interval */
  minuteStep?: number;
  /** Second step interval */
  secondStep?: number;
  /** Show footer with Cancel/OK buttons */
  showFooter?: boolean;
  /** Intent color */
  intent?: Intent;
  /** Input size */
  size?: Size;
  /** Input variant */
  variant?: InputVariant;
  /** Disabled */
  isDisabled?: boolean;
  /** Invalid state */
  isInvalid?: boolean;
  /** Clearable */
  isClearable?: boolean;
  /** Min time constraint */
  minTime?: { hours: number; minutes: number };
  /** Max time constraint */
  maxTime?: { hours: number; minutes: number };
  /** Function to disable specific time slots */
  isTimeDisabled?: (time: { hours: number; minutes: number; seconds: number }) => boolean;
  /** Disable all times before the current time (now). Useful for "future only" time selection. */
  disableBeforeNow?: boolean;
  /** Disable all times after the current time (now). Useful for "past only" time selection. */
  disableAfterNow?: boolean;
  /** Dropdown placement */
  placement?: DropdownPlacement;
  /** Icon position */
  iconPosition?: "left" | "right";
  /** Custom icon or false to hide */
  icon?: ReactNode | false;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
  /** Range mode — select start and end time */
  isRange?: boolean;
  /** Range start time */
  rangeStart?: { hours: number; minutes: number; seconds?: number } | null;
  /** Range end time */
  rangeEnd?: { hours: number; minutes: number; seconds?: number } | null;
  /** Called when range changes. End time is always > start time. */
  onRangeChange?: (start: { hours: number; minutes: number; seconds: number } | null, end: { hours: number; minutes: number; seconds: number } | null) => void;
  /** Separator between start and end in input display. Defaults to " – " */
  rangeSeparator?: string;
}

// ── Component ─────────────────────────────────────────────────────────────

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      style,
      testId,
      value,
      onChange,
      onOk,
      placeholder = "Select time",
      formatTime,
      format = "12h",
      showSeconds = false,
      minuteStep = 1,
      secondStep = 1,
      showFooter = true,
      intent = "default",
      size = "md",
      variant = "outline",
      isDisabled = false,
      isInvalid = false,
      isClearable = false,
      minTime,
      maxTime,
      isTimeDisabled,
      disableBeforeNow = false,
      disableAfterNow = false,
      placement = "auto",
      iconPosition = "left",
      icon,
      isGhost = false,
      isRange = false,
      rangeStart,
      rangeEnd,
      onRangeChange,
      rangeSeparator = " – ",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [pendingTime, setPendingTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
    const [pendingStart, setPendingStart] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
    const [pendingEnd, setPendingEnd] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
    const [activeTab, setActiveTab] = useState<"start" | "end">("start");

    // Ghost mode
    // if (isGhost) {
    //   return (
    //     <div className={cn("tui-timepicker", className)} style={style} data-testid={testId}>
    //       <Input isGhost size={size} />
    //     </div>
    //   );
    // }

    const handleToggle = () => {
      if (!isDisabled) {
        if (!isOpen) {
          if (showFooter) {
            if (isRange) {
              setPendingStart(rangeStart ? { hours: rangeStart.hours, minutes: rangeStart.minutes, seconds: rangeStart.seconds ?? 0 } : null);
              setPendingEnd(rangeEnd ? { hours: rangeEnd.hours, minutes: rangeEnd.minutes, seconds: rangeEnd.seconds ?? 0 } : null);
              setActiveTab("start");
            } else {
              setPendingTime(value ? { hours: value.hours, minutes: value.minutes, seconds: value.seconds ?? 0 } : null);
            }
          }
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    };

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        return;
      }
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        if (!isOpen) {
          e.preventDefault();
          if (showFooter) {
            if (isRange) {
              setPendingStart(rangeStart ? { hours: rangeStart.hours, minutes: rangeStart.minutes, seconds: rangeStart.seconds ?? 0 } : null);
              setPendingEnd(rangeEnd ? { hours: rangeEnd.hours, minutes: rangeEnd.minutes, seconds: rangeEnd.seconds ?? 0 } : null);
              setActiveTab("start");
            } else {
              setPendingTime(value ? { hours: value.hours, minutes: value.minutes, seconds: value.seconds ?? 0 } : null);
            }
          }
          setIsOpen(true);
        }
      }
    };

    const handleTimeChange = useCallback(
      (time: { hours: number; minutes: number; seconds: number }) => {
        if (isRange) {
          if (showFooter) {
            if (activeTab === "start") {
              setPendingStart(time);
            } else {
              setPendingEnd(time);
            }
          } else {
            if (activeTab === "start") {
              onRangeChange?.(time, rangeEnd ? { hours: rangeEnd.hours, minutes: rangeEnd.minutes, seconds: rangeEnd.seconds ?? 0 } : null);
              setActiveTab("end");
            } else {
              onRangeChange?.(rangeStart ? { hours: rangeStart.hours, minutes: rangeStart.minutes, seconds: rangeStart.seconds ?? 0 } : null, time);
              setIsOpen(false);
            }
          }
        } else {
          if (showFooter) {
            setPendingTime(time);
          } else {
            onChange?.(time);
            setIsOpen(false);
          }
        }
      },
      [showFooter, onChange, isRange, activeTab, onRangeChange, rangeStart, rangeEnd],
    );

    const handleOk = useCallback(() => {
      if (isRange) {
        onRangeChange?.(pendingStart, pendingEnd);
        onOk?.(null, pendingStart, pendingEnd);
      } else {
        if (pendingTime) {
          onChange?.(pendingTime);
          onOk?.(pendingTime);
        }
      }
      setIsOpen(false);
    }, [isRange, pendingTime, pendingStart, pendingEnd, onChange, onRangeChange, onOk]);

    const handleCancel = useCallback(() => {
      setPendingTime(null);
      setPendingStart(null);
      setPendingEnd(null);
      setIsOpen(false);
    }, []);

    const handleClear = useCallback(() => {
      if (isRange) {
        onRangeChange?.(null, null);
        setPendingStart(null);
        setPendingEnd(null);
      } else {
        onChange?.(null);
        setPendingTime(null);
      }
    }, [isRange, onChange, onRangeChange]);

    // Format a single time value
    const fmtSingle = (t: { hours: number; minutes: number; seconds?: number }) => {
      const h = t.hours, m = t.minutes, s = t.seconds ?? 0;
      if (formatTime) return formatTime({ hours: h, minutes: m, seconds: s });
      if (showSeconds) return format === "12h" ? formatTimeFull12h(h, m, s) : formatTimeFull24h(h, m, s);
      return format === "12h" ? formatTime12h(h, m) : formatTime24h(h, m);
    };

    // Display value
    const displayValue = useMemo(() => {
      if (isRange) {
        if (rangeStart && rangeEnd) return `${fmtSingle(rangeStart)}${rangeSeparator}${fmtSingle(rangeEnd)}`;
        if (rangeStart) return `${fmtSingle(rangeStart)}${rangeSeparator}…`;
        return "";
      }
      if (!value) return "";
      return fmtSingle(value);
    }, [value, rangeStart, rangeEnd, format, showSeconds, formatTime, isRange, rangeSeparator]);

    const hasValue = isRange ? !!(rangeStart || rangeEnd) : !!value;

    const isOkDisabled = (() => {
      if (!showFooter) return false;
      if (isRange) return !pendingStart || !pendingEnd;
      return !pendingTime;
    })();

    // TimeSelector value for current tab
    const timeSelectorValue = (() => {
      if (isRange) {
        if (showFooter) return activeTab === "start" ? pendingStart : pendingEnd;
        return activeTab === "start"
          ? (rangeStart ? { hours: rangeStart.hours, minutes: rangeStart.minutes, seconds: rangeStart.seconds ?? 0 } : null)
          : (rangeEnd ? { hours: rangeEnd.hours, minutes: rangeEnd.minutes, seconds: rangeEnd.seconds ?? 0 } : null);
      }
      return showFooter ? pendingTime : (value ? { hours: value.hours, minutes: value.minutes, seconds: value.seconds ?? 0 } : null);
    })();

    // Compute effective min/max from disableBeforeNow/disableAfterNow
    const nowMinTime = (() => {
      if (disableBeforeNow) {
        const now = new Date();
        return { hours: now.getHours(), minutes: now.getMinutes() };
      }
      return undefined;
    })();

    const nowMaxTime = (() => {
      if (disableAfterNow) {
        const now = new Date();
        return { hours: now.getHours(), minutes: now.getMinutes() };
      }
      return undefined;
    })();

    // Merge minTime: use the stricter one (higher value)
    const mergedMinTime = (() => {
      const candidates = [minTime, nowMinTime].filter(Boolean) as { hours: number; minutes: number }[];
      if (candidates.length === 0) return undefined;
      return candidates.reduce((a, b) => (a.hours * 60 + a.minutes) >= (b.hours * 60 + b.minutes) ? a : b);
    })();

    // Merge maxTime: use the stricter one (lower value)
    const mergedMaxTime = (() => {
      const candidates = [maxTime, nowMaxTime].filter(Boolean) as { hours: number; minutes: number }[];
      if (candidates.length === 0) return undefined;
      return candidates.reduce((a, b) => (a.hours * 60 + a.minutes) <= (b.hours * 60 + b.minutes) ? a : b);
    })();

    // End time constraint: disable time slots <= start time (same logic as DatePicker isSameDay)
    const effectiveMinTime = (() => {
      if (isRange && activeTab === "end") {
        const start = showFooter ? pendingStart : (rangeStart ? { hours: rangeStart.hours, minutes: rangeStart.minutes } : null);
        if (start) {
          // Use the stricter of start time vs merged min
          if (mergedMinTime && (mergedMinTime.hours * 60 + mergedMinTime.minutes) > (start.hours * 60 + start.minutes)) {
            return mergedMinTime;
          }
          return { hours: start.hours, minutes: start.minutes };
        }
      }
      return mergedMinTime;
    })();

    // Disable end time slots that are <= start time (full seconds precision)
    const effectiveIsTimeDisabled = (() => {
      if (isRange && activeTab === "end") {
        const start = showFooter ? pendingStart : (rangeStart ? { hours: rangeStart.hours, minutes: rangeStart.minutes, seconds: rangeStart.seconds ?? 0 } : null);
        if (start) {
          const startTotal = start.hours * 3600 + start.minutes * 60 + start.seconds;
          return (t: { hours: number; minutes: number; seconds: number }) => {
            const cellTotal = t.hours * 3600 + t.minutes * 60 + t.seconds;
            if (cellTotal <= startTotal) return true;
            return isTimeDisabled ? isTimeDisabled(t) : false;
          };
        }
      }
      return isTimeDisabled;
    })();

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("tui-timepicker", className)}
        style={style}
        data-testid={testId}
      >
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-disabled={isDisabled || undefined}
          aria-label={placeholder}
          tabIndex={isDisabled ? -1 : 0}
          className={cn("tui-timepicker__trigger", isDisabled && "tui-timepicker__trigger--disabled")}
          onClick={handleToggle}
          onKeyDown={handleTriggerKeyDown}
        >
          <Input
            value={displayValue}
            placeholder={placeholder}
            readOnly
            leadingIcon={iconPosition === "left" && icon !== false ? (icon ?? <ClockIcon />) : undefined}
            trailingIcon={iconPosition === "right" && icon !== false ? (icon ?? <ClockIcon />) : undefined}
            intent={intent}
            size={size}
            variant={variant}
            disabled={isDisabled}
            isInvalid={isInvalid}
            clearable={isClearable && hasValue}
            onClear={handleClear}
            aria-hidden="true"
            isGhost={isGhost}
            tabIndex={-1}
          />
        </div>

        <Popover
          triggerRef={wrapperRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement={placement}
          offset={4}
          className={cn("tui-timepicker__popup", `tui-timepicker__popup--${size}`)}
        >
          {isRange && (
            <div className="tui-timepicker__tabs">
              <button
                type="button"
                className={cn("tui-timepicker__tab", activeTab === "start" && "tui-timepicker__tab--active")}
                onClick={() => setActiveTab("start")}
              >
                Start
              </button>
              <button
                type="button"
                className={cn("tui-timepicker__tab", activeTab === "end" && "tui-timepicker__tab--active")}
                onClick={() => setActiveTab("end")}
              >
                End
              </button>
            </div>
          )}

          <TimeSelector
            value={timeSelectorValue}
            onChange={handleTimeChange}
            format={format}
            showSeconds={showSeconds}
            minuteStep={minuteStep}
            secondStep={secondStep}
            intent={intent}
            size={size}
            showHeader
            showFooter={false}
            minTime={effectiveMinTime}
            maxTime={mergedMaxTime}
            isTimeDisabled={effectiveIsTimeDisabled}
          />

          {showFooter && (
            <div className="tui-timepicker__footer">
              <button type="button" className="tui-timepicker__cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="button"
                className={cn("tui-timepicker__ok-btn", `tui-timepicker__ok-btn--${intent}`)}
                onClick={handleOk}
                disabled={isOkDisabled}
              >
                OK
              </button>
            </div>
          )}
        </Popover>
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";
