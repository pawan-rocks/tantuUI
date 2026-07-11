import React, { forwardRef, useState as useStateReact } from "react";
import type { HTMLAttributes, CSSProperties } from "react";
import type { BaseProps } from "../../types";
import { cn } from "../../utils/cn";
import { Checkbox } from "../Checkbox/Checkbox";
import { Radio } from "../Radio/Radio";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Table.css";

// ─── Scroll config ────────────────────────────────────────────────────────────

export interface TableScroll {
  /** Horizontal scroll width (e.g. "1200px", "150%"). Sets table min-width */
  x?: string | number;
  /** Vertical scroll height (e.g. "400px", "60vh"). Sets wrapper max-height */
  y?: string | number;
}

// ─── ExTable ────────────────────────────────────────────────────────────────────

export interface ExTableProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableElement>, "className" | "style"> {
  /** Show rounded corners on wrapper */
  rounded?: boolean;
  /** Show outer border on wrapper */
  bordered?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Highlight rows on hover */
  hoverable?: boolean;
  /** Compact padding */
  compact?: boolean;
  /** Table size */
  size?: "sm" | "md" | "lg";
  /** Sticky header — header stays at top when scrolling vertically */
  stickyHeader?: boolean;
  /** Scroll configuration for horizontal/vertical scrolling */
  scroll?: TableScroll;
  /** Custom className for the wrapper div */
  wrapperClassName?: string;
}

export const ExTable = forwardRef<HTMLTableElement, ExTableProps>(
  (
    {
      rounded = true,
      bordered = false,
      striped = false,
      hoverable = false,
      compact = false,
      size = "md",
      stickyHeader = false,
      scroll,
      wrapperClassName,
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    const wrapperStyle: CSSProperties = {};
    const tableStyle: CSSProperties = { ...style };

    if (scroll?.y) {
      wrapperStyle.maxHeight = typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y;
      wrapperStyle.overflowY = "auto";
    }
    if (scroll?.x) {
      tableStyle.minWidth = typeof scroll.x === "number" ? `${scroll.x}px` : scroll.x;
    }

    return (
      <div
        className={cn(
          "tui-table-wrapper",
          rounded && "tui-table-wrapper--rounded",
          bordered && "tui-table-wrapper--bordered",
          !!scroll?.x && "tui-table-wrapper--scroll-x",
          !!scroll?.y && "tui-table-wrapper--scroll-y",
          wrapperClassName,
        )}
        style={Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined}
      >
        <table
          ref={ref}
          className={cn(
            "tui-table",
            `tui-table--${size}`,
            striped && "tui-table--striped",
            hoverable && "tui-table--hoverable",
            compact && "tui-table--compact",
            stickyHeader && "tui-table--sticky-header",
            className,
          )}
          style={Object.keys(tableStyle).length > 0 ? tableStyle : undefined}
          data-testid={testId}
          {...rest}
        >
          {children}
        </table>
      </div>
    );
  },
);

ExTable.displayName = "ExTable";

// ─── TableHeader ──────────────────────────────────────────────────────────────

export interface TableHeaderProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableSectionElement>, "className" | "style"> {
  /** Custom background color (any CSS color value). Defaults to brand-navy-100 */
  bgColor?: string;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ bgColor, className, style, children, testId, ...rest }, ref) => {
    const headerStyle = bgColor
      ? { "--tui-table-header-bg": bgColor, ...style } as CSSProperties
      : style;

    return (
      <thead
        ref={ref}
        className={cn("tui-table__header", className)}
        style={headerStyle}
        data-testid={testId}
        {...rest}
      >
        {children}
      </thead>
    );
  },
);

TableHeader.displayName = "TableHeader";

// ─── TableHeaderCell ──────────────────────────────────────────────────────────

