import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ListItem } from "../components/ListItem/ListItem";
import { Button } from "../components/Button/Button";

// ── Icons ─────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 5l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<typeof ListItem> = {
  title: "Components/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Primary title text", table: { category: "Content" } },
    subtitle: { control: "text", description: "Secondary subtitle text", table: { category: "Content" } },
    value: { control: "text", description: "Stable selection value used by ListGroup", table: { category: "Selection" } },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"], description: "Size variant", table: { category: "Appearance", defaultValue: { summary: "md" } } },
    intent: { control: "select", options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"], description: "Intent controls light hover, one-step-darker selected, intent-colored separator, focus ring, and selection control colors", table: { category: "Appearance", defaultValue: { summary: "default" } } },
    disabled: { control: "boolean", description: "Disabled state", table: { category: "State", defaultValue: { summary: "false" } } },
    selected: { control: "boolean", description: "Selected/active state", table: { category: "State", defaultValue: { summary: "false" } } },
    hoverable: { control: "boolean", description: "Show hover highlight", table: { category: "Appearance", defaultValue: { summary: "false" } } },
    hoverBg: { control: "text", description: "Hover background: 'primary-light', 'secondary-light', 'tertiary-light', or any CSS color", table: { category: "Appearance" } },
    selectedBg: { control: "text", description: "Selected background: one-step-darker 'primary', 'secondary', or 'tertiary' preset, light preset, or any CSS color", table: { category: "Appearance" } },
    bordered: { control: "boolean", description: "Legacy alias for divider", table: { category: "Appearance", defaultValue: { summary: "true" } } },
    divider: { control: "boolean", description: "Show the bottom divider; defaults to true", table: { category: "Appearance", defaultValue: { summary: "true" } } },
    isGhost: { control: "boolean", description: "Ghost/shimmer loading state", table: { category: "State", defaultValue: { summary: "false" } } },
    selectionPosition: { control: "select", options: ["left", "right"], description: "Position of checkbox/radio", table: { category: "Selection", defaultValue: { summary: "left" } } },
    selectionAlign: { control: "select", options: ["title", "center"], description: "Vertical alignment of checkbox/radio: aligned with title row or vertically centered", table: { category: "Selection", defaultValue: { summary: "title" } } },
  },
  args: { size: "md", intent: "default", disabled: false, selected: false, hoverable: false, bordered: true, divider: true, isGhost: false, selectionPosition: "left", selectionAlign: "title" },
  parameters: {
    docs: {
      description: {
        component: "A single list item with left section (title, subtitle, icons) and right section. Use inside a ListGroup for grouped lists.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  args: { title: "List Item Title", subtitle: "Subtitle description text", hoverable: true },
};

// ── Title Only ────────────────────────────────────────────────────────────
/**
 * Single ListItem with only a title — simplest usage.
 */
export const TitleOnly: Story = {
  name: "Title Only",
  parameters: { controls: { disable: true } },
  render: () => <ListItem title="Settings" />,
};

export const TitleOnlySizes: Story = {
  name: "Title Only — Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-2)" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <ListItem
          key={size}
          size={size}
          title={`Title only (${size})`}
          bordered={false}
        />
      ))}
    </div>
  ),
};

export const Divider: Story = {
  name: "Divider",
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <ListItem title="With divider (default)" divider />
      <ListItem title="Without divider" divider={false} />
    </div>
  ),
};

// ── Title + Subtitle ──────────────────────────────────────────────────────
/**
 * Title with subtitle for secondary information.
 */
export const TitleAndSubtitle: Story = {
  name: "Title + Subtitle",
  parameters: { controls: { disable: true } },
  render: () => <ListItem title="Alice Johnson" subtitle="alice@company.com" />,
};

// ── With Title Icons ──────────────────────────────────────────────────────
/**
 * Title with prefix and suffix icons for visual context.
 */
export const WithTitleIcons: Story = {
  name: "With Title Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Bob Smith"
      titlePrefixIcon={<UserIcon />}
      titleSuffixIcon={<CheckIcon />}
      subtitle="bob@company.com"
    />
  ),
};

// ── With Subtitle Icons ───────────────────────────────────────────────────
/**
 * Subtitle with prefix icon for additional context.
 */
