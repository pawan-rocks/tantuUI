import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import type {
    ChangeEvent,
    CSSProperties,
    ForwardedRef,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from "react";
import type { BaseProps, Intent, Size } from "../../types";
import type { InputVariant } from "../Input/Input";
import { Input } from "../Input/Input";
import { ListItem } from "../ListItem/ListItem";
import { Popover } from "../Popover/Popover";
import { Tag } from "../Tag/Tag";
import { cn } from "../../utils/cn";
import "./Dropdown.css";

export interface DropdownOption {
    /** Stable option value */
    value: string;
    /** Visible option label */
    label: ReactNode;
    /** Optional text used for autocomplete filtering */
    searchText?: string;
    /** Secondary option content */
    subtitle?: ReactNode;
    /** Icon before the title */
    titlePrefixIcon?: ReactNode;
    /** Icon after the title */
    titleSuffixIcon?: ReactNode;
    /** Icon before the subtitle */
    subtitlePrefixIcon?: ReactNode;
    /** Icon after the subtitle */
    subtitleSuffixIcon?: ReactNode;
    /** Prevent selecting this option */
    disabled?: boolean;
}

export interface DropdownTagRenderContext {
    /** Position of this tag in the selected values list */
    index: number;
    /** Current Dropdown intent */
    intent: Intent;
    /** Remove this option from the selection */
    onRemove: () => void;
}

export interface DropdownOptionRenderContext {
    /** Whether this option is currently selected */
    selected: boolean;
    /** Whether this option is highlighted by pointer or keyboard navigation */
    highlighted: boolean;
    /** Whether this option is disabled */
    disabled: boolean;
    /** Whether the Dropdown is in multiple-selection mode */
    multiple: boolean;
    /** Current Dropdown intent */
    intent: Intent;
}

type DropdownSize = Exclude<Size, "">;

interface DropdownSizeMapping {
    xs: DropdownSize;
    sm: DropdownSize;
    md: DropdownSize;
    lg: DropdownSize;
    xl: DropdownSize;
}

const dropDownSizeMapping: DropdownSizeMapping = {
    xs: "xs",
    sm: "xs",
    md: "sm",
    lg: "md",
    xl: "lg",
};

function getDropdownOptionSize(size: Size): DropdownSize {
    return dropDownSizeMapping[(size || "md") as DropdownSize];
}

export interface DropdownProps
    extends BaseProps,
    Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "className" | "style" | "size" | "value" | "defaultValue" | "onChange" | "children" | "prefix"
    > {
    /** Available options. Async results replace these options while loading. */
    options?: DropdownOption[];
    /** Input size */
    size?: Size;
    /** Input visual variant */
    variant?: InputVariant;
    /** Color intent */
    intent?: Intent;
    /** Placeholder shown when no option is selected */
    placeholder?: string;
    /** Enable autocomplete filtering and editable input */
    autocomplete?: boolean;
    /** Enable multiple selection with checkboxes on the left */
    multiple?: boolean;
    /** Convert an option to the text used by the native input and default tags */
    displayFn?: (option: DropdownOption) => string;
    /** Render a custom removable tag for each selected option in multiple mode */
    tagRenderOption?: (option: DropdownOption, context: DropdownTagRenderContext) => ReactNode;
    /** Maximum number of selected tags shown before a +count summary tag */
    maxTagsVisible?: number;
    /** Show dividers between dropdown options; defaults to true */
    divider?: boolean;
    /** Render custom option content while Dropdown keeps row semantics and selection behavior */
    renderOption?: (option: DropdownOption, context: DropdownOptionRenderContext) => ReactNode;
    /** Controlled single selected value */
    value?: string | null;
    /** Initial single selected value */
    defaultValue?: string | null;
    /** Called when a single option is selected or cleared */
    onChange?: (value: string | null, option?: DropdownOption) => void;
    /** Controlled multiple selected values */
    values?: string[];
    /** Initial multiple selected values */
    defaultValues?: string[];
    /** Called when multiple selected values change */
    onValuesChange?: (values: string[], options: DropdownOption[]) => void;
    /** Filter behavior. Defaults to label matching when autocomplete is enabled. */
    filterOption?: boolean | ((inputValue: string, option: DropdownOption) => boolean);
    /** Called whenever the autocomplete query changes */
    onSearch?: (query: string) => void;
    /** Load options asynchronously for the current query */
    loadOptions?: (query: string) => Promise<DropdownOption[]> | DropdownOption[];
    /** Show loading state while loading options */
    loading?: boolean;
    /** Content shown when filtering returns no options */
    noResults?: ReactNode;
    /** Content shown when the options collection is empty */
    noOptions?: ReactNode;
    /** Show an input clear button */
    clearable?: boolean;
    /** Controlled open state */
    open?: boolean;
    /** Initial open state */
    defaultOpen?: boolean;
    /** Called when the menu opens or closes */
    onOpenChange?: (open: boolean) => void;
    /** Popover placement */
    placement?: "auto" | "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    /** Popover offset in pixels */
    offset?: number;
    /** Maximum menu height as a CSS value */
    maxMenuHeight?: string;
    /** Menu width: trigger matches the input, content sizes to its options, or any CSS width */
    dropdownWidth?: "trigger" | "content" | (string & {});
    /** Minimum menu width; defaults to 0px so trigger mode is edge-to-edge */
    dropdownMinWidth?: string;
    /** Icon rendered before the input */
    leadingIcon?: ReactNode;
    /** Text or element rendered before the input */
    prefix?: ReactNode;
    /** Text or element rendered after the input */
    suffix?: ReactNode;
    /** Invalid/error state */
    isInvalid?: boolean;
    /** Ghost/skeleton state */
    isGhost?: boolean;
}

function nodeToText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(nodeToText).join("");
    return "";
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <svg
            className={cn("tui-dropdown__chevron", isOpen && "tui-dropdown__chevron--open")}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function setForwardedRef<T>(ref: ForwardedRef<T>, value: T | null) {
    if (typeof ref === "function") ref(value);
    else if (ref && typeof ref === "object") {
        (ref as unknown as { current: T | null }).current = value;
    }
}

export const Dropdown = forwardRef<HTMLInputElement, DropdownProps>(
    (
        {
            options = [],
            size = "md",
            variant = "outline",
            intent = "default",
            placeholder = "Select an option",
            autocomplete = false,
            multiple = false,
            displayFn,
            tagRenderOption,
            maxTagsVisible,
            divider = true,
            renderOption,
            value,
            defaultValue = null,
            onChange,
            values,
            defaultValues = [],
            onValuesChange,
            filterOption = true,
            onSearch,
            loadOptions,
            loading = false,
            noResults = "No results found",
            noOptions = "No options",
            clearable = false,
            open,
            defaultOpen = false,
            onOpenChange,
            placement = "bottom-start",
            offset = 4,
            maxMenuHeight = "20rem",
            dropdownWidth = "trigger",
            dropdownMinWidth = "0px",
            leadingIcon,
            prefix,
            suffix,
            isInvalid = false,
            isGhost = false,
            disabled = false,
            className,
            style,
            testId,
            onFocus,
            onKeyDown,
            ...rest
        },
        forwardedRef,
    ) => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement | null>(null);
        const listboxId = `tui-dropdown-${useId().replace(/:/g, "")}`;
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
        const [internalValues, setInternalValues] = useState(defaultValues);
        const [query, setQuery] = useState("");
        const [highlightedIndex, setHighlightedIndex] = useState(-1);
        const [loadedOptions, setLoadedOptions] = useState<DropdownOption[] | undefined>();
        const [asyncLoading, setAsyncLoading] = useState(false);
        const [triggerWidth, setTriggerWidth] = useState<number>();
        const requestId = useRef(0);

        const isOpen = open ?? internalOpen;
        const selectedValue = value !== undefined ? value : internalValue;
        const selectedValues = values ?? internalValues;
        const availableOptions = loadedOptions ?? options;
        const optionCache = useRef(new Map<string, DropdownOption>());
        [...options, ...availableOptions].forEach((option) => optionCache.current.set(option.value, option));
        const getOptionText = (option: DropdownOption) => displayFn?.(option) ?? nodeToText(option.label);
        const getOptionsForValues = (nextValues: string[]) => nextValues
            .map((optionValue) => optionCache.current.get(optionValue))
            .filter((option): option is DropdownOption => option !== undefined);
        const selectedOptions = getOptionsForValues(selectedValues);
        const selectedOption = selectedValue === null || selectedValue === undefined
            ? undefined
            : optionCache.current.get(selectedValue);
        const selectedLabel = multiple
            ? selectedOptions.map(getOptionText).join(", ")
            : selectedOption ? getOptionText(selectedOption) : "";
        const inputValue = autocomplete ? query : multiple ? "" : selectedLabel;

        const setInputRef = useCallback(
            (node: HTMLInputElement | null) => {
                inputRef.current = node;
                setForwardedRef(forwardedRef, node);
            },
            [forwardedRef],
        );

        const setMenuOpen = useCallback(
            (nextOpen: boolean, syncAutocompleteQuery = true) => {
                if (disabled) return;
                if (open === undefined) setInternalOpen(nextOpen);
                onOpenChange?.(nextOpen);
                if (nextOpen) {
                    setTriggerWidth(
                        dropdownRef.current?.getBoundingClientRect().width
                        ?? inputRef.current?.getBoundingClientRect().width,
                    );
                    if (autocomplete && syncAutocompleteQuery) {
                        setQuery(multiple ? "" : selectedLabel);
                    }
                }
            },
            [autocomplete, disabled, multiple, onOpenChange, open, selectedLabel],
        );

        const filteredOptions = useMemo(() => {
            if (!autocomplete || query.length === 0 || filterOption === false) return availableOptions;
            return availableOptions.filter((option) => {
                if (typeof filterOption === "function") return filterOption(query, option);
                const searchableText = option.searchText ?? getOptionText(option);
                return searchableText.toLocaleLowerCase().includes(query.toLocaleLowerCase());
            });
        }, [autocomplete, availableOptions, displayFn, filterOption, query]);

        useEffect(() => {
            if (!loadOptions || !isOpen) return;
            const currentRequest = ++requestId.current;
            setAsyncLoading(true);
            Promise.resolve(loadOptions(autocomplete ? query : "")).then(
                (nextOptions) => {
                    if (currentRequest === requestId.current) setLoadedOptions(nextOptions);
                },
                () => {
                    if (currentRequest === requestId.current) setLoadedOptions([]);
                },
            ).finally(() => {
                if (currentRequest === requestId.current) setAsyncLoading(false);
            });
        }, [autocomplete, isOpen, loadOptions, query]);

        useEffect(() => {
            if (!isOpen || !dropdownRef.current || typeof ResizeObserver === "undefined") return;
            const observer = new ResizeObserver(([entry]) => {
                if (entry) setTriggerWidth(entry.contentRect.width);
            });
            observer.observe(dropdownRef.current);
            return () => observer.disconnect();
        }, [isOpen]);

        useEffect(() => {
            const firstEnabledIndex = filteredOptions.findIndex((option) => !option.disabled);
            setHighlightedIndex(firstEnabledIndex);
        }, [filteredOptions]);

        const moveHighlight = (direction: 1 | -1) => {
            if (filteredOptions.length === 0) return;
            let nextIndex = highlightedIndex;
            for (let count = 0; count < filteredOptions.length; count += 1) {
                nextIndex = (nextIndex + direction + filteredOptions.length) % filteredOptions.length;
                if (!filteredOptions[nextIndex]?.disabled) {
                    setHighlightedIndex(nextIndex);
                    return;
                }
            }
        };

        const updateMultipleValues = (nextValues: string[]) => {
            if (values === undefined) setInternalValues(nextValues);
            onValuesChange?.(nextValues, getOptionsForValues(nextValues));
        };

        const removeSelection = (optionValue: string) => {
            if (!multiple) return;
            updateMultipleValues(selectedValues.filter((itemValue) => itemValue !== optionValue));
            setQuery("");
            inputRef.current?.focus();
        };

        const selectOption = (option: DropdownOption) => {
            if (option.disabled) return;
            if (multiple) {
                const nextValues = selectedValues.includes(option.value)
                    ? selectedValues.filter((itemValue) => itemValue !== option.value)
                    : [...selectedValues, option.value];
                updateMultipleValues(nextValues);
                setQuery("");
                return;
            }

            if (value === undefined) setInternalValue(option.value);
            onChange?.(option.value, option);
            setQuery(getOptionText(option));
            setMenuOpen(false);
        };

        const clearSelection = () => {
            setQuery("");
            if (multiple) {
                updateMultipleValues([]);
            } else {
                if (value === undefined) setInternalValue(null);
                onChange?.(null);
            }
            inputRef.current?.focus();
        };

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (!autocomplete) return;
            const nextQuery = event.target.value;
            setQuery(nextQuery);
            setMenuOpen(true, false);
            onSearch?.(nextQuery);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (disabled) return;
            if (event.key === "Escape") {
                if (isOpen) {
                    event.preventDefault();
                    setMenuOpen(false);
                }
                onKeyDown?.(event);
                return;
            }
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                if (!isOpen) {
                    setMenuOpen(true);
                    return;
                }
                moveHighlight(event.key === "ArrowDown" ? 1 : -1);
                onKeyDown?.(event);
                return;
            }
            if (event.key === "Home" || event.key === "End") {
                if (isOpen && filteredOptions.length > 0) {
                    event.preventDefault();
                    const direction = event.key === "Home" ? 1 : -1;
                    let index = -1;
                    if (direction === 1) {
                        index = filteredOptions.findIndex((option) => !option.disabled);
                    } else {
                        for (let optionIndex = filteredOptions.length - 1; optionIndex >= 0; optionIndex -= 1) {
                            if (!filteredOptions[optionIndex]?.disabled) {
                                index = optionIndex;
                                break;
                            }
                        }
                    }
                    setHighlightedIndex(index);
                }
                onKeyDown?.(event);
                return;
            }
            if (event.key === "Enter" && isOpen) {
                const option = filteredOptions[highlightedIndex];
                if (option && !option.disabled) {
                    event.preventDefault();
                    selectOption(option);
                }
                onKeyDown?.(event);
                return;
            }
            onKeyDown?.(event);
        };

        const hasSelection = multiple ? selectedValues.length > 0 : selectedValue !== null && selectedValue !== undefined;
        const hasInputValue = inputValue.length > 0;
        const normalizedMaxTagsVisible = typeof maxTagsVisible === "number" && Number.isFinite(maxTagsVisible)
            ? Math.max(0, Math.floor(maxTagsVisible))
            : undefined;
        const visibleTagOptions = normalizedMaxTagsVisible === undefined
            ? selectedOptions
            : selectedOptions.slice(0, normalizedMaxTagsVisible);
        const hiddenTagCount = selectedOptions.length - visibleTagOptions.length;
        const selectedTags = multiple && selectedOptions.length > 0 ? (
            <span className="tui-dropdown__tags" aria-label={`${selectedOptions.length} selected options`}>
                {visibleTagOptions.map((option, index) => (
                    <span className="tui-dropdown__tag" key={option.value}>
                        {tagRenderOption
                            ? tagRenderOption(option, {
                                index,
                                intent,
                                onRemove: () => removeSelection(option.value),
                            })
                            : (
                                <Tag
                                    label={getOptionText(option)}
                                    intent={intent}
                                    size={size}
                                    onRemove={() => removeSelection(option.value)}
                                />
                            )}
                    </span>
                ))}
                {hiddenTagCount > 0 && (
                    <Tag
                        label={`+${hiddenTagCount}`}
                        intent={intent}
                        size={size}
                        title={`${hiddenTagCount} more selected`}
                    />
                )}
            </span>
        ) : undefined;
        const multipleClearButton = multiple && clearable && (hasSelection || hasInputValue) ? (
            <button
                type="button"
                className="tui-dropdown__clear"
                aria-label="Clear selection"
                onClick={clearSelection}
                tabIndex={-1}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M11 3 3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
        ) : undefined;
        const inputPrefix = multiple && (prefix || selectedTags) ? <>{prefix}{selectedTags}</> : prefix;
        const inputSuffix = multiple && (suffix || multipleClearButton)
            ? <>{suffix}{multipleClearButton}</>
            : suffix;
        const menuStyle = {
            width: dropdownWidth === "content"
                ? "max-content"
                : dropdownWidth === "trigger"
                    ? (triggerWidth ? `${triggerWidth}px` : undefined)
                    : dropdownWidth,
            "--tui-dropdown-min-width": dropdownMinWidth,
            "--tui-dropdown-max-height": maxMenuHeight,
        } as CSSProperties;

        if (isGhost) {
            return (
                <div ref={dropdownRef} className={cn("tui-dropdown", className)} style={style} data-testid={testId}>
                    <Input size={size} variant={variant} intent={intent} isGhost />
                </div>
            );
        }

        return (
            <div ref={dropdownRef} className={cn("tui-dropdown", className)} style={style} data-testid={testId}>
                <Input
                    {...rest}
                    ref={setInputRef}
                    size={size}
                    variant={variant}
                    intent={intent}
                    isInvalid={isInvalid}
                    disabled={disabled}
                    className={cn("tui-dropdown__input", multiple && "tui-dropdown__input--multiple")}
                    leadingIcon={leadingIcon}
                    prefix={inputPrefix}
                    suffix={inputSuffix}
                    value={inputValue}
                    placeholder={placeholder}
                    readOnly={!autocomplete}
                    clearable={!multiple && clearable && (hasInputValue || hasSelection)}
                    onClear={clearSelection}
                    onChange={handleInputChange}
                    onFocus={(event) => {
                        onFocus?.(event);
                        setMenuOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    trailingIcon={<ChevronIcon isOpen={isOpen} />}
                    aria-expanded={isOpen}
                    aria-controls={listboxId}
                    aria-haspopup="listbox"
                    aria-autocomplete={autocomplete ? "list" : "none"}
                />
                <Popover
                    triggerRef={dropdownRef}
                    isOpen={isOpen}
                    onClose={() => setMenuOpen(false)}
                    placement={placement}
                    offset={offset}
                    className={cn(
                        "tui-dropdown__popover",
                        `tui-dropdown__popover--${intent}`,
                    )}
                    positionStrategy="fixed"
                    style={menuStyle}
                >
                    <div
                        id={listboxId}
                        className="tui-dropdown__menu"
                        role="listbox"
                        aria-multiselectable={multiple || undefined}
                    >
                        {(loading || asyncLoading) && (
                            <div className="tui-dropdown__status" role="status">Loading…</div>
                        )}
                        {!loading && !asyncLoading && filteredOptions.length === 0 && (
                            <div className="tui-dropdown__status" role="status">
                                {availableOptions.length === 0 ? noOptions : noResults}
                            </div>
                        )}
                        {!loading && !asyncLoading && filteredOptions.map((option, index) => {
                            const isSelected = multiple
                                ? selectedValues.includes(option.value)
                                : selectedValue === option.value;
                            return (
                                <ListItem
                                    key={option.value}
                                    value={option.value}
                                    title={option.label}
                                    subtitle={option.subtitle}
                                    titlePrefixIcon={option.titlePrefixIcon}
                                    titleSuffixIcon={option.titleSuffixIcon}
                                    subtitlePrefixIcon={option.subtitlePrefixIcon}
                                    subtitleSuffixIcon={option.subtitleSuffixIcon}
                                    children={renderOption ? (
                                        <span className="tui-dropdown__custom-option">
                                            {renderOption(option, {
                                                selected: isSelected,
                                                highlighted: index === highlightedIndex,
                                                disabled: !!option.disabled,
                                                multiple,
                                                intent,
                                            })}
                                        </span>
                                    ) : undefined}
                                    intent={intent}
                                    size={getDropdownOptionSize(size)}
                                    selected={isSelected}
                                    disabled={option.disabled}
                                    hoverable
                                    divider={divider}
                                    className={cn(
                                        "tui-dropdown__option",
                                        index === highlightedIndex && "tui-dropdown__option--highlighted",
                                    )}
                                    selection={multiple ? {
                                        type: "checkbox",
                                        checked: isSelected,
                                        onChange: () => selectOption(option),
                                    } : undefined}
                                    selectionPosition="left"
                                    selectionAlign="title"
                                    role="option"
                                    aria-selected={isSelected}
                                    aria-disabled={option.disabled || undefined}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    onMouseLeave={() => setHighlightedIndex(-1)}
                                    onClick={() => selectOption(option)}
                                />
                            );
                        })}
                    </div>
                </Popover>
            </div>
        );
    },
);

Dropdown.displayName = "Dropdown";
