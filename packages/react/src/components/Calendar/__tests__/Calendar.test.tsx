import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calendar } from "../Calendar";

describe("Calendar", () => {
  const today = new Date(2024, 5, 15); // June 15, 2024

  it("renders with no props", () => {
    render(<Calendar />);
    expect(screen.getByRole("application", { name: "Calendar" })).toBeInTheDocument();
  });

  it("renders current month header", () => {
    render(<Calendar defaultMonth={new Date(2024, 5, 1)} today={today} />);
    expect(screen.getByText("June")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<Calendar size="lg" testId="cal" />);
    expect(screen.getByTestId("cal")).toHaveClass("tui-calendar--lg");
  });

  it("applies intent class", () => {
    render(<Calendar intent="primary" testId="cal" />);
    expect(screen.getByTestId("cal")).toHaveClass("tui-calendar--primary");
  });

  it("renders 7 weekday headers (Su-Sa)", () => {
    render(<Calendar weekStartsOn={0} defaultMonth={today} today={today} />);
    const weekdays = screen.getAllByRole("columnheader");
    expect(weekdays).toHaveLength(7);
    expect(weekdays[0]).toHaveTextContent("Su");
    expect(weekdays[6]).toHaveTextContent("Sa");
  });

  it("renders weekday headers Mo-Su when weekStartsOn={1}", () => {
    render(<Calendar weekStartsOn={1} defaultMonth={today} today={today} />);
    const weekdays = screen.getAllByRole("columnheader");
    expect(weekdays[0]).toHaveTextContent("Mo");
    expect(weekdays[6]).toHaveTextContent("Su");
  });

  it("renders day cells (buttons with day numbers)", () => {
    render(<Calendar defaultMonth={new Date(2024, 5, 1)} today={today} testId="cal" />);
    const grid = screen.getByRole("grid");
    // June has 30 days — find day buttons via data-day attribute
    expect(grid.querySelector("[data-day='1']")).toBeInTheDocument();
    expect(grid.querySelector("[data-day='30']")).toBeInTheDocument();
  });

  it("highlights today", () => {
    render(<Calendar defaultMonth={today} today={today} testId="cal" />);
    const el = screen.getByTestId("cal");
    const todayCell = el.querySelector(".tui-calendar__day--today");
    expect(todayCell).toBeInTheDocument();
    expect(todayCell).toHaveTextContent("15");
  });

  it("highlights selected value", () => {
    const selected = new Date(2024, 5, 20);
    render(<Calendar value={selected} defaultMonth={today} today={today} testId="cal" />);
    const el = screen.getByTestId("cal");
    const selectedCell = el.querySelector(".tui-calendar__day--selected");
    expect(selectedCell).toBeInTheDocument();
    expect(selectedCell).toHaveTextContent("20");
  });

  it("calls onSelect when day clicked", () => {
    const handleSelect = vi.fn();
    render(<Calendar defaultMonth={new Date(2024, 5, 1)} today={today} onSelect={handleSelect} />);
    const grid = screen.getByRole("grid");
    const dayBtn = grid.querySelector("[data-day='10']") as HTMLButtonElement;
    fireEvent.click(dayBtn);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    const arg = handleSelect.mock.calls[0][0] as Date;
    expect(arg.getDate()).toBe(10);
    expect(arg.getMonth()).toBe(5);
  });

  it("disabled dates cannot be selected (isDateDisabled)", () => {
    const handleSelect = vi.fn();
    const isDateDisabled = (date: Date) => date.getDate() === 10;
    render(
      <Calendar defaultMonth={new Date(2024, 5, 1)} today={today} onSelect={handleSelect} isDateDisabled={isDateDisabled} />,
    );
    const grid = screen.getByRole("grid");
    const dayBtn = grid.querySelector("[data-day='10']") as HTMLButtonElement;
    expect(dayBtn).toBeDisabled();
    fireEvent.click(dayBtn);
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("minDate disables dates before it", () => {
    render(
      <Calendar defaultMonth={new Date(2024, 5, 1)} today={today} minDate={new Date(2024, 5, 10)} />,
    );
    const grid = screen.getByRole("grid");
    const day5 = grid.querySelector("[data-day='5']") as HTMLButtonElement;
    const day15 = grid.querySelector("[data-day='15']") as HTMLButtonElement;
    expect(day5).toBeDisabled();
    expect(day15).not.toBeDisabled();
  });

  it("maxDate disables dates after it", () => {
    render(
      <Calendar defaultMonth={new Date(2024, 5, 1)} today={today} maxDate={new Date(2024, 5, 20)} />,
    );
    const grid = screen.getByRole("grid");
    const day25 = grid.querySelector("[data-day='25']") as HTMLButtonElement;
    const day15 = grid.querySelector("[data-day='15']") as HTMLButtonElement;
    expect(day25).toBeDisabled();
    expect(day15).not.toBeDisabled();
  });

  it("navigates to next month", () => {
    render(<Calendar defaultMonth={new Date(2024, 5, 1)} today={today} />);
    const nextBtn = screen.getByLabelText("Next month");
    fireEvent.click(nextBtn);
    expect(screen.getByText("July")).toBeInTheDocument();
  });

  it("navigates to previous month", () => {
    render(<Calendar defaultMonth={new Date(2024, 5, 1)} today={today} />);
    const prevBtn = screen.getByLabelText("Previous month");
    fireEvent.click(prevBtn);
    expect(screen.getByText("May")).toBeInTheDocument();
  });

  it("borderless mode removes border class", () => {
    render(<Calendar isBorderless testId="cal" />);
    expect(screen.getByTestId("cal")).toHaveClass("tui-calendar--borderless");
  });

  it("shows week numbers when showWeekNumbers={true}", () => {
    render(<Calendar showWeekNumbers defaultMonth={new Date(2024, 5, 1)} today={today} testId="cal" />);
    const el = screen.getByTestId("cal");
    expect(el).toHaveClass("tui-calendar--with-weeks");
    const weekNums = el.querySelectorAll(".tui-calendar__weeknumber");
    expect(weekNums.length).toBeGreaterThan(0);
  });

  it("range mode: highlights start, end, and in-range dates", () => {
    const start = new Date(2024, 5, 10);
    const end = new Date(2024, 5, 15);
    render(
      <Calendar
        isRange
        rangeStart={start}
        rangeEnd={end}
        defaultMonth={new Date(2024, 5, 1)}
        today={today}
        testId="cal"
      />,
    );
    const el = screen.getByTestId("cal");
    expect(el.querySelector(".tui-calendar__day--range-start")).toHaveTextContent("10");
    expect(el.querySelector(".tui-calendar__day--range-end")).toHaveTextContent("15");
    const inRange = el.querySelectorAll(".tui-calendar__day--in-range");
    expect(inRange.length).toBeGreaterThan(0);
  });

  it("applies testId", () => {
    render(<Calendar testId="my-cal" />);
    expect(screen.getByTestId("my-cal")).toBeInTheDocument();
  });

  it("merges className", () => {
    render(<Calendar className="custom" testId="cal" />);
    const el = screen.getByTestId("cal");
    expect(el).toHaveClass("tui-calendar");
    expect(el).toHaveClass("custom");
  });
});
