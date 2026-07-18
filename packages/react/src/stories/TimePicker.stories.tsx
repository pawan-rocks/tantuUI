import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TimePicker } from "../components/TimePicker/TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],

  argTypes: {
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Intent controls the input, time selector, and footer OK action colors. The footer uses matching base, hover, and focus tokens.",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    variant: {
      control: "select",
      options: ["outline", "soft", "plain"],
      table: { category: "Appearance", defaultValue: { summary: "outline" } },
    },
    format: {
      control: "select",
      options: ["12h", "24h"],
      table: { category: "Behavior", defaultValue: { summary: "12h" } },
    },
    showSeconds: {
      control: "boolean",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    showFooter: {
      control: "boolean",
      description: "Show Cancel/OK footer. When true, time only applied on OK click.",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },
    isClearable: {
      control: "boolean",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    isDisabled: {
      control: "boolean",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    isInvalid: {
      control: "boolean",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      table: { category: "Appearance", defaultValue: { summary: "left" } },
    },
    onChange: { action: "onChange", description: "Returns { hours, minutes, seconds } | null", table: { category: "Events" } },
    onOk: { action: "onOk", description: "Fires after onChange on OK click", table: { category: "Events" } },
  },

  args: {
    size: "md",
    intent: "default",
    variant: "outline",
    format: "12h",
    showSeconds: false,
    showFooter: true,
    isClearable: true,
    isDisabled: false,
    isInvalid: false,
    iconPosition: "left",
    placeholder: "Select time",
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker {...args} value={time} onChange={setTime} />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Selected: {time ? `${time.hours}:${String(time.minutes).padStart(2, "0")}:${String(time.seconds ?? 0).padStart(2, "0")}` : "None"}
        </p>
      </div>
    );
  },
};

// ── 24h Format ────────────────────────────────────────────────────────────
export const Format24h: Story = {
  name: "24h Format",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>({ hours: 14, minutes: 30 });
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker value={time} onChange={setTime} format="24h" isClearable />
      </div>
    );
  },
};

// ── With Seconds ──────────────────────────────────────────────────────────
export const WithSeconds: Story = {
  name: "With Seconds",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker value={time} onChange={setTime} showSeconds format="24h" isClearable />
      </div>
    );
  },
};

// ── Without Footer (Immediate Apply) ──────────────────────────────────────
export const WithoutFooter: Story = {
  name: "Without Footer (Immediate)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker value={time} onChange={setTime} showFooter={false} isClearable placeholder="Click to pick — applies immediately" />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          No footer — time applies as soon as you click a time slot.
        </p>
      </div>
    );
  },
};

// ── Min/Max Time ──────────────────────────────────────────────────────────
export const MinMaxTime: Story = {
  name: "Min & Max Time",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker
          value={time}
          onChange={setTime}
          format="24h"
          minTime={{ hours: 9, minutes: 0 }}
          maxTime={{ hours: 17, minutes: 0 }}
          isClearable
          placeholder="9:00 – 17:00 only"
          intent="info"
        />
      </div>
    );
  },
};

// ── Disable Before Now (Future Only) ──────────────────────────────────────
export const DisableBeforeNow: Story = {
  name: "Disable Before Now (Future Time)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker
          value={time}
          onChange={setTime}
          disableBeforeNow
          isClearable
          intent="success"
          placeholder="Only future times"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Times before current time ({new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}) are disabled.
        </p>
      </div>
    );
  },
};

// ── Disable After Now (Past Only) ─────────────────────────────────────────
export const DisableAfterNow: Story = {
  name: "Disable After Now (Past Time)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker
          value={time}
          onChange={setTime}
          disableAfterNow
          isClearable
          intent="warning"
          placeholder="Only past times"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Times after current time are disabled.
        </p>
      </div>
    );
  },
};

// ── Combined: Min + Disable Before Now ────────────────────────────────────
export const CombinedValidation: Story = {
  name: "Combined Validation",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker
          value={time}
          onChange={setTime}
          format="24h"
          minTime={{ hours: 8, minutes: 0 }}
          maxTime={{ hours: 20, minutes: 0 }}
          disableBeforeNow
          isClearable
          intent="primary"
          placeholder="8:00-20:00 + future only"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Business hours (8-20) combined with future-only. The stricter constraint wins.
        </p>
      </div>
    );
  },
};

