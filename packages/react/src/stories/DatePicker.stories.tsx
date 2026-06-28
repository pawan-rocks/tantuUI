import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { DatePicker, DEFAULT_RANGE_PRESETS } from "../components/DatePicker/DatePicker";
import type { DatePickerPreset } from "../components/DatePicker/DatePicker";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],

  argTypes: {
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent for input and calendar",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Input size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    variant: {
      control: "select",
      options: ["outline", "soft", "plain"],
      description: "Input variant",
      table: { category: "Appearance", defaultValue: { summary: "outline" } },
    },
    isRange: {
      control: "boolean",
      description: "Range selection mode",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    isClearable: {
      control: "boolean",
      description: "Show clear button",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    showFooter: {
      control: "boolean",
      description: "Show Cancel/OK footer — apply selection only on OK",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    showTime: {
      control: "boolean",
      description: "Show time picker below the calendar",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    timeFormat: {
      control: "select",
      options: ["12h", "24h"],
      description: "Time format (only when showTime is true)",
      table: { category: "Behavior", defaultValue: { summary: "12h" } },
    },
    showSeconds: {
      control: "boolean",
      description: "Show seconds in time picker (only when showTime is true)",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    isInvalid: {
      control: "boolean",
      description: "Invalid/error state",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    calendarSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Calendar & time selector size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    placement: {
      control: "select",
      options: ["auto", "top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end"],
      description: "Dropdown placement (auto flips based on available space)",
      table: { category: "Behavior", defaultValue: { summary: "auto" } },
    },
    rangeSeparator: {
      control: "text",
      description: "Separator between start and end dates in range mode",
      table: { category: "Behavior", defaultValue: { summary: "\" – \"" } },
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Calendar icon position in the input",
      table: { category: "Appearance", defaultValue: { summary: "left" } },
    },
    onChange: { action: "onChange", table: { category: "Events" } },
    onRangeChange: { action: "onRangeChange", table: { category: "Events" } },
  },

  args: {
    size: "md",
    intent: "default",
    variant: "outline",
    isRange: false,
    isClearable: true,
    showFooter: false,
    showTime: true,
    timeFormat: "12h",
    showSeconds: false,
    isDisabled: false,
    isInvalid: false,
    placement: "auto",
    placeholder: "Select date & time",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    if (args.isRange) {
      return (
        <div style={{ maxWidth: 360 }}>
          <DatePicker
            {...args}
            rangeStart={start}
            rangeEnd={end}
            onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          />
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
            Start: {start ? start.toLocaleString() : "None"}<br />
            End: {end ? end.toLocaleString() : "None"}
          </p>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 360 }}>
        <DatePicker {...args} value={date} onChange={setDate} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Selected: {date ? date.toLocaleString() : "None"}
        </p>
      </div>
    );
  },
};

// ── With Presets Sidebar ──────────────────────────────────────────────────
export const WithPresetsSidebar: Story = {
  name: "With Presets Sidebar",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker value={date} onChange={setDate} isClearable placeholder="Pick a date" />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Open the picker — left sidebar shows Today, Tomorrow, Next week.
        </p>
      </div>
    );
  },
};

// ── Date Range With Presets ───────────────────────────────────────────────
export const DateRangeWithPresets: Story = {
  name: "Date Range With Presets",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(new Date(2026, 5, 1));
    const [end, setEnd] = useState<Date | null>(new Date(2026, 5, 15));

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          isClearable
          intent="primary"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Range: {start?.toLocaleDateString() ?? "—"} → {end?.toLocaleDateString() ?? "—"}
        </p>
      </div>
    );
  },
};

// ── Custom Presets ────────────────────────────────────────────────────────
export const CustomPresets: Story = {
  name: "Custom Presets",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    const customPresets: DatePickerPreset[] = [
      { label: "Start of year", date: () => new Date(new Date().getFullYear(), 0, 1) },
      { label: "End of year", date: () => new Date(new Date().getFullYear(), 11, 31) },
      { label: "Christmas", date: () => new Date(new Date().getFullYear(), 11, 25) },
    ];

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker value={date} onChange={setDate} presets={customPresets} intent="success" />
      </div>
    );
  },
};

