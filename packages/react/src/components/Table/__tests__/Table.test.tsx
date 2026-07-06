import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ExTable,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableRowLabel,
  TableCell,

} from "../Table";

describe("ExTable", () => {
  it("renders a basic table", () => {
    render(
      <ExTable testId="table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("table")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("renders with zero props (defaults)", () => {
    render(
      <ExTable testId="default-table">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    const table = screen.getByTestId("default-table");
    expect(table).toHaveClass("tui-table", "tui-table--md");
  });

  it("applies bordered variant on wrapper", () => {
    const { container } = render(
      <ExTable bordered testId="bordered">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-table-wrapper--bordered");
  });

  it("applies rounded variant on wrapper by default", () => {
    const { container } = render(
      <ExTable testId="rounded">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-table-wrapper--rounded");
  });

  it("supports rounded=false", () => {
    const { container } = render(
      <ExTable rounded={false} testId="no-round">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveClass("tui-table-wrapper--rounded");
  });

  it("applies striped variant", () => {
    render(
      <ExTable striped testId="striped">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("striped")).toHaveClass("tui-table--striped");
  });

  it("applies hoverable variant", () => {
    render(
      <ExTable hoverable testId="hoverable">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("hoverable")).toHaveClass("tui-table--hoverable");
  });

  it("applies compact variant", () => {
    render(
      <ExTable compact testId="compact">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("compact")).toHaveClass("tui-table--compact");
  });

  it("applies size prop", () => {
    render(
      <ExTable size="lg" testId="lg">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("lg")).toHaveClass("tui-table--lg");
  });

  it("passes className to table", () => {
    render(
      <ExTable className="my-custom" testId="custom">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("custom")).toHaveClass("my-custom");
  });
});

describe("TableHeader", () => {
  it("renders thead with className", () => {
    render(
      <table>
        <TableHeader className="extra" testId="thead">
          <tr>
            <th>Col</th>
          </tr>
        </TableHeader>
      </table>,
    );
    expect(screen.getByTestId("thead")).toHaveClass("tui-table__header", "extra");
  });
});

describe("TableHeaderCell", () => {
  it("renders simple text children", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell testId="th">Name</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByTestId("th")).toHaveTextContent("Name");
  });

  it("renders structured content with title/subtitle/extra", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell title="Name" subtitle="Full name" extra="Required" testId="th-struct" />
          </tr>
        </thead>
      </table>,
    );
    const cell = screen.getByTestId("th-struct");
    expect(cell).toHaveTextContent("Name");
    expect(cell).toHaveTextContent("Full name");
    expect(cell).toHaveTextContent("Required");
  });

  it("supports align prop", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell align="center" testId="th-center">Amount</TableHeaderCell>
            <TableHeaderCell align="right" testId="th-right">Price</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByTestId("th-center")).toHaveClass("tui-table__header-cell--center");
    expect(screen.getByTestId("th-right")).toHaveClass("tui-table__header-cell--right");
  });

  it("supports width prop", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell width="200px" testId="th-width">Col</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByTestId("th-width")).toHaveStyle({ width: "200px" });
  });

  it("applies borderLeft inline style", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell borderLeft testId="th-bl">Col</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    const style = screen.getByTestId("th-bl").getAttribute("style");
    expect(style).toContain("border-left");
  });

  it("applies borderRight with custom color and width", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell borderRight borderColor="red" borderWidth="2px" testId="th-br">Col</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    const style = screen.getByTestId("th-br").getAttribute("style");
    expect(style).toContain("border-right");
    expect(style).toContain("2px");
    expect(style).toContain("red");
  });
});

describe("TableBody", () => {
  it("renders tbody with testId", () => {
    render(
      <table>
        <TableBody testId="tbody">
          <tr>
            <td>Data</td>
          </tr>
        </TableBody>
      </table>,
    );
    expect(screen.getByTestId("tbody")).toHaveClass("tui-table__body");
  });
});

