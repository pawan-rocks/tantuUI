import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../Input/Input";

describe("Input", () => {
  it("renders input element wrapped in container with tui-input class", () => {
    const { container } = render(<Input />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper).toHaveClass("tui-input", "tui-input--md", "tui-input--outline");
    const input = wrapper.querySelector("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("tui-input__native");
  });

  it("leading icon renders with aria-hidden", () => {
    render(<Input leadingIcon={<svg data-testid="lead-icon" />} />);
    const iconWrapper = screen.getByTestId("lead-icon").parentElement;
    expect(iconWrapper).toHaveClass("tui-input__leading");
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("trailing icon renders with aria-hidden", () => {
    render(<Input trailingIcon={<svg data-testid="trail-icon" />} />);
    const iconWrapper = screen.getByTestId("trail-icon").parentElement;
    expect(iconWrapper).toHaveClass("tui-input__trailing");
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("prefix element renders correctly", () => {
    render(<Input prefix="$" />);
    const prefix = screen.getByText("$");
    expect(prefix.tagName).toBe("SPAN");
    expect(prefix).toHaveClass("tui-input__prefix");
  });

  it("suffix element renders correctly", () => {
    render(<Input suffix="USD" />);
    const suffix = screen.getByText("USD");
    expect(suffix.tagName).toBe("SPAN");
    expect(suffix).toHaveClass("tui-input__suffix");
  });

  it("clear button fires onChange with empty value", () => {
    const handleChange = vi.fn();
    render(<Input clearable value="hello" onChange={handleChange} />);
    const clearBtn = screen.getByRole("button", { name: "Clear input" });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe("");
  });

  it("clear button fires onClear callback", () => {
    const handleClear = vi.fn();
    render(<Input clearable value="hello" onClear={handleClear} onChange={() => {}} />);
    const clearBtn = screen.getByRole("button", { name: "Clear input" });
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("clear button has accessible aria-label", () => {
    render(<Input clearable value="text" onChange={() => {}} />);
    const clearBtn = screen.getByRole("button", { name: "Clear input" });
    expect(clearBtn).toHaveAttribute("aria-label", "Clear input");
  });

  it("disabled state applies correct attributes", () => {
    const { container } = render(<Input disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-input--disabled");
    const input = wrapper.querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
    expect(input).toHaveAttribute("tabindex", "-1");
  });

  it("ghost mode renders Shimmer", () => {
    const { container } = render(<Input isGhost />);
    const shimmer = container.firstElementChild as HTMLElement;
    expect(shimmer).toHaveClass("tui-shimmer");
    expect(shimmer).toHaveClass("tui-input");
    expect(container.querySelector("input")).not.toBeInTheDocument();
  });

  it("isInvalid applies tui-input--danger", () => {
    const { container } = render(<Input isInvalid />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-input--danger");
  });

  it("ref forwarding to native input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe("INPUT");
  });
});
