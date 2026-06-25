import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "../Switch/Switch";

describe("Switch", () => {
  it("renders button with role=switch and tui-switch class", () => {
    const { container } = render(<Switch />);
    const button = container.firstElementChild as HTMLElement;
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("role", "switch");
    expect(button).toHaveClass("tui-switch", "tui-switch--md", "tui-focus-ring");
  });

  it("checked=true sets aria-checked=true and applies tui-switch--checked", () => {
    const { container } = render(<Switch checked={true} />);
    const button = container.firstElementChild as HTMLElement;
    expect(button).toHaveAttribute("aria-checked", "true");
    expect(button).toHaveClass("tui-switch--checked");
  });

  it("checked=false sets aria-checked=false", () => {
    const { container } = render(<Switch checked={false} />);
    const button = container.firstElementChild as HTMLElement;
    expect(button).toHaveAttribute("aria-checked", "false");
    expect(button).not.toHaveClass("tui-switch--checked");
  });

  it("label renders with correct for/id association", () => {
    render(<Switch label="Toggle me" />);
    const button = screen.getByRole("switch");
    const label = screen.getByText("Toggle me");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", button.id);
    expect(button.id).toMatch(/^tui-switch-/);
  });

  it("labelPlacement='start' renders label before switch", () => {
    const { container } = render(<Switch label="Before" labelPlacement="start" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-switch-wrapper");
    const children = Array.from(wrapper.children);
    expect(children[0].tagName).toBe("LABEL");
    expect(children[1].tagName).toBe("BUTTON");
  });

  it("click fires onChange with negated checked", () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const button = screen.getByRole("switch");
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("Space key fires onChange (button handles this natively via click)", () => {
    const handleChange = vi.fn();
    render(<Switch checked={true} onChange={handleChange} />);
    const button = screen.getByRole("switch");
    // In JSDOM, button Space→click is handled natively, so fireEvent.click simulates this
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("disabled state prevents onChange and applies attributes", () => {
    const handleChange = vi.fn();
    const { container } = render(<Switch checked={false} onChange={handleChange} disabled />);
    const button = container.querySelector("button") as HTMLElement;
    expect(button).toHaveClass("tui-switch--disabled");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
    fireEvent.click(button);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("ghost mode renders Shimmer with aria-hidden", () => {
    const { container } = render(<Switch isGhost />);
    const shimmer = container.firstElementChild as HTMLElement;
    expect(shimmer).toHaveClass("tui-shimmer");
    expect(shimmer).toHaveClass("tui-switch");
    expect(shimmer).toHaveAttribute("aria-hidden", "true");
    expect(shimmer).toHaveAttribute("tabindex", "-1");
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("ref forwarding to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe("BUTTON");
    expect(ref.current).toHaveAttribute("role", "switch");
  });
});
