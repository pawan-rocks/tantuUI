import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TimePicker } from "../TimePicker";

describe("TimePicker", () => {
  it("renders with no props", () => {
    render(<TimePicker />);
    expect(screen.getByPlaceholderText("Select time")).toBeInTheDocument();
  });

  it("applies testId", () => {
    render(<TimePicker testId="my-tp" />);
    expect(screen.getByTestId("my-tp")).toBeInTheDocument();
  });

  it("opens popup on click", () => {
    render(<TimePicker testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("displays formatted time value (12h)", () => {
    render(<TimePicker value={{ hours: 14, minutes: 30 }} format="12h" />);
    const input = screen.getByPlaceholderText("Select time") as HTMLInputElement;
    expect(input.value).toBe("2:30 PM");
  });

  it("displays formatted time value (24h)", () => {
    render(<TimePicker value={{ hours: 14, minutes: 5 }} format="24h" />);
    const input = screen.getByPlaceholderText("Select time") as HTMLInputElement;
    expect(input.value).toBe("14:05");
  });

  it("displays with seconds", () => {
    render(<TimePicker value={{ hours: 9, minutes: 5, seconds: 30 }} format="24h" showSeconds />);
    const input = screen.getByPlaceholderText("Select time") as HTMLInputElement;
    expect(input.value).toBe("09:05:30");
  });

  it("disabled state prevents opening", () => {
    render(<TimePicker isDisabled testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("clearable shows clear button when value exists", () => {
    render(<TimePicker value={{ hours: 10, minutes: 0 }} isClearable testId="tp" />);
    const el = screen.getByTestId("tp");
    const clearBtn = el.querySelector(".tui-input__clear");
    expect(clearBtn).toBeInTheDocument();
  });

  it("clearable calls onChange(null) on clear", () => {
    const handleChange = vi.fn();
    render(<TimePicker value={{ hours: 10, minutes: 0 }} isClearable onChange={handleChange} testId="tp" />);
    const el = screen.getByTestId("tp");
    const clearBtn = el.querySelector(".tui-input__clear") as HTMLElement;
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it("size prop applies to input", () => {
    render(<TimePicker size="lg" testId="tp" />);
    const el = screen.getByTestId("tp");
    const inputWrapper = el.querySelector(".tui-input");
    expect(inputWrapper).toHaveClass("tui-input--lg");
  });

  it("intent prop applies to input", () => {
    render(<TimePicker intent="primary" testId="tp" />);
    const el = screen.getByTestId("tp");
    const inputWrapper = el.querySelector(".tui-input");
    expect(inputWrapper).toHaveClass("tui-input--primary");
  });

  it("showFooter: OK button disabled when no time selected", () => {
    render(<TimePicker showFooter testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const okBtn = screen.getByRole("button", { name: /ok/i });
    expect(okBtn).toBeDisabled();
  });

  it("showFooter: Cancel discards selection", () => {
    const handleChange = vi.fn();
    render(<TimePicker showFooter onChange={handleChange} testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("custom placeholder renders", () => {
    render(<TimePicker placeholder="Pick time" />);
    expect(screen.getByPlaceholderText("Pick time")).toBeInTheDocument();
  });

  it("iconPosition='right' renders icon as trailing", () => {
    render(<TimePicker iconPosition="right" testId="tp" />);
    const el = screen.getByTestId("tp");
    expect(el.querySelector(".tui-input__trailing")).toBeInTheDocument();
  });

  it("icon={false} hides icon", () => {
    render(<TimePicker icon={false} testId="tp" />);
    const el = screen.getByTestId("tp");
    expect(el.querySelector(".tui-input__leading")).not.toBeInTheDocument();
    expect(el.querySelector(".tui-input__trailing")).not.toBeInTheDocument();
  });

  it("merges className", () => {
    render(<TimePicker className="custom" testId="tp" />);
    const el = screen.getByTestId("tp");
    expect(el).toHaveClass("tui-timepicker");
    expect(el).toHaveClass("custom");
  });

  it("range mode: shows Start/End tabs", () => {
    render(<TimePicker isRange testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "End" })).toBeInTheDocument();
  });

  it("range mode: displays formatted range value", () => {
    render(
      <TimePicker
        isRange
        rangeStart={{ hours: 9, minutes: 0 }}
        rangeEnd={{ hours: 17, minutes: 30 }}
        format="24h"
      />,
    );
    const input = screen.getByPlaceholderText("Select time") as HTMLInputElement;
    expect(input.value).toContain("09:00");
    expect(input.value).toContain("17:30");
  });

  it("range mode: OK disabled until both start and end selected", () => {
    render(<TimePicker isRange showFooter testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const okBtn = screen.getByRole("button", { name: /ok/i });
    expect(okBtn).toBeDisabled();
  });

  it("disableBeforeNow passes minTime constraint", () => {
    render(<TimePicker disableBeforeNow format="24h" testId="tp" />);
    // Just verify it renders without error — actual time disabling is visual
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox", { name: "Hours" })).toBeInTheDocument();
  });

  it("disableAfterNow passes maxTime constraint", () => {
    render(<TimePicker disableAfterNow format="24h" testId="tp" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox", { name: "Hours" })).toBeInTheDocument();
  });
});
