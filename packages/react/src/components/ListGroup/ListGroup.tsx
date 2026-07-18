import { Children, forwardRef, isValidElement, useState } from "react";
import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { ListItem } from "../ListItem/ListItem";
import type { ListItemProps } from "../ListItem/ListItem";
import "./ListGroup.css";

function hasListGroupContent(content: ReactNode): boolean {
  if (content === null || content === undefined || content === false) return false;
  return typeof content !== "string" || content.trim().length > 0;
}

export type ListGroupSelectionType = "checkbox" | "radio";
export type ListGroupRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full"
  | (string & {});

function resolveRadius(value: ListGroupRadius | undefined): string | undefined {
  if (!value) return undefined;
  switch (value) {
    case "none": return "var(--tui-radius-none, 0)";
    case "sm": return "var(--tui-radius-sm)";
    case "md": return "var(--tui-radius-md)";
    case "lg": return "var(--tui-radius-lg)";
    case "xl": return "var(--tui-radius-xl)";
    case "2xl": return "var(--tui-radius-2xl)";
    case "3xl": return "var(--tui-radius-3xl)";
    case "full": return "var(--tui-radius-full)";
    default: return value;
  }
}

export interface ListGroupItem
  extends Omit<ListItemProps, "selection" | "selectionPosition" | "selectionAlign"> {
  /** Stable identifier used for selection and React keys */
  id: string;
  /** Selection value; defaults to id */
  value?: string;
}

type ListGroupSelectionConfig = {
  type?: ListGroupSelectionType;
  position: "left" | "right";
  align: "title" | "center";
  selectedValue?: string;
  selectedValues: string[];
  selectionName: string;
  onSelect: (value: string) => void;
};

function getItemValue(item: { id?: string; value?: string }): string | undefined {
  return item.value ?? item.id;
}

/**
 * ListGroup controls the surface/header scale while keeping its ListItem rows
 * one step more compact. Explicit ListItem sizes still take precedence.
 */
function getInheritedItemSize(size: Size): Size {
  switch (size) {
    case "sm":
      return "xs";
    case "md":
      return "sm";
    case "lg":
      return "md";
    case "xl":
      return "lg";
    case "xs":
    default:
      return "xs";
  }
}

function renderListItem(
  itemProps: ListItemProps & { value?: string },
  key: string,
  group: {
    itemSize: Size;
    intent: Intent;
    separators: boolean;
    selection: ListGroupSelectionConfig;
  },
) {
  const value = getItemValue(itemProps);
  const isSelected = value !== undefined && (
    group.selection.type === "radio"
      ? group.selection.selectedValue === value
      : group.selection.selectedValues.includes(value)
  );
  const groupSelection = group.selection.type && value !== undefined
    ? group.selection.type === "checkbox"
      ? {
          type: "checkbox" as const,
          checked: isSelected,
          onChange: () => group.selection.onSelect(value),
        }
      : {
          type: "radio" as const,
          checked: isSelected,
          name: group.selection.selectionName,
          value,
          onChange: () => group.selection.onSelect(value),
        }
    : undefined;

  return (
    <ListItem
      key={key}
      {...itemProps}
      intent={itemProps.intent ?? group.intent}
      size={itemProps.size ?? group.itemSize}
      bordered={itemProps.bordered ?? group.separators}
      divider={itemProps.divider ?? itemProps.bordered ?? group.separators}
      selection={itemProps.selection ?? groupSelection}
      selectionPosition={itemProps.selectionPosition ?? group.selection.position}
      selectionAlign={itemProps.selectionAlign ?? group.selection.align}
      selected={itemProps.selected ?? isSelected}
      onClick={value !== undefined && group.selection.type
        ? () => {
            group.selection.onSelect(value);
            itemProps.onClick?.();
          }
        : itemProps.onClick}
    />
  );
}

function renderListGroupChildren(
  children: ReactNode,
  group: {
    itemSize: Size;
    intent: Intent;
    separators: boolean;
    selection: ListGroupSelectionConfig;
  },
) {
  return Children.map(children, (child) => {
    if (!isValidElement<ListItemProps & { value?: string }>(child) || child.type !== ListItem) {
      return child;
    }

    return renderListItem(child.props, String(child.key ?? child.props.id ?? "item"), group);
  });
}

