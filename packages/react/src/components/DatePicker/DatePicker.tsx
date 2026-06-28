import React, { forwardRef, useState, useCallback, useEffect, useRef, useMemo } from "react";
import type { ReactNode } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import type { InputVariant } from "../Input/Input";
import { cn } from "../../utils/cn";
import { Input } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import { TimeSelector } from "../TimeSelector/TimeSelector";
import { Popover } from "../Popover/Popover";
import type { DropdownPlacement } from "../../hooks/useDropdownPosition";
import "./DatePicker.css";

// ── Calendar icon ─────────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M5 1v2M11 1v2M1 6h14M3 3h10a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Date helpers ──────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function resolveDate(value: Date | (() => Date)): Date {
  return startOfDay(typeof value === "function" ? value() : value);
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameRange(
  startA: Date | null | undefined,
  endA: Date | null | undefined,
  startB: Date | null | undefined,
  endB: Date | null | undefined,
): boolean {
  return isSameDay(startA, startB) && isSameDay(endA, endB);
}

function formatTimeDisplay(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 || 12;
  return `${display}:${m.toString().padStart(2, "0")} ${period}`;
}

// ── Default presets ───────────────────────────────────────────────────────

export interface DatePickerPreset {
  label: string;
  /** Single-date preset */
  date?: Date | (() => Date);
  /** Range preset (used when isRange is true) */
  range?: { start: Date | (() => Date); end: Date | (() => Date) };
}

export const DEFAULT_SINGLE_PRESETS: DatePickerPreset[] = [
  { label: "Today", date: () => startOfDay(new Date()) },
  {
    label: "Tomorrow",
    date: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return startOfDay(d);
    },
  },
  {
    label: "Next week",
    date: () => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return startOfDay(d);
    },
  },
];

export const DEFAULT_RANGE_PRESETS: DatePickerPreset[] = [
  {
    label: "Today",
    range: {
      start: () => startOfDay(new Date()),
      end: () => startOfDay(new Date()),
    },
  },
  {
    label: "Yesterday",
    range: {
      start: () => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return startOfDay(d);
      },
      end: () => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return startOfDay(d);
      },
    },
  },
  {
    label: "This week",
    range: {
      start: () => {
        const d = new Date();
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return startOfDay(d);
      },
      end: () => startOfDay(new Date()),
    },
  },
  {
    label: "Last 7 days",
    range: {
      start: () => {
        const d = new Date();
        d.setDate(d.getDate() - 6);
        return startOfDay(d);
      },
      end: () => startOfDay(new Date()),
    },
  },
  {
    label: "Last 30 days",
    range: {
      start: () => {
        const d = new Date();
        d.setDate(d.getDate() - 29);
        return startOfDay(d);
      },
      end: () => startOfDay(new Date()),
    },
  },
  {
    label: "Last 90 days",
    range: {
      start: () => {
        const d = new Date();
        d.setDate(d.getDate() - 89);
        return startOfDay(d);
      },
      end: () => startOfDay(new Date()),
    },
  },
  {
    label: "This month",
    range: {
      start: () => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
      },
      end: () => startOfDay(new Date()),
    },
  },
  {
    label: "Last month",
    range: {
      start: () => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth() - 1, 1);
      },
      end: () => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 0);
      },
    },
  },
];

// ── Types ─────────────────────────────────────────────────────────────────

