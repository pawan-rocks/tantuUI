import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ExTable, Table, TableRow, TableCell, TableHeader, TableHeaderCell, TableBody } from "../components/Table/Table";
import type { TableColumn } from "../components/Table/Table";

// ── Icons ─────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 5l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Sample data ───────────────────────────────────────────────────────────────
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
}

const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", department: "Engineering" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", department: "Design" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive", department: "Marketing" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "Admin", status: "Active", department: "Engineering" },
  { id: "5", name: "Eve Davis", email: "eve@example.com", role: "Editor", status: "Pending", department: "Product" },
];

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<any> = {
  title: "Components/Table",
  component: ExTable,
  tags: ["autodocs"],
  argTypes: {
    rounded: { control: "boolean", description: "Rounded corners on wrapper", table: { category: "Appearance", defaultValue: { summary: "true" } } },
    bordered: { control: "boolean", description: "Outer border on wrapper", table: { category: "Appearance", defaultValue: { summary: "false" } } },
    striped: { control: "boolean", description: "Alternating row background", table: { category: "Appearance", defaultValue: { summary: "false" } } },
    hoverable: { control: "boolean", description: "Highlight rows on hover", table: { category: "Appearance", defaultValue: { summary: "false" } } },
    compact: { control: "boolean", description: "Reduced cell padding", table: { category: "Appearance", defaultValue: { summary: "false" } } },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Table size — affects padding and font size", table: { category: "Appearance", defaultValue: { summary: "md" } } },
    stickyHeader: { control: "boolean", description: "Header stays fixed on vertical scroll", table: { category: "Behavior", defaultValue: { summary: "false" } } },
    isGhost: { control: "boolean", description: "Show shimmer/skeleton for all body rows. Pass empty dataSource with this.", table: { category: "Ghost / Loading", defaultValue: { summary: "false" } } },
    ghostRowsCount: { control: { type: "number", min: 1, max: 20 }, description: "Number of ghost rows to display when isGhost is true", table: { category: "Ghost / Loading", defaultValue: { summary: "5" } } },
  },
  args: { rounded: true, bordered: true, striped: false, hoverable: true, compact: false, stickyHeader: false, size: "md", isGhost: false, ghostRowsCount: 5 },
  parameters: {
    docs: {
      description: {
        component: "Data-driven Table with columns + dataSource. Supports ghost/loading states, row selection, sorting, expandable rows, and sticky columns.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExTable>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ⚡ Playground
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Playground: Story = {
  name: "⚡ Playground",
  render: (args) => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name", minWidth: "140px" },
      { key: "email", title: "Email", dataIndex: "email", minWidth: "200px" },
      { key: "role", title: "Role", dataIndex: "role", width: "120px" },
      { key: "department", title: "Department", dataIndex: "department" },
      { key: "status", title: "Status", dataIndex: "status", align: "center" },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" {...args} />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Basic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Basic: Story = {
  name: "Table: Basic",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "department", title: "Department", dataIndex: "department" },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" bordered hoverable />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Sorting
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Sorting: Story = {
  name: "Table: Sorting",
  parameters: { controls: { disable: true } },
  render: () => {
    const [sortState, setSortState] = useState<{ columnKey: string; order: "asc" | "desc" } | null>(null);
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name", sorter: true },
      { key: "email", title: "Email", dataIndex: "email", sorter: true },
      { key: "role", title: "Role", dataIndex: "role", sorter: true },
      { key: "department", title: "Department", dataIndex: "department" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];
    return (
      <div>
        <p style={{ marginBottom: "var(--tui-spacing-3)", fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)" }}>
          Sort: {sortState ? `${sortState.columnKey} (${sortState.order})` : "none"} — click Name, Email, or Role to sort
        </p>
        <Table<User>
          columns={columns}
          dataSource={users}
          rowKey="id"
          bordered
          hoverable
          sortState={sortState}
          onSortChange={setSortState}
        />
      </div>
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Custom Render
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CustomRender: Story = {
  name: "Table: Custom Render",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      {
        key: "name", title: "Employee", dataIndex: "name",
        render: (name, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
            <UserIcon />
            <div>
              <div style={{ fontWeight: "var(--tui-font-weight-medium)" }}>{name}</div>
              <div style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{record.department}</div>
            </div>
          </div>
        ),
      },
      { key: "email", title: "Contact", dataIndex: "email" },
      {
        key: "status", title: "Status", dataIndex: "status", align: "center",
        render: (status) => (
          <span style={{
            display: "inline-block", padding: "var(--tui-spacing-0_5) var(--tui-spacing-2)",
            borderRadius: "var(--tui-radius-full)", fontSize: "var(--tui-font-size-xs)", fontWeight: "var(--tui-font-weight-medium)",
            background: status === "Active" ? "var(--tui-color-success-100)" : status === "Pending" ? "var(--tui-color-warning-100)" : "var(--tui-color-neutral-100)",
            color: status === "Active" ? "var(--tui-color-success-700)" : status === "Pending" ? "var(--tui-color-warning-700)" : "var(--tui-color-neutral-600)",
          }}>{status}</span>
        ),
      },
      {
        key: "action", title: "Action", align: "right",
        render: (_, record) => (
          <div style={{ display: "flex", gap: "var(--tui-spacing-2)", justifyContent: "flex-end" }}>
            <a href="#" style={{ color: "var(--tui-color-brand-blue-600)", fontSize: "var(--tui-font-size-xs)" }}>Edit</a>
            <a href="#" style={{ color: "var(--tui-color-danger-600)", fontSize: "var(--tui-font-size-xs)" }}>Delete</a>
          </div>
        ),
      },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" bordered />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Checkbox Selection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CheckboxSelectionSimple: Story = {
  name: "Table: Checkbox (title only)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "department", title: "Department", dataIndex: "department" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        hoverable
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    );
  },
};

export const CheckboxSelection: Story = {
  name: "Table: Checkbox (title + subtitle + extra)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const columns: TableColumn<User>[] = [
      {
        key: "name", title: "Employee", subtitle: "Name & dept", dataIndex: "name",
        render: (name, record) => (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-0_5)" }}>
            <span style={{ fontWeight: "var(--tui-font-weight-medium)" }}>{name}</span>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>{record.department}</span>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>ID: {record.id}</span>
          </div>
        ),
      },
      { key: "email", title: "Contact", subtitle: "Email", dataIndex: "email" },
      { key: "role", title: "Access", subtitle: "Role", extra: "Editable", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status", align: "center" },
    ];
    return (
      <div>
        <p style={{ marginBottom: "var(--tui-spacing-3)", fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)" }}>
          Selected: {selectedRows.length ? selectedRows.map((r) => r.name).join(", ") : "none"}
        </p>
        <Table<User>
          columns={columns}
          dataSource={users}
          rowKey="id"
          bordered
          hoverable
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: (keys, rows) => {
              setSelectedRowKeys(keys);
              setSelectedRows(rows);
            },
          }}
        />
      </div>
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Radio Selection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RadioSelectionSimple: Story = {
  name: "Table: Radio (title only)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        hoverable
        rowSelection={{
          type: "radio",
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    );
  },
};

export const RadioSelection: Story = {
  name: "Table: Radio (title + subtitle + extra)",
  parameters: { controls: { disable: true } },
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const columns: TableColumn<User>[] = [
      {
        key: "name", title: "Employee", subtitle: "Full details", dataIndex: "name",
        render: (name, record) => (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-0_5)" }}>
            <span style={{ fontWeight: "var(--tui-font-weight-medium)" }}>{name}</span>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-secondary)" }}>{record.email}</span>
            <span style={{ fontSize: "var(--tui-font-size-xs)", color: "var(--tui-color-text-tertiary)" }}>{record.department}</span>
          </div>
        ),
      },
      { key: "role", title: "Role", subtitle: "Permission", dataIndex: "role" },
      {
        key: "status", title: "Status", dataIndex: "status", align: "center",
        render: (status) => (
          <span style={{
            display: "inline-block", padding: "var(--tui-spacing-0_5) var(--tui-spacing-2)",
            borderRadius: "var(--tui-radius-full)", fontSize: "var(--tui-font-size-xs)", fontWeight: "var(--tui-font-weight-medium)",
            background: status === "Active" ? "var(--tui-color-success-100)" : status === "Pending" ? "var(--tui-color-warning-100)" : "var(--tui-color-neutral-100)",
            color: status === "Active" ? "var(--tui-color-success-700)" : status === "Pending" ? "var(--tui-color-warning-700)" : "var(--tui-color-neutral-600)",
          }}>{status}</span>
        ),
      },
    ];
    return (
      <div>
        <p style={{ marginBottom: "var(--tui-spacing-3)", fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)" }}>
          Selected: {selectedRows.length ? selectedRows.map((r) => `${r.name} (${r.role})`).join(", ") : "none"}
        </p>
        <Table<User>
          columns={columns}
          dataSource={users}
          rowKey="id"
          bordered
          hoverable
          rowSelection={{
            type: "radio",
            selectedRowKeys,
            onChange: (keys, rows) => {
              setSelectedRowKeys(keys);
              setSelectedRows(rows);
            },
          }}
        />
      </div>
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Striped & Hoverable
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const StripedHoverable: Story = {
  name: "Table: Striped & Hoverable",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "department", title: "Department", dataIndex: "department" },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" bordered striped hoverable />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Column Borders
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ColumnBorders: Story = {
  name: "Table: Column Borders",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email", borderLeft: true, borderRight: true },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status", borderLeft: true, borderColor: "var(--tui-color-danger-300)", borderWidth: "2px" },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" bordered />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Header Title / Subtitle / Extra
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const HeaderStructured: Story = {
  name: "Table: Header Title/Subtitle/Extra",
  parameters: { controls: { disable: true } },
  render: () => {
    const [sortState, setSortState] = useState<{ columnKey: string; order: "asc" | "desc" } | null>(null);
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Employee", subtitle: "Full name", extra: "Sortable", dataIndex: "name", sorter: true },
      { key: "email", title: "Contact", subtitle: "Email address", dataIndex: "email", sorter: true },
      { key: "role", title: "Access", subtitle: "Permission level", extra: "Editable", dataIndex: "role", sorter: true },
      { key: "status", title: "Status", dataIndex: "status", align: "center" },
    ];
    return (
      <div>
        <p style={{ marginBottom: "var(--tui-spacing-3)", fontSize: "var(--tui-font-size-sm)", color: "var(--tui-color-text-secondary)" }}>
          Sort: {sortState ? `${sortState.columnKey} (${sortState.order})` : "none"}
        </p>
        <Table<User>
          columns={columns}
          dataSource={users}
          rowKey="id"
          bordered
          sortState={sortState}
          onSortChange={setSortState}
        />
      </div>
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Sticky Header (scroll.y)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const StickyHeader: Story = {
  name: "Table: Sticky Header",
  parameters: { controls: { disable: true } },
  render: () => {
    const manyUsers = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1), name: `User ${i + 1}`, email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "Admin" : "Editor", status: i % 4 === 0 ? "Inactive" : "Active", department: i % 2 === 0 ? "Eng" : "Design",
    }));
    const columns: TableColumn<typeof manyUsers[0]>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "department", title: "Department", dataIndex: "department" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];
    return <Table columns={columns} dataSource={manyUsers} rowKey="id" bordered stickyHeader scroll={{ y: "300px" }} />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Sticky Columns (scroll.x)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const StickyColumn: Story = {
  name: "Table: Sticky Column",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name", fixed: "left", fixedOffset: 0, width: "150px" },
      { key: "email", title: "Email", dataIndex: "email", width: "220px" },
      { key: "role", title: "Role", dataIndex: "role", width: "130px" },
      { key: "department", title: "Department", dataIndex: "department", width: "160px" },
      { key: "status", title: "Status", dataIndex: "status", width: "130px" },
      { key: "action", title: "Action", fixed: "right", fixedOffset: 0, width: "100px", align: "center", render: () => <a href="#" style={{ color: "var(--tui-color-brand-blue-600)" }}>Edit</a> },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" bordered scroll={{ x: "1200px" }} />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Sticky Header + Sticky Column
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const StickyHeaderAndColumn: Story = {
  name: "Table: Sticky Header + Column",
  parameters: { controls: { disable: true } },
  render: () => {
    const manyUsers = Array.from({ length: 15 }, (_, i) => ({
      id: String(i + 1), name: `User ${i + 1}`, email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "Admin" : "Editor", department: i % 2 === 0 ? "Eng" : "Design",
      phone: `+1-555-${String(i).padStart(4, "0")}`, location: i % 2 === 0 ? "NYC" : "SF",
      status: "Active", start: `2024-0${(i % 9) + 1}`,
    }));
    const columns: TableColumn<typeof manyUsers[0]>[] = [
      { key: "name", title: "Name", dataIndex: "name", fixed: "left", fixedOffset: 0, width: "140px" },
      { key: "email", title: "Email", dataIndex: "email", width: "220px" },
      { key: "role", title: "Role", dataIndex: "role", width: "120px" },
      { key: "department", title: "Dept", dataIndex: "department", width: "140px" },
      { key: "phone", title: "Phone", dataIndex: "phone", width: "160px" },
      { key: "location", title: "Location", dataIndex: "location", width: "120px" },
      { key: "start", title: "Start Date", dataIndex: "start", width: "120px" },
      { key: "action", title: "Action", fixed: "right", fixedOffset: 0, width: "90px", align: "center", render: () => <a href="#" style={{ color: "var(--tui-color-brand-blue-600)" }}>Edit</a> },
    ];
    return <Table columns={columns} dataSource={manyUsers} rowKey="id" bordered stickyHeader scroll={{ x: "1400px", y: "350px" }} />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Custom bgColor
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CustomBgColors: Story = {
  name: "Table: Custom bgColor",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users.slice(0, 3)}
        rowKey="id"
        bordered
        headerBgColor="var(--tui-color-brand-purple-100)"
        bodyBgColor="var(--tui-color-brand-purple-50)"
      />
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Sizes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Sizes: Story = {
  name: "Table: Sizes",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-8)" }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size}>
            <p style={{ marginBottom: "var(--tui-spacing-2)", fontSize: "var(--tui-font-size-sm)", fontWeight: "var(--tui-font-weight-semibold)" }}>Size: {size}</p>
            <Table<User> columns={columns} dataSource={users.slice(0, 2)} rowKey="id" size={size} bordered />
          </div>
        ))}
      </div>
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Icons in Cells
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const WithIcons: Story = {
  name: "Table: Icons via Render",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      {
        key: "name", title: "User", dataIndex: "name",
        render: (name, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
            <UserIcon />
            <span>{name}</span>
          </div>
        ),
      },
      {
        key: "email", title: "Email", dataIndex: "email",
        render: (email) => (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
            <MailIcon />
            <span>{email}</span>
          </div>
        ),
      },
      {
        key: "action", title: "Profile", align: "right",
        render: () => (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-1)", justifyContent: "flex-end", color: "var(--tui-color-brand-blue-600)" }}>
            <span>View</span>
            <ChevronRight />
          </div>
        ),
      },
    ];
    return <Table<User> columns={columns} dataSource={users} rowKey="id" bordered />;
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Table: Expandable (Accordion)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ExpandableStart: Story = {
  name: "Table: Expandable (toggle start)",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: "var(--tui-spacing-2) 0" }}>
              <strong>{record.name}</strong> works in the <em>{record.department}</em> department as <em>{record.role}</em>.
              <br />Contact: {record.email}
            </div>
          ),
          togglePosition: "start",
        }}
      />
    );
  },
};

