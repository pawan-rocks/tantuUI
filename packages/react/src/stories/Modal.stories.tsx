import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalFooter } from "../components/Modal/Modal";
import { Button } from "../components/Button/Button";

// ── Meta ──────────────────────────────────────────────────────────────────
const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],

  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the modal is visible or hidden.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    placement: {
      control: "select",
      options: ["center", "left", "right", "top", "bottom", "fullscreen"],
      description:
        "Determines where the modal appears on screen. `center` is a classic dialog, `left`/`right` are side drawers, `top`/`bottom` are edge drawers, and `fullscreen` covers the entire viewport.",
      table: { category: "Layout", defaultValue: { summary: "center" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description:
        "Width preset for center-placed modals. Ignored for drawer/fullscreen placements. Use `width` prop to override.",
      table: { category: "Layout", defaultValue: { summary: "md" } },
    },
    width: {
      control: "text",
      description: "Custom width value (e.g. `600px`, `80vw`). Overrides the `size` preset.",
      table: { category: "Layout" },
    },
    height: {
      control: "text",
      description: "Custom height value (e.g. `400px`, `70vh`).",
      table: { category: "Layout" },
    },
    maxWidth: {
      control: "text",
      description: "Maximum width constraint for the modal panel.",
      table: { category: "Layout" },
    },
    maxHeight: {
      control: "text",
      description: "Maximum height constraint for the modal panel.",
      table: { category: "Layout" },
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "When `true`, clicking the dark overlay behind the modal will trigger `onClose`.",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },
    closeOnEscape: {
      control: "boolean",
      description: "When `true`, pressing the Escape key will trigger `onClose`.",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },
    showBackdrop: {
      control: "boolean",
      description: "Whether to render the semi-transparent dark overlay behind the modal.",
      table: { category: "Visual", defaultValue: { summary: "true" } },
    },
    animated: {
      control: "boolean",
      description: "Enables CSS entry animations (scale, slide) when the modal opens.",
      table: { category: "Visual", defaultValue: { summary: "true" } },
    },
    lockScroll: {
      control: "boolean",
      description: "Prevents body scrolling while the modal is open.",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },
    isGhost: {
      control: "boolean",
      description: "Renders a shimmer/skeleton placeholder instead of the modal content. Useful for loading states.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
  },

  args: {
    placement: "center",
    size: "md",
    closeOnBackdropClick: true,
    closeOnEscape: true,
    showBackdrop: true,
    animated: true,
    lockScroll: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ── Playground ────────────────────────────────────────────────────────────
/**
 * Interactive playground with all controls exposed.
 * Adjust placement, size, backdrop, animation, and other props in the controls panel.
 */
export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)} intent="primary">
          Open Modal
        </Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={
            <ModalHeader
              title="Modal Title"
              subtitle="This is a subtitle for extra context"
              onClose={() => setIsOpen(false)}
            />
          }
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button intent="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>
            This is the modal body content. You can place any content here — forms, text, images, or other components.
          </p>
        </Modal>
      </div>
    );
  },
};

// ── Center Modal ──────────────────────────────────────────────────────────
/**
 * Classic centered dialog with header, body, and footer.
 * Best for confirmations, alerts, and short-form content.
 * Closes on backdrop click or Escape by default.
 */
export const CenterModal: Story = {
  name: "Center Modal",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open Center Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="center"
          size="md"
          header={
            <ModalHeader
              title="Confirm Deletion"
              subtitle="This action is irreversible"
              onClose={() => setIsOpen(false)}
            />
          }
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button intent="danger" onClick={() => setIsOpen(false)}>Delete</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Are you sure you want to delete this item? This action cannot be undone.</p>
        </Modal>
      </div>
    );
  },
};

// ── Left Drawer ───────────────────────────────────────────────────────────
/**
 * Side drawer that slides in from the left edge.
 * Great for navigation menus, filters, or sidebars.
 * Default width is 380px — override with the `width` prop.
 */
