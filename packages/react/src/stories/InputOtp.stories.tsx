import type { Meta, StoryObj } from "@storybook/react";
import { InputOtp } from "../components/InputOtp/InputOtp";

const meta: Meta<typeof InputOtp> = {
  title: "Components/InputOtp",
  component: InputOtp,
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 1, max: 12, step: 1 }, table: { category: "Content", defaultValue: { summary: "4" } } },
    min: { control: "number", description: "Minimum value passed to each Input", table: { category: "Validation" } },
    max: { control: "number", description: "Maximum value passed to each Input", table: { category: "Validation" } },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"], table: { category: "Appearance", defaultValue: { summary: "md" } } },
    variant: { control: "select", options: ["outline", "soft", "plain"], table: { category: "Appearance", defaultValue: { summary: "outline" } } },
    intent: { control: "select", options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"], table: { category: "Appearance", defaultValue: { summary: "default" } } },
    disabled: { control: "boolean", table: { category: "State" } },
    isInvalid: { control: "boolean", table: { category: "State" } },
    isGhost: { control: "boolean", table: { category: "State" } },
  },
  args: { length: 4, min: 0, max: 9, size: "md", variant: "outline", intent: "default", disabled: false, isInvalid: false, isGhost: false },
};

export default meta;
type Story = StoryObj<typeof InputOtp>;

export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => <InputOtp {...args} />,
};

export const Lengths: Story = {
  name: "Input Lengths",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
      <InputOtp length={4} aria-label="Four digit code" />
      <InputOtp length={6} aria-label="Six digit code" />
      <InputOtp length={8} aria-label="Eight digit code" />
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "var(--tui-spacing-4)" }}>
      <InputOtp defaultValue="12" aria-label="Default code" />
      <InputOtp defaultValue="12" isInvalid aria-label="Invalid code" />
      <InputOtp disabled defaultValue="12" aria-label="Disabled code" />
      <InputOtp isGhost aria-label="Loading code" />
    </div>
  ),
};

export const AllIntents: Story = {
  name: "All Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, max-content)", gap: "var(--tui-spacing-4)", alignItems: "center" }}>
        {intents.map((intent) => (
          <div key={intent} style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-1)" }}>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>{intent}</span>
            <InputOtp intent={intent} aria-label={`${intent} code`} />
          </div>
        ))}
      </div>
    );
  },
};

export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-custom-otp .tui-input-otp__cell { border-radius: var(--tui-radius-full); }`}</style>
      <InputOtp className="my-custom-otp" />
    </>
  ),
};
