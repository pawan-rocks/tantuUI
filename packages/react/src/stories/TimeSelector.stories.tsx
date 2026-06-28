import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TimeSelector } from "../components/TimeSelector/TimeSelector";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof TimeSelector> = {
  title: "Components/TimeSelector",
  component: TimeSelector,
  tags: ["autodocs"],

  argTypes: {
    format: {
      control: "select",
      options: ["12h", "24h"],
      description: "12-hour or 24-hour format",
      table: { category: "Behavior", defaultValue: { summary: "12h" } },
    },
    minuteStep: {
      control: "number",
      description: "Minute step interval",
      table: { category: "Behavior", defaultValue: { summary: "1" } },
    },
    secondStep: {
      control: "number",
      description: "Second step interval",
      table: { category: "Behavior", defaultValue: { summary: "1" } },
    },
    showSeconds: {
      control: "boolean",
      description: "Show seconds column",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    showHeader: {
      control: "boolean",
      description: "Show header section (Hr/Min/Sec labels)",
      table: { category: "Layout", defaultValue: { summary: "true" } },
    },
    showFooter: {
      control: "boolean",
      description: "Show footer section (Cancel/Save buttons)",
      table: { category: "Layout", defaultValue: { summary: "true" } },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Color intent",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "TimeSelector size",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    onChange: { action: "onChange", table: { category: "Events" } },
    onSave: { action: "onSave", table: { category: "Events" } },
    onCancel: { action: "onCancel", table: { category: "Events" } },
  },

  args: {
    format: "12h",
    size: "md",
    intent: "default",
    minuteStep: 1,
    secondStep: 1,
    showSeconds: false,
    showHeader: true,
    showFooter: true,
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TimeSelector>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 10, minutes: 30, seconds: 0 });
    return (
      <div>
        <TimeSelector {...args} value={time} onChange={setTime} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Value: {time.hours.toString().padStart(2, "0")}:{time.minutes.toString().padStart(2, "0")}:{time.seconds.toString().padStart(2, "0")}
        </p>
      </div>
    );
  },
};

// ── 12-Hour Format ────────────────────────────────────────────────────────
export const TwelveHourFormat: Story = {
  name: "12-Hour Format",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 14, minutes: 30, seconds: 0 });
    return (
      <div>
        <TimeSelector format="12h" value={time} onChange={setTime} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Shows AM/PM column — 24h value: {time.hours.toString().padStart(2, "0")}:{time.minutes.toString().padStart(2, "0")}
        </p>
      </div>
    );
  },
};

// ── 24-Hour Format ────────────────────────────────────────────────────────
export const TwentyFourHourFormat: Story = {
  name: "24-Hour Format",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 17, minutes: 45, seconds: 0 });
    return (
      <div>
        <TimeSelector format="24h" value={time} onChange={setTime} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          No AM/PM column — Value: {time.hours.toString().padStart(2, "0")}:{time.minutes.toString().padStart(2, "0")}
        </p>
      </div>
    );
  },
};

// ── With Seconds ──────────────────────────────────────────────────────────
export const WithSeconds: Story = {
  name: "With Seconds",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 9, minutes: 15, seconds: 45 });
    return (
      <div>
        <TimeSelector format="24h" showSeconds value={time} onChange={setTime} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Value: {time.hours.toString().padStart(2, "0")}:{time.minutes.toString().padStart(2, "0")}:{time.seconds.toString().padStart(2, "0")}
        </p>
      </div>
    );
  },
};

// ── Minute Step ───────────────────────────────────────────────────────────
export const MinuteStep: Story = {
  name: "Minute Step",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 9, minutes: 0, seconds: 0 });
    return (
      <div>
        <TimeSelector format="12h" minuteStep={15} value={time} onChange={setTime} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Step: 15 min — Shows 00, 15, 30, 45
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
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-3)" }}>
          <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", width: 24 }}>{size}</span>
          <TimeSelector size={size} value={{ hours: 10, minutes: 30 }} />
        </div>
      ))}
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["primary", "success", "danger", "info", "teal", "indigo"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
        {intents.map((intent) => (
          <div key={intent} style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-3)" }}>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", width: 60 }}>{intent}</span>
            <TimeSelector intent={intent} value={{ hours: 14, minutes: 30 }} />
          </div>
        ))}
      </div>
    );
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <TimeSelector value={{ hours: 8, minutes: 15 }} isDisabled />
  ),
};

// ── Min/Max Time ──────────────────────────────────────────────────────────
export const MinMaxTime: Story = {
  name: "Min/Max Time",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 9, minutes: 0, seconds: 0 });
    return (
      <div>
        <TimeSelector
          format="24h"
          value={time}
          onChange={setTime}
          minTime={{ hours: 9, minutes: 0 }}
          maxTime={{ hours: 17, minutes: 0 }}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Business hours only: 09:00 – 17:00. Hours outside range are disabled.
        </p>
      </div>
    );
  },
};