// ── Custom Sidebar ────────────────────────────────────────────────────────
export const CustomSidebar: Story = {
  name: "Custom Sidebar",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          intent="info"
          sidebar={
            <div className="tui-datepicker__presets">
              <p style={{ fontSize: "var(--tui-font-size-xs)", fontWeight: 600, color: "var(--tui-color-brand-black-500)", marginBlockEnd: "var(--tui-spacing-2)" }}>
                Quick picks
              </p>
              <button
                type="button"
                className="tui-datepicker__preset-btn"
                onClick={() => setDate(new Date())}
              >
                Now
              </button>
              <button
                type="button"
                className="tui-datepicker__preset-btn"
                onClick={() => { const d = new Date(); d.setDate(1); setDate(d); }}
              >
                1st of month
              </button>
              <button
                type="button"
                className="tui-datepicker__preset-btn tui-datepicker__preset-btn--active"
                onClick={() => setDate(null)}
              >
                Clear
              </button>
            </div>
          }
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Pass any ReactNode via the <code>sidebar</code> prop to fully customize the left panel.
        </p>
      </div>
    );
  },
};

// ── No Sidebar ────────────────────────────────────────────────────────────
export const NoSidebar: Story = {
  name: "No Sidebar",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker value={date} onChange={setDate} presets={false} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Pass <code>presets={false}</code> to hide the sidebar.
        </p>
      </div>
    );
  },
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "success", "danger", "warning", "info"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
        {intents.map((intent) => (
          <DatePicker key={intent} intent={intent} placeholder={`${intent} intent`} presets={false} />
        ))}
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────
export const Variants: Story = {
  name: "Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
      <DatePicker variant="outline" placeholder="Outline" presets={false} />
      <DatePicker variant="soft" placeholder="Soft" presets={false} />
      <DatePicker variant="plain" placeholder="Plain" presets={false} />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <DatePicker key={size} size={size} placeholder={size} presets={false} />
      ))}
    </div>
  ),
};

// ── Clearable ─────────────────────────────────────────────────────────────
export const Clearable: Story = {
  name: "Clearable",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker value={date} onChange={setDate} isClearable presets={false} />
      </div>
    );
  },
};

// ── Disabled & Invalid ────────────────────────────────────────────────────
export const DisabledAndInvalid: Story = {
  name: "Disabled & Invalid",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
      <DatePicker value={new Date()} isDisabled presets={false} />
      <DatePicker value={new Date()} isInvalid presets={false} />
    </div>
  ),
};

// ── Range Presets Reference ───────────────────────────────────────────────
export const RangePresetsReference: Story = {
  name: "Range Presets Reference",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>
      <p style={{ marginBlockEnd: "var(--tui-spacing-2)" }}>Default range presets ({DEFAULT_RANGE_PRESETS.length}):</p>
      <ul style={{ paddingInlineStart: "var(--tui-spacing-4)" }}>
        {DEFAULT_RANGE_PRESETS.map((p) => (
          <li key={p.label}>{p.label}</li>
        ))}
      </ul>
    </div>
  ),
};

// ── With Footer (Single) ──────────────────────────────────────────────────
export const WithFooter: Story = {
  name: "With Footer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          showFooter
          isClearable
          placeholder="Select date (confirm with OK)"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Selection is only applied when you click OK. Cancel discards changes.
        </p>
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>
          Selected: {date ? date.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
};

// ── With Footer (Range) ───────────────────────────────────────────────────
export const WithFooterRange: Story = {
  name: "With Footer (Range)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          showFooter
          isClearable
          intent="primary"
          placeholder="Pick a range (confirm with OK)"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Range: {start?.toLocaleDateString() ?? "—"} → {end?.toLocaleDateString() ?? "—"}
        </p>
      </div>
    );
  },
};

// ── Footer Intents ────────────────────────────────────────────────────────
export const FooterIntents: Story = {
  name: "Footer Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "success", "danger", "warning", "info", "teal", "indigo"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
        {intents.map((intent) => (
          <DatePicker key={intent} intent={intent} showFooter presets={false} placeholder={`${intent} footer`} />
        ))}
      </div>
    );
  },
};

// ── With Time (Single) ────────────────────────────────────────────────────
export const WithTime: Story = {
  name: "With Time",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          showTime
          isClearable
          intent="primary"
          placeholder="Select date & time"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Selected: {date ? date.toLocaleString() : "None"}
        </p>
      </div>
    );
  },
};

