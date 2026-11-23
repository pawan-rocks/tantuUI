import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Stepper } from "../components/Stepper/Stepper";

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="m3.5 8 3 3 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 3h1.25l1.1 6.1a1 1 0 0 0 .98.82h6.24a1 1 0 0 0 .97-.76L13.5 5H4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <circle cx="6" cy="12.5" r=".8" fill="currentColor" />
    <circle cx="11.5" cy="12.5" r=".8" fill="currentColor" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
    <path d="M3.5 13c.5-2.2 1.9-3.25 4.5-3.25s4 .95 4.5 3.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" />
  </svg>
);

const steps = [
  { label: "Account", sublabel: "Your details" },
  { label: "Profile", sublabel: "Preferences" },
  { label: "Review", sublabel: "Confirm changes" },
];

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    steps: { control: false, description: "Steps with an optional step label, label, sublabel, icon, status, and disabled state", table: { category: "Content" } },
    orientation: { control: "select", options: ["horizontal", "vertical"], description: "Stepper layout direction", table: { category: "Layout", defaultValue: { summary: "horizontal" } } },
    verticalAlign: { control: "select", options: ["top", "center"], description: "Vertical content alignment relative to each circle", table: { category: "Layout", defaultValue: { summary: "top" } } },
    showStepLabel: { control: "boolean", description: "Show the small STEP 1 / STEP 2 eyebrow above each label", table: { category: "Content", defaultValue: { summary: "true" } } },
    showStatus: { control: "boolean", description: "Show Completed, In Progress, or Pending status pills", table: { category: "Content", defaultValue: { summary: "true" } } },
    activeStep: { control: "number", description: "Zero-based index of the active step", table: { category: "State", defaultValue: { summary: "0" } } },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"], description: "Size of indicators and step typography", table: { category: "Appearance", defaultValue: { summary: "md" } } },
    intent: { control: "select", options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"], description: "Color intent for active and completed steps", table: { category: "Appearance", defaultValue: { summary: "default" } } },
    disabled: { control: "boolean", description: "Disable every step", table: { category: "State", defaultValue: { summary: "false" } } },
    isGhost: { control: "boolean", description: "Render token-driven loading placeholders", table: { category: "State", defaultValue: { summary: "false" } } },
    onStepChange: { action: "step changed", description: "Called with the clicked zero-based step index", table: { category: "Interaction" } },
  },
  args: { steps, orientation: "horizontal", verticalAlign: "top", showStepLabel: true, showStatus: true, activeStep: 1, size: "md", intent: "default", disabled: false, isGhost: false },
  parameters: {
    docs: {
      description: {
        component: "A token-driven stepper for showing progress through a sequence. Steps can display a number or icon, label, sublabel, active/completed states, and disabled states in horizontal or vertical layouts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {
  name: "⚡ Playground",
};

export const ClickableHover: Story = {
  name: "Clickable Hover (Circle Only)",
  parameters: {
    controls: { disable: true },
    docs: { description: { story: "Only the numbered or icon circle is the interactive target. Labels, sublabels, descriptions, and status pills remain non-clickable." } },
  },
  render: () => (
    <Stepper
      steps={[{ label: "Completed" }, { label: "Current" }, { label: "Pending" }]}
      activeStep={1}
      intent="primary"
      showStepLabel={false}
      showStatus={false}
      onStepChange={() => {}}
      aria-label="Hoverable steps"
    />
  ),
};

export const Horizontal: Story = {
  name: "Horizontal",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      steps={[
        { label: "Card Details" },
        { label: "Form Review" },
        { label: "Authenticate OTP", icon: <UserIcon /> },
        { label: "Create Code" },
      ]}
      activeStep={2}
      intent="primary"
      aria-label="Authentication progress"
    />
  ),
};

export const Vertical: Story = {
  name: "Vertical",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      steps={[
        { label: "Basic Details" },
        { label: "Company Details" },
        { label: "Subscription plan", icon: <CartIcon /> },
        { label: "Payment details", disabled: true },
      ]}
      orientation="vertical"
      activeStep={2}
      intent="primary"
      showStatus={false}
      onStepChange={() => {}}
      aria-label="Account progress"
    />
  ),
};

export const VerticalAlignment: Story = {
  name: "Vertical Alignment: Center",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      orientation="vertical"
      verticalAlign="center"
      activeStep={1}
      showStatus={false}
      steps={[
        { label: "Account", sublabel: "Long supporting description" },
        { label: "Preferences", sublabel: "Another supporting description" },
        { label: "Complete" },
      ]}
      aria-label="Center aligned vertical progress"
    />
  ),
};