export const LeftDrawer: Story = {
  name: "Left Drawer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="left"
          header={<ModalHeader title="Navigation" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <nav>
            {["Dashboard", "Projects", "Teams", "Settings", "Help"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "var(--tui-spacing-3) var(--tui-spacing-4)",
                  borderRadius: "var(--tui-radius-md)",
                  cursor: "pointer",
                  fontSize: "var(--tui-font-size-sm)",
                }}
              >
                {item}
              </div>
            ))}
          </nav>
        </Modal>
      </div>
    );
  },
};

// ── Right Drawer ──────────────────────────────────────────────────────────
/**
 * Side drawer that slides in from the right edge.
 * Ideal for detail panels, settings forms, or edit views.
 * Pass `width` to control the drawer width (default 380px).
 */
export const RightDrawer: Story = {
  name: "Right Drawer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="right"
          width="420px"
          header={
            <ModalHeader
              title="User Details"
              subtitle="View and edit profile"
              onClose={() => setIsOpen(false)}
            />
          }
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button intent="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
            </ModalFooter>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-4)" }}>
            <div>
              <label style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: "var(--tui-font-weight-medium)", display: "block", marginBottom: "var(--tui-spacing-1)" }}>Name</label>
              <input type="text" defaultValue="Jane Smith" style={{ width: "100%", padding: "var(--tui-spacing-2) var(--tui-spacing-3)", border: "1px solid var(--tui-color-brand-black-200)", borderRadius: "var(--tui-radius-md)", fontSize: "var(--tui-font-size-sm)", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "var(--tui-font-size-sm)", fontWeight: "var(--tui-font-weight-medium)", display: "block", marginBottom: "var(--tui-spacing-1)" }}>Email</label>
              <input type="email" defaultValue="jane@example.com" style={{ width: "100%", padding: "var(--tui-spacing-2) var(--tui-spacing-3)", border: "1px solid var(--tui-color-brand-black-200)", borderRadius: "var(--tui-radius-md)", fontSize: "var(--tui-font-size-sm)", boxSizing: "border-box" }} />
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

// ── Top Drawer ────────────────────────────────────────────────────────────
/**
 * Edge drawer that slides down from the top of the viewport.
 * Works well for notifications, banners, or quick actions.
 * Spans full width by default.
 */
export const TopDrawer: Story = {
  name: "Top Drawer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open Top Drawer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="top"
          header={<ModalHeader title="Notifications" onClose={() => setIsOpen(false)} />}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-3)" }}>
            {["New message from Alex", "Your build succeeded", "Deployment complete"].map((msg) => (
              <div
                key={msg}
                style={{
                  padding: "var(--tui-spacing-3)",
                  background: "var(--tui-color-brand-black-50)",
                  borderRadius: "var(--tui-radius-md)",
                  fontSize: "var(--tui-font-size-sm)",
                }}
              >
                {msg}
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  },
};

// ── Bottom Drawer ─────────────────────────────────────────────────────────
/**
 * Edge drawer that slides up from the bottom of the viewport.
 * Perfect for mobile-style share sheets, action menus, or contextual tools.
 * Spans full width, max-height 80vh.
 */
export const BottomDrawer: Story = {
  name: "Bottom Drawer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="bottom"
          header={<ModalHeader title="Share" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button variant="outline" fullWidth onClick={() => setIsOpen(false)}>Cancel</Button>
            </ModalFooter>
          }
        >
          <div style={{ display: "flex", gap: "var(--tui-spacing-4)", justifyContent: "center" }}>
            {["Twitter", "Facebook", "LinkedIn", "Email"].map((platform) => (
              <div
                key={platform}
                style={{
                  width: 56, height: 56,
                  borderRadius: "var(--tui-radius-full)",
                  background: "var(--tui-color-brand-black-100)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "var(--tui-font-size-xs)", cursor: "pointer",
                }}
              >
                {platform[0]}
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  },
};

// ── Fullscreen Modal ──────────────────────────────────────────────────────
/**
 * Covers the entire viewport with no border radius.
 * Use for immersive experiences like editors, media viewers, or onboarding flows.
 */
export const FullscreenModal: Story = {
  name: "Fullscreen",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open Fullscreen</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="fullscreen"
          header={
            <ModalHeader
              title="Full Screen Editor"
              subtitle="Edit your document"
              onClose={() => setIsOpen(false)}
            />
          }
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Discard</Button>
              <Button intent="primary" onClick={() => setIsOpen(false)}>Save</Button>
            </ModalFooter>
          }
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tui-color-brand-gray-400)" }}>
            <p>Full screen content area — great for editors, media viewers, or immersive experiences.</p>
          </div>
        </Modal>
      </div>
    );
  },
};