// ── Custom isTimeDisabled ─────────────────────────────────────────────────
export const CustomDisabledSlots: Story = {
  name: "Custom Disabled Slots",
  parameters: { controls: { disable: true } },
  render: () => {
    const [time, setTime] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    // Disable lunch hour
    const isTimeDisabled = (t: { hours: number; minutes: number; seconds: number }) =>
      t.hours === 12 || t.hours === 13;

    return (
      <div style={{ maxWidth: 280 }}>
        <TimePicker
          value={time}
          onChange={setTime}
          format="24h"
          isTimeDisabled={isTimeDisabled}
          isClearable
          intent="danger"
          placeholder="Lunch (12-13) blocked"
        />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 280 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <TimePicker key={s} size={s} placeholder={s} />
      ))}
    </div>
  ),
};

// ── Intents ───────────────────────────────────────────────────────────────
export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 280 }}>
      {(["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal"] as const).map((i) => (
        <TimePicker key={i} intent={i} value={{ hours: 10, minutes: 30 }} placeholder={`${i} intent — open to view footer`} />
      ))}
    </div>
  ),
};

// ── Disabled & Invalid ────────────────────────────────────────────────────
export const DisabledAndInvalid: Story = {
  name: "Disabled & Invalid",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 280 }}>
      <TimePicker value={{ hours: 10, minutes: 30 }} isDisabled placeholder="Disabled" />
      <TimePicker value={{ hours: 10, minutes: 30 }} isInvalid placeholder="Invalid" />
    </div>
  ),
};

// ── Icon Position ─────────────────────────────────────────────────────────
export const IconPosition: Story = {
  name: "Icon Position",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)", maxWidth: 280 }}>
      <TimePicker iconPosition="left" placeholder="Icon left" />
      <TimePicker iconPosition="right" placeholder="Icon right" />
      <TimePicker icon={false} placeholder="No icon" />
    </div>
  ),
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-custom-time { max-width: 200px; } .my-custom-time .tui-input { border: 2px dashed hotpink; border-radius: 12px; }`}</style>
      <TimePicker className="my-custom-time" placeholder="Custom styled" />
    </>
  ),
};

// ── Time Range ────────────────────────────────────────────────────────────
export const TimeRange: Story = {
  name: "Time Range",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    const [end, setEnd] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <TimePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          isClearable
          intent="primary"
          placeholder="Select time range"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)", marginBlockStart: "var(--tui-spacing-3)" }}>
          Start: {start ? `${start.hours}:${String(start.minutes).padStart(2, "0")}` : "None"}<br />
          End: {end ? `${end.hours}:${String(end.minutes).padStart(2, "0")}` : "None"}
        </p>
      </div>
    );
  },
};

// ── Time Range 24h ────────────────────────────────────────────────────────
export const TimeRange24h: Story = {
  name: "Time Range (24h)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<{ hours: number; minutes: number; seconds?: number } | null>({ hours: 9, minutes: 0 });
    const [end, setEnd] = useState<{ hours: number; minutes: number; seconds?: number } | null>({ hours: 17, minutes: 30 });

    return (
      <div style={{ maxWidth: 320 }}>
        <TimePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          format="24h"
          isClearable
          intent="success"
          placeholder="Working hours"
          rangeSeparator=" → "
        />
      </div>
    );
  },
};

// ── Time Range Without Footer ─────────────────────────────────────────────
export const TimeRangeImmediate: Story = {
  name: "Time Range (Immediate)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [start, setStart] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);
    const [end, setEnd] = useState<{ hours: number; minutes: number; seconds?: number } | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <TimePicker
          isRange
          rangeStart={start}
          rangeEnd={end}
          onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
          showFooter={false}
          isClearable
          placeholder="No footer — pick start then end"
        />
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBlockStart: "var(--tui-spacing-2)" }}>
          Picks start time, then auto-switches to end tab.
        </p>
      </div>
    );
  },
};
