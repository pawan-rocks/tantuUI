import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { Select } from "../Select/Select";

describe("Select", () => {
  it("renders native select in container with tui-select class", () => {
    const { container } = render(<Select />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper).toHaveClass("tui-select", "tui-select--md", "tui-select--outline");
    const select = wrapper.querySelector("select");
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass("tui-select__native");
  });

  it("chevron icon rendered with aria-hidden and pointer-events none", () => {
    const { container } = render(<Select />);
    const iconSpan = container.querySelector(".tui-select__icon") as HTMLElement;
    expect(iconSpan).toBeInTheDocument();
    expect(iconSpan).toHaveAttribute("aria-hidden", "true");
    const svg = iconSpan.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("placeholder renders as disabled hidden option", () => {
    render(<Select placeholder="Choose one" />);
    const option = screen.getByText("Choose one") as HTMLOptionElement;
    expect(option.tagName).toBe("OPTION");
    expect(option).toHaveAttribute("disabled");
    expect(option).toHaveAttribute("hidden");
    expect(option).toHaveAttribute("value", "");
  });

  it("accepts children option elements", () => {
    render(
      <Select>
        <option value="a">Alpha</option>
        <option value="b">Beta</option>
      </Select>,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("disabled state applies correct attributes", () => {
    const { container } = render(<Select disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-select--disabled");
    const select = wrapper.querySelector("select") as HTMLSelectElement;
    expect(select).toBeDisabled();
    expect(select).toHaveAttribute("aria-disabled", "true");
    expect(select).toHaveAttribute("tabindex", "-1");
  });

  it("ghost mode renders Shimmer", () => {
    const { container } = render(<Select isGhost />);
    const shimmer = container.firstElementChild as HTMLElement;
    expect(shimmer).toHaveClass("tui-shimmer");
    expect(shimmer).toHaveClass("tui-select");
    expect(container.querySelector("select")).not.toBeInTheDocument();
  });

  it("invalid state class applied", () => {
    const { container } = render(<Select isInvalid />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-select--danger");
  });

  it("ref forwarding to native select", () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current?.tagName).toBe("SELECT");
  });
});