// ── Sizes Comparison ──────────────────────────────────────────────────────
/**
 * Demonstrates all five size presets side by side (xs, sm, md, lg, xl).
 * Sizes only apply to `placement="center"`. Use `width` prop for custom widths.
 */
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    return (
      <div style={{ padding: "var(--tui-spacing-8)", display: "flex", gap: "var(--tui-spacing-3)", flexWrap: "wrap" }}>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <React.Fragment key={size}>
            <Button size="sm" variant="outline" onClick={() => setOpenSize(size)}>
              Size: {size}
            </Button>
            <Modal
              isOpen={openSize === size}
              onClose={() => setOpenSize(null)}
              size={size}
              header={<ModalHeader title={`Size: ${size}`} onClose={() => setOpenSize(null)} />}
              footer={
                <ModalFooter>
                  <Button variant="outline" onClick={() => setOpenSize(null)}>Close</Button>
                </ModalFooter>
              }
            >
              <p style={{ margin: 0 }}>This modal uses the <strong>{size}</strong> size preset ({size === "xs" ? "320px" : size === "sm" ? "400px" : size === "md" ? "520px" : size === "lg" ? "680px" : "860px"} width).</p>
            </Modal>
          </React.Fragment>
        ))}
      </div>
    );
  },
};

// ── Custom Left Section (replaces title/subtitle) ─────────────────────────
/**
 * When `leftSection` is provided, it fully replaces the default title/subtitle.
 * Use this to render your own custom content (avatar, icon, breadcrumbs, etc.) in the left area.
 * Title and subtitle are ignored when leftSection is passed.
 */
export const CustomLeftSection: Story = {
  name: "Custom Left Section",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Custom Left Section</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          header={
            <ModalHeader
              leftSection={
                <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-3)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--tui-radius-full)", background: "var(--tui-color-brand-blue-100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--tui-font-size-sm)", fontWeight: "var(--tui-font-weight-bold)", color: "var(--tui-color-brand-blue-700)" }}>
                    JS
                  </div>
                  <div>
                    <div style={{ fontWeight: "var(--tui-font-weight-semibold)", fontSize: "var(--tui-font-size-base)" }}>Jane Smith</div>
                    <div style={{ fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-brand-gray-500)" }}>Product Designer</div>
                  </div>
                </div>
              }
              rightSection={
                <Button size="sm" variant="outline" intent="primary">Follow</Button>
              }
              onClose={() => setIsOpen(false)}
            />
          }
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>
            The left section contains a fully custom avatar + name layout. Title and subtitle props are not used here — the user controls everything in <code>leftSection</code>.
          </p>
        </Modal>
      </div>
    );
  },
};

// ── Custom Center Section ─────────────────────────────────────────────────
/**
 * The `centerSection` prop lets you inject any content into the header's center area.
 * Great for tabs, search bars, or segmented controls inside the header.
 * When centerSection is provided, title/subtitle won't render (left section is empty).
 */
