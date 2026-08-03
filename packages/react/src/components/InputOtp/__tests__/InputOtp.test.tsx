import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InputOtp } from "../InputOtp";

describe("InputOtp", () => {
  it("renders four input cells by default", () => {
    render(<InputOtp />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("renders a configurable number of cells", () => {
    render(<InputOtp length={6} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("passes min and max to every underlying Input", () => {
    render(<InputOtp min={0} max={9} />);
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "9");
      expect(input).toHaveAttribute("maxlength", "1");
    });
  });

  it("calls onChange and moves focus to the next cell", () => {
    const onChange = vi.fn();
    render(<InputOtp onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "4" } });

    expect(onChange).toHaveBeenLastCalledWith("4");
    expect(document.activeElement).toBe(inputs[1]);
  });

  it("distributes pasted values across the remaining cells", () => {
    const onChange = vi.fn();
    render(<InputOtp onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "1234" },
    });

    expect(inputs.map((input) => (input as HTMLInputElement).value)).toEqual(["1", "2", "3", "4"]);
    expect(onChange).toHaveBeenLastCalledWith("1234");
  });

  it("calls onComplete when all cells are filled", () => {
    const onComplete = vi.fn();
    render(<InputOtp onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
    });

    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("supports controlled values", () => {
    const onChange = vi.fn();
    render(<InputOtp value="12" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");

    expect(inputs.map((input) => (input as HTMLInputElement).value)).toEqual(["1", "2", "", ""]);
    fireEvent.change(inputs[2], { target: { value: "3" } });
    expect(onChange).toHaveBeenCalledWith("123");
  });

  it("moves to the previous cell on backspace when the current cell is empty", () => {
    render(<InputOtp defaultValue="12" />);
    const inputs = screen.getAllByRole("textbox");
    inputs[2].focus();

    fireEvent.keyDown(inputs[2], { key: "Backspace" });

    expect(document.activeElement).toBe(inputs[1]);
  });

  it("supports disabled and ghost states with size classes", () => {
    const { rerender, container } = render(<InputOtp size="lg" disabled />);
    expect(screen.getAllByRole("textbox").every((input) => input.hasAttribute("disabled"))).toBe(true);

    rerender(<InputOtp size="lg" isGhost />);
    const shimmers = container.querySelectorAll(".tui-shimmer");
    expect(shimmers).toHaveLength(4);
    expect(shimmers[0]).toHaveClass("tui-input", "tui-input--lg", "tui-input-otp__cell");
    expect(screen.queryAllByRole("textbox")).toHaveLength(0);
  });

  it("merges className and maps testId to the group", () => {
    render(<InputOtp className="custom-otp" testId="otp-field" />);
    const group = screen.getByTestId("otp-field");
    expect(group).toHaveClass("tui-input-otp", "tui-input-otp--md", "custom-otp");
  });
});