export const ExpandableEnd: Story = {
  name: "Table: Expandable (toggle end)",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <div>Department: {record.department} | Status: {record.status}</div>
          ),
          togglePosition: "end",
        }}
      />
    );
  },
};

export const ExpandableInColumn: Story = {
  name: "Table: Expandable (toggle in column)",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <div>Full details for {record.name}: {record.email} — {record.department}</div>
          ),
          togglePosition: "name",
        }}
      />
    );
  },
};

export const ExpandableAccordion: Story = {
  name: "Table: Accordion (single expand)",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Employee", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        hoverable
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--tui-spacing-2)" }}>
              <div><strong>Department:</strong> {record.department}</div>
              <div><strong>Status:</strong> {record.status}</div>
              <div><strong>Email:</strong> {record.email}</div>
            </div>
          ),
          togglePosition: "start",
          accordion: true,
        }}
      />
    );
  },
};

export const ExpandableCustomToggle: Story = {
  name: "Table: Custom Expand Toggle",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];
    return (
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <div>Details for {record.name}: {record.department} department</div>
          ),
          togglePosition: "end",
          expandToggle: (expanded) => (
            <span style={{
              fontSize: "var(--tui-font-size-xs)",
              color: "var(--tui-color-brand-blue-600)",
              fontWeight: "var(--tui-font-weight-medium)",
            }}>
              {expanded ? "Hide" : "Show"}
            </span>
          ),
        }}
      />
    );
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Custom Class Only
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CustomClassOnly: Story = {
  name: "Custom Class Only",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "col1", title: "Custom", dataIndex: "col1" },
      { key: "col2", title: "Styled", dataIndex: "col2" },
      { key: "col3", title: "Table", dataIndex: "col3" },
    ];
    const data = [
      { id: "1", col1: "Zero design props", col2: "Only className", col3: "Custom CSS" },
      { id: "2", col1: "Works as", col2: "plain wrapper", col3: "component" },
    ];
    return (
      <>
        <style>{`.my-dt th { background: hotpink !important; color: white; } .my-dt td { border-bottom-color: #fce4ec !important; }`}</style>
        <Table columns={columns} dataSource={data} rowKey="id" bordered className="my-dt" />
      </>
    );
  },
};