export const CustomCenterSection: Story = {
  name: "Custom Center Section",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Custom Center</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          header={
            <ModalHeader
              centerSection={
                <div style={{ display: "flex", gap: "var(--tui-spacing-2)" }}>
                  {["General", "Permissions", "Billing"].map((tab) => (
                    <button
                      key={tab}
                      style={{
                        padding: "var(--tui-spacing-1) var(--tui-spacing-3)",
                        border: "1px solid var(--tui-color-brand-black-200)",
                        borderRadius: "var(--tui-radius-full)",
                        background: tab === "General" ? "var(--tui-color-brand-blue-50)" : "transparent",
                        color: tab === "General" ? "var(--tui-color-brand-blue-700)" : "inherit",
                        cursor: "pointer",
                        fontSize: "var(--tui-font-size-sm)",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              }
              onClose={() => setIsOpen(false)}
            />
          }
        >
          <p style={{ margin: 0 }}>The header center section shows custom tabs instead of a title/subtitle.</p>
        </Modal>
      </div>
    );
  },
};

// ── Right Section ─────────────────────────────────────────────────────────
/**
 * The `rightSection` prop renders content to the right of the center area, before the close icon.
 * Useful for action buttons, status badges, or toggles in the header.
 */
export const RightSection: Story = {
  name: "Right Section",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>With Right Section</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={
            <ModalHeader
              title="Settings"
              subtitle="Manage your preferences"
              rightSection={
                <span style={{ fontSize: "var(--tui-font-size-xs)", background: "var(--tui-color-success-100)", color: "var(--tui-color-success-700)", padding: "var(--tui-spacing-0_5) var(--tui-spacing-2)", borderRadius: "var(--tui-radius-full)" }}>
                  Saved
                </span>
              }
              onClose={() => setIsOpen(false)}
            />
          }
        >
          <p style={{ margin: 0 }}>The right section shows a "Saved" status badge next to the close icon.</p>
        </Modal>
      </div>
    );
  },
};

// ── No Close Icon ─────────────────────────────────────────────────────────
/**
 * Pass `showCloseIcon={false}` to hide the close button.
 * Combine with `closeOnBackdropClick={false}` and `closeOnEscape={false}` for mandatory modals
 * (e.g. terms acceptance, required actions).
 */
export const NoCloseIcon: Story = {
  name: "No Close Icon",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Mandatory Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnBackdropClick={false}
          closeOnEscape={false}
          showCloseIcon={false}
          header={<ModalHeader title="Terms & Conditions" />}
          footer={
            <ModalFooter>
              <Button intent="primary" onClick={() => setIsOpen(false)}>I Accept</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>
            Close icon is hidden and backdrop/escape are disabled. The only way to close is clicking "I Accept".
          </p>
        </Modal>
      </div>
    );
  },
};

// ── Custom Close Icon ─────────────────────────────────────────────────────
/**
 * Pass any ReactNode as `closeIcon` to replace the default X SVG.
 * Useful for custom icon libraries or emoji-based close indicators.
 */
export const CustomCloseIcon: Story = {
  name: "Custom Close Icon",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Custom Close Icon</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeIcon={<span style={{ fontSize: "18px", fontWeight: "bold" }}>✕</span>}
          header={
            <ModalHeader
              title="Custom Icon"
            />
          }
        >
          <p style={{ margin: 0 }}>This modal uses a custom text "✕" as the close icon instead of the default SVG.</p>
        </Modal>
      </div>
    );
  },
};

// ── Custom Width & Height ─────────────────────────────────────────────────
/**
 * Override the default size with explicit `width` and `height` props.
 * Accepts any valid CSS value (px, rem, vw, vh, %, etc.).
 * When `width` is set, the `size` prop is ignored.
 */
export const CustomDimensions: Story = {
  name: "Custom Width & Height",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Open 700×500 Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          width="700px"
          height="500px"
          header={<ModalHeader title="Custom Dimensions" subtitle="700px × 500px" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>This modal has explicit width (700px) and height (500px) set via props, overriding the default size presets.</p>
        </Modal>
      </div>
    );
  },
};

// ── No Header / No Footer ─────────────────────────────────────────────────
/**
 * Modal with no `header` or `footer` prop — just body content.
 * Useful for simple alerts, success messages, or lightweight popups.
 * Users can still close via backdrop click or Escape key.
 */
export const NoHeaderNoFooter: Story = {
  name: "No Header / No Footer",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Minimal Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", margin: "0 0 var(--tui-spacing-2)" }}>
              🎉 Success!
            </p>
            <p style={{ margin: "0 0 var(--tui-spacing-4)", color: "var(--tui-color-brand-gray-600)" }}>
              Your changes have been saved.
            </p>
            <Button intent="primary" onClick={() => setIsOpen(false)}>Done</Button>
          </div>
        </Modal>
      </div>
    );
  },
};

