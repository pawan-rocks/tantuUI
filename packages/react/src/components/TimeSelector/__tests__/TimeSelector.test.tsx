import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TimeSelector } from "../TimeSelector";

describe("TimeSelector", () => {
  it("renders with no props", () => {
    render(<TimeSelector />);
    expect(screen.getByRole("group", { name: "Time picker" })).toBeInTheDocument();
  });

  it("renders with value prop", () => {
    render(<TimeSelector value={{ hours: 14, minutes: 30, seconds: 0 }} format="24h" />);
    const hoursListbox = screen.getByRole("listbox", { name: "Hours" });
    const selectedHour = hoursListbox.querySelector("[aria-selected='true']");
    expect(selectedHour).toHaveTextContent("14");
  });

  it("applies size class (sm)", () => {
    render(<TimeSelector size="sm" testId="ts" />);
    expect(screen.getByTestId("ts")).toHaveClass("tui-timeselector--sm");
  });

  it("applies size class (md)", () => {
    render(<TimeSelector size="md" testId="ts" />);
    expect(screen.getByTestId("ts")).toHaveClass("tui-timeselector--md");
  });

  it("applies size class (lg)", () => {
    render(<TimeSelector size="lg" testId="ts" />);
    expect(screen.getByTestId("ts")).toHaveClass("tui-timeselector--lg");
  });

  it("applies intent class", () => {
    render(<TimeSelector intent="primary" testId="ts" />);
    expect(screen.getByTestId("ts")).toHaveClass("tui-timeselector--primary");
  });

  it("shows hours and minutes columns by default", () => {
    render(<TimeSelector />);
    expect(screen.getByRole("listbox", { name: "Hours" })).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Minutes" })).toBeInTheDocument();
    expect(screen.queryByRole("listbox", { name: "Seconds" })).not.toBeInTheDocument();
  });

  it("shows seconds column when showSeconds is true", () => {
    render(<TimeSelector showSeconds />);
    expect(screen.getByRole("listbox", { name: "Seconds" })).toBeInTheDocument();
  });

  it("shows AM/PM column in 12h format", () => {
    render(<TimeSelector format="12h" />);
    expect(screen.getByRole("listbox", { name: "Period" })).toBeInTheDocument();
  });

  it("does not show AM/PM in 24h format", () => {
    render(<TimeSelector format="24h" />);
    expect(screen.queryByRole("listbox", { name: "Period" })).not.toBeInTheDocument();
  });

  it("calls onChange when hour selected", () => {
    const handleChange = vi.fn();
    render(
      <TimeSelector value={{ hours: 10, minutes: 0, seconds: 0 }} format="24h" onChange={handleChange} />,
    );
    const hoursListbox = screen.getByRole("listbox", { name: "Hours" });
    const hourButtons = hoursListbox.querySelectorAll("button");
    // Click hour "05"
    fireEvent.click(hourButtons[5]);
    expect(handleChange).toHaveBeenCalledWith({ hours: 5, minutes: 0, seconds: 0 });
  });

  it("disabled state prevents interaction", () => {
    const handleChange = vi.fn();
    render(
      <TimeSelector value={{ hours: 10, minutes: 0, seconds: 0 }} format="24h" isDisabled onChange={handleChange} />,
    );
    const hoursListbox = screen.getByRole("listbox", { name: "Hours" });
    const hourButtons = hoursListbox.querySelectorAll("button");
    fireEvent.click(hourButtons[5]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("applies testId", () => {
    render(<TimeSelector testId="my-time" />);
    expect(screen.getByTestId("my-time")).toBeInTheDocument();
  });

  it("merges className", () => {
    render(<TimeSelector className="custom" testId="ts" />);
    const el = screen.getByTestId("ts");
    expect(el).toHaveClass("tui-timeselector");
    expect(el).toHaveClass("custom");
  });

  it("shows header by default", () => {
    render(<TimeSelector testId="ts" />);
    const el = screen.getByTestId("ts");
    expect(el.querySelector(".tui-timeselector__header")).toBeInTheDocument();
  });

  it("hides header when showHeader={false}", () => {
    render(<TimeSelector showHeader={false} testId="ts" />);
    const el = screen.getByTestId("ts");
    expect(el.querySelector(".tui-timeselector__header")).not.toBeInTheDocument();
  });

  it("shows footer by default", () => {
    render(<TimeSelector testId="ts" />);
    const el = screen.getByTestId("ts");
    expect(el.querySelector(".tui-timeselector__footer")).toBeInTheDocument();
  });

  it("hides footer when showFooter={false}", () => {
    render(<TimeSelector showFooter={false} testId="ts" />);
    const el = screen.getByTestId("ts");
    expect(el.querySelector(".tui-timeselector__footer")).not.toBeInTheDocument();
  });

  it("passes null value — no item has selected class", () => {
    render(<TimeSelector value={null} format="24h" testId="ts" />);
    const el = screen.getByTestId("ts");
    const selected = el.querySelectorAll(".tui-timeselector__scroll-item--selected");
    expect(selected.length).toBe(0);
  });

  it("minTime disables hours before it", () => {
    render(
      <TimeSelector format="24h" minTime={{ hours: 5, minutes: 0 }} value={{ hours: 6, minutes: 0, seconds: 0 }} testId="ts" />,
    );
    const hoursListbox = screen.getByRole("listbox", { name: "Hours" });
    const hourButtons = hoursListbox.querySelectorAll("button");
    // Hours 0–4 should be disabled
    expect(hourButtons[0]).toBeDisabled();
    expect(hourButtons[4]).toBeDisabled();
    // Hour 5 should not be disabled
    expect(hourButtons[5]).not.toBeDisabled();
  });
});