// ══════════════════════════════════════════════════════════════════════════
// Ghost / Skeleton Examples
// ══════════════════════════════════════════════════════════════════════════

// ── Ghost Rows ────────────────────────────────────────────────────────────
/**
 * Use `isGhost` on the data-driven `Table` to show loading shimmer rows.
 * Just pass your `columns` and an empty `dataSource` — the ghost rows auto-generate
 * from the column definitions. No need to manually create cells.
 */
export const GhostRows: Story = {
  name: "Ghost Rows",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name", width: "150px" },
      { key: "email", title: "Email", dataIndex: "email", width: "200px" },
      { key: "role", title: "Role", dataIndex: "role", width: "100px" },
      { key: "status", title: "Status", dataIndex: "status", width: "80px" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={[]}
        isGhost
        ghostRowsCount={5}
      />
    );
  },
};

// ── Ghost Cells ───────────────────────────────────────────────────────────
/**
 * Use `isGhost` on individual columns in the `columns` array to show shimmer for specific cells.
 * The shimmer auto-sizes to the cell content. Use `ghostWidth` on the column for explicit width.
 * Great when some columns load async (e.g. computed fields, external API data).
 */
export const GhostCells: Story = {
  name: "Ghost Cells (Per-Column)",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email", isGhost: true },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "score", title: "Score", dataIndex: "score", isGhost: true, ghostWidth: "60px" },
    ];

    const data = [
      { id: "1", name: "Alice Johnson", email: "alice@co.com", role: "Engineer", score: "95" },
      { id: "2", name: "Bob Williams", email: "bob@co.com", role: "Designer", score: "88" },
      { id: "3", name: "Charlie Brown", email: "charlie@co.com", role: "Manager", score: "92" },
    ];

    return (
      <Table columns={columns} dataSource={data} hoverable />
    );
  },
};

