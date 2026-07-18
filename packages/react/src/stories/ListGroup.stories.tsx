import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { ListGroup } from "../components/ListGroup/ListGroup";
import { ListItem } from "../components/ListItem/ListItem";
import type { Intent, Size } from "../types";

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 5l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 7.5L8 3l5.5 4.5v5a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1v-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6.5 13.5v-4h3v4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 2.25v1.25M8 12.5v1.25M13.75 8H12.5M3.5 8H2.25M12.07 3.93l-.88.88M4.81 11.19l-.88.88M12.07 12.07l-.88-.88M4.81 4.81l-.88-.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.25 14 13H2L8 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 6v3M8 11.25v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="3.5" cy="8" r="1" /><circle cx="8" cy="8" r="1" /><circle cx="12.5" cy="8" r="1" />
  </svg>
);

type ListItemData = {
  id: string;
  title: string;
  subtitle?: string;
  intent?: Intent;
  size?: Size;
  selected?: boolean;
  disabled?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
};

const accountItems: ListItemData[] = [
  { id: "profile", title: "Profile", subtitle: "Update your personal information", intent: "primary", hoverable: true },
  { id: "notifications", title: "Notifications", subtitle: "Manage email and push notifications", intent: "primary", hoverable: true },
  { id: "security", title: "Security", subtitle: "Password and sign-in options", intent: "primary", hoverable: true },
];

const stateItems: ListItemData[] = [
  { id: "normal", title: "Normal item", subtitle: "Available for interaction", hoverable: true },
  { id: "selected", title: "Selected item", subtitle: "Uses the intent selected background", selected: true },
  { id: "disabled", title: "Disabled item", subtitle: "Not available for interaction", disabled: true },
];

const ghostItems: ListItemData[] = [
  { id: "ghost-profile", title: "Profile", subtitle: "Loading profile details" },
  { id: "ghost-settings", title: "Settings", subtitle: "Loading account settings" },
];

function renderListItems(items: ListItemData[]) {
  return items.map(({ id, ...item }) => <ListItem key={id} {...item} />);
}

const meta: Meta<typeof ListGroup> = {
  title: "Components/ListGroup",
  component: ListGroup,
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: "text",
      description: "Optional ReactNode rendered above the ListItem children; null, false, or an empty string hides the section",
      table: { category: "Content" },
    },
    footer: {
      control: "text",
      description: "Optional ReactNode rendered below the ListItem children; null, false, or an empty string hides the section",
      table: { category: "Content" },
    },
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"],
      description: "Intent color for the group border and header/footer separators",
      table: { category: "Appearance", defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Controls group/header spacing; inherited ListItem rows map xs/sm→xs, md→sm, lg→md, and xl→lg. Explicit item sizes are preserved.",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    separators: {
      control: "boolean",
      description: "Render separators between ListItem children unless overridden on an item",
      table: { category: "Appearance", defaultValue: { summary: "true" } },
    },
    radiusSize: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "Base wrapper radius preset; accepts custom CSS values such as 12px",
      table: { category: "Appearance", defaultValue: { summary: "lg" } },
    },
    radiusTop: {
      control: "text",
      description: "Custom or preset top-left/top-right radius; defaults to radiusSize",
      table: { category: "Appearance" },
    },
    radiusBottom: {
      control: "text",
      description: "Custom or preset bottom-left/bottom-right radius; defaults to radiusSize",
      table: { category: "Appearance" },
    },
    bordered: {
      control: "boolean",
      description: "Render an outer border independently from the rounded wrapper",
      table: { category: "Appearance", defaultValue: { summary: "true" } },
    },
    children: {
      control: false,
      description: "ListItem elements rendered in the group; use items for JSON-driven rendering",
      table: { category: "Content" },
    },
    items: {
      control: false,
      description: "JSON-friendly ListItem definitions rendered when children are not provided",
      table: { category: "Content" },
    },
    selection: {
      control: "select",
      options: [undefined, "radio", "checkbox"],
      description: "Add a shared radio or checkbox selection control to the group",
      table: { category: "Selection" },
    },
    isCheckbox: {
      control: "boolean",
      description: "Shortcut for selection=\"checkbox\"",
      table: { category: "Selection", defaultValue: { summary: "false" } },
    },
    selectionPosition: {
      control: "select",
      options: ["left", "right", "start", "end"],
      description: "Position of group-managed checkbox/radio controls",
      table: { category: "Selection", defaultValue: { summary: "left" } },
    },
    selectionAlign: {
      control: "select",
      options: ["title", "center"],
      description: "Vertical alignment of group-managed checkbox/radio controls",
      table: { category: "Selection", defaultValue: { summary: "title" } },
    },
    value: {
      control: "text",
      description: "Controlled selected value for radio mode",
      table: { category: "Selection" },
    },
    values: {
      control: false,
      description: "Controlled selected values for checkbox mode",
      table: { category: "Selection" },
    },
    onValueChange: { action: "value changed", table: { category: "Selection" } },
    onValuesChange: { action: "values changed", table: { category: "Selection" } },
  },
  args: {
    header: "Account settings",
    footer: "3 items",
    intent: "default",
    size: "md",
    separators: true,
    rounded: true,
    radiusSize: "lg",
    bordered: true,
  },
};