export const WithSubtitleIcons: Story = {
  name: "With Subtitle Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Carol White"
      titlePrefixIcon={<UserIcon />}
      subtitle="carol@company.com"
      subtitlePrefixIcon={<MailIcon />}
    />
  ),
};

// ── With Right Section ────────────────────────────────────────────────────
/**
 * Right section with a chevron icon — common for navigation items.
 */
export const WithRightChevron: Story = {
  name: "With Right Section (Chevron)",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem title="Notifications" subtitle="Push and email" rightSection={<ChevronRight />} />
  ),
};

// ── With Right Button ─────────────────────────────────────────────────────
/**
 * Right section with a button — for actionable items.
 */
export const WithRightButton: Story = {
  name: "With Right Section (Button)",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Plan"
      subtitle="Pro — $19/mo"
      rightSection={<Button size="sm" variant="outline" intent="primary">Upgrade</Button>}
    />
  ),
};

// ── Clickable ─────────────────────────────────────────────────────────────
/**
 * Pass `onClick` to make the item interactive. Keyboard accessible.
 */
export const Clickable: Story = {
  name: "Clickable",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem title="Dashboard" titlePrefixIcon={<UserIcon />} hoverable onClick={() => alert("Clicked!")} />
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────
/**
 * All size presets scale the title, subtitle, padding, and minimum height together.
 */
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <ListItem key={s} title={`Size: ${s}`} subtitle="Font, padding, and min-height scale together" size={s} bordered={false} />
      ))}
    </div>
  ),
};

export const IconSizing: Story = {
  name: "Icon Sizing",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-2)" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <ListItem
          key={size}
          size={size}
          title={`Title icon: ${size}`}
          subtitle="Subtitle icon follows the subtitle scale"
          titlePrefixIcon={<UserIcon />}
          subtitlePrefixIcon={<MailIcon />}
          bordered={false}
        />
      ))}
    </div>
  ),
};

// ── Selected ──────────────────────────────────────────────────────────────
/**
 * Selected state — uses the default primary intent with a light background highlight.
 */
export const Selected: Story = {
  name: "Selected",
  parameters: { controls: { disable: true } },
  render: () => <ListItem title="Selected item" subtitle="This one is active" selected />,
};

// ── Intent States ─────────────────────────────────────────────────────────
/**
 * Intent-driven hover and selected backgrounds with matching separators.
 * Hover each item in the left column; selected items use the next darker intent scale.
 */
export const IntentStates: Story = {
  name: "Intent States",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(260px, 1fr))", gap: "var(--tui-spacing-2)", maxWidth: 720 }}>
        {intents.map((intent) => (
          <div key={intent} style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-1)" }}>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{intent}</span>
            <ListItem intent={intent} title={`${intent} hover`} subtitle="Hover to view the light intent background" hoverable />
            <ListItem intent={intent} title={`${intent} selected`} subtitle="Selected uses one darker scale step" selected />
          </div>
        ))}
      </div>
    );
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────
/**
 * Disabled state — dimmed, no interaction.
 */
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => <ListItem title="Disabled item" subtitle="Cannot interact" disabled />,
};

// ── Custom Children ───────────────────────────────────────────────────────
/**
 * Pass `children` for a fully custom layout. Title/subtitle/rightSection are ignored.
 */
export const CustomChildren: Story = {
  name: "Custom Children (Full ReactNode)",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem hoverable>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-3)", width: "100%" }}>
        <div style={{ width: 40, height: 40, borderRadius: "var(--tui-radius-full)", background: "var(--tui-color-brand-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-brand-primary-700)", fontWeight: 600 }}>AJ</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500 }}>Alice Johnson</div>
          <div style={{ fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-brand-gray-500)" }}>Product Designer</div>
        </div>
        <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-brand-gray-400)" }}>2m ago</span>
      </div>
    </ListItem>
  ),
};

// ── Ghost ─────────────────────────────────────────────────────────────────
/**
 * Ghost/shimmer loading state. Auto-sizes shimmer to title/subtitle content.
 */
export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => <ListItem isGhost title="Alice Johnson" subtitle="alice@company.com" rightSection={<span />} />,
};

// ── Custom Class Only ─────────────────────────────────────────────────────
/**
 * Using only className with no design props — fully custom styled.
 */
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-list-item { background: linear-gradient(90deg, #f0f9ff, #fff); border-left: 3px solid #3b82f6; }`}</style>
      <ListItem className="my-list-item" title="Custom styled" subtitle="Via className only" bordered={false} />
    </>
  ),
};