// ── With Time 24h ─────────────────────────────────────────────────────────
export const WithTime24h: Story = {
  name: "With Time (24h)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          showTime
          timeFormat="24h"
          showSeconds
          isClearable
          intent="info"
          placeholder="Date + time (24h with seconds)"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Selected: {date ? date.toLocaleString() : "None"}
        </p>
      </div>
    );
  },
};

// ── With Time (Range) ─────────────────────────────────────────────────────
export const WithTimeRange: Story = {
  name: "With Time (Range)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          showTime
          isClearable
          intent="success"
          placeholder="Date+time range"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Start: {start?.toLocaleString() ?? "—"}<br />
          End: {end?.toLocaleString() ?? "—"}
        </p>
      </div>
    );
  },
};

// ── Custom Date Format ─────────────────────────────────────────────────────
export const CustomDateFormat: Story = {
  name: "Custom Date Format",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          formatDate={(d) => d.toISOString().split("T")[0]}
          placeholder="YYYY-MM-DD"
          presets={false}
        />
        <DatePicker
          value={date}
          onChange={setDate}
          formatDate={(d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
          placeholder="DD/MM/YYYY"
          presets={false}
        />
        <DatePicker
          value={date}
          onChange={setDate}
          formatDate={(d) => d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
          placeholder="German format"
          presets={false}
        />
      </div>
    );
  },
};

// ── Custom Range Separator ────────────────────────────────────────────────
export const CustomRangeSeparator: Story = {
  name: "Custom Range Separator",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(new Date(2026, 5, 1));
    const [end, setEnd] = useState<Date | null>(new Date(2026, 5, 15));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          rangeSeparator=" → "
          placeholder="Arrow separator"
          presets={false}
        />
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          rangeSeparator=" to "
          placeholder="Text separator"
          presets={false}
        />
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          rangeSeparator=" | "
          placeholder="Pipe separator"
          presets={false}
        />
      </div>
    );
  },
};

// ── Icon Position & Custom Icon ───────────────────────────────────────────
export const IconPositionAndCustomIcon: Story = {
  name: "Icon Position & Custom Icon",
  parameters: { controls: { disable: true } },
  render: () => {
    const customIcon = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 320 }}>
        <DatePicker iconPosition="left" placeholder="Icon left (default)" presets={false} />
        <DatePicker iconPosition="right" placeholder="Icon right" presets={false} />
        <DatePicker icon={customIcon} placeholder="Custom clock icon" presets={false} />
        <DatePicker icon={customIcon} iconPosition="right" placeholder="Custom icon (right)" presets={false} />
        <DatePicker icon={false} placeholder="No icon" presets={false} />
      </div>
    );
  },
};

// ── Min & Max Date ────────────────────────────────────────────────────────
export const MinMaxDate: Story = {
  name: "Min & Max Date",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          isClearable
          placeholder="Only ±3 days past, +14 days future"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Min: {minDate.toLocaleDateString()} | Max: {maxDate.toLocaleDateString()}
        </p>
      </div>
    );
  },
};

// ── Min & Max Date Range ──────────────────────────────────────────────────
export const MinMaxDateRange: Story = {
  name: "Min & Max Date (Range)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          minDate={minDate}
          maxDate={maxDate}
          isClearable
          placeholder="This month only"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Restricted to current month: {minDate.toLocaleDateString()} – {maxDate.toLocaleDateString()}
        </p>
      </div>
    );
  },
};

// ── Disable Weekends ──────────────────────────────────────────────────────
export const DisableWeekends: Story = {
  name: "Disable Weekends",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
          isClearable
          placeholder="Weekdays only"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Saturdays and Sundays are disabled.
        </p>
      </div>
    );
  },
};

// ── Disable Holidays ──────────────────────────────────────────────────────
export const DisableHolidays: Story = {
  name: "Disable Holidays",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    // Sample holidays (US 2026)
    const holidays = [
      new Date(2026, 0, 1),   // New Year
      new Date(2026, 0, 19),  // MLK Day
      new Date(2026, 6, 4),   // July 4th
      new Date(2026, 11, 25), // Christmas
      new Date(2026, 11, 31), // New Year's Eve
    ];

    const isHoliday = (d: Date) =>
      holidays.some((h) => h.getFullYear() === d.getFullYear() && h.getMonth() === d.getMonth() && h.getDate() === d.getDate());

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          isDateDisabled={isHoliday}
          isClearable
          intent="danger"
          placeholder="Holidays blocked"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Disabled: Jan 1, Jan 19, Jul 4, Dec 25, Dec 31 (2026)
        </p>
      </div>
    );
  },
};