// ── Mixed Real and Ghost Rows ─────────────────────────────────────────────
/**
 * Use `ghostRows` array on the data-driven `Table` to mark specific row indices as ghost.
 * Real data rows render normally, ghost rows show shimmer. Great for "loading more" states.
 */
export const MixedRealAndGhostRows: Story = {
  name: "Mixed Real & Ghost Rows",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];

    const data = [
      { id: "1", name: "Alice Johnson", email: "alice@company.com", role: "Engineer" },
      { id: "2", name: "Bob Williams", email: "bob@company.com", role: "Designer" },
      { id: "3", name: "Loading...", email: "...", role: "..." },
      { id: "4", name: "Loading...", email: "...", role: "..." },
      { id: "5", name: "Loading...", email: "...", role: "..." },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        ghostRows={[2, 3, 4]}
        hoverable
      />
    );
  },
};

// ── Data Table: Full Ghost (isGhost) ──────────────────────────────────────
/**
 * Use `isGhost` on the data-driven `Table` component to show all rows as shimmer.
 * Headers render normally. Pass `ghostRowsCount` to control how many ghost rows appear (default: 5).
 * Checkbox/radio columns also render as shimmer placeholders.
 */
export const DataTableFullGhost: Story = {
  name: "Data Table: Full Ghost",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      { key: "status", title: "Status", dataIndex: "status" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={[]}
        isGhost
        ghostRowsCount={6}
        hoverable
        striped
      />
    );
  },
};