export default meta;
type Story = StoryObj<typeof ListGroup>;

export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <ListGroup {...args}>
        {renderListItems(accountItems.map((item) => ({ ...item, intent: args.intent })))}
      </ListGroup>
    </div>
  ),
};

export const JSONData: Story = {
  name: "JSON Data",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <ListGroup header="Account settings" footer={`${accountItems.length} items`} intent="primary">
        {renderListItems(accountItems)}
      </ListGroup>
    </div>
  ),
};

export const CheckboxVariants: Story = {
  name: "Checkbox Variants",
  parameters: { controls: { disable: true } },
  render: () => {
    const checkboxItems = [
      { id: "email", title: "Email notifications", subtitle: "Receive updates by email", position: "left", align: "title", checked: true },
      { id: "push", title: "Push notifications", subtitle: "Receive alerts on your device", position: "right", align: "title", checked: false },
      { id: "marketing", title: "Marketing preferences", subtitle: "Longer content demonstrates centered alignment", position: "left", align: "center", checked: true },
    ] as const;
    const [checked, setChecked] = useState<Record<string, boolean>>(
      Object.fromEntries(checkboxItems.map((item) => [item.id, item.checked])),
    );

    return (
      <div style={{ maxWidth: 560 }}>
        <ListGroup header="Notification preferences" footer="Checkbox selection" intent="primary">
          {checkboxItems.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              intent="primary"
              hoverable
              selectionPosition={item.position}
              selectionAlign={item.align}
              selection={{
                type: "checkbox",
                checked: checked[item.id],
                onChange: (value) => setChecked((current) => ({ ...current, [item.id]: value })),
              }}
            />
          ))}
        </ListGroup>
      </div>
    );
  },
};

export const RadioVariants: Story = {
  name: "Radio Variants",
  parameters: { controls: { disable: true } },
  render: () => {
    const radioItems = [
      { id: "standard", title: "Standard plan", subtitle: "$9/month", position: "left" },
      { id: "pro", title: "Pro plan", subtitle: "$29/month", position: "right" },
      { id: "enterprise", title: "Enterprise plan", subtitle: "Custom pricing and support", position: "left" },
    ] as const;
    const [selectedPlan, setSelectedPlan] = useState("pro");

    return (
      <div style={{ maxWidth: 560 }}>
        <ListGroup header="Choose a plan" footer={`Selected: ${selectedPlan}`} intent="secondary">
          {radioItems.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              intent="secondary"
              hoverable
              selectionPosition={item.position}
              selection={{
                type: "radio",
                name: "list-group-plan",
                value: item.id,
                checked: selectedPlan === item.id,
                onChange: () => setSelectedPlan(item.id),
              }}
            />
          ))}
        </ListGroup>
      </div>
    );
  },
};

export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(240px, 1fr))", gap: "var(--tui-spacing-3)", maxWidth: 760 }}>
        {sizes.map((size) => (
          <ListGroup key={size} size={size} header={`Group size: ${size}`} intent="tertiary">
            <ListItem title="First item" subtitle="Rows use the compact mapped ListItem size" hoverable />
            <ListItem title="Second item" subtitle="Explicit ListItem size can still override it" hoverable size={size === "xl" ? "xl" : undefined} />
          </ListGroup>
        ))}
      </div>
    );
  },
};

export const NoHeaderNoFooter: Story = {
  name: "No Header / No Footer",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup intent="primary" rounded bordered>
        <ListItem title="Profile" subtitle="The wrapper keeps its radius without header or footer" hoverable />
        <ListItem title="Security" subtitle="Separators are managed by ListGroup" hoverable />
        <ListItem title="Sessions" subtitle="The final item has no trailing separator" hoverable />
      </ListGroup>
    </div>
  ),
};