export interface DatePickerProps extends BaseProps {
  /** Selected date (single mode) */
  value?: Date | null;
  /** Called when date selected (single mode). Returns `Date | null`. With showTime: includes hours/minutes/seconds. When footer is shown, fires on OK click (not on calendar click). */
  onChange?: (date: Date | null) => void;
  /** Range selection mode */
  isRange?: boolean;
  /** Range start (range mode) */
  rangeStart?: Date | null;
  /** Range end (range mode) */
  rangeEnd?: Date | null;
  /** Called when range changes (range mode). Returns `(start: Date | null, end: Date | null)`. With showTime: dates include hours/minutes/seconds. When footer is shown, fires on OK click. */
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Date display format function */
  formatDate?: (date: Date) => string;
  /** Range display format function */
  formatRange?: (start: Date, end: Date) => string;
  /** Quick-selection presets. Pass `false` to hide sidebar. Defaults to built-in presets. */
  presets?: DatePickerPreset[] | false;
  /** Custom left sidebar content — replaces the preset list entirely */
  sidebar?: ReactNode;
  /** Function to disable specific dates */
  isDateDisabled?: (date: Date) => boolean;
  /** Minimum date */
  minDate?: Date;
  /** Maximum date */
  maxDate?: Date;
  /** Intent color */
  intent?: Intent;
  /** Input size */
  size?: Size;
  /** Input variant */
  variant?: InputVariant;
  /** Week starts on */
  weekStartsOn?: 0 | 1;
  /** Disabled */
  isDisabled?: boolean;
  /** Invalid state */
  isInvalid?: boolean;
  /** Clearable (show X to clear) */
  isClearable?: boolean;
  /** Close popup after selection */
  closeOnSelect?: boolean;
  /** Show footer with Cancel/OK buttons. When true, selection is only applied on OK click. Note: always forced to true when `showTime` is enabled (time requires explicit confirmation). */
  showFooter?: boolean;
  /** Called when OK button is clicked. Fires after onChange/onRangeChange. Receives the final applied date(s). Only fires when footer is visible. */
  onOk?: (value: Date | null, rangeStart?: Date | null, rangeEnd?: Date | null) => void;
  /** Show time picker below the calendar */
  showTime?: boolean;
  /** Time format (12h or 24h). Only used when showTime is true. */
  timeFormat?: "12h" | "24h";
  /** Show seconds in the time picker. Only used when showTime is true. */
  showSeconds?: boolean;
  /** Minute step interval for time picker */
  minuteStep?: number;
  /** Calendar size */
  calendarSize?: Size;
  /** Dropdown placement relative to trigger. Defaults to "auto" (flips based on available space). */
  placement?: DropdownPlacement;
  /** Range separator string displayed between start and end dates. Defaults to " – ". */
  rangeSeparator?: string;
  /** Position of the calendar icon in the input. Defaults to "left". */
  iconPosition?: "left" | "right";
  /** Custom icon element to replace the default calendar icon. Pass `false` to hide the icon entirely. */
  icon?: ReactNode | false;
  /** Ghost/skeleton mode — renders shimmer placeholder instead of input */
  isGhost?: boolean;
}

// ── Default formatters ────────────────────────────────────────────────────

const defaultFormatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ── Preset sidebar ────────────────────────────────────────────────────────

interface PresetSidebarProps {
  presets: DatePickerPreset[];
  isRange: boolean;
  value: Date | null | undefined;
  rangeStart: Date | null | undefined;
  rangeEnd: Date | null | undefined;
  onPresetSelect: (preset: DatePickerPreset) => void;
}

const PresetSidebar: React.FC<PresetSidebarProps> = ({
  presets,
  isRange,
  value,
  rangeStart,
  rangeEnd,
  onPresetSelect,
}) => (
  <div className="tui-datepicker__presets" role="listbox" aria-label="Quick selection">
    {presets.map((preset) => {
      let isActive = false;
      if (isRange && preset.range) {
        const start = resolveDate(preset.range.start);
        const end = resolveDate(preset.range.end);
        isActive = isSameRange(rangeStart, rangeEnd, start, end);
      } else if (!isRange && preset.date) {
        isActive = isSameDay(value, resolveDate(preset.date));
      }

      return (
        <button
          key={preset.label}
          type="button"
          role="option"
          aria-selected={isActive}
          className={cn("tui-datepicker__preset-btn", isActive && "tui-datepicker__preset-btn--active")}
          onClick={() => onPresetSelect(preset)}
        >
          {preset.label}
        </button>
      );
    })}
  </div>
);

// ── Range time panel (Start/End tab + single TimeSelector) ────────────────

