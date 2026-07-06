import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ExTable, Table } from "../components/Table/Table";
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
const meta: Meta<typeof ExTable> = {
  title: "Components/Table",
  component: ExTable,
  tags: ["autodocs"],
  argTypes: {
    rounded: { control: "boolean", description: "Rounded corners on wrapper", table: { category: "Table", defaultValue: { summary: "true" } } },
    bordered: { control: "boolean", description: "Outer border on wrapper", table: { category: "Table", defaultValue: { summary: "false" } } },
    striped: { control: "boolean", description: "Alternating row background", table: { category: "Table", defaultValue: { summary: "false" } } },
    hoverable: { control: "boolean", description: "Highlight rows on hover (brand-navy-50)", table: { category: "Table", defaultValue: { summary: "false" } } },
    compact: { control: "boolean", description: "Reduced cell padding", table: { category: "Table", defaultValue: { summary: "false" } } },
    stickyHeader: { control: "boolean", description: "Header stays fixed on vertical scroll", table: { category: "Table", defaultValue: { summary: "false" } } },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Table size (padding & font)", table: { category: "Table", defaultValue: { summary: "md" } } },
  },
  args: { rounded: true, bordered: true, striped: false, hoverable: true, compact: false, stickyHeader: false, size: "md" },
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  API Reference
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const APIReference: Story = {
  name: "📖 API Reference",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ fontFamily: "inherit", fontSize: "var(--tui-font-size-sm)", lineHeight: "1.6", maxWidth: "96%" }}>
      <h2 style={{ fontSize: "var(--tui-font-size-lg)", marginBottom: "var(--tui-spacing-4)" }}>Table Props</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "var(--tui-spacing-8)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--tui-color-border-default)" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", width: "180px" }}>Prop</th>
            <th style={{ textAlign: "left", padding: "8px 12px", width: "200px" }}>Type</th>
            <th style={{ textAlign: "left", padding: "8px 12px", width: "80px" }}>Default</th>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["columns", "TableColumn<T>[]", "—", "Column definitions"],
            ["dataSource", "T[]", "—", "Data rows array"],
            ["rowKey", "keyof T & string", '"id"', "Unique key field in each row"],
            ["rounded", "boolean", "true", "Rounded corners on wrapper"],
            ["bordered", "boolean", "false", "Outer border on wrapper"],
            ["striped", "boolean", "false", "Alternating row background"],
            ["hoverable", "boolean", "false", "Highlight rows on hover"],
            ["compact", "boolean", "false", "Reduced cell padding"],
            ["stickyHeader", "boolean", "false", "Sticky header on scroll.y"],
            ["size", '"sm"|"md"|"lg"', '"md"', "Table size (padding & font)"],
            ["scroll", "{ x?, y? }", "—", "Scroll dimensions for overflow"],
            ["rowClassName", "string | (record, i) => string", "—", "Custom row className"],
            ["selectedRowKeys", "(string|number)[]", "—", "Highlighted row keys"],
            ["rowSelection", "object", "—", "Checkbox / radio row selection config"],
            ["rowSelection.type", '"checkbox" | "radio"', "—", "Selection mode"],
            ["rowSelection.selectedRowKeys", "(string|number)[]", "—", "Controlled selected keys"],
            ["rowSelection.onChange", "(keys, rows) => void", "—", "Fires with keys + full row data"],
            ["rowSelection.columnWidth", "string", '"48px"', "Selection column width"],
            ["rowSelection.fixed", "boolean", "—", "Stick selection column to left"],
            ["sortState", "{ columnKey, order } | null", "—", "Controlled sort state"],
            ["onSortChange", "(state | null) => void", "—", "Fires on sort click"],
            ["expandable", "object", "—", "Row accordion / expand config"],
            ["expandable.expandedRowRender", "(record, i) => ReactNode", "—", "Expanded row content"],
            ["expandable.togglePosition", '"start"|"end"|columnKey', '"start"', "Toggle column position"],
            ["expandable.expandToggle", "(expanded, record) => ReactNode", "chevron", "Custom toggle"],
            ["expandable.accordion", "boolean", "false", "Only one row open at a time"],
            ["expandable.expandedRowKeys", "(string|number)[]", "—", "Controlled expanded keys"],
            ["expandable.onExpandChange", "(keys) => void", "—", "Fires on expand change"],
            ["headerBgColor", "string", "brand-navy-100", "Header background color"],
            ["bodyBgColor", "string", "white", "Body background color"],
            ["onRow", "(record, i) => HTMLAttributes", "—", "Custom row attributes"],
          ].map(([prop, type, def, desc], i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--tui-color-border-default)" }}>
              <td style={{ padding: "6px 12px", fontWeight: 500, fontFamily: "monospace", fontSize: "12px" }}>{prop}</td>
              <td style={{ padding: "6px 12px", fontFamily: "monospace", fontSize: "11px", color: "var(--tui-color-text-secondary)" }}>{type}</td>
              <td style={{ padding: "6px 12px", fontFamily: "monospace", fontSize: "11px" }}>{def}</td>
              <td style={{ padding: "6px 12px" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: "var(--tui-font-size-lg)", marginBottom: "var(--tui-spacing-4)" }}>TableColumn Props</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--tui-color-border-default)" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", width: "160px" }}>Prop</th>
            <th style={{ textAlign: "left", padding: "8px 12px", width: "200px" }}>Type</th>
            <th style={{ textAlign: "left", padding: "8px 12px" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["key", "string", "Unique column identifier"],
            ["title", "ReactNode", "Header title text"],
            ["subtitle", "ReactNode", "Header subtitle"],
            ["extra", "ReactNode", "Header extra text"],
            ["dataIndex", "keyof T", "Field to display from row data"],
            ["render", "(value, record, i) => ReactNode", "Custom cell render function"],
            ["align", '"left"|"center"|"right"', "Text alignment"],
            ["width", "string", "Column width"],
            ["minWidth", "string", "Minimum column width"],
            ["maxWidth", "string", "Maximum column width"],
            ["fixed", '"left"|"right"', "Sticky column position"],
            ["fixedOffset", "string | number", "Sticky offset value"],
            ["borderLeft", "boolean", "Show left border on column"],
            ["borderRight", "boolean", "Show right border on column"],
            ["borderColor", "string", "Custom border color"],
            ["borderWidth", "string", "Custom border width"],
            ["sorter", "boolean | (a, b) => number", "Enable sorting (true = auto, fn = custom)"],
            ["headerClassName", "string", "Extra class on header cell"],
            ["cellClassName", "string", "Extra class on body cells"],
          ].map(([prop, type, desc], i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--tui-color-border-default)" }}>
              <td style={{ padding: "6px 12px", fontWeight: 500, fontFamily: "monospace", fontSize: "12px" }}>{prop}</td>
              <td style={{ padding: "6px 12px", fontFamily: "monospace", fontSize: "11px", color: "var(--tui-color-text-secondary)" }}>{type}</td>
              <td style={{ padding: "6px 12px" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