// ── Custom Class Only ─────────────────────────────────────────────────────
/**
 * Demonstrates using the Modal with ZERO design props — only `className`.
 * Shows that the component works as a plain container and styles can be fully overridden via CSS.
 */
export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <style>{`
          .my-custom-modal {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
          }
          .my-custom-modal .tui-modal__body {
            color: white;
          }
        `}</style>
        <Button onClick={() => setIsOpen(true)}>Custom Styled Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="my-custom-modal"
          size="sm"
        >
          <p style={{ margin: 0, textAlign: "center" }}>
            Fully custom styled via className only. No design props used.
          </p>
          <div style={{ textAlign: "center", marginTop: "var(--tui-spacing-4)" }}>
            <Button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  },
};

// ── Content Height Control ────────────────────────────────────────────────
/**
 * Use `contentHeight`, `contentMinHeight`, and `contentMaxHeight` to control
 * the body/content section independently from the modal's overall dimensions.
 * The body section becomes scrollable when content overflows its constrained height.
 */
export const ContentHeightControl: Story = {
  name: "Content Height Control",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Fixed Content Height (200px)</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          contentHeight="200px"
          header={<ModalHeader title="Scrollable Content" subtitle="Content area is fixed at 200px" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: "0 0 var(--tui-spacing-2)", fontSize: "var(--tui-font-size-sm)" }}>
              Line {i + 1}: This is scrollable content inside a fixed-height body section.
            </p>
          ))}
        </Modal>
      </div>
    );
  },
};

// ── Content Min Height ────────────────────────────────────────────────────
/**
 * Use `contentMinHeight` to ensure the body section never collapses below a certain height,
 * even when content is minimal. Good for consistent visual appearance.
 */
export const ContentMinHeight: Story = {
  name: "Content Min Height",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Min Height 300px</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          contentMinHeight="300px"
          header={<ModalHeader title="Min Height Body" subtitle="Body has minHeight of 300px" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button intent="primary" onClick={() => setIsOpen(false)}>OK</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Short content, but the body area maintains at least 300px height.</p>
        </Modal>
      </div>
    );
  },
};

// ══════════════════════════════════════════════════════════════════════════
// ModalHeader Examples
// ══════════════════════════════════════════════════════════════════════════

// ── Header: Title Only ────────────────────────────────────────────────────
/**
 * Simplest header — just a title and the default close icon.
 * Title renders in the left section automatically.
 */
export const HeaderTitleOnly: Story = {
  name: "Header: Title Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Title Only Header</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<ModalHeader title="Simple Title" onClose={() => setIsOpen(false)} />}
        >
          <p style={{ margin: 0 }}>Header with just a title and close icon.</p>
        </Modal>
      </div>
    );
  },
};

// ── Header: Title + Subtitle ──────────────────────────────────────────────
/**
 * Title and subtitle both render left-aligned in the header's left section.
 * Subtitle provides secondary context below the title.
 */
export const HeaderTitleSubtitle: Story = {
  name: "Header: Title + Subtitle",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Title + Subtitle</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={
            <ModalHeader
              title="Project Settings"
              subtitle="Configure your project preferences"
              onClose={() => setIsOpen(false)}
            />
          }
        >
          <p style={{ margin: 0 }}>Header shows title with a descriptive subtitle below it.</p>
        </Modal>
      </div>
    );
  },
};

// ── Header: All Sections ──────────────────────────────────────────────────
/**
 * Demonstrates all ModalHeader sections working together:
 * - `leftSection`: Custom avatar/icon (replaces title/subtitle)
 * - `centerSection`: Custom tabs/controls in the middle
 * - `rightSection`: Action buttons before close icon
 * - `closeIcon`: Custom close element
 */