export interface TableHeaderCellProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableCellElement>, "className" | "style" | "title"> {
  /** Primary title text */
  title?: React.ReactNode;
  /** Secondary subtitle text */
  subtitle?: React.ReactNode;
  /** Extra tertiary text */
  extra?: React.ReactNode;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Column width */
  width?: string;
  /** Minimum column width */
  minWidth?: string;
  /** Maximum column width */
  maxWidth?: string;
  /** Show left border on this cell */
  borderLeft?: boolean;
  /** Show right border on this cell */
  borderRight?: boolean;
  /** Custom border color (CSS value). Defaults to token border color */
  borderColor?: string;
  /** Custom border width (CSS value, e.g. "2px"). Defaults to 1px token */
  borderWidth?: string;
  /** Sticky column position */
  fixed?: "left" | "right";
  /** Offset for sticky positioning (e.g. "0", "48px") */
  fixedOffset?: string | number;
  /** Whether this column is sortable — shows sort icons */
  sortable?: boolean;
  /** Current sort order for this column */
  sortOrder?: "asc" | "desc" | null;
  /** Called when sort is triggered */
  onSort?: () => void;
  /** Vertical alignment of header cell content. Defaults to "top" */
  verticalAlign?: "top" | "middle" | "bottom";
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    {
      title,
      subtitle,
      extra,
      align = "left",
      width,
      minWidth,
      maxWidth,
      borderLeft = false,
      borderRight = false,
      borderColor,
      borderWidth,
      fixed,
      fixedOffset,
      sortable = false,
      sortOrder = null,
      onSort,
      verticalAlign = "top",
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    const hasStructuredContent = title || subtitle || extra;

    const cellStyle: CSSProperties = {
      width,
      minWidth,
      maxWidth,
      verticalAlign,
      ...(borderLeft && {
        borderLeft: `${borderWidth || "var(--tui-border-width-1)"} solid ${borderColor || "var(--tui-color-border-default)"}`,
      }),
      ...(borderRight && {
        borderRight: `${borderWidth || "var(--tui-border-width-1)"} solid ${borderColor || "var(--tui-color-border-default)"}`,
      }),
      ...(fixed === "left" && {
        left: typeof fixedOffset === "number" ? `${fixedOffset}px` : fixedOffset || "0",
      }),
      ...(fixed === "right" && {
        right: typeof fixedOffset === "number" ? `${fixedOffset}px` : fixedOffset || "0",
      }),
      ...style,
    };

    const sortIcons = sortable ? (
      <span
        className={cn(
          "tui-table__sort",
          sortOrder === "asc" && "tui-table__sort--asc",
          sortOrder === "desc" && "tui-table__sort--desc",
        )}
        aria-hidden="true"
      >
        <span className="tui-table__sort-icon tui-table__sort-icon--asc" />
        <span className="tui-table__sort-icon tui-table__sort-icon--desc" />
      </span>
    ) : null;

    const handleClick = sortable && onSort ? onSort : undefined;

    return (
      <th
        ref={ref}
        className={cn(
          "tui-table__header-cell",
          align !== "left" && `tui-table__header-cell--${align}`,
          fixed === "left" && "tui-table__header-cell--sticky-left",
          fixed === "right" && "tui-table__header-cell--sticky-right",
          sortable && "tui-table__header-cell--sortable",
          className,
        )}
        style={Object.keys(cellStyle).some((k) => (cellStyle as any)[k] != null) ? cellStyle : undefined}
        data-testid={testId}
        onClick={handleClick}
        aria-sort={sortOrder === "asc" ? "ascending" : sortOrder === "desc" ? "descending" : undefined}
        {...rest}
      >
        {hasStructuredContent ? (
          <div className="tui-table__header-cell-content">
            {title && (
              <span className="tui-table__header-cell-title">
                {title}
                {sortIcons}
              </span>
            )}
            {subtitle && <span className="tui-table__header-cell-subtitle">{subtitle}</span>}
            {extra && <span className="tui-table__header-cell-extra">{extra}</span>}
          </div>
        ) : (
          <>
            {children}
            {sortIcons}
          </>
        )}
      </th>
    );
  },
);

TableHeaderCell.displayName = "TableHeaderCell";

// ─── TableBody ────────────────────────────────────────────────────────────────