// ── Data Table: Ghost with Checkbox ───────────────────────────────────────
/**
 * Full ghost mode with checkbox row selection enabled.
 * The checkbox column shows shimmer squares matching the checkbox size.
 */
export const DataTableGhostWithCheckbox: Story = {
  name: "Data Table: Ghost + Checkbox",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={[]}
        isGhost
        ghostRowsCount={5}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: [],
          onChange: () => {},
        }}
      />
    );
  },
};

// ── Data Table: Ghost with Radio ──────────────────────────────────────────
/**
 * Full ghost mode with radio row selection.
 * Radio column shows shimmer circles.
 */
export const DataTableGhostWithRadio: Story = {
  name: "Data Table: Ghost + Radio",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "department", title: "Department", dataIndex: "department" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={[]}
        isGhost
        ghostRowsCount={4}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [],
          onChange: () => {},
        }}
      />
    );
  },
};

// ── Data Table: Per-Row Ghost (ghostRows) ─────────────────────────────────
/**
 * Use `ghostRows` array to mark specific rows (by index) as ghost/loading.
 * Other rows render normally. Great for per-row actions like "refreshing" a single row.
 */
export const DataTablePerRowGhost: Story = {
  name: "Data Table: Per-Row Ghost",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
    ];

    const data = [
      { id: "1", name: "Alice Johnson", email: "alice@company.com", role: "Engineer" },
      { id: "2", name: "Bob Williams", email: "bob@company.com", role: "Designer" },
      { id: "3", name: "Charlie Brown", email: "charlie@company.com", role: "Manager" },
      { id: "4", name: "Diana Ross", email: "diana@company.com", role: "Analyst" },
      { id: "5", name: "Eve Davis", email: "eve@company.com", role: "Developer" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        ghostRows={[1, 3]}
        hoverable
      />
    );
  },
};

// ── Ghost Cell: Title + Subtitle + Extra ──────────────────────────────────
/**
 * When a column has structured content (title/subtitle/extra rendered via `render`),
 * passing `isGhost: true` on the column will render separate shimmer lines for each text.
 * The shimmer auto-sizes to the actual content width.
 */