// ── With Checkbox (Left) ──────────────────────────────────────────────────
/**
 * Checkbox on the left side, aligned with title by default.
 */
export const WithCheckboxLeft: Story = {
  name: "Checkbox: Left",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Enable notifications"
      subtitle="Receive push and email alerts"
      selection={{ type: "checkbox", checked: true, onChange: () => {} }}
      selectionPosition="left"
    />
  ),
};

// ── With Checkbox (Right) ─────────────────────────────────────────────────
/**
 * Checkbox on the right side.
 */
export const WithCheckboxRight: Story = {
  name: "Checkbox: Right",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Dark mode"
      subtitle="Use dark theme across the app"
      selection={{ type: "checkbox", checked: false, onChange: () => {} }}
      selectionPosition="right"
    />
  ),
};

// ── With Radio (Left) ─────────────────────────────────────────────────────
/**
 * Radio button on the left side, aligned with title.
 */
export const WithRadioLeft: Story = {
  name: "Radio: Left",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Standard Plan"
      subtitle="$9/month — basic features"
      selection={{ type: "radio", checked: true, onChange: () => {}, name: "plan", value: "standard" }}
      selectionPosition="left"
    />
  ),
};

// ── With Radio (Right) ────────────────────────────────────────────────────
/**
 * Radio button on the right side.
 */
export const WithRadioRight: Story = {
  name: "Radio: Right",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Pro Plan"
      subtitle="$29/month — all features"
      selection={{ type: "radio", checked: false, onChange: () => {}, name: "plan", value: "pro" }}
      selectionPosition="right"
    />
  ),
};

// ── Selection Align: Center ───────────────────────────────────────────────
/**
 * Checkbox vertically centered with the full item height.
 */
export const SelectionAlignCenter: Story = {
  name: "Selection Align: Center",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Team collaboration"
      subtitle="Share files, chat, and manage projects together with your team members"
      selection={{ type: "checkbox", checked: true, onChange: () => {} }}
      selectionAlign="center"
    />
  ),
};

// ── Selection Align: Title ────────────────────────────────────────────────
/**
 * Checkbox aligned with the title row (default). Good when subtitle is long.
 */
export const SelectionAlignTitle: Story = {
  name: "Selection Align: Title (default)",
  parameters: { controls: { disable: true } },
  render: () => (
    <ListItem
      title="Team collaboration"
      subtitle="Share files, chat, and manage projects together with your team members"
      selection={{ type: "checkbox", checked: true, onChange: () => {} }}
      selectionAlign="title"
    />
  ),
};

// ── Custom Hover Background ───────────────────────────────────────────────
/**
 * Custom hover colors: preset values ("primary-light", "secondary-light") or any CSS color string.
 */
export const CustomHoverBg: Story = {
  name: "Custom Hover Background",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-2)" }}>
      <ListItem title="Primary light hover" subtitle="hoverBg='primary-light'" hoverable hoverBg="primary-light" bordered={false} />
      <ListItem title="Secondary light hover" subtitle="hoverBg='secondary-light'" hoverable hoverBg="secondary-light" bordered={false} />
      <ListItem title="Custom pink hover" subtitle="hoverBg='#fdf2f8'" hoverable hoverBg="#fdf2f8" bordered={false} />
    </div>
  ),
};

// ── Custom Selected Background ────────────────────────────────────────────
/**
 * Custom selected background colors.
 */
export const CustomSelectedBg: Story = {
  name: "Custom Selected Background",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-2)" }}>
      <ListItem title="Default selected" subtitle="primary-200 (darker than hover)" selected bordered={false} />
      <ListItem title="Primary selected" subtitle="selectedBg='primary' (primary-200)" selected selectedBg="primary" bordered={false} />
      <ListItem title="Primary-light selected" subtitle="selectedBg='primary-light' (primary-100)" selected selectedBg="primary-light" bordered={false} />
      <ListItem title="Custom green selected" subtitle="selectedBg='#ecfdf5'" selected selectedBg="#ecfdf5" bordered={false} />
      <ListItem title="Custom purple selected" subtitle="selectedBg='var(--tui-color-brand-primary-100)'" selected selectedBg="var(--tui-color-brand-primary-100)" bordered={false} />
    </div>
  ),
};
