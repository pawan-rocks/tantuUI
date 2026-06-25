import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FormField } from "../components/FormField/FormField";
import { Input } from "../components/Input/Input";
import { Textarea } from "../components/Textarea/Textarea";
import { Select } from "../components/Select/Select";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],

  argTypes: {
    label: {
      control: "text",
      description: "Label text rendered above the children slot",
      table: { category: "Content" },
    },
    required: {
      control: "boolean",
      description: "Show asterisk after label",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
      table: { category: "Content" },
    },
    errorText: {
      control: "text",
      description: "Error text (replaces helperText when present)",
      table: { category: "Content" },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size passed to Label",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    htmlFor: {
      control: "text",
      description: "ID for label association",
      table: { category: "Accessibility" },
    },
  },

  args: {
    label: "Email",
    required: false,
    helperText: "",
    errorText: "",
    size: "md",
    disabled: false,
    htmlFor: "playground-input",
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <FormField {...args}>
        <Input id="playground-input" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

// ── With Helper Text ──────────────────────────────────────────────────────
export const WithHelperText: Story = {
  name: "WithHelperText",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Username" helperText="Must be 3-20 characters" htmlFor="helper-input">
        <Input id="helper-input" placeholder="Enter username" />
      </FormField>
    </div>
  ),
};

// ── With Error Text ───────────────────────────────────────────────────────
export const WithErrorText: Story = {
  name: "WithErrorText",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField
        label="Email"
        helperText="We'll never share your email"
        errorText="Please enter a valid email address"
        htmlFor="error-input"
      >
        <Input id="error-input" isInvalid defaultValue="not-an-email" />
      </FormField>
    </div>
  ),
};

// ── Required ──────────────────────────────────────────────────────────────
export const Required: Story = {
  name: "Required",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Full Name" required htmlFor="required-input">
        <Input id="required-input" placeholder="Jane Doe" />
      </FormField>
    </div>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: "Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Company" disabled helperText="This field cannot be edited" htmlFor="disabled-input">
        <Input id="disabled-input" disabled defaultValue="Acme Corp" />
      </FormField>
    </div>
  ),
};

// ── With Textarea ─────────────────────────────────────────────────────────
export const WithTextarea: Story = {
  name: "WithTextarea",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Bio" helperText="Tell us a bit about yourself" htmlFor="textarea-input">
        <Textarea id="textarea-input" placeholder="Write something..." autoResize />
      </FormField>
    </div>
  ),
};

// ── With Select ───────────────────────────────────────────────────────────
export const WithSelect: Story = {
  name: "WithSelect",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <FormField label="Country" required helperText="Select your country of residence" htmlFor="select-input">
        <Select id="select-input" placeholder="Choose a country">
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </Select>
      </FormField>
    </div>
  ),
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <style>{`
        .my-form-field { background: #f0f9ff; padding: 16px; border-radius: 12px; border: 1px dashed #0ea5e9; }
      `}</style>
      <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)", marginBottom: "var(--tui-spacing-3)" }}>
        Zero design props — only className + children. FormField as a plain wrapper.
      </p>
      <FormField className="my-form-field">
        <Input placeholder="Custom styled field" />
      </FormField>
    </div>
  ),
};