// ── Disable Weekends + Holidays Combined ──────────────────────────────────
export const DisableWeekendsAndHolidays: Story = {
  name: "Weekends + Holidays Disabled",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    const holidays = [
      new Date(2026, 5, 28), // Example: today
      new Date(2026, 6, 4),  // July 4th
    ];

    const isDisabled = (d: Date) => {
      // Weekends
      if (d.getDay() === 0 || d.getDay() === 6) return true;
      // Holidays
      return holidays.some((h) => h.getFullYear() === d.getFullYear() && h.getMonth() === d.getMonth() && h.getDate() === d.getDate());
    };

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          isDateDisabled={isDisabled}
          isClearable
          intent="warning"
          placeholder="Business days only"
          presets={false}
        />
      </div>
    );
  },
};

// ── Future Only (No Past Dates) ───────────────────────────────────────────
export const FutureOnly: Story = {
  name: "Future Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={today}
          isClearable
          placeholder="Today or later"
          presets={false}
        />
      </div>
    );
  },
};

// ── Past Only (No Future Dates) ───────────────────────────────────────────
export const PastOnly: Story = {
  name: "Past Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          maxDate={today}
          isClearable
          placeholder="Today or earlier"
          presets={false}
        />
      </div>
    );
  },
};

// ── Max Range Duration ────────────────────────────────────────────────────
export const MaxRangeDuration: Story = {
  name: "Max Range Duration (7 days)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    // Dynamically set maxDate based on selected start
    const dynamicMaxDate = start
      ? new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7)
      : undefined;

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          minDate={start ?? undefined}
          maxDate={dynamicMaxDate}
          isClearable
          intent="info"
          placeholder="Max 7 day range"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          After selecting start, only 7 days ahead are available.
        </p>
      </div>
    );
  },
};

// ── With Time + Min/Max Date ──────────────────────────────────────────────
export const WithTimeAndMinMax: Story = {
  name: "With Time + Min/Max",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          showTime
          minDate={minDate}
          maxDate={maxDate}
          isClearable
          intent="primary"
          placeholder="Next 7 days + time"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Selected: {date ? date.toLocaleString() : "None"}
        </p>
      </div>
    );
  },
};

// ── Range + Time + Same Day Validation ────────────────────────────────────
export const RangeTimeSameDayValidation: Story = {
  name: "Range + Time (Same Day Validation)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          showTime
          isClearable
          intent="success"
          placeholder="Pick same day — end time must be after start"
          presets={false}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Start: {start?.toLocaleString() ?? "—"}<br />
          End: {end?.toLocaleString() ?? "—"}
        </p>
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>
          Try selecting same day for both — end time slots ≤ start time will be disabled.
        </p>
      </div>
    );
  },
};

// ── Week Starts on Monday ─────────────────────────────────────────────────
export const WeekStartsMonday: Story = {
  name: "Week Starts on Monday",
  parameters: { controls: { disable: true } },
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          weekStartsOn={1}
          placeholder="Monday first"
          presets={false}
        />
      </div>
    );
  },
};

// ── All Props Combined ────────────────────────────────────────────────────
export const AllPropsCombined: Story = {
  name: "All Props Combined",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const today = new Date();

    const holidays = [new Date(2026, 6, 4), new Date(2026, 11, 25)];

    return (
      <div style={{ maxWidth: 360 }}>
        <DatePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          showTime
          timeFormat="12h"
          showFooter
          isClearable
          intent="primary"
          size="md"
          variant="outline"
          weekStartsOn={1}
          minDate={today}
          isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6 || holidays.some((h) => h.getMonth() === d.getMonth() && h.getDate() === d.getDate())}
          rangeSeparator=" → "
          iconPosition="left"
          placeholder="Full featured range + time picker"
          formatDate={(d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Features: range, time, footer, clearable, min date (today), weekends disabled, holidays disabled, Monday start, custom format, custom separator.
        </p>
      </div>
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-custom-datepicker { max-width: 280px; } .my-custom-datepicker .tui-input { border: 2px dashed hotpink; border-radius: 12px; }`}</style>
      <DatePicker className="my-custom-datepicker" presets={false} placeholder="Custom styled picker" />
    </>
  ),
};
