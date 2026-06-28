import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "../DatePicker/DatePicker";

describe("DatePicker", () => {
  it("renders with tui-datepicker class and Input inside trigger", () => {
    const { container } = render(<DatePicker placeholder="Pick date" />);
    expect(container.firstElementChild).toHaveClass("tui-datepicker");
    expect(container.querySelector(".tui-input")).toBeInTheDocument();
    expect(container.querySelector(".tui-datepicker__trigger")).toBeInTheDocument();
  });

  it("shows placeholder in input", () => {
    render(<DatePicker placeholder="Choose a date" />);
    expect(screen.getByPlaceholderText("Choose a date")).toBeInTheDocument();
  });

  it("displays formatted value", () => {
    const date = new Date(2026, 5, 15);
    render(<DatePicker value={date} />);
    expect(screen.getByDisplayValue("Jun 15, 2026")).toBeInTheDocument();
  });

  it("opens calendar popup on trigger click", () => {
    render(<DatePicker presets={false} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("application", { name: "Calendar" })).toBeInTheDocument();
  });

  it("calls onChange when a date is selected", () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} presets={false} />);
    fireEvent.click(screen.getByRole("combobox"));

    const dayButtons = screen.getAllByRole("button", { name: /June 15, 2026/i });
    fireEvent.click(dayButtons[0]);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].getDate()).toBe(15);
  });

  it("shows preset sidebar by default", () => {
    render(<DatePicker />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox", { name: "Quick selection" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Today" })).toBeInTheDocument();
  });

  it("hides sidebar when presets is false", () => {
    render(<DatePicker presets={false} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox", { name: "Quick selection" })).not.toBeInTheDocument();
  });

  it("selects preset and calls onChange", () => {
    const handleChange = vi.fn();
    render(<DatePicker onChange={handleChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Today" }));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("clears value via clearable button", () => {
    const handleChange = vi.fn();
    render(<DatePicker value={new Date(2026, 5, 10)} onChange={handleChange} isClearable presets={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Clear input" }));
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it("applies intent class to Input wrapper", () => {
    const { container } = render(<DatePicker intent="primary" presets={false} />);
    expect(container.querySelector(".tui-input--primary")).toBeInTheDocument();
  });

  it("forwards ref to wrapper div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DatePicker ref={ref} />);
    expect(ref.current).toHaveClass("tui-datepicker");
  });

  it("range mode displays formatted range", () => {
    render(
      <DatePicker
        isRange
        rangeStart={new Date(2026, 5, 1)}
        rangeEnd={new Date(2026, 5, 15)}
        presets={false}
      />,
    );
    expect(screen.getByDisplayValue("Jun 1, 2026 – Jun 15, 2026")).toBeInTheDocument();
  });

  it("range mode calls onRangeChange on preset select", () => {
    const handleRangeChange = vi.fn();
    render(<DatePicker isRange onRangeChange={handleRangeChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Last 7 days" }));
    expect(handleRangeChange).toHaveBeenCalledTimes(1);
    expect(handleRangeChange.mock.calls[0][0]).toBeInstanceOf(Date);
    expect(handleRangeChange.mock.calls[0][1]).toBeInstanceOf(Date);
  });
});
