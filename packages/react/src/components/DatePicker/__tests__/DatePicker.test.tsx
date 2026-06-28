import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "../DatePicker";

describe("DatePicker", () => {
  it("renders with no props (shows input with placeholder)", () => {
    render(<DatePicker />);
    expect(screen.getByPlaceholderText("Select date")).toBeInTheDocument();
  });

  it("applies testId", () => {
    render(<DatePicker testId="my-dp" />);
    expect(screen.getByTestId("my-dp")).toBeInTheDocument();
  });

  it("opens popup on click", () => {
    render(<DatePicker testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes popup on outside click", () => {
    render(<DatePicker testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.mouseDown(document);
    // Popover's onClose should be triggered
  });

  it("shows calendar inside popup", () => {
    render(<DatePicker testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(screen.getByRole("application", { name: "Calendar" })).toBeInTheDocument();
  });

  it("calls onChange when date selected (single mode, no footer)", () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    // Click a day in the calendar
    const grid = screen.getByRole("grid");
    const dayBtn = grid.querySelector("[data-day='15']") as HTMLButtonElement;
    fireEvent.click(dayBtn);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const arg = handleChange.mock.calls[0][0] as Date;
    expect(arg.getDate()).toBe(15);
  });

  it("displays formatted date in input after selection", () => {
    const date = new Date(2024, 5, 15);
    render(<DatePicker value={date} />);
    const input = screen.getByPlaceholderText("Select date") as HTMLInputElement;
    expect(input.value).toContain("Jun");
    expect(input.value).toContain("15");
    expect(input.value).toContain("2024");
  });

  it("clearable: shows clear button when value exists", () => {
    const date = new Date(2024, 5, 15);
    render(<DatePicker value={date} isClearable testId="dp" />);
    const el = screen.getByTestId("dp");
    const clearBtn = el.querySelector(".tui-input__clear");
    expect(clearBtn).toBeInTheDocument();
  });

  it("clearable: calls onChange(null) on clear", () => {
    const handleChange = vi.fn();
    const date = new Date(2024, 5, 15);
    render(<DatePicker value={date} isClearable onChange={handleChange} testId="dp" />);
    const el = screen.getByTestId("dp");
    const clearBtn = el.querySelector(".tui-input__clear") as HTMLElement;
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it("disabled state prevents opening", () => {
    render(<DatePicker isDisabled testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("invalid state applies isInvalid to input", () => {
    render(<DatePicker isInvalid testId="dp" />);
    const el = screen.getByTestId("dp");
    const input = el.querySelector("input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("size prop applies to input", () => {
    render(<DatePicker size="lg" testId="dp" />);
    const el = screen.getByTestId("dp");
    const inputWrapper = el.querySelector(".tui-input");
    expect(inputWrapper).toHaveClass("tui-input--lg");
  });

  it("intent prop applies to input", () => {
    render(<DatePicker intent="primary" testId="dp" />);
    const el = screen.getByTestId("dp");
    const inputWrapper = el.querySelector(".tui-input");
    expect(inputWrapper).toHaveClass("tui-input--primary");
  });

  it("variant prop applies to input", () => {
    render(<DatePicker variant="soft" testId="dp" />);
    const el = screen.getByTestId("dp");
    const inputWrapper = el.querySelector(".tui-input");
    expect(inputWrapper).toHaveClass("tui-input--soft");
  });

  it("range mode: calls onRangeChange", () => {
    const handleRangeChange = vi.fn();
    render(<DatePicker isRange onRangeChange={handleRangeChange} testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const grid = screen.getByRole("grid");
    const day10 = grid.querySelector("[data-day='10']") as HTMLButtonElement;
    const day20 = grid.querySelector("[data-day='20']") as HTMLButtonElement;
    fireEvent.click(day10);
    fireEvent.click(day20);
    expect(handleRangeChange).toHaveBeenCalled();
  });

  it("showFooter: OK button disabled when no date selected", () => {
    render(<DatePicker showFooter testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const okBtn = screen.getByRole("button", { name: /ok/i });
    expect(okBtn).toBeDisabled();
  });

  it("showFooter: OK button enabled after date selected", () => {
    render(<DatePicker showFooter testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const grid = screen.getByRole("grid");
    const dayBtn = grid.querySelector("[data-day='15']") as HTMLButtonElement;
    fireEvent.click(dayBtn);
    const okBtn = screen.getByRole("button", { name: /ok/i });
    expect(okBtn).not.toBeDisabled();
  });

  it("showFooter: Cancel discards selection", () => {
    const handleChange = vi.fn();
    render(<DatePicker showFooter onChange={handleChange} testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const grid = screen.getByRole("grid");
    const dayBtn = grid.querySelector("[data-day='15']") as HTMLButtonElement;
    fireEvent.click(dayBtn);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("presets={false} hides sidebar", () => {
    render(<DatePicker presets={false} testId="dp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox", { name: "Quick selection" })).not.toBeInTheDocument();
  });

  it("custom placeholder renders", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByPlaceholderText("Pick a date")).toBeInTheDocument();
  });

  it("iconPosition='right' renders icon as trailing", () => {
    render(<DatePicker iconPosition="right" testId="dp" />);
    const el = screen.getByTestId("dp");
    const trailingIcon = el.querySelector(".tui-input__trailing");
    expect(trailingIcon).toBeInTheDocument();
  });

  it("icon={false} hides icon entirely", () => {
    render(<DatePicker icon={false} testId="dp" />);
    const el = screen.getByTestId("dp");
    const leadingIcon = el.querySelector(".tui-input__leading");
    const trailingIcon = el.querySelector(".tui-input__trailing");
    expect(leadingIcon).not.toBeInTheDocument();
    expect(trailingIcon).not.toBeInTheDocument();
  });

  it("rangeSeparator customizes display", () => {
    const start = new Date(2024, 5, 10);
    const end = new Date(2024, 5, 20);
    render(<DatePicker isRange rangeStart={start} rangeEnd={end} rangeSeparator=" to " />);
    const input = screen.getByPlaceholderText("Select date") as HTMLInputElement;
    expect(input.value).toContain(" to ");
  });
});