export interface ListGroupProps
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  /** Optional content rendered above the ListItem children */
  header?: ReactNode;
  /** Optional content rendered below the ListItem children */
  footer?: ReactNode;
  /** Color intent inherited by ListItem children unless they provide their own intent */
  intent?: Intent;
  /** Group/header size; inherited ListItem rows use a compact mapped size unless explicitly overridden */
  size?: Size;
  /** Render separators between ListItem children */
  separators?: boolean;
  /** Render rounded corners independently from the outer border */
  rounded?: boolean;
  /** Base radius preset or custom CSS radius value */
  radiusSize?: ListGroupRadius;
  /** Top-left and top-right radius preset or custom CSS radius value */
  radiusTop?: ListGroupRadius;
  /** Bottom-left and bottom-right radius preset or custom CSS radius value */
  radiusBottom?: ListGroupRadius;
  /** Render an outer border */
  bordered?: boolean;
  /** JSON-friendly ListItem definitions rendered when children are not provided */
  items?: ListGroupItem[];
  /** Add a controlled checkbox or radio selection to ListItem children/items */
  selection?: ListGroupSelectionType;
  /** Shortcut for selection="checkbox" */
  isCheckbox?: boolean;
  /** Checkbox/radio position; left/right and start/end are supported */
  selectionPosition?: "left" | "right" | "start" | "end";
  /** Checkbox/radio vertical alignment */
  selectionAlign?: "title" | "center";
  /** Controlled single-selection value for radio mode */
  value?: string;
  /** Initial single-selection value for radio mode */
  defaultValue?: string;
  /** Controlled multiple-selection values for checkbox mode */
  values?: string[];
  /** Initial multiple-selection values for checkbox mode */
  defaultValues?: string[];
  /** Called when the selected radio value changes */
  onValueChange?: (value: string) => void;
  /** Called when the selected checkbox values change */
  onValuesChange?: (values: string[]) => void;
}

export const ListGroup = forwardRef<HTMLDivElement, ListGroupProps>(
  (
    {
      header,
      footer,
      intent = "default",
      size = "md",
      separators = true,
      rounded = true,
      radiusSize = "lg",
      radiusTop,
      radiusBottom,
      bordered = true,
      items,
      selection,
      isCheckbox = false,
      selectionPosition = "left",
      selectionAlign = "title",
      value,
      defaultValue,
      values,
      defaultValues = [],
      onValueChange,
      onValuesChange,
      className,
      style,
      children,
      testId,
      ...rest
    },
    ref,
  ) => {
    const effectiveIntent = intent === "default" ? "primary" : intent;
    const hasHeader = hasListGroupContent(header);
    const hasFooter = hasListGroupContent(footer);
    const effectiveSelection = isCheckbox ? "checkbox" : selection;
    const effectivePosition = selectionPosition === "start"
      ? "left"
      : selectionPosition === "end"
        ? "right"
        : selectionPosition;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [uncontrolledValues, setUncontrolledValues] = useState(defaultValues);
    const selectedValue = value ?? uncontrolledValue;
    const selectedValues = values ?? uncontrolledValues;
    const handleSelect = (selectedItemValue: string) => {
      if (effectiveSelection === "checkbox") {
        const nextValues = selectedValues.includes(selectedItemValue)
          ? selectedValues.filter((itemValue) => itemValue !== selectedItemValue)
          : [...selectedValues, selectedItemValue];
        if (values === undefined) setUncontrolledValues(nextValues);
        onValuesChange?.(nextValues);
        return;
      }

      if (effectiveSelection === "radio") {
        if (value === undefined) setUncontrolledValue(selectedItemValue);
        onValueChange?.(selectedItemValue);
      }
    };
    const selectionConfig: ListGroupSelectionConfig = {
      type: effectiveSelection,
      position: effectivePosition,
      align: selectionAlign,
      selectedValue,
      selectedValues,
      selectionName: `${testId ?? "tui-list-group"}-selection`,
      onSelect: handleSelect,
    };
    const groupConfig = {
      itemSize: getInheritedItemSize(size),
      intent: effectiveIntent,
      separators,
      selection: selectionConfig,
    };
    const renderedItems = items
      ? items.map(({ id, ...item }) => renderListItem({ ...item, value: item.value ?? id }, id, groupConfig))
      : renderListGroupChildren(children, groupConfig);
    const groupStyle = {
      "--tui-list-group-radius-top": resolveRadius(radiusTop ?? radiusSize),
      "--tui-list-group-radius-bottom": resolveRadius(radiusBottom ?? radiusSize),
      ...style,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "tui-list-group",
          `tui-list-group--${effectiveIntent}`,
          `tui-list-group--${size}`,
          bordered && "tui-list-group--bordered",
          rounded && "tui-list-group--rounded",
          separators && "tui-list-group--separators",
          className,
        )}
        style={groupStyle}
        data-testid={testId}
        {...rest}
      >
        {hasHeader && <div className="tui-list-group__header">{header}</div>}
        <div className="tui-list-group__items">{renderedItems}</div>
        {hasFooter && <div className="tui-list-group__footer">{footer}</div>}
      </div>
    );
  },
);

ListGroup.displayName = "ListGroup";
