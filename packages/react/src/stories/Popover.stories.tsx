import type { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import { Popover } from "../components/Popover/Popover";
import { Button } from "../components/Button/Button";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],

  argTypes: {
    placement: {
      control: "select",
      options: [
        "auto",
        "top-start", "top-end",
        "bottom-start", "bottom-end",
        "left-start", "left-end",
        "right-start", "right-end",
      ],
      description: "Preferred placement relative to trigger",
      table: { category: "Position", defaultValue: { summary: "auto" } },
    },
    offset: {
      control: { type: "number", min: 0, max: 24, step: 2 },
      description: "Gap between trigger and popover (px)",
      table: { category: "Position", defaultValue: { summary: "4" } },
    },
    closeOnOutsideClick: {
      control: "boolean",
      description: "Close when clicking outside the popover",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },
    closeOnEscape: {
      control: "boolean",
      description: "Close when pressing Escape key",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },
    zIndex: {
      control: { type: "number", min: 1, max: 9999 },
      description: "Custom z-index for the popover portal",
      table: { category: "Position" },
    },
    isOpen: {
      control: "boolean",
      description: "Whether the popover is visible",
      table: { category: "State" },
    },
  },

  args: {
    placement: "bottom-start",
    offset: 4,
    closeOnOutsideClick: true,
    closeOnEscape: true,
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ── Helper: Popover content panel ──────────────────────────────────────────
const PopoverContent = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      padding: "var(--tui-spacing-4)",
      background: "var(--tui-color-white)",
      border: "1px solid var(--tui-color-brand-black-200)",
      borderRadius: "var(--tui-radius-lg)",
      boxShadow: "var(--tui-shadow-lg)",
      minWidth: 200,
      fontSize: "var(--tui-font-size-sm)",
      color: "var(--tui-color-brand-black-900)",
    }}
  >
    {children || (
      <>
        <p style={{ margin: 0, fontWeight: "var(--tui-font-weight-semibold)" }}>Popover Title</p>
        <p style={{ margin: "var(--tui-spacing-2) 0 0", color: "var(--tui-color-brand-gray-600)" }}>
          This is popover content. Click outside or press Escape to close.
        </p>
      </>
    )}
  </div>
);

// ── Playground ────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-16)", display: "flex", justifyContent: "center" }}>
        <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close Popover" : "Open Popover"}
        </Button>
        <Popover
          triggerRef={triggerRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement={args.placement}
          offset={args.offset}
          closeOnOutsideClick={args.closeOnOutsideClick}
          closeOnEscape={args.closeOnEscape}
          zIndex={args.zIndex}
        >
          <PopoverContent />
        </Popover>
      </div>
    );
  },
};

// ── Placements ────────────────────────────────────────────────────────────
export const Placements: Story = {
  name: "Placements",
  parameters: { controls: { disable: true } },
  render: () => {
    const placements = [
      "top-start", "top-end",
      "bottom-start", "bottom-end",
      "left-start", "left-end",
      "right-start", "right-end",
    ] as const;

    const PopoverWithPlacement = ({ placement }: { placement: typeof placements[number] }) => {
      const ref = useRef<HTMLButtonElement>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button ref={ref} size="sm" variant="outline" onClick={() => setOpen(!open)}>
            {placement}
          </Button>
          <Popover triggerRef={ref} isOpen={open} onClose={() => setOpen(false)} placement={placement} offset={6}>
            <PopoverContent>
              <p style={{ margin: 0, fontSize: "var(--tui-font-size-xs)" }}>
                Placement: <strong>{placement}</strong>
              </p>
            </PopoverContent>
          </Popover>
        </>
      );
    };

    return (
      <div style={{ padding: "var(--tui-spacing-20)", display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap", justifyContent: "center" }}>
        {placements.map((p) => (
          <PopoverWithPlacement key={p} placement={p} />
        ))}
      </div>
    );
  },
};

// ── With Form Content ─────────────────────────────────────────────────────
export const WithFormContent: Story = {
  name: "With Form Content",
  parameters: { controls: { disable: true } },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-16)", display: "flex", justifyContent: "center" }}>
        <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)} intent="primary">
          Edit Profile
        </Button>
        <Popover triggerRef={triggerRef} isOpen={isOpen} onClose={() => setIsOpen(false)} placement="bottom-start" offset={8}>
          <div
            style={{
              padding: "var(--tui-spacing-4)",
              background: "var(--tui-color-white)",
              border: "1px solid var(--tui-color-brand-black-200)",
              borderRadius: "var(--tui-radius-lg)",
              boxShadow: "var(--tui-shadow-lg)",
              width: 260,
            }}
          >
            <p style={{ margin: "0 0 var(--tui-spacing-3)", fontWeight: "var(--tui-font-weight-semibold)", fontSize: "var(--tui-font-size-sm)" }}>
              Edit Name
            </p>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "var(--tui-spacing-2) var(--tui-spacing-3)",
                border: "1px solid var(--tui-color-brand-black-200)",
                borderRadius: "var(--tui-radius-md)",
                fontSize: "var(--tui-font-size-sm)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "var(--tui-spacing-2)", marginTop: "var(--tui-spacing-3)", justifyContent: "flex-end" }}>
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button size="sm" intent="primary" onClick={() => setIsOpen(false)}>Save</Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  },
};

// ── Controlled (No Auto-Close) ────────────────────────────────────────────
export const Controlled: Story = {
  name: "Controlled (No Auto-Close)",
  parameters: { controls: { disable: true } },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-16)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--tui-spacing-3)" }}>
        <p style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-brand-gray-500)", margin: 0 }}>
          Outside click & Escape are disabled. Use the button to toggle.
        </p>
        <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)} variant="outline">
          Toggle Popover
        </Button>
        <Popover
          triggerRef={triggerRef}
          isOpen={isOpen}
          closeOnOutsideClick={false}
          closeOnEscape={false}
          placement="bottom-start"
          offset={8}
        >
          <PopoverContent>
            <p style={{ margin: 0 }}>
              This popover won't close on outside click or Escape. Toggle the button to dismiss.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-16)", display: "flex", justifyContent: "center" }}>
        <style>{`
          .my-custom-popover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
            font-size: 14px;
          }
        `}</style>
        <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
          Custom Styled Popover
        </Button>
        <Popover
          triggerRef={triggerRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="my-custom-popover"
          placement="bottom-start"
        >
          <p style={{ margin: 0 }}>Fully custom styled via className only.</p>
        </Popover>
      </div>
    );
  },
};