// ── Custom Disabled Times ─────────────────────────────────────────────────
export const CustomDisabledTimes: Story = {
  name: "Custom Disabled Times",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 11, minutes: 0, seconds: 0 });

    const isLunchHour = (t: { hours: number; minutes: number; seconds: number }) => {
      return t.hours === 12;
    };

    return (
      <div>
        <TimeSelector
          format="24h"
          value={time}
          onChange={setTime}
          isTimeDisabled={isLunchHour}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Lunch hour (12:00–12:59) is disabled via isTimeDisabled callback.
        </p>
      </div>
    );
  },
};

// ── Date-Aware Constraints ────────────────────────────────────────────────
export const DateAwareConstraints: Story = {
  name: "Date-Aware Constraints",
  parameters: { controls: { disable: true } },
  render: () => {
    const minDateTime = new Date(2025, 0, 15, 9, 30);
    const maxDateTime = new Date(2025, 0, 17, 16, 0);

    const [time, setTime] = useState({ hours: 10, minutes: 0, seconds: 0 });
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 0, 15));

    const dates = [
      { label: "Jan 15 (min date)", date: new Date(2025, 0, 15) },
      { label: "Jan 16 (middle)", date: new Date(2025, 0, 16) },
      { label: "Jan 17 (max date)", date: new Date(2025, 0, 17) },
    ];

    return (
      <div>
        <div style={{ marginBlockEnd: "var(--tui-spacing-3)", display: "flex", gap: "var(--tui-spacing-2)" }}>
          {dates.map((d) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setSelectedDate(d.date)}
              style={{
                padding: "4px 8px",
                fontSize: "var(--tui-font-size-xs)",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: selectedDate.getDate() === d.date.getDate() ? "var(--tui-color-primary-500)" : "var(--tui-color-neutral-200)",
                background: selectedDate.getDate() === d.date.getDate() ? "var(--tui-color-primary-50)" : "transparent",
                cursor: "pointer",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <TimeSelector
          format="24h"
          value={time}
          onChange={setTime}
          selectedDate={selectedDate}
          minDateTime={minDateTime}
          maxDateTime={maxDateTime}
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          minDateTime: Jan 15 @ 09:30 | maxDateTime: Jan 17 @ 16:00<br />
          On Jan 15: times before 09:30 disabled. On Jan 17: times after 16:00 disabled. On Jan 16: no time restrictions.
        </p>
      </div>
    );
  },
};

// ── Header & Footer ───────────────────────────────────────────────────────
export const WithHeaderFooter: Story = {
  name: "With Header & Footer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 14, minutes: 30, seconds: 0 });
    const [saved, setSaved] = useState("");
    return (
      <div>
        <TimeSelector
          format="12h"
          value={time}
          onChange={setTime}
          onSave={(t) => setSaved(`Saved: ${t.hours.toString().padStart(2, "0")}:${t.minutes.toString().padStart(2, "0")}`)}
          onCancel={() => setSaved("Cancelled")}
          showHeader
          showFooter
        />
        {saved && (
          <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-3)" }}>
            {saved}
          </p>
        )}
      </div>
    );
  },
};

// ── No Header ─────────────────────────────────────────────────────────────
export const NoHeader: Story = {
  name: "No Header",
  parameters: { controls: { disable: true } },
  render: () => (
    <TimeSelector value={{ hours: 10, minutes: 0 }} showHeader={false} showFooter />
  ),
};

// ── No Footer ─────────────────────────────────────────────────────────────
export const NoFooter: Story = {
  name: "No Footer",
  parameters: { controls: { disable: true } },
  render: () => (
    <TimeSelector value={{ hours: 10, minutes: 0 }} showHeader showFooter={false} />
  ),
};

// ── No Header & No Footer ─────────────────────────────────────────────────
export const NoHeaderNoFooter: Story = {
  name: "No Header & No Footer",
  parameters: { controls: { disable: true } },
  render: () => (
    <TimeSelector value={{ hours: 15, minutes: 45 }} showHeader={false} showFooter={false} format="24h" />
  ),
};

// ── Custom Header ─────────────────────────────────────────────────────────
export const CustomHeader: Story = {
  name: "Custom Header",
  parameters: { controls: { disable: true } },
  render: () => (
    <TimeSelector
      value={{ hours: 9, minutes: 30 }}
      header={<span style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: 600, color: "var(--tui-color-brand-pink-600)" }}>Select meeting time</span>}
      showFooter={false}
    />
  ),
};

// ── Custom Footer ─────────────────────────────────────────────────────────
export const CustomFooter: Story = {
  name: "Custom Footer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState({ hours: 16, minutes: 0, seconds: 0 });
    return (
      <TimeSelector
        value={time}
        onChange={setTime}
        format="24h"
        footer={
          <button
            type="button"
            style={{ width: "100%", padding: "6px", background: "var(--tui-color-brand-pink-600)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "var(--tui-font-size-xs)", fontWeight: 500 }}
            onClick={() => alert(`Done: ${time.hours}:${time.minutes}`)}
          >
            Done
          </button>
        }
      />
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-custom-tp { background: #f0f0f0; padding: 12px; border-radius: 12px; }`}</style>
      <TimeSelector className="my-custom-tp" value={{ hours: 9, minutes: 0 }} />
    </>
  ),
};