export interface TableBodyProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableSectionElement>, "className" | "style"> {
  /** Custom background color (any CSS color value). Defaults to white */
  bgColor?: string;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ bgColor, className, style, children, testId, ...rest }, ref) => {
    const bodyStyle = bgColor
      ? { "--tui-table-body-bg": bgColor, ...style } as CSSProperties
      : style;

    return (
      <tbody
        ref={ref}
        className={cn("tui-table__body", className)}
        style={bodyStyle}
        data-testid={testId}
        {...rest}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = "TableBody";

// ─── TableRow ─────────────────────────────────────────────────────────────────

export interface TableRowProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableRowElement>, "className" | "style"> {
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Hide row border */
  borderless?: boolean;
  /** Show shimmer/skeleton for all cells in this row */
  isGhost?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      selected = false,
      disabled = false,
      borderless = false,
      isGhost = false,
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "tui-table__row",
          selected && "tui-table__row--selected",
          disabled && "tui-table__row--disabled",
          borderless && "tui-table__row--borderless",
          className,
        )}
        style={style}
        data-testid={testId}
        aria-selected={selected || undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = "TableRow";

// ─── TableRowLabel ────────────────────────────────────────────────────────────

export interface TableRowLabelProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableCellElement>, "className" | "style"> {
  /** Sticky column position */
  fixed?: "left" | "right";
  /** Offset for sticky positioning */
  fixedOffset?: string | number;
}

/**
 * A table cell used for row-level checkbox or radio controls.
 * Place as the first child of a TableRow.
 */
export const TableRowLabel = forwardRef<HTMLTableCellElement, TableRowLabelProps>(
  ({ fixed, fixedOffset, className, style, children, testId, ...rest }, ref) => {
    const cellStyle: CSSProperties = {
      ...(fixed === "left" && {
        left: typeof fixedOffset === "number" ? `${fixedOffset}px` : fixedOffset || "0",
      }),
      ...(fixed === "right" && {
        right: typeof fixedOffset === "number" ? `${fixedOffset}px` : fixedOffset || "0",
      }),
      ...style,
    };

    return (
      <td
        ref={ref}
        className={cn(
          "tui-table__row-label",
          fixed === "left" && "tui-table__row-label--sticky-left",
          fixed === "right" && "tui-table__row-label--sticky-right",
          className,
        )}
        style={Object.keys(cellStyle).length > 0 ? cellStyle : undefined}
        data-testid={testId}
        {...rest}
      >
        {children}
      </td>
    );
  },
);

TableRowLabel.displayName = "TableRowLabel";

// ─── TableCell ────────────────────────────────────────────────────────────────

export interface TableCellProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLTableCellElement>, "className" | "style" | "title"> {
  /** Primary title text */
  title?: React.ReactNode;
  /** Secondary subtitle text */
  subtitle?: React.ReactNode;
  /** Extra tertiary text */
  extra?: React.ReactNode;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Render as a link */
  href?: string;
  /** Link target */
  target?: string;
  /** Icon before content */
  prefixIcon?: React.ReactNode;
  /** Icon after content */
  suffixIcon?: React.ReactNode;
  /** Column width */
  width?: string;
  /** Minimum column width */
  minWidth?: string;
  /** Maximum column width */
  maxWidth?: string;
  /** Show left border on this cell */
  borderLeft?: boolean;
  /** Show right border on this cell */
  borderRight?: boolean;
  /** Custom border color (CSS value). Defaults to token border color */
  borderColor?: string;
  /** Custom border width (CSS value, e.g. "2px"). Defaults to 1px token */
  borderWidth?: string;
  /** Sticky column position */
  fixed?: "left" | "right";
  /** Offset for sticky positioning (e.g. "0", "48px") */
  fixedOffset?: string | number;
  /** Show shimmer/skeleton for this cell (auto-sizes to content if children/title provided) */
  isGhost?: boolean;
  /** Custom ghost shimmer width */
  ghostWidth?: string;
  /** Custom ghost shimmer height */
  ghostHeight?: string;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      title,
      subtitle,
      extra,
      align = "left",
      href,
      target,
      prefixIcon,
      suffixIcon,
      width,
      minWidth,
      maxWidth,
      borderLeft = false,
      borderRight = false,
      borderColor,
      borderWidth,
      fixed,
      fixedOffset,
      isGhost = false,
      ghostWidth,
      ghostHeight,
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    const hasStructuredContent = title || subtitle || extra;
    const hasIcons = prefixIcon || suffixIcon;

    const cellStyle: CSSProperties = {
      width,
      minWidth,
      maxWidth,
      ...(borderLeft && {
        borderLeft: `${borderWidth || "var(--tui-border-width-1)"} solid ${borderColor || "var(--tui-color-border-default)"}`,
      }),
      ...(borderRight && {
        borderRight: `${borderWidth || "var(--tui-border-width-1)"} solid ${borderColor || "var(--tui-color-border-default)"}`,
      }),
      ...(fixed === "left" && {
        left: typeof fixedOffset === "number" ? `${fixedOffset}px` : fixedOffset || "0",
      }),
      ...(fixed === "right" && {
        right: typeof fixedOffset === "number" ? `${fixedOffset}px` : fixedOffset || "0",
      }),
      ...style,
    };

    const renderContent = () => {
      if (isGhost) {
        // If structured content (title/subtitle/extra), render each as separate shimmer
        if (hasStructuredContent && !ghostWidth) {
          return (
            <div className="tui-table__cell-content">
              <span className="tui-table__cell-text">
                {title && (
                  <Shimmer width={undefined} height="16px" shape="rounded" style={{ marginBottom: subtitle || extra ? "var(--tui-spacing-1)" : undefined }}>
                    <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{title}</span>
                  </Shimmer>
                )}
                {subtitle && (
                  <Shimmer width={undefined} height="13px" shape="rounded" style={{ marginBottom: extra ? "var(--tui-spacing-0_5)" : undefined }}>
                    <span style={{ visibility: "hidden", whiteSpace: "nowrap", fontSize: "var(--tui-font-size-xs)" }}>{subtitle}</span>
                  </Shimmer>
                )}
                {extra && (
                  <Shimmer width={undefined} height="12px" shape="rounded">
                    <span style={{ visibility: "hidden", whiteSpace: "nowrap", fontSize: "var(--tui-font-size-xs)" }}>{extra}</span>
                  </Shimmer>
                )}
              </span>
            </div>
          );
        }
        return (
          <Shimmer width={ghostWidth} height={ghostHeight || "16px"} shape="rounded">
            {!ghostWidth && (children || title) && (
              <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{children || title}</span>
            )}
          </Shimmer>
        );
      }
      if (href) {
        return (
          <a
            className="tui-table__cell-link"
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
          >
            {children || title}
          </a>
        );
      }

      if (hasStructuredContent || hasIcons) {
        return (
          <div className="tui-table__cell-content">
            {prefixIcon && <span className="tui-table__cell-icon">{prefixIcon}</span>}
            <span className="tui-table__cell-text">
              {title && <span className="tui-table__cell-title">{title}</span>}
              {subtitle && <span className="tui-table__cell-subtitle">{subtitle}</span>}
              {extra && <span className="tui-table__cell-extra">{extra}</span>}
              {!hasStructuredContent && children}
            </span>
            {suffixIcon && <span className="tui-table__cell-icon">{suffixIcon}</span>}
          </div>
        );
      }

      return children;
    };

    return (
      <td
        ref={ref}
        className={cn(
          "tui-table__cell",
          align !== "left" && `tui-table__cell--${align}`,
          fixed === "left" && "tui-table__cell--sticky-left",
          fixed === "right" && "tui-table__cell--sticky-right",
          className,
        )}
        style={Object.keys(cellStyle).some((k) => (cellStyle as any)[k] != null) ? cellStyle : undefined}
        data-testid={testId}
        {...rest}
      >
        {renderContent()}
      </td>
    );
  },
);

TableCell.displayName = "TableCell";

// ─── Table (data-driven: columns + dataSource) ─────────────────────────────

export interface TableColumn<T = any> {
  /** Unique key for the column */
  key: string;
  /** Column header title (string or ReactNode) */
  title?: React.ReactNode;
  /** Column header subtitle */
  subtitle?: React.ReactNode;
  /** Column header extra text */
  extra?: React.ReactNode;
  /** Property name in the data row to display */
  dataIndex?: keyof T & string;
  /** Custom render function for cell content */
  render?: (value: any, record: T, index: number) => React.ReactNode;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Column width */
  width?: string;
  /** Min width */
  minWidth?: string;
  /** Max width */
  maxWidth?: string;
  /** Sticky column position */
  fixed?: "left" | "right";
  /** Sticky offset */
  fixedOffset?: string | number;
  /** Show left border */
  borderLeft?: boolean;
  /** Show right border */
  borderRight?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: string;
  /** Extra className on header cell */
  headerClassName?: string;
  /** Extra className on body cells */
  cellClassName?: string;
  /** Enable sorting on this column (true for default compare, or custom comparator) */
  sorter?: boolean | ((a: T, b: T) => number);
  /** Show ghost/shimmer for all cells in this column */
  isGhost?: boolean;
  /** Custom ghost shimmer width for this column */
  ghostWidth?: string;
}

export interface TableProps<T = any>
  extends Omit<ExTableProps, "children"> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  dataSource: T[];
  /** Unique key field in data (defaults to "id") */
  rowKey?: keyof T & string;
  /** Custom row className */
  rowClassName?: string | ((record: T, index: number) => string);
  /** Selected row keys */
  selectedRowKeys?: (string | number)[];
  /** Row selection configuration (checkbox or radio) */
  rowSelection?: {
    /** Selection type */
    type: "checkbox" | "radio";
    /** Currently selected row keys */
    selectedRowKeys: (string | number)[];
    /** Called when selection changes — receives selected keys and full row data */
    onChange: (selectedKeys: (string | number)[], selectedRows: T[]) => void;
    /** Column width for selection column */
    columnWidth?: string;
    /** Fix selection column to left */
    fixed?: boolean;
  };
  /** Controlled sort state */
  sortState?: { columnKey: string; order: "asc" | "desc" } | null;
  /** Called when a sortable column header is clicked */
  onSortChange?: (sortState: { columnKey: string; order: "asc" | "desc" } | null) => void;
  /** Row accordion / expandable configuration */
  expandable?: {
    /** Render the expanded content for a row */
    expandedRowRender: (record: T, index: number) => React.ReactNode;
    /** Position of the expand toggle column: "start" (default), "end", or a column key */
    togglePosition?: "start" | "end" | string;
    /** Custom toggle element (receives expanded state). Defaults to chevron icon */
    expandToggle?: (expanded: boolean, record: T) => React.ReactNode;
    /** Controlled expanded row keys. If not provided, uses internal state */
    expandedRowKeys?: (string | number)[];
    /** Called when expanded rows change */
    onExpandChange?: (expandedKeys: (string | number)[]) => void;
    /** Width of the expand toggle column */
    columnWidth?: string;
    /** Whether only one row can be expanded at a time (accordion mode) */
    accordion?: boolean;
  };
  /** Row click handler */
  onRow?: (record: T, index: number) => HTMLAttributes<HTMLTableRowElement>;
  /** Header background color */
  headerBgColor?: string;
  /** Body background color */
  bodyBgColor?: string;
  /** Show ghost/shimmer for all body rows */
  isGhost?: boolean;
  /** Number of ghost rows to display (default: 5) */
  ghostRowsCount?: number;
  /** Array of specific row indices (0-based) to show as ghost */
  ghostRows?: number[];
}