export const HeaderAllSections: Story = {
  name: "Header: All Sections",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>All Header Sections</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          closeIcon={<span style={{ fontSize: "16px" }}>✕</span>}
          header={
            <ModalHeader
              leftSection={
                <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "var(--tui-radius-md)", background: "var(--tui-color-brand-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-brand-primary-700)" }}>📁</div>
                  <span style={{ fontWeight: "var(--tui-font-weight-semibold)", fontSize: "var(--tui-font-size-sm)" }}>My Project</span>
                </div>
              }
              centerSection={
                <div style={{ display: "flex", gap: "var(--tui-spacing-1)" }}>
                  {["Code", "Issues", "PRs"].map((tab) => (
                    <button key={tab} style={{ padding: "var(--tui-spacing-1) var(--tui-spacing-2)", border: "none", borderRadius: "var(--tui-radius-sm)", background: tab === "Code" ? "var(--tui-color-brand-black-100)" : "transparent", cursor: "pointer", fontSize: "var(--tui-font-size-xs)" }}>
                      {tab}
                    </button>
                  ))}
                </div>
              }
              rightSection={
                <Button size="sm" variant="soft" intent="primary">New File</Button>
              }
            />
          }
        >
          <p style={{ margin: 0 }}>All header sections: left (icon + name), center (tabs), right (button), and custom close icon at top-right corner.</p>
        </Modal>
      </div>
    );
  },
};

// ── Header: Children ──────────────────────────────────────────────────────
/**
 * ModalHeader accepts `children` which render inside the center section.
 * Use this to add extra content (progress bars, descriptions) below the tabs/title.
 */
export const HeaderWithChildren: Story = {
  name: "Header: With Children",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Header with Children</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={
            <ModalHeader title="Upload Progress" onClose={() => setIsOpen(false)}>
              <div style={{ width: "100%", height: 4, background: "var(--tui-color-brand-black-100)", borderRadius: "var(--tui-radius-full)", marginTop: "var(--tui-spacing-2)", overflow: "hidden" }}>
                <div style={{ width: "65%", height: "100%", background: "var(--tui-color-brand-blue-500)", borderRadius: "var(--tui-radius-full)" }} />
              </div>
            </ModalHeader>
          }
        >
          <p style={{ margin: 0 }}>The header includes a progress bar as children content below the title.</p>
        </Modal>
      </div>
    );
  },
};

// ══════════════════════════════════════════════════════════════════════════
// ModalFooter Examples
// ══════════════════════════════════════════════════════════════════════════

// ── Footer: Right-Aligned Actions ─────────────────────────────────────────
/**
 * Default footer layout — buttons are right-aligned using `justify-content: flex-end`.
 * Standard pattern for confirm/cancel actions.
 */
export const FooterRightAligned: Story = {
  name: "Footer: Right-Aligned",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Right-Aligned Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<ModalHeader title="Standard Footer" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button intent="primary" onClick={() => setIsOpen(false)}>Save</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Footer with right-aligned Cancel and Save buttons.</p>
        </Modal>
      </div>
    );
  },
};

// ── Footer: Space Between ─────────────────────────────────────────────────
/**
 * Override footer layout with `style` to space items apart.
 * Great for "Delete" on the left and "Save/Cancel" on the right.
 */
export const FooterSpaceBetween: Story = {
  name: "Footer: Space Between",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Space Between Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<ModalHeader title="Edit Item" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter style={{ justifyContent: "space-between" }}>
              <Button intent="danger" variant="outline" onClick={() => setIsOpen(false)}>Delete</Button>
              <div style={{ display: "flex", gap: "var(--tui-spacing-3)" }}>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button intent="primary" onClick={() => setIsOpen(false)}>Update</Button>
              </div>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Footer with "Delete" on the left and "Cancel/Update" on the right using space-between layout.</p>
        </Modal>
      </div>
    );
  },
};

// ── Footer: Full Width Button ─────────────────────────────────────────────
/**
 * A single full-width button in the footer.
 * Common in mobile-style bottom drawers or single-action modals.
 */
export const FooterFullWidthButton: Story = {
  name: "Footer: Full Width Button",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Full Width Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="sm"
          header={<ModalHeader title="Confirm Action" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter>
              <Button intent="primary" fullWidth onClick={() => setIsOpen(false)}>Confirm & Continue</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>A single full-width action button in the footer for simple flows.</p>
        </Modal>
      </div>
    );
  },
};