export const GhostCellStructuredContent: Story = {
  name: "Ghost Cell: Structured Content",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      {
        key: "user",
        title: "User",
        dataIndex: "name",
        isGhost: true,
      },
      {
        key: "details",
        title: "Details",
        dataIndex: "role",
        isGhost: true,
        ghostWidth: "120px",
      },
      {
        key: "status",
        title: "Status",
        dataIndex: "status",
      },
    ];

    const data = [
      { id: "1", name: "John Doe", role: "Senior Engineer", status: "Active" },
      { id: "2", name: "Jane Smith", role: "Product Designer", status: "Away" },
    ];

    return (
      <Table columns={columns} dataSource={data} />
    );
  },
};

// ── Single Row Ghost (action loading) ─────────────────────────────────────
/**
 * Use `ghostRows` with a single index to show one row loading (e.g. after clicking an action button).
 * Other rows remain interactive. The ghost row auto-matches column widths.
 */
export const SingleRowGhost: Story = {
  name: "Single Row Ghost (Action Loading)",
  parameters: { controls: { disable: true } },
  render: () => {
    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "actions", title: "Actions", render: () => "Edit | Delete" },
    ];

    const data = [
      { id: "1", name: "Alice Johnson", email: "alice@company.com" },
      { id: "2", name: "Bob Williams", email: "bob@company.com" },
      { id: "3", name: "Charlie Brown", email: "charlie@company.com" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        ghostRows={[1]}
        hoverable
      />
    );
  },
};

// ── Interactive Row Ghost (Click to Load) ─────────────────────────────────
/**
 * Click "Refresh" on any row to trigger ghost state for that row.
 * Uses `ghostRows` with React state — update the array on action click,
 * then remove the index after async completes (simulated with setTimeout).
 */
export const InteractiveRowGhost: Story = {
  name: "Interactive: Row Ghost on Action",
  parameters: { controls: { disable: true } },
  render: () => {
    const [loadingRows, setLoadingRows] = useState<number[]>([]);

    const handleRefresh = (rowIndex: number) => {
      setLoadingRows((prev) => [...prev, rowIndex]);
      // Simulate async — remove ghost after 2s
      setTimeout(() => {
        setLoadingRows((prev) => prev.filter((i) => i !== rowIndex));
      }, 2000);
    };

    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email" },
      { key: "role", title: "Role", dataIndex: "role" },
      {
        key: "actions",
        title: "Actions",
        render: (_value, _record, index) => (
          <button
            onClick={() => handleRefresh(index)}
            disabled={loadingRows.includes(index)}
            style={{
              padding: "var(--tui-spacing-1) var(--tui-spacing-3)",
              fontSize: "var(--tui-font-size-xs)",
              border: "1px solid var(--tui-color-brand-black-200)",
              borderRadius: "var(--tui-radius-md)",
              background: "transparent",
              cursor: loadingRows.includes(index) ? "not-allowed" : "pointer",
            }}
          >
            Refresh
          </button>
        ),
      },
    ];

    const data = [
      { id: "1", name: "Alice Johnson", email: "alice@company.com", role: "Engineer" },
      { id: "2", name: "Bob Williams", email: "bob@company.com", role: "Designer" },
      { id: "3", name: "Charlie Brown", email: "charlie@company.com", role: "Manager" },
      { id: "4", name: "Diana Ross", email: "diana@company.com", role: "Analyst" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        ghostRows={loadingRows}
        hoverable
      />
    );
  },
};

// ── Interactive Cell Ghost (Per-Column Toggle) ────────────────────────────
/**
 * Toggle individual columns into ghost state dynamically.
 * Uses state to set `isGhost` on specific columns — useful when
 * reloading a single field (e.g. recalculating scores, refreshing status).
 */
export const InteractiveCellGhost: Story = {
  name: "Interactive: Cell Ghost on Action",
  parameters: { controls: { disable: true } },
  render: () => {
    const [ghostCols, setGhostCols] = useState<string[]>([]);

    const handleRefreshColumn = (colKey: string) => {
      setGhostCols((prev) => [...prev, colKey]);
      setTimeout(() => {
        setGhostCols((prev) => prev.filter((k) => k !== colKey));
      }, 2000);
    };

    const columns: TableColumn[] = [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "email", title: "Email", dataIndex: "email", isGhost: ghostCols.includes("email") },
      { key: "score", title: "Score", dataIndex: "score", isGhost: ghostCols.includes("score"), ghostWidth: "50px" },
      {
        key: "actions",
        title: "Actions",
        render: () => (
          <div style={{ display: "flex", gap: "var(--tui-spacing-2)" }}>
            <button
              onClick={() => handleRefreshColumn("email")}
              style={{ fontSize: "var(--tui-font-size-xs)", border: "1px solid var(--tui-color-brand-black-200)", borderRadius: "var(--tui-radius-sm)", padding: "2px 8px", background: "transparent", cursor: "pointer" }}
            >
              ↻ Email
            </button>
            <button
              onClick={() => handleRefreshColumn("score")}
              style={{ fontSize: "var(--tui-font-size-xs)", border: "1px solid var(--tui-color-brand-black-200)", borderRadius: "var(--tui-radius-sm)", padding: "2px 8px", background: "transparent", cursor: "pointer" }}
            >
              ↻ Score
            </button>
          </div>
        ),
      },
    ];

    const data = [
      { id: "1", name: "Alice", email: "alice@co.com", score: "95" },
      { id: "2", name: "Bob", email: "bob@co.com", score: "88" },
      { id: "3", name: "Charlie", email: "charlie@co.com", score: "92" },
    ];

    return (
      <Table columns={columns} dataSource={data} hoverable />
    );
  },
};