describe("TableRow", () => {
  it("renders row with selected state", () => {
    render(
      <table>
        <tbody>
          <TableRow selected testId="row-selected">
            <td>Data</td>
          </TableRow>
        </tbody>
      </table>,
    );
    const row = screen.getByTestId("row-selected");
    expect(row).toHaveClass("tui-table__row--selected");
    expect(row).toHaveAttribute("aria-selected", "true");
  });

  it("renders row with disabled state", () => {
    render(
      <table>
        <tbody>
          <TableRow disabled testId="row-disabled">
            <td>Data</td>
          </TableRow>
        </tbody>
      </table>,
    );
    const row = screen.getByTestId("row-disabled");
    expect(row).toHaveClass("tui-table__row--disabled");
    expect(row).toHaveAttribute("aria-disabled", "true");
  });

  it("renders row with borderless", () => {
    render(
      <table>
        <tbody>
          <TableRow borderless testId="row-borderless">
            <td>Data</td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("row-borderless")).toHaveClass("tui-table__row--borderless");
  });
});

describe("TableRowLabel", () => {
  it("renders row label cell", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableRowLabel testId="row-label">
              <input type="checkbox" />
            </TableRowLabel>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("row-label")).toHaveClass("tui-table__row-label");
  });
});

describe("TableCell", () => {
  it("renders simple children", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell testId="td">Hello</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("td")).toHaveTextContent("Hello");
  });

  it("renders structured content with title/subtitle/extra", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell title="John Doe" subtitle="Engineer" extra="Remote" testId="td-struct" />
          </tr>
        </tbody>
      </table>,
    );
    const cell = screen.getByTestId("td-struct");
    expect(cell).toHaveTextContent("John Doe");
    expect(cell).toHaveTextContent("Engineer");
    expect(cell).toHaveTextContent("Remote");
  });

  it("renders as link when href is provided", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell href="https://example.com" testId="td-link">
              Click here
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveTextContent("Click here");
  });

  it("renders link with target blank and rel", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell href="https://example.com" target="_blank" testId="td-link-blank">
              External
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders prefix and suffix icons", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell
              prefixIcon={<span data-testid="prefix">📎</span>}
              suffixIcon={<span data-testid="suffix">→</span>}
              title="File"
              testId="td-icons"
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("prefix")).toBeInTheDocument();
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
    expect(screen.getByTestId("td-icons")).toHaveTextContent("File");
  });

  it("supports align prop", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell align="right" testId="td-right">$100</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("td-right")).toHaveClass("tui-table__cell--right");
  });

  it("applies borderLeft inline style", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell borderLeft testId="td-bl">Data</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const style = screen.getByTestId("td-bl").getAttribute("style");
    expect(style).toContain("border-left");
  });

  it("applies borderRight with custom color and width", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell borderRight borderColor="blue" borderWidth="3px" testId="td-br">Data</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const style = screen.getByTestId("td-br").getAttribute("style");
    expect(style).toContain("border-right");
    expect(style).toContain("3px");
    expect(style).toContain("blue");
  });

  it("does not apply border styles by default", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell testId="td-no-border">Data</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const cell = screen.getByTestId("td-no-border");
    const style = cell.getAttribute("style");
    expect(style).toBeNull();
  });
});

describe("Table scroll & sticky", () => {
  it("applies stickyHeader class", () => {
    render(
      <ExTable stickyHeader testId="sticky">
        <TableHeader>
          <TableRow><TableHeaderCell>Col</TableHeaderCell></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell>Data</TableCell></TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("sticky")).toHaveClass("tui-table--sticky-header");
  });

  it("applies scroll.y as max-height on wrapper", () => {
    const { container } = render(
      <ExTable scroll={{ y: "400px" }} testId="scroll-y">
        <TableBody>
          <TableRow><TableCell>Data</TableCell></TableRow>
        </TableBody>
      </ExTable>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveStyle({ maxHeight: "400px" });
  });

  it("applies scroll.x as min-width on table", () => {
    render(
      <ExTable scroll={{ x: 1200 }} testId="scroll-x">
        <TableBody>
          <TableRow><TableCell>Data</TableCell></TableRow>
        </TableBody>
      </ExTable>,
    );
    expect(screen.getByTestId("scroll-x")).toHaveStyle({ minWidth: "1200px" });
  });

  it("applies scroll.x + scroll.y together", () => {
    const { container } = render(
      <ExTable scroll={{ x: "1500px", y: 500 }} testId="scroll-both">
        <TableBody>
          <TableRow><TableCell>Data</TableCell></TableRow>
        </TableBody>
      </ExTable>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveStyle({ maxHeight: "500px" });
    expect(screen.getByTestId("scroll-both")).toHaveStyle({ minWidth: "1500px" });
  });
});

describe("TableHeaderCell width props", () => {
  it("applies minWidth and maxWidth", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell minWidth="100px" maxWidth="300px" testId="th-minmax">Col</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    const style = screen.getByTestId("th-minmax").getAttribute("style");
    expect(style).toContain("min-width: 100px");
    expect(style).toContain("max-width: 300px");
  });

  it("applies fixed=left with sticky class and left offset", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell fixed="left" fixedOffset="48px" testId="th-fixed">Col</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    const cell = screen.getByTestId("th-fixed");
    expect(cell).toHaveClass("tui-table__header-cell--sticky-left");
    expect(cell.getAttribute("style")).toContain("left: 48px");
  });

  it("applies fixed=right with right offset", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell fixed="right" fixedOffset={0} testId="th-fixed-r">Col</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    const cell = screen.getByTestId("th-fixed-r");
    expect(cell).toHaveClass("tui-table__header-cell--sticky-right");
    expect(cell.getAttribute("style")).toContain("right: 0px");
  });
});

