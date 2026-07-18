import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Calendar } from "../components/Calendar/Calendar";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],

  argTypes: {
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent for selected state",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Calendar size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    weekStartsOn: {
      control: "select",
      options: [0, 1],
      description: "Week starts on (0 = Sunday, 1 = Monday)",
      table: { category: "Behavior", defaultValue: { summary: "0" } },
    },
    showWeekNumbers: {
      control: "boolean",
      description: "Show week numbers column",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    isRange: {
      control: "boolean",
      description: "Range selection mode",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    onSelect: {
      action: "onSelect",
      description: "Called when a date is selected",
      table: { category: "Events" },
    },
    onMonthChange: {
      action: "onMonthChange",
      description: "Called when month changes",
      table: { category: "Events" },
    },
  },

  args: {
    size: "md",
    intent: "default",
    weekStartsOn: 0,
    showWeekNumbers: false,
    isRange: false,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [selected, setSelected] = useState<Date | null>(null);
    return (
      <div>
        <Calendar
          {...args}
          value={selected}
          onSelect={setSelected}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Selected: {selected ? selected.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
};

// ── Default (today highlighted) ───────────────────────────────────────────
export const Default: Story = {
  name: "Default",
  parameters: { controls: { disable: true } },
  render: () => <Calendar />,
};

// ── With Selected Date ────────────────────────────────────────────────────
export const WithSelectedDate: Story = {
  name: "With Selected Date",
  parameters: { controls: { disable: true } },
  render: () => (
    <Calendar value={new Date()} />
  ),
};

// ── Date Range Selection ──────────────────────────────────────────────────
export const DateRangeSelection: Story = {
  name: "Date Range Selection",
  parameters: { controls: { disable: true } },
  render: () => {
    const [rangeStart, setRangeStart] = useState<Date | null>(new Date(2026, 5, 8));
    const [rangeEnd, setRangeEnd] = useState<Date | null>(new Date(2026, 5, 18));

    const handleSelect = (date: Date) => {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
      } else {
        if (date < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(date);
        } else {
          setRangeEnd(date);
        }
      }
    };

    return (
      <div>
        <Calendar
          isRange
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onSelect={handleSelect}
          
          
          intent="primary"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Click to set start, click again to set end. Range: {rangeStart?.toLocaleDateString() ?? "—"} → {rangeEnd?.toLocaleDateString() ?? "—"}
        </p>
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--tui-spacing-4)", alignItems: "start" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size}>
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockEnd: "var(--tui-spacing-2)" }}>
            {size}
          </p>
          <Calendar
            size={size}
            value={new Date(2026, 5, 10)}
            
            
          />
        </div>
      ))}
    </div>
  ),
};

// ── Single Date Selection — Intent Matrix ─────────────────────────────────
export const IntentsSingleDate: Story = {
  name: "Single Date — All Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "danger", "warning", "info", "teal", "indigo"] as const;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--tui-spacing-4)" }}>
        {intents.map((intent) => (
          <div key={intent}>
            <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockEnd: "var(--tui-spacing-2)" }}>
              {intent}
            </p>
            <Calendar
              intent={intent}
              value={new Date(2026, 5, 15)}
              size="sm"
            />
          </div>
        ))}
      </div>
    );
  },
};

// ── Date Range Selection — Intent Matrix ──────────────────────────────────
export const IntentsDateRange: Story = {
  name: "Date Range — All Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "danger", "warning", "info", "teal", "indigo"] as const;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--tui-spacing-4)" }}>
        {intents.map((intent) => (
          <div key={intent}>
            <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockEnd: "var(--tui-spacing-2)" }}>
              {intent}
            </p>
            <Calendar
              intent={intent}
              isRange
              rangeStart={new Date(2026, 5, 10)}
              rangeEnd={new Date(2026, 5, 18)}
              size="sm"
            />
          </div>
        ))}
      </div>
    );
  },
};

// ── Disabled Dates (Weekends) ─────────────────────────────────────────────
export const DisabledDatesWeekends: Story = {
  name: "Disabled Dates (Weekends)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);
    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };

    return (
      <div>
        <Calendar
          value={selected}
          onSelect={setSelected}
          isDateDisabled={isWeekend}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Saturdays and Sundays are disabled. Selected: {selected ? selected.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
};

// ── Disabled Dates (Custom — Holidays) ────────────────────────────────────
export const DisabledDatesCustom: Story = {
  name: "Disabled Dates (Custom)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);
    const holidays = [
      new Date(2026, 5, 1),
      new Date(2026, 5, 20),
      new Date(2026, 5, 27),
    ];

    const isHoliday = (date: Date) => {
      return holidays.some(
        (h) => h.getFullYear() === date.getFullYear() && h.getMonth() === date.getMonth() && h.getDate() === date.getDate(),
      );
    };

    return (
      <div>
        <Calendar
          value={selected}
          onSelect={setSelected}
          isDateDisabled={isHoliday}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Specific holidays disabled: Jun 1, Jun 20, Jun 27. Selected: {selected ? selected.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
};

// ── Min/Max Date ──────────────────────────────────────────────────────────
export const MinMaxDate: Story = {
  name: "Min/Max Date",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);
    return (
      <div>
        <Calendar
          value={selected}
          onSelect={setSelected}
          minDate={new Date(2026, 5, 5)}
          maxDate={new Date(2026, 5, 20)}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Only Jun 5–20, 2026 selectable. Selected: {selected ? selected.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
};

// ── Week Starting Monday ──────────────────────────────────────────────────
export const WeekStartingMonday: Story = {
  name: "Week Starting Monday",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-4)", alignItems: "start" }}>
      <div>
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockEnd: "var(--tui-spacing-2)" }}>
          Sunday start (default)
        </p>
        <Calendar
          weekStartsOn={0}
          
          
        />
      </div>
      <div>
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockEnd: "var(--tui-spacing-2)" }}>
          Monday start
        </p>
        <Calendar
          weekStartsOn={1}
          
          
        />
      </div>
    </div>
  ),
};

// ── With Week Numbers ─────────────────────────────────────────────────────
export const WithWeekNumbers: Story = {
  name: "With Week Numbers",
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Calendar
        showWeekNumbers
        
        
      />
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
        Week numbers shown in the first column (ISO week numbering).
      </p>
    </div>
  ),
};

// ── Multiple Disabled Patterns ────────────────────────────────────────────
export const MultipleDisabledPatterns: Story = {
  name: "Multiple Disabled Patterns",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);
    const holidays = [
      new Date(2026, 5, 1),
      new Date(2026, 5, 20),
    ];

    const isDisabled = (date: Date) => {
      // Weekends
      const day = date.getDay();
      if (day === 0 || day === 6) return true;
      // Past dates (before today)
      if (date < new Date(new Date().setHours(0,0,0,0))) return true;
      // Specific holidays
      if (holidays.some((h) => h.getFullYear() === date.getFullYear() && h.getMonth() === date.getMonth() && h.getDate() === date.getDate())) return true;
      return false;
    };

    return (
      <div>
        <Calendar
          value={selected}
          onSelect={setSelected}
          isDateDisabled={isDisabled}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Combined: weekends + past dates + holidays disabled. Selected: {selected ? selected.toLocaleDateString() : "None"}
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
      <style>{`.my-custom-cal { border: 2px solid hotpink; border-radius: 16px; padding: 16px; }`}</style>
      <Calendar className="my-custom-cal"   />
    </>
  ),
};