// ── Footer: With Helper Text ──────────────────────────────────────────────
/**
 * Footer can contain any content — not just buttons.
 * Add helper text, links, or status indicators alongside actions.
 */
export const FooterWithHelperText: Story = {
  name: "Footer: With Helper Text",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Footer with Text</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<ModalHeader title="Publish Article" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter style={{ justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-brand-gray-500)" }}>
                Last saved 2 minutes ago
              </span>
              <div style={{ display: "flex", gap: "var(--tui-spacing-3)" }}>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Save Draft</Button>
                <Button intent="primary" onClick={() => setIsOpen(false)}>Publish</Button>
              </div>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Footer includes helper text ("Last saved...") on the left and actions on the right.</p>
        </Modal>
      </div>
    );
  },
};

// ── Footer: Custom Styled ─────────────────────────────────────────────────
/**
 * Apply custom `className` or `style` to ModalFooter for unique layouts.
 * ModalFooter accepts all standard HTML attributes.
 */
export const FooterCustomStyled: Story = {
  name: "Footer: Custom Styled",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <style>{`
          .my-custom-footer {
            background: var(--tui-color-brand-black-50);
            border-top: 2px solid var(--tui-color-brand-blue-200);
            justify-content: center;
          }
        `}</style>
        <Button onClick={() => setIsOpen(true)}>Custom Footer Style</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<ModalHeader title="Custom Footer" onClose={() => setIsOpen(false)} />}
          footer={
            <ModalFooter className="my-custom-footer">
              <Button intent="primary" onClick={() => setIsOpen(false)}>Got It</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Footer has a custom background, thicker blue border, and centered button via className override.</p>
        </Modal>
      </div>
    );
  },
};

// ── Left Drawer Custom Width ──────────────────────────────────────────────
/**
 * Pass `width` to override the default 380px on left/right drawers.
 * Here the left drawer is 800px wide.
 */
export const LeftDrawerCustomWidth: Story = {
  name: "Left Drawer: Custom Width (800px)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Left Drawer 800px</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="left"
          width="800px"
          header={<ModalHeader title="Wide Left Drawer" subtitle="width: 800px" />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>This left drawer uses <code>width="800px"</code> to override the default 380px.</p>
        </Modal>
      </div>
    );
  },
};

// ── Right Drawer Custom Width ─────────────────────────────────────────────
/**
 * Same approach for the right drawer — pass `width` to control the panel width.
 */
export const RightDrawerCustomWidth: Story = {
  name: "Right Drawer: Custom Width (800px)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Right Drawer 800px</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="right"
          width="800px"
          header={<ModalHeader title="Wide Right Drawer" subtitle="width: 800px" />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>This right drawer uses <code>width="800px"</code> to override the default 380px.</p>
        </Modal>
      </div>
    );
  },
};

// ── Top Drawer Custom Height ──────────────────────────────────────────────
/**
 * For top/bottom drawers, pass `height` to control the panel height.
 * Here the top drawer is 800px tall.
 */
export const TopDrawerCustomHeight: Story = {
  name: "Top Drawer: Custom Height (800px)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Top Drawer 800px</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="top"
          height="800px"
          header={<ModalHeader title="Tall Top Drawer" subtitle="height: 800px" />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>This top drawer uses <code>height="800px"</code> to override the default auto height.</p>
        </Modal>
      </div>
    );
  },
};

// ── Bottom Drawer Custom Height ───────────────────────────────────────────
/**
 * Same for the bottom drawer — use `height` to set a custom panel height.
 */
export const BottomDrawerCustomHeight: Story = {
  name: "Bottom Drawer: Custom Height (800px)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Bottom Drawer 800px</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="bottom"
          height="800px"
          header={<ModalHeader title="Tall Bottom Drawer" subtitle="height: 800px" />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>This bottom drawer uses <code>height="800px"</code> to override the default auto height.</p>
        </Modal>
      </div>
    );
  },
};

// ══════════════════════════════════════════════════════════════════════════
// Ghost / Skeleton Examples
// ══════════════════════════════════════════════════════════════════════════