// ══════════════════════════════════════════════════════════════════════════
// API Reference
// ══════════════════════════════════════════════════════════════════════════

/**
 * Complete props reference for Table, TableColumn, rowSelection, and expandable config.
 * Basic props are also available in the Controls panel on the Playground story.
 */
export const APIReference: Story = {
  name: "📖 API Reference",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ padding: "var(--tui-spacing-4)", fontSize: "var(--tui-font-size-md)", color: "var(--tui-color-brand-black-700)", lineHeight: "1.7" }}>
      <p style={{ margin: "0 0 var(--tui-spacing-4)", color: "var(--tui-color-brand-gray-500)" }}>
        Basic props (rounded, bordered, striped, hoverable, compact, size, stickyHeader, isGhost, ghostRowsCount) are available in the <strong>Controls</strong> panel above.
        Below are additional props that require objects/arrays.
      </p>

      <h3 style={{ margin: "0 0 var(--tui-spacing-4)", fontSize: "var(--tui-font-size-lg)" }}>Data & Ghost Props</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--tui-font-size-sm)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--tui-color-brand-black-200)", textAlign: "left" }}>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Prop</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Type</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Default</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["columns", "TableColumn[]", "—", "Column definitions array"],
            ["dataSource", "T[]", "—", "Array of row data objects"],
            ["rowKey", "string", '"id"', "Unique key field in each data object"],
            ["ghostRows", "number[]", "—", "Specific row indices to show as ghost (0-based). Use with state for per-row loading."],
            ["rowClassName", "string | (record, i) => string", "—", "Custom class on each row"],
            ["scroll", "{ x?: string, y?: string }", "—", "Scroll dimensions for overflow (e.g. { x: '1200px', y: '400px' })"],
            ["headerBgColor", "string", "—", "Custom header background color"],
            ["bodyBgColor", "string", "—", "Custom body background color"],
            ["onRow", "(record, i) => HTMLAttributes", "—", "Custom row HTML attributes/events"],
          ].map(([prop, type, def, desc]) => (
            <tr key={prop} style={{ borderBottom: "1px solid var(--tui-color-brand-black-100)" }}>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", fontWeight: 600 }}>{prop}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", color: "var(--tui-color-brand-blue-700)" }}>{type}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>{def}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ margin: "var(--tui-spacing-6) 0 var(--tui-spacing-4)", fontSize: "var(--tui-font-size-lg)" }}>Row Selection Config</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--tui-font-size-sm)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--tui-color-brand-black-200)", textAlign: "left" }}>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Prop</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Type</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["type", '"checkbox" | "radio"', "Selection mode"],
            ["selectedRowKeys", "(string|number)[]", "Controlled selected row keys"],
            ["onChange", "(keys, rows) => void", "Called when selection changes"],
            ["columnWidth", "string", "Width of selection column (default: 48px)"],
            ["fixed", "boolean", "Stick selection column to left"],
          ].map(([prop, type, desc]) => (
            <tr key={prop} style={{ borderBottom: "1px solid var(--tui-color-brand-black-100)" }}>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", fontWeight: 600 }}>{prop}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", color: "var(--tui-color-brand-blue-700)" }}>{type}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ margin: "var(--tui-spacing-6) 0 var(--tui-spacing-4)", fontSize: "var(--tui-font-size-lg)" }}>Expandable Config</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--tui-font-size-sm)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--tui-color-brand-black-200)", textAlign: "left" }}>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Prop</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Type</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["expandedRowRender", "(record, i) => ReactNode", "Content to show when row is expanded"],
            ["togglePosition", '"start" | "end" | columnKey', "Where to place the expand toggle"],
            ["expandToggle", "(expanded, record) => ReactNode", "Custom toggle element"],
            ["accordion", "boolean", "Only one row expandable at a time"],
            ["expandedRowKeys", "(string|number)[]", "Controlled expanded keys"],
            ["onExpandChange", "(keys) => void", "Called when expanded state changes"],
            ["columnWidth", "string", "Width of expand toggle column"],
          ].map(([prop, type, desc]) => (
            <tr key={prop} style={{ borderBottom: "1px solid var(--tui-color-brand-black-100)" }}>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", fontWeight: 600 }}>{prop}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", color: "var(--tui-color-brand-blue-700)" }}>{type}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ margin: "var(--tui-spacing-6) 0 var(--tui-spacing-4)", fontSize: "var(--tui-font-size-lg)" }}>TableColumn Props</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--tui-font-size-sm)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--tui-color-brand-black-200)", textAlign: "left" }}>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Prop</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Type</th>
            <th style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["key", "string", "Unique column identifier"],
            ["title", "ReactNode", "Column header text"],
            ["dataIndex", "string", "Property name in data to display"],
            ["render", "(value, record, index) => ReactNode", "Custom cell render function"],
            ["align", '"left" | "center" | "right"', "Text alignment"],
            ["width / minWidth / maxWidth", "string", "Column dimensions"],
            ["fixed", '"left" | "right"', "Sticky column position"],
            ["fixedOffset", "string | number", "Sticky position offset"],
            ["sorter", "boolean | (a, b) => number", "Enable sorting (true = default, fn = custom)"],
            ["isGhost", "boolean", "Show shimmer for all cells in this column"],
            ["ghostWidth", "string", "Custom shimmer width for ghost column"],
            ["borderLeft / borderRight", "boolean", "Show border on column sides"],
            ["headerClassName", "string", "Extra class on header cell"],
            ["cellClassName", "string", "Extra class on body cells"],
          ].map(([prop, type, desc]) => (
            <tr key={prop} style={{ borderBottom: "1px solid var(--tui-color-brand-black-100)" }}>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", fontWeight: 600 }}>{prop}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)", fontFamily: "monospace", color: "var(--tui-color-brand-blue-700)" }}>{type}</td>
              <td style={{ padding: "var(--tui-spacing-2) var(--tui-spacing-3)" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ margin: "var(--tui-spacing-6) 0 var(--tui-spacing-4)", fontSize: "var(--tui-font-size-lg)" }}>Ghost Usage Examples</h3>

      <h4 style={{ margin: "0 0 var(--tui-spacing-2)", fontSize: "var(--tui-font-size-base)" }}>Full table loading</h4>
      <pre style={{ background: "var(--tui-color-brand-black-50)", padding: "var(--tui-spacing-3) var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", overflow: "auto", fontSize: "var(--tui-font-size-xs)", margin: "0 0 var(--tui-spacing-4)" }}>
        <code>{`<Table columns={columns} dataSource={[]} isGhost ghostRowsCount={6} />`}</code>
      </pre>

      <h4 style={{ margin: "0 0 var(--tui-spacing-2)", fontSize: "var(--tui-font-size-base)" }}>Per-row ghost (action loading)</h4>
      <pre style={{ background: "var(--tui-color-brand-black-50)", padding: "var(--tui-spacing-3) var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", overflow: "auto", fontSize: "var(--tui-font-size-xs)", margin: "0 0 var(--tui-spacing-4)" }}>
        <code>{`const [loadingRows, setLoadingRows] = useState<number[]>([]);

const handleAction = (index: number) => {
  setLoadingRows(prev => [...prev, index]);
  await fetchData();
  setLoadingRows(prev => prev.filter(i => i !== index));
};

<Table columns={columns} dataSource={data} ghostRows={loadingRows} />`}</code>
      </pre>

      <h4 style={{ margin: "0 0 var(--tui-spacing-2)", fontSize: "var(--tui-font-size-base)" }}>Per-column ghost (field reloading)</h4>
      <pre style={{ background: "var(--tui-color-brand-black-50)", padding: "var(--tui-spacing-3) var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", overflow: "auto", fontSize: "var(--tui-font-size-xs)", margin: "0 0 var(--tui-spacing-4)" }}>
        <code>{`const columns = [
  { key: "name", title: "Name", dataIndex: "name" },
  { key: "email", title: "Email", dataIndex: "email", isGhost: isEmailLoading },
  { key: "score", title: "Score", dataIndex: "score", isGhost: isScoreLoading, ghostWidth: "60px" },
];

<Table columns={columns} dataSource={data} />`}</code>
      </pre>

      <h4 style={{ margin: "0 0 var(--tui-spacing-2)", fontSize: "var(--tui-font-size-base)" }}>TableCell ghost (manual ExTable)</h4>
      <pre style={{ background: "var(--tui-color-brand-black-50)", padding: "var(--tui-spacing-3) var(--tui-spacing-4)", borderRadius: "var(--tui-radius-md)", overflow: "auto", fontSize: "var(--tui-font-size-xs)", margin: "0" }}>
        <code>{`<TableCell isGhost title="Auto-sized content" />
<TableCell isGhost ghostWidth="100px" ghostHeight="16px" />`}</code>
      </pre>
    </div>
  ),
};