interface RangeTimePanelProps {
  startTime: { hours: number; minutes: number; seconds: number };
  endTime: { hours: number; minutes: number; seconds: number };
  onStartTimeChange: (t: { hours: number; minutes: number; seconds: number }) => void;
  onEndTimeChange: (t: { hours: number; minutes: number; seconds: number }) => void;
  timeFormat: "12h" | "24h";
  showSeconds: boolean;
  minuteStep: number;
  intent: Intent;
  size: Size;
  /** When start and end are the same day, constrain end time to be >= start time */
  isSameDay?: boolean;
  /** Whether start date has been selected */
  hasStartDate?: boolean;
  /** Whether end date has been selected */
  hasEndDate?: boolean;
  /** Whether user has explicitly set end time (controls if end time shows selection) */
  hasEndTimeBeenSet?: boolean;
}

const RangeTimePanel: React.FC<RangeTimePanelProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  timeFormat,
  showSeconds,
  minuteStep,
  intent,
  size,
  isSameDay: sameDayProp = false,
  hasStartDate = false,
  hasEndDate = false,
  hasEndTimeBeenSet = false,
}) => {
  const [activeTab, setActiveTab] = React.useState<"start" | "end">("start");

  // Determine if the current tab's TimeSelector should be disabled
  const isCurrentDisabled = activeTab === "start" ? !hasStartDate : !hasEndDate;

  // Pass null value when no date is selected OR end time hasn't been set by user
  const currentValue = (() => {
    if (activeTab === "start") {
      return hasStartDate ? startTime : null;
    }
    // End tab: only show selection if user has explicitly set it
    return (hasEndDate && hasEndTimeBeenSet) ? endTime : null;
  })();

  const handleChange = activeTab === "start" ? onStartTimeChange : onEndTimeChange;

  // When same day: end time slots <= start time should be disabled
  const minTime = activeTab === "end" && sameDayProp
    ? { hours: startTime.hours, minutes: startTime.minutes }
    : undefined;

  // Disable time slots that are <= startTime (not just <)
  const isTimeDisabledFn = activeTab === "end" && sameDayProp
    ? (t: { hours: number; minutes: number; seconds: number }) => {
        const startTotal = startTime.hours * 3600 + startTime.minutes * 60 + startTime.seconds;
        const cellTotal = t.hours * 3600 + t.minutes * 60 + t.seconds;
        return cellTotal <= startTotal;
      }
    : undefined;

  return (
    <div className="tui-datepicker__range-time">
      <div className="tui-datepicker__time-tabs">
        <button
          type="button"
          className={cn("tui-datepicker__time-tab", activeTab === "start" && "tui-datepicker__time-tab--active")}
          onClick={() => setActiveTab("start")}
        >
          Start
        </button>
        <button
          type="button"
          className={cn("tui-datepicker__time-tab", activeTab === "end" && "tui-datepicker__time-tab--active")}
          onClick={() => setActiveTab("end")}
        >
          End
        </button>
      </div>
      <TimeSelector
        value={currentValue}
        onChange={handleChange}
        format={timeFormat}
        showSeconds={showSeconds}
        minuteStep={minuteStep}
        intent={intent}
        size={size}
        showHeader
        showFooter={false}
        minTime={minTime}
        isTimeDisabled={isTimeDisabledFn}
        isDisabled={isCurrentDisabled}
        height={"100%"}
      />
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      style,
      testId,
      value,
      onChange,
      isRange = false,
      rangeStart,
      rangeEnd,
      onRangeChange,
      placeholder = "Select date",
      formatDate = defaultFormatDate,
      formatRange,
      presets,
      sidebar,
      isDateDisabled,
      minDate,
      maxDate,
      intent = "default",
      size = "md",
      variant = "outline",
      weekStartsOn = 0,
      isDisabled = false,
      isInvalid = false,
      isClearable = false,
      closeOnSelect = true,
      showFooter = false,
      onOk,
      showTime = false,
      timeFormat = "12h",
      showSeconds = false,
      minuteStep = 1,
      calendarSize,
      placement = "auto",
      rangeSeparator = " – ",
      iconPosition = "left",
      icon,
      isGhost = false,
    },
    ref,
  ) => {
    // calendarSize defaults to the input size when not explicitly set
    const effectiveCalendarSize = calendarSize ?? size;

    // Build effective formatRange using rangeSeparator
    const effectiveFormatRange = formatRange ?? ((start: Date, end: Date) =>
      `${formatDate(start)}${rangeSeparator}${formatDate(end)}`
    );
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Pending state: when showFooter is true, selections are staged until OK is clicked
    const [pendingValue, setPendingValue] = useState<Date | null | undefined>(undefined);
    const [pendingRangeStart, setPendingRangeStart] = useState<Date | null | undefined>(undefined);
    const [pendingRangeEnd, setPendingRangeEnd] = useState<Date | null | undefined>(undefined);

    // Time state (internal) — tracks the hours/minutes/seconds for time selection
    const [timeValue, setTimeValue] = useState<{ hours: number; minutes: number; seconds: number }>(() => {
      if (value) return { hours: value.getHours(), minutes: value.getMinutes(), seconds: value.getSeconds() };
      return { hours: 0, minutes: 0, seconds: 0 };
    });

    // For range mode: start time and end time
    const [rangeStartTime, setRangeStartTime] = useState<{ hours: number; minutes: number; seconds: number }>(() => {
      if (rangeStart) return { hours: rangeStart.getHours(), minutes: rangeStart.getMinutes(), seconds: rangeStart.getSeconds() };
      return { hours: 0, minutes: 0, seconds: 0 };
    });

    const [rangeEndTime, setRangeEndTime] = useState<{ hours: number; minutes: number; seconds: number }>(() => {
      if (rangeEnd) return { hours: rangeEnd.getHours(), minutes: rangeEnd.getMinutes(), seconds: rangeEnd.getSeconds() };
      return { hours: 0, minutes: 0, seconds: 0 };
    });

    // Tracks whether user has explicitly set end time (vs default 00:00)
    const [endTimeUserSet, setEndTimeUserSet] = useState<boolean>(() => !!rangeEnd);

    // Wrapper for end time change that marks it as user-set
    const handleEndTimeChange = useCallback((t: { hours: number; minutes: number; seconds: number }) => {
      setRangeEndTime(t);
      setEndTimeUserSet(true);
    }, []);

    // Sync time state from props when they change externally
    useEffect(() => {
      if (value) {
        setTimeValue({ hours: value.getHours(), minutes: value.getMinutes(), seconds: value.getSeconds() });
      }
    }, [value]);

    useEffect(() => {
      if (rangeStart) {
        setRangeStartTime({ hours: rangeStart.getHours(), minutes: rangeStart.getMinutes(), seconds: rangeStart.getSeconds() });
      }
    }, [rangeStart]);

    useEffect(() => {
      if (rangeEnd) {
        setRangeEndTime({ hours: rangeEnd.getHours(), minutes: rangeEnd.getMinutes(), seconds: rangeEnd.getSeconds() });
      }
    }, [rangeEnd]);

    // When showTime is true, auto-enable footer (user must confirm datetime)
    const effectiveShowFooter = showFooter || showTime;

    const effectivePresets = useMemo(() => {
      if (presets === false) return null;
      if (presets) return presets;
      return isRange ? DEFAULT_RANGE_PRESETS : DEFAULT_SINGLE_PRESETS;
    }, [presets, isRange]);

    const showSidebar = sidebar != null || effectivePresets != null;

    const handleToggle = useCallback(() => {
      if (!isDisabled) {
        if (!isOpen) {
          // Opening
          if (effectiveShowFooter) {
            setPendingValue(value ?? null);
            setPendingRangeStart(rangeStart ?? null);
            setPendingRangeEnd(rangeEnd ?? null);
            if (showTime) {
              if (value) setTimeValue({ hours: value.getHours(), minutes: value.getMinutes(), seconds: value.getSeconds() });
              if (rangeStart) setRangeStartTime({ hours: rangeStart.getHours(), minutes: rangeStart.getMinutes(), seconds: rangeStart.getSeconds() });
              if (rangeEnd) {
                setRangeEndTime({ hours: rangeEnd.getHours(), minutes: rangeEnd.getMinutes(), seconds: rangeEnd.getSeconds() });
                setEndTimeUserSet(true);
              } else {
                setEndTimeUserSet(false);
              }
            }
          }
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    }, [isDisabled, isOpen, effectiveShowFooter, showTime, value, rangeStart, rangeEnd]);

    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          e.preventDefault();
          setIsOpen(false);
          return;
        }
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          if (!isOpen) {
            e.preventDefault();
            if (effectiveShowFooter) {
              setPendingValue(value ?? null);
              setPendingRangeStart(rangeStart ?? null);
              setPendingRangeEnd(rangeEnd ?? null);
              if (showTime) {
                if (value) setTimeValue({ hours: value.getHours(), minutes: value.getMinutes(), seconds: value.getSeconds() });
                if (rangeStart) setRangeStartTime({ hours: rangeStart.getHours(), minutes: rangeStart.getMinutes(), seconds: rangeStart.getSeconds() });
                if (rangeEnd) {
                  setRangeEndTime({ hours: rangeEnd.getHours(), minutes: rangeEnd.getMinutes(), seconds: rangeEnd.getSeconds() });
                  setEndTimeUserSet(true);
                } else {
                  setEndTimeUserSet(false);
                }
              }
            }
            setIsOpen(true);
          }
        }
      },
      [isOpen, effectiveShowFooter, showTime, value, rangeStart, rangeEnd],
    );

    const handleSelect = useCallback(
      (date: Date) => {
        if (effectiveShowFooter) {
          // Stage selection in pending state
          if (isRange) {
            if (!pendingRangeStart || (pendingRangeStart && pendingRangeEnd)) {
              // Starting fresh: pick start date, clear end
              setPendingRangeStart(date);
              setPendingRangeEnd(null);
              // Reset end time when re-selecting
              if (showTime) {
                setRangeEndTime({ hours: 0, minutes: 0, seconds: 0 });
                setEndTimeUserSet(false);
              }
            } else if (date < pendingRangeStart) {
              // Clicked before start: swap — new click becomes start, old start becomes end
              setPendingRangeStart(date);
              setPendingRangeEnd(pendingRangeStart);
              if (showTime) {
                // End time inherits the old start time; new start gets 00:00
                setRangeEndTime({ ...rangeStartTime });
                setEndTimeUserSet(false);
                setRangeStartTime({ hours: 0, minutes: 0, seconds: 0 });
              }
            } else {
              // Normal end date selection
              setPendingRangeEnd(date);
              if (showTime) {
                // Don't auto-fill end time — leave it unset so user must pick
                setRangeEndTime({ hours: 0, minutes: 0, seconds: 0 });
                setEndTimeUserSet(false);
              }
            }
          } else {
            setPendingValue(date);
          }
        } else {
          // Immediate mode (no footer)
          if (isRange) {
            if (!rangeStart || (rangeStart && rangeEnd)) {
              onRangeChange?.(date, null);
            } else if (date < rangeStart) {
              onRangeChange?.(date, rangeStart);
              if (closeOnSelect) setIsOpen(false);
            } else {
              onRangeChange?.(rangeStart, date);
              if (closeOnSelect) setIsOpen(false);
            }
          } else {
            onChange?.(date);
            if (closeOnSelect) setIsOpen(false);
          }
        }
      },
      [effectiveShowFooter, isRange, rangeStart, rangeEnd, pendingRangeStart, pendingRangeEnd, onChange, onRangeChange, closeOnSelect],
    );

    const handleClear = useCallback(() => {
      if (isRange) {
        onRangeChange?.(null, null);
      } else {
        onChange?.(null);
      }
      if (effectiveShowFooter) {
        setPendingValue(null);
        setPendingRangeStart(null);
        setPendingRangeEnd(null);
      }
      if (showTime) {
        setTimeValue({ hours: 0, minutes: 0, seconds: 0 });
        setRangeStartTime({ hours: 0, minutes: 0, seconds: 0 });
        setRangeEndTime({ hours: 23, minutes: 59, seconds: 59 });
      }
    }, [isRange, onChange, onRangeChange, effectiveShowFooter, showTime]);

    const handlePresetSelect = useCallback(
      (preset: DatePickerPreset) => {
        if (effectiveShowFooter) {
          // Stage into pending state
          if (isRange && preset.range) {
            setPendingRangeStart(resolveDate(preset.range.start));
            setPendingRangeEnd(resolveDate(preset.range.end));
          } else if (!isRange && preset.date) {
            setPendingValue(resolveDate(preset.date));
          }
        } else {
          // Immediate mode
          if (isRange && preset.range) {
            onRangeChange?.(resolveDate(preset.range.start), resolveDate(preset.range.end));
            if (closeOnSelect) setIsOpen(false);
          } else if (!isRange && preset.date) {
            onChange?.(resolveDate(preset.date));
            if (closeOnSelect) setIsOpen(false);
          }
        }
      },
      [effectiveShowFooter, isRange, onChange, onRangeChange, closeOnSelect],
    );

    const handleFooterOk = useCallback(() => {
      if (isRange) {
        let start = pendingRangeStart ?? null;
        let end = pendingRangeEnd ?? null;
        if (showTime && start) {
          start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), rangeStartTime.hours, rangeStartTime.minutes, rangeStartTime.seconds);
        }
        if (showTime && end) {
          end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), rangeEndTime.hours, rangeEndTime.minutes, rangeEndTime.seconds);
        }
        onRangeChange?.(start, end);
        onOk?.(null, start, end);
      } else {
        let date = pendingValue ?? null;
        if (showTime && date) {
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeValue.hours, timeValue.minutes, timeValue.seconds);
        }
        onChange?.(date);
        onOk?.(date);
      }
      setIsOpen(false);
    }, [isRange, pendingValue, pendingRangeStart, pendingRangeEnd, onChange, onRangeChange, onOk, showTime, timeValue, rangeStartTime, rangeEndTime]);

    const handleFooterCancel = useCallback(() => {
      // Discard pending state and close
      setPendingValue(undefined);
      setPendingRangeStart(undefined);
      setPendingRangeEnd(undefined);
      setIsOpen(false);
    }, []);

    const displayValue = useMemo(() => {
      if (isRange) {
        if (rangeStart && rangeEnd) {
          if (showTime) {
            const fmtStart = `${formatDate(rangeStart)} ${formatTimeDisplay(rangeStart)}`;
            const fmtEnd = `${formatDate(rangeEnd)} ${formatTimeDisplay(rangeEnd)}`;
            return `${fmtStart}${rangeSeparator}${fmtEnd}`;
          }
          return effectiveFormatRange(rangeStart, rangeEnd);
        }
        if (rangeStart) return `${formatDate(rangeStart)}${rangeSeparator}…`;
        return "";
      }
      if (value) {
        if (showTime) {
          return `${formatDate(value)} ${formatTimeDisplay(value)}`;
        }
        return formatDate(value);
      }
      return "";
    }, [isRange, value, rangeStart, rangeEnd, formatDate, effectiveFormatRange, showTime, rangeSeparator]);

    const hasValue = isRange ? Boolean(rangeStart) : Boolean(value);

    // OK button is disabled when selection is incomplete or invalid
    const isOkDisabled = useMemo(() => {
      if (isRange) {
        // Need both start and end dates selected
        if (!pendingRangeStart || !pendingRangeEnd) return true;
        // If showTime, user must have explicitly set end time
        if (showTime && !endTimeUserSet) return true;
        // If same day with showTime, end time must be >= start time
        if (showTime &&
          pendingRangeStart.getFullYear() === pendingRangeEnd.getFullYear() &&
          pendingRangeStart.getMonth() === pendingRangeEnd.getMonth() &&
          pendingRangeStart.getDate() === pendingRangeEnd.getDate()
        ) {
          const startTotal = rangeStartTime.hours * 60 + rangeStartTime.minutes;
          const endTotal = rangeEndTime.hours * 60 + rangeEndTime.minutes;
          if (endTotal < startTotal) return true;
        }
        return false;
      }
      // Single mode: need a date selected
      return !pendingValue;
    }, [isRange, pendingValue, pendingRangeStart, pendingRangeEnd, showTime, rangeStartTime, rangeEndTime, endTimeUserSet]);

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("tui-datepicker", className)}
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
          className={cn("tui-datepicker__trigger", isDisabled && "tui-datepicker__trigger--disabled")}
          onClick={handleToggle}
          onKeyDown={handleTriggerKeyDown}
        >
          <Input
            value={displayValue}
            placeholder={placeholder}
            readOnly
            leadingIcon={iconPosition === "left" && icon !== false ? (icon ?? <CalendarIcon />) : undefined}
            trailingIcon={iconPosition === "right" && icon !== false ? (icon ?? <CalendarIcon />) : undefined}
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
          className={cn("tui-datepicker__popup", `tui-datepicker__popup--${effectiveCalendarSize}`)}
        >
            <div className={cn((showSidebar || showTime) && "tui-datepicker__range-body")}>
              {sidebar ??
                (effectivePresets && (
                  <PresetSidebar
                    presets={effectivePresets}
                    isRange={isRange}
                    value={effectiveShowFooter ? pendingValue : value}
                    rangeStart={effectiveShowFooter ? pendingRangeStart : rangeStart}
                    rangeEnd={effectiveShowFooter ? pendingRangeEnd : rangeEnd}
                    onPresetSelect={handlePresetSelect}
                  />
                ))}

              <div className="tui-datepicker__range-calendar">
                <Calendar
                  value={isRange ? undefined : (effectiveShowFooter ? (pendingValue ?? undefined) : value)}
                  rangeStart={isRange ? (effectiveShowFooter ? (pendingRangeStart ?? undefined) : rangeStart) : undefined}
                  rangeEnd={isRange ? (effectiveShowFooter ? (pendingRangeEnd ?? undefined) : rangeEnd) : undefined}
                  isRange={isRange}
                  onSelect={handleSelect}
                  isDateDisabled={isDateDisabled}
                  minDate={minDate}
                  maxDate={maxDate}
                  weekStartsOn={weekStartsOn}
                  intent={intent}
                  size={effectiveCalendarSize}
                  isBorderless
                />
              </div>

              {showTime && (
                <div className="tui-datepicker__time-panel">
                  {!isRange ? (
                    <TimeSelector
                      value={timeValue}
                      onChange={setTimeValue}
                      format={timeFormat}
                      showSeconds={showSeconds}
                      minuteStep={minuteStep}
                      intent={intent}
                      size={effectiveCalendarSize}
                      showHeader
                      showFooter={false}
                      height={"100%"}
                    />
                  ) : (
                    <RangeTimePanel
                      startTime={rangeStartTime}
                      endTime={rangeEndTime}
                      onStartTimeChange={setRangeStartTime}
                      onEndTimeChange={handleEndTimeChange}
                      timeFormat={timeFormat}
                      showSeconds={showSeconds}
                      minuteStep={minuteStep}
                      intent={intent}
                      size={effectiveCalendarSize}
                      hasStartDate={!!pendingRangeStart}
                      hasEndDate={!!pendingRangeEnd}
                      hasEndTimeBeenSet={endTimeUserSet}
                      
                      isSameDay={
                        !!(pendingRangeStart && pendingRangeEnd &&
                          pendingRangeStart.getFullYear() === pendingRangeEnd.getFullYear() &&
                          pendingRangeStart.getMonth() === pendingRangeEnd.getMonth() &&
                          pendingRangeStart.getDate() === pendingRangeEnd.getDate())
                      }
                    />
                  )}
                </div>
              )}
            </div>

            {effectiveShowFooter && (
              <div className="tui-datepicker__footer">
                <button
                  type="button"
                  className="tui-datepicker__cancel-btn"
                  onClick={handleFooterCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={cn("tui-datepicker__ok-btn", `tui-datepicker__ok-btn--${intent}`)}
                  onClick={handleFooterOk}
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

DatePicker.displayName = "DatePicker";