// ── Full Ghost Modal ──────────────────────────────────────────────────────
/**
 * Full ghost mode on the Modal (`isGhost` on Modal).
 * Renders the real modal structure with shimmer lines in the body.
 * Header and footer can also be in ghost mode independently.
 * Close icon is always visible so the user can dismiss the loading state.
 */
export const FullGhostModal: Story = {
  name: "Ghost: Full Modal",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Full Ghost Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isGhost
          size="md"
          header={<ModalHeader isGhost testId="ghost-header" />}
          footer={<ModalFooter isGhost />}
        >
          Loading content...
        </Modal>
      </div>
    );
  },
};

// ── Ghost Header Only ─────────────────────────────────────────────────────
/**
 * Only the header is in ghost/loading state.
 * Body and footer render normally. Useful when header data is loading.
 */
export const GhostHeaderOnly: Story = {
  name: "Ghost: Header Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Ghost Header</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={<ModalHeader isGhost />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button intent="primary" onClick={() => setIsOpen(false)}>OK</Button>
            </ModalFooter>
          }
        >
          <p style={{ margin: 0 }}>Body content is loaded, but the header is still in a loading/shimmer state.</p>
        </Modal>
      </div>
    );
  },
};

// ── Ghost Header: Title Only ──────────────────────────────────────────────
/**
 * Ghost header with only `title` passed — shimmer auto-sizes to title text width.
 */
export const GhostHeaderTitleOnly: Story = {
  name: "Ghost: Header Title Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Ghost Title Only</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={<ModalHeader isGhost title="Project Settings" />}
        >
          <p style={{ margin: 0 }}>Header ghost shows one shimmer line matching "Project Settings" width.</p>
        </Modal>
      </div>
    );
  },
};

// ── Ghost Header: Subtitle Only ───────────────────────────────────────────
/**
 * Ghost header with only `subtitle` passed — shimmer auto-sizes to subtitle text width.
 */
export const GhostHeaderSubtitleOnly: Story = {
  name: "Ghost: Header Subtitle Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Ghost Subtitle Only</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={<ModalHeader isGhost subtitle="Configure your preferences" />}
        >
          <p style={{ margin: 0 }}>Header ghost shows one shimmer line matching "Configure your preferences" width.</p>
        </Modal>
      </div>
    );
  },
};

// ── Ghost Header: Title + Subtitle ────────────────────────────────────────
/**
 * Ghost header with both `title` and `subtitle` passed — two shimmer lines, each auto-sized.
 */
export const GhostHeaderTitleAndSubtitle: Story = {
  name: "Ghost: Header Title + Subtitle",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Ghost Title + Subtitle</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={<ModalHeader isGhost title="Project Settings" subtitle="Configure your preferences" />}
        >
          <p style={{ margin: 0 }}>Header ghost shows two shimmer lines — title and subtitle — each auto-sized to content.</p>
        </Modal>
      </div>
    );
  },
};

// ── Ghost Footer Only ─────────────────────────────────────────────────────
/**
 * Only the footer is in ghost/loading state.
 * Useful when action buttons depend on async data (permissions, pricing, etc.).
 */
export const GhostFooterOnly: Story = {
  name: "Ghost: Footer Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Ghost Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          header={<ModalHeader title="Actions Loading" subtitle="Footer buttons are loading" />}
          footer={<ModalFooter isGhost />}
        >
          <p style={{ margin: 0 }}>Body and header are ready, but the footer actions are still loading.</p>
        </Modal>
      </div>
    );
  },
};

// ── Ghost Content Only ────────────────────────────────────────────────────
/**
 * Only the body/content is in ghost mode (`isGhost` on Modal).
 * Header and footer render normally. Close icon is visible.
 */
export const GhostContentOnly: Story = {
  name: "Ghost: Content Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "var(--tui-spacing-8)" }}>
        <Button onClick={() => setIsOpen(true)}>Ghost Content</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isGhost
          size="md"
          header={<ModalHeader title="User Profile" subtitle="Loading details..." />}
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          }
        >
          Content placeholder
        </Modal>
      </div>
    );
  },
};