export function Table<T extends Record<string, any> = any>({
  columns,
  dataSource,
  rowKey = "id" as keyof T & string,
  rowClassName,
  selectedRowKeys,
  rowSelection,
  sortState,
  onSortChange,
  expandable,
  onRow,
  headerBgColor,
  bodyBgColor,
  isGhost = false,
  ghostRowsCount = 5,
  ghostRows,
  testId,
  ...tableProps
}: TableProps<T>) {
  // Determine selection state
  const selKeys = rowSelection?.selectedRowKeys ?? selectedRowKeys ?? [];
  const selType = rowSelection?.type;
  const selColumnWidth = rowSelection?.columnWidth || "48px";
  const selFixed = rowSelection?.fixed ? "left" as const : undefined;

  const isAllSelected = selType === "checkbox" && dataSource.length > 0 && dataSource.every((r) => selKeys.includes(r[rowKey]));
  const isSomeSelected = selType === "checkbox" && selKeys.length > 0 && !isAllSelected;

  const handleSelectAll = () => {
    if (!rowSelection) return;
    if (isAllSelected) {
      rowSelection.onChange([], []);
    } else {
      const allKeys = dataSource.map((r) => r[rowKey]);
      rowSelection.onChange(allKeys, [...dataSource]);
    }
  };

  const handleSelectRow = (record: T) => {
    if (!rowSelection) return;
    const key = record[rowKey];
    if (selType === "radio") {
      rowSelection.onChange([key], [record]);
    } else {
      const nextKeys = selKeys.includes(key)
        ? selKeys.filter((k) => k !== key)
        : [...selKeys, key];
      const nextRows = dataSource.filter((r) => nextKeys.includes(r[rowKey]));
      rowSelection.onChange(nextKeys, nextRows);
    }
  };

  // Sort handling
  const handleSort = (columnKey: string) => {
    if (!onSortChange) return;
    if (sortState?.columnKey === columnKey) {
      // Cycle: asc → desc → null
      if (sortState.order === "asc") {
        onSortChange({ columnKey, order: "desc" });
      } else {
        onSortChange(null);
      }
    } else {
      onSortChange({ columnKey, order: "asc" });
    }
  };

  // Apply sorting to data
  let sortedData = dataSource;
  if (sortState) {
    const col = columns.find((c) => c.key === sortState.columnKey);
    if (col?.sorter) {
      const sorted = [...dataSource];
      if (typeof col.sorter === "function") {
        sorted.sort(col.sorter);
      } else if (col.dataIndex) {
        const field = col.dataIndex;
        sorted.sort((a, b) => {
          const aVal = a[field];
          const bVal = b[field];
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return -1;
          if (bVal == null) return 1;
          if (typeof aVal === "number" && typeof bVal === "number") return aVal - bVal;
          return String(aVal).localeCompare(String(bVal));
        });
      }
      if (sortState.order === "desc") sorted.reverse();
      sortedData = sorted;
    }
  }

  // ─── Expandable / Accordion ───────────────────────────────────────────────
  const [internalExpandedKeys, setInternalExpandedKeys] = useStateReact<(string | number)[]>([]);
  const expandedKeys = expandable?.expandedRowKeys ?? internalExpandedKeys;
  const togglePosition = expandable?.togglePosition ?? "start";
  const expandColumnWidth = expandable?.columnWidth ?? "48px";

  const isExpanded = (key: string | number) => expandedKeys.includes(key);

  const handleExpand = (key: string | number) => {
    if (!expandable) return;
    let nextKeys: (string | number)[];
    if (expandable.accordion) {
      nextKeys = isExpanded(key) ? [] : [key];
    } else {
      nextKeys = isExpanded(key)
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key];
    }
    if (expandable.onExpandChange) {
      expandable.onExpandChange(nextKeys);
    } else {
      setInternalExpandedKeys(nextKeys);
    }
  };

  const DefaultChevron = ({ open }: { open: boolean }) => (
    <span className={cn("tui-table__expand-toggle", open && "tui-table__expand-toggle--open")}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const renderExpandToggle = (record: T, key: string | number) => {
    const open = isExpanded(key);
    if (expandable?.expandToggle) {
      return (
        <span onClick={() => handleExpand(key)} style={{ cursor: "pointer" }}>
          {expandable.expandToggle(open, record)}
        </span>
      );
    }
    return (
      <span onClick={() => handleExpand(key)} style={{ cursor: "pointer" }}>
        <DefaultChevron open={open} />
      </span>
    );
  };

  // Determine total column count for expanded row colspan
  const totalCols =
    columns.length +
    (rowSelection ? 1 : 0) +
    (expandable && (togglePosition === "start" || togglePosition === "end") ? 1 : 0);

  return (
    <ExTable testId={testId} {...tableProps}>
      <TableHeader bgColor={headerBgColor}>
        <TableRow>
          {expandable && togglePosition === "start" && (
            <TableHeaderCell width={expandColumnWidth} className="tui-table__expand-cell" />
          )}
          {rowSelection && (
            <TableHeaderCell width={selColumnWidth} fixed={selFixed} fixedOffset={selFixed ? 0 : undefined} align="center">
              {selType === "checkbox" && (
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={handleSelectAll}
                  size="sm"
                />
              )}
            </TableHeaderCell>
          )}
          {columns.map((col) => (
            <TableHeaderCell
              key={col.key}
              title={col.title}
              subtitle={col.subtitle}
              extra={col.extra}
              align={col.align}
              width={col.width}
              minWidth={col.minWidth}
              maxWidth={col.maxWidth}
              fixed={col.fixed}
              fixedOffset={col.fixedOffset}
              borderLeft={col.borderLeft}
              borderRight={col.borderRight}
              borderColor={col.borderColor}
              borderWidth={col.borderWidth}
              className={col.headerClassName}
              sortable={!!col.sorter}
              sortOrder={sortState?.columnKey === col.key ? sortState.order : null}
              onSort={() => handleSort(col.key)}
            />
          ))}
          {expandable && togglePosition === "end" && (
            <TableHeaderCell width={expandColumnWidth} className="tui-table__expand-cell" />
          )}
        </TableRow>
      </TableHeader>
      <TableBody bgColor={bodyBgColor}>
        {isGhost ? (
          // Full ghost mode — render shimmer rows
          Array.from({ length: ghostRowsCount }, (_, rowIndex) => {
            const totalCellCount = columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0);
            return (
              <TableRow key={`ghost-${rowIndex}`}>
                {rowSelection && (
                  <TableRowLabel fixed={selFixed} fixedOffset={selFixed ? 0 : undefined}>
                    <Shimmer width="16px" height="16px" shape="rounded" />
                  </TableRowLabel>
                )}
                {expandable && togglePosition === "start" && (
                  <TableCell width={expandColumnWidth} className="tui-table__expand-cell">
                    <Shimmer width="16px" height="16px" shape="rounded" />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    width={col.width}
                    minWidth={col.minWidth}
                    maxWidth={col.maxWidth}
                    fixed={col.fixed}
                    fixedOffset={col.fixedOffset}
                    className={col.cellClassName}
                  >
                    <Shimmer width={`${55 + ((rowIndex * 7 + columns.indexOf(col) * 13) % 35)}%`} height="16px" shape="rounded" />
                  </TableCell>
                ))}
                {expandable && togglePosition === "end" && (
                  <TableCell width={expandColumnWidth} className="tui-table__expand-cell">
                    <Shimmer width="16px" height="16px" shape="rounded" />
                  </TableCell>
                )}
              </TableRow>
            );
          })
        ) : (
        sortedData.map((record, rowIndex) => {
          const key = String(record[rowKey] ?? rowIndex);
          const isSelected = selKeys.includes(record[rowKey] ?? rowIndex);
          const rowProps = onRow?.(record, rowIndex);
          const resolvedRowClassName =
            typeof rowClassName === "function"
              ? rowClassName(record, rowIndex)
              : rowClassName;
          const isRowGhost = ghostRows?.includes(rowIndex) ?? false;

          return (
            <React.Fragment key={key}>
              <TableRow
                selected={!isRowGhost && isSelected}
                className={resolvedRowClassName}
                {...(isRowGhost ? {} : rowProps)}
              >
                {isRowGhost ? (
                  <>
                    {expandable && togglePosition === "start" && (
                      <TableCell width={expandColumnWidth} className="tui-table__expand-cell">
                        <Shimmer width="16px" height="16px" shape="rounded" />
                      </TableCell>
                    )}
                    {rowSelection && (
                      <TableRowLabel fixed={selFixed} fixedOffset={selFixed ? 0 : undefined}>
                        <Shimmer width="16px" height="16px" shape="rounded" />
                      </TableRowLabel>
                    )}
                    {columns.map((col, colIdx) => (
                      <TableCell
                        key={col.key}
                        align={col.align}
                        width={col.width}
                        minWidth={col.minWidth}
                        maxWidth={col.maxWidth}
                        fixed={col.fixed}
                        fixedOffset={col.fixedOffset}
                        className={col.cellClassName}
                      >
                        <Shimmer width={`${55 + ((rowIndex * 7 + colIdx * 13) % 35)}%`} height="16px" shape="rounded" />
                      </TableCell>
                    ))}
                    {expandable && togglePosition === "end" && (
                      <TableCell width={expandColumnWidth} className="tui-table__expand-cell">
                        <Shimmer width="16px" height="16px" shape="rounded" />
                      </TableCell>
                    )}
                  </>
                ) : (
                  <>
                {expandable && togglePosition === "start" && (
                  <TableCell width={expandColumnWidth} className="tui-table__expand-cell">
                    {renderExpandToggle(record, record[rowKey] ?? rowIndex)}
                  </TableCell>
                )}
                {rowSelection && (
                  <TableRowLabel fixed={selFixed} fixedOffset={selFixed ? 0 : undefined}>
                    {selType === "checkbox" && (
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectRow(record)}
                        size="sm"
                      />
                    )}
                    {selType === "radio" && (
                      <Radio
                        name={`datatable-radio-${testId || "default"}`}
                        value={key}
                        checked={isSelected}
                        onChange={() => handleSelectRow(record)}
                        size="sm"
                      />
                    )}
                  </TableRowLabel>
                )}
                {columns.map((col) => {
                  const value = col.dataIndex ? record[col.dataIndex] : undefined;
                  const content = col.render
                    ? col.render(value, record, rowIndex)
                    : value;

                  // If togglePosition matches this column key, prepend the toggle
                  const showToggleInCol = expandable && togglePosition === col.key;

                  return (
                    <TableCell
                      key={col.key}
                      align={col.align}
                      width={col.width}
                      minWidth={col.minWidth}
                      maxWidth={col.maxWidth}
                      fixed={col.fixed}
                      fixedOffset={col.fixedOffset}
                      borderLeft={col.borderLeft}
                      borderRight={col.borderRight}
                      borderColor={col.borderColor}
                      borderWidth={col.borderWidth}
                      className={col.cellClassName}
                      isGhost={col.isGhost}
                      ghostWidth={col.ghostWidth}
                    >
                      {!col.isGhost && (showToggleInCol ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--tui-spacing-2)" }}>
                          {renderExpandToggle(record, record[rowKey] ?? rowIndex)}
                          <span>{content}</span>
                        </div>
                      ) : (
                        content
                      ))}
                      {col.isGhost && content}
                    </TableCell>
                  );
                })}
                {expandable && togglePosition === "end" && (
                  <TableCell width={expandColumnWidth} className="tui-table__expand-cell">
                    {renderExpandToggle(record, record[rowKey] ?? rowIndex)}
                  </TableCell>
                )}
                  </>
                )}
              </TableRow>
              {!isRowGhost && expandable && isExpanded(record[rowKey] ?? rowIndex) && (
                <tr className="tui-table__row tui-table__expand-row">
                  <td className="tui-table__cell" colSpan={totalCols}>
                    {expandable.expandedRowRender(record, rowIndex)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })
        )}
      </TableBody>
    </ExTable>
  );
}

Table.displayName = "Table";