export const RoundedWithoutBorder: Story = {
  name: "Rounded Without Border",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup header="Rounded surface" rounded bordered={false} intent="secondary">
        <ListItem title="No outer border" subtitle="The radius and surface remain available" hoverable />
        <ListItem title="Still separated" subtitle="ListItem separators remain enabled" hoverable />
      </ListGroup>
    </div>
  ),
};

export const RadiusVariants: Story = {
  name: "Radius Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(160px, 1fr))", gap: "var(--tui-spacing-3)" }}>
      {(["none", "sm", "lg", "full"] as const).map((radius) => (
        <ListGroup key={radius} radiusSize={radius} header={radius} intent="primary">
          <ListItem title="Top item" hoverable />
          <ListItem title="Bottom item" hoverable />
        </ListGroup>
      ))}
    </div>
  ),
};

export const CustomTopBottomRadius: Story = {
  name: "Custom Top / Bottom Radius",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup
        header="Custom radius values"
        radiusTop="var(--tui-radius-full)"
        radiusBottom="var(--tui-radius-sm)"
        intent="success"
      >
        <ListItem title="Large top radius" subtitle="Top corners use the custom value" hoverable />
        <ListItem title="Small bottom radius" subtitle="Bottom corners use the custom value" hoverable />
      </ListGroup>
    </div>
  ),
};

export const WithoutSeparators: Story = {
  name: "Without Separators",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup header="Compact actions" separators={false} intent="info">
        <ListItem title="Overview" subtitle="No bottom separator" hoverable />
        <ListItem title="Activity" subtitle="ListGroup controls the item separators" hoverable />
      </ListGroup>
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup header="ListItem states" intent="warning">
        {renderListItems(stateItems)}
      </ListGroup>
    </div>
  ),
};

export const Ghost: Story = {
  name: "Ghost",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup header="Loading list" footer="Please wait" intent="info">
        {ghostItems.map(({ id, ...item }) => <ListItem key={id} {...item} isGhost />)}
      </ListGroup>
    </div>
  ),
};

export const RichContent: Story = {
  name: "Rich Content",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup header={<strong>Workspace members</strong>} intent="success">
        <ListItem
          title="Alice Johnson"
          subtitle="Product Designer"
          titlePrefixIcon={<UserIcon />}
          subtitlePrefixIcon={<MailIcon />}
          rightSection={<Button size="sm" variant="outline" intent="success">View</Button>}
          intent="success"
          hoverable
        />
        <ListItem
          title="Bob Smith"
          subtitle="Engineering"
          titlePrefixIcon={<UserIcon />}
          titleSuffixIcon={<span aria-label="Verified"><CheckIcon /></span>}
          rightSection={<MoreIcon />}
          intent="success"
          hoverable
        />
      </ListGroup>
    </div>
  ),
};

export const CustomChildren: Story = {
  name: "Custom Children",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <ListGroup header="Custom ListItem layouts" intent="danger">
        <ListItem intent="danger" hoverable>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-3)", width: "100%" }}>
            <span aria-hidden="true"><AlertIcon /></span>
            <span style={{ flex: 1 }}>Custom content replaces title/subtitle layout</span>
            <strong>Action</strong>
          </div>
        </ListItem>
        <ListItem intent="danger" hoverable>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span>Any ReactNode can be rendered</span>
            <span aria-hidden="true"><ArrowIcon /></span>
          </div>
        </ListItem>
      </ListGroup>
    </div>
  ),
};