describe("TableCell width props", () => {
  it("applies minWidth and maxWidth", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell minWidth="80px" maxWidth="200px" testId="td-minmax">Data</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const style = screen.getByTestId("td-minmax").getAttribute("style");
    expect(style).toContain("min-width: 80px");
    expect(style).toContain("max-width: 200px");
  });

  it("applies fixed=left with sticky class", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell fixed="left" testId="td-fixed">Data</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const cell = screen.getByTestId("td-fixed");
    expect(cell).toHaveClass("tui-table__cell--sticky-left");
    expect(cell.getAttribute("style")).toContain("left: 0");
  });
});

describe("Table", () => {
  const columns = [
    { key: "name", title: "Name", dataIndex: "name" as const },
    { key: "email", title: "Email", dataIndex: "email" as const },
    { key: "role", title: "Role", dataIndex: "role" as const },
  ];
  const data = [
    { id: "1", name: "Alice", email: "alice@test.com", role: "Admin" },
    { id: "2", name: "Bob", email: "bob@test.com", role: "Editor" },
  ];

  it("renders header and data rows from columns + dataSource", () => {
    render(<Table columns={columns} dataSource={data} testId="dt" />);
    expect(screen.getByTestId("dt")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("bob@test.com")).toBeInTheDocument();
  });

  it("uses custom rowKey", () => {
    const dataWithKey = [
      { uid: "a1", name: "Alice", email: "a@a.com", role: "Admin" },
    ];
    render(<Table columns={columns} dataSource={dataWithKey} rowKey="uid" testId="dt-key" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("supports custom render function in column", () => {
    const cols = [
      {
        key: "name",
        title: "User",
        dataIndex: "name" as const,
        render: (val: string) => <strong data-testid="custom-render">{val}</strong>,
      },
    ];
    render(<Table columns={cols} dataSource={data} testId="dt-render" />);
    expect(screen.getAllByTestId("custom-render")).toHaveLength(2);
  });

  it("passes table props like bordered, hoverable", () => {
    render(<Table columns={columns} dataSource={data} bordered hoverable testId="dt-props" />);
    const wrapper = screen.getByTestId("dt-props").parentElement as HTMLElement;
    expect(wrapper).toHaveClass("tui-table-wrapper--bordered");
    expect(screen.getByTestId("dt-props")).toHaveClass("tui-table--hoverable");
  });

  it("highlights selected rows", () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} selectedRowKeys={["1"]} testId="dt-sel" />,
    );
    const rows = container.querySelectorAll(".tui-table__row--selected");
    expect(rows).toHaveLength(1);
  });

  it("applies column fixed prop for sticky columns", () => {
    const cols = [
      { key: "name", title: "Name", dataIndex: "name" as const, fixed: "left" as const, width: "150px" },
      { key: "email", title: "Email", dataIndex: "email" as const },
    ];
    const { container } = render(<Table columns={cols} dataSource={data} testId="dt-sticky" />);
    const stickyCells = container.querySelectorAll(".tui-table__cell--sticky-left");
    expect(stickyCells.length).toBeGreaterThan(0);
  });
});