export const VerticalWithDescriptions: Story = {
  name: "Vertical with Descriptions",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      steps={[
        { label: "Account", sublabel: "Enter your contact information", icon: <UserIcon /> },
        { label: "Verification", sublabel: "Confirm your email address", icon: <CheckIcon /> },
        { label: "Preferences", sublabel: "Choose your notification settings" },
        { label: "Complete", sublabel: "Review and finish" },
      ]}
      orientation="vertical"
      activeStep={1}
      intent="success"
      showStatus={false}
      aria-label="Detailed setup progress"
    />
  ),
};

export const VerticalInteractive: Story = {
  name: "Vertical Interactive (Circle Only)",
  parameters: {
    controls: { disable: true },
    docs: { description: { story: "In vertical mode, only each circle is a clickable target. Labels, sublabels, and descriptions remain outside the button." } },
  },
  render: () => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <Stepper
        steps={[
          { label: "Shipping", sublabel: "Address confirmed" },
          { label: "Payment", sublabel: "Choose a payment method" },
          { label: "Review", sublabel: "Check your order" },
          { label: "Complete", sublabel: "Order confirmation", disabled: true },
        ]}
        orientation="vertical"
        activeStep={activeStep}
        intent="primary"
        showStatus={false}
        onStepChange={setActiveStep}
        aria-label="Interactive vertical checkout progress"
      />
    );
  },
};

export const WithIcons: Story = {
  name: "With Icons",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      steps={[
        { label: "Cart", sublabel: "3 items", icon: <CartIcon /> },
        { label: "Details", sublabel: "Shipping address", icon: <UserIcon /> },
        { label: "Complete", sublabel: "Place order", icon: <CheckIcon /> },
      ]}
      activeStep={1}
      intent="success"
      aria-label="Order progress"
    />
  ),
};

export const IntentStates: Story = {
  name: "Intent States",
  parameters: {
    controls: { disable: true },
    docs: { description: { story: "Completed and active steps follow the selected intent. Pending steps keep the same neutral design across every intent." } },
  },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    return (
      <>
        {intents.map((intent) => (
          <div key={intent}>
            <span>{intent}</span>
            <Stepper
              steps={[{ label: "Completed" }, { label: "Current" }, { label: "Pending" }]}
              activeStep={1}
              intent={intent}
              aria-label={`${intent} stepper`}
            />
          </div>
        ))}
      </>
    );
  },
};

export const DarkMode: Story = {
  name: "Dark Mode",
  parameters: {
    controls: { disable: true },
    docs: { description: { story: "Uses the same dark intent contract as Button for the Stepper circle and connector. Toggle the Storybook theme toolbar and hover the enabled step circles; labels, sublabels, and descriptions remain stable." } },
  },
  render: () => (
    <Stepper
      steps={[
        { label: "Account", sublabel: "Completed" },
        { label: "Preferences", sublabel: "In progress" },
        { label: "Confirmation", sublabel: "Disabled", disabled: true },
      ]}
      activeStep={1}
      intent="primary"
      onStepChange={() => {}}
      aria-label="Dark mode stepper"
    />
  ),
};

export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      steps={[
        { label: "Plan", sublabel: "Selected" },
        { label: "Payment", sublabel: "Unavailable", disabled: true },
        { label: "Confirmation", sublabel: "Unavailable", disabled: true },
      ]}
      activeStep={0}
      onStepChange={() => {}}
      aria-label="Disabled checkout steps"
    />
  ),
};

export const NonClickable: Story = {
  name: "Non-Clickable",
  parameters: { controls: { disable: true } },
  render: () => (
    <Stepper
      steps={[
        { label: "Read-only step" },
        { label: "Current step" },
        { label: "Upcoming step" },
      ]}
      activeStep={1}
      intent="default"
      aria-label="Read-only progress"
    />
  ),
};

export const Interactive: Story = {
  name: "Interactive",
  parameters: { controls: { disable: true } },
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
      <Stepper
        steps={steps.map((step) => ({ ...step, onClick: () => setActiveStep(steps.indexOf(step)) }))}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        aria-label="Interactive setup progress"
      />
    );
  },
};

export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Stepper
          key={size}
          size={size}
          steps={[{ label: `Size ${size}` }, { label: "Next" }, { label: "Finish" }]}
          activeStep={1}
          showStepLabel={false}
          showStatus={false}
          onStepChange={() => {}}
          aria-label={`${size} stepper`}
        />
      ))}
    </>
  ),
};

export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => <Stepper steps={steps} orientation="horizontal" isGhost aria-label="Loading progress" />,
};

export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-stepper { border: var(--tui-border-width-1) solid var(--tui-color-info-200); border-radius: var(--tui-radius-lg); background: var(--tui-color-info-50); padding: var(--tui-spacing-4); color: var(--tui-color-info-700); }`}</style>
      <Stepper className="my-stepper">Custom styled stepper content</Stepper>
    </>
  ),
};