export const SingleSelection: Story = {
  name: "Single Selection (Radio)",
  parameters: { controls: { disable: true } },
  render: () => {
    const options = [
      { id: "profile", value: "profile", title: "Profile", subtitle: "Personal information" },
      { id: "security", value: "security", title: "Security", subtitle: "Password and sign-in options" },
      { id: "billing", value: "billing", title: "Billing", subtitle: "Invoices and payment methods" },
    ];
    const [selected, setSelected] = useState("security");

    return (
      <div style={{ maxWidth: 560 }}>
        <ListGroup
          items={options}
          header="Account settings"
          footer={`Selected: ${selected}`}
          selection="radio"
          value={selected}
          onValueChange={setSelected}
          selectionPosition="end"
          selectionAlign="center"
          intent="primary"
        />
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  name: "Multiple Selection (Checkbox)",
  parameters: { controls: { disable: true } },
  render: () => {
    const options = [
      { id: "email", value: "email", title: "Email notifications", subtitle: "Product updates and alerts" },
      { id: "push", value: "push", title: "Push notifications", subtitle: "Alerts on your device" },
      { id: "marketing", value: "marketing", title: "Marketing messages", subtitle: "Tips, offers, and announcements" },
    ];
    const [selected, setSelected] = useState(["email"]);

    return (
      <div style={{ maxWidth: 560 }}>
        <ListGroup
          items={options}
          header="Notification preferences"
          footer={`${selected.length} selected`}
          isCheckbox
          values={selected}
          onValuesChange={setSelected}
          selectionPosition="start"
          selectionAlign="title"
          intent="secondary"
        />
      </div>
    );
  },
};

export const SelectionWithIcons: Story = {
  name: "Selection with Prefix / Suffix Icons",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selected, setSelected] = useState("settings");
    return (
      <div style={{ maxWidth: 560 }}>
        <ListGroup
          header="Navigation"
          selection="radio"
          value={selected}
          onValueChange={setSelected}
          selectionPosition="start"
          intent="tertiary"
        >
          <ListItem
            value="home"
            title="Home"
            subtitle="Your dashboard"
            titlePrefixIcon={<HomeIcon />}
            titleSuffixIcon={<CheckIcon />}
            subtitlePrefixIcon={<MailIcon />}
            hoverable
          />
          <ListItem
            value="settings"
            title="Settings"
            subtitle="Manage your preferences"
            titlePrefixIcon={<SettingsIcon />}
            subtitleSuffixIcon={<ArrowIcon />}
            hoverable
          />
        </ListGroup>
      </div>
    );
  },
};

export const HeaderAndFooter: Story = {
  name: "Header and Footer",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <ListGroup
        header={<strong>Workspace</strong>}
        footer={<span>Need help? Contact support.</span>}
        intent="primary"
      >
        <ListItem title="Projects" subtitle="Browse your active projects" intent="primary" />
        <ListItem title="Members" subtitle="Manage workspace members" intent="primary" />
        <ListItem title="Billing" subtitle="View invoices and payment methods" intent="primary" />
      </ListGroup>
    </div>
  ),
};

export const HeaderOnly: Story = {
  name: "Header Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <ListGroup header="Preferences" bordered={false}>
        <ListItem title="Language" subtitle="English (US)" />
        <ListItem title="Time zone" subtitle="UTC-05:00" />
      </ListGroup>
    </div>
  ),
};

export const FooterWithAction: Story = {
  name: "Footer with Action",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <ListGroup
        header="Team members"
        footer={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--tui-spacing-3)" }}>
            <span>Invite more teammates</span>
            <Button size="sm" intent="primary">Invite</Button>
          </div>
        }
        intent="secondary"
      >
        <ListItem title="Alice Johnson" subtitle="alice@company.com" intent="secondary" />
        <ListItem title="Bob Smith" subtitle="bob@company.com" intent="secondary" />
      </ListGroup>
    </div>
  ),
};

export const Intents: Story = {
  name: "Intents",
  parameters: { controls: { disable: true } },
  render: () => {
    const intents = ["default", "primary", "secondary", "tertiary", "success", "warning", "danger", "info", "teal", "orange", "rose", "indigo", "mint", "coal", "white", "black"] as const;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(240px, 1fr))", gap: "var(--tui-spacing-3)", maxWidth: 720 }}>
        {intents.map((intent) => (
          <ListGroup key={intent} intent={intent} header={intent} footer="Group footer">
            <ListItem title="First item" subtitle="Intent-colored separator" intent={intent} />
            <ListItem title="Second item" subtitle="ListItem content" intent={intent} />
          </ListGroup>
        ))}
      </div>
    );
  },
};

export const WithoutBorder: Story = {
  name: "Without Border",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <ListGroup header="Flat list" footer="End of list" bordered={false}>
        <ListItem title="Overview" hoverable />
        <ListItem title="Activity" hoverable />
        <ListItem title="Integrations" hoverable />
      </ListGroup>
    </div>
  ),
};

export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <style>{`.my-list-group { border: 2px dashed var(--tui-color-brand-primary-400); border-radius: var(--tui-radius-xl); background: var(--tui-color-brand-primary-50); padding: var(--tui-spacing-2); }`}</style>
      <div style={{ maxWidth: 520 }}>
        <ListGroup className="my-list-group">
          <ListItem title="Custom group" subtitle="Styled through className" />
          <ListItem title="No design props" subtitle="ListGroup works as a plain wrapper" />
        </ListGroup>
      </div>
    </>
  ),
};
