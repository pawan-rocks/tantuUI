import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { Checkbox } from "../Checkbox/Checkbox";

describe("Checkbox", () => {
  it("renders input type checkbox with tui-checkbox class", () => {
    const { container } = render(<Checkbox />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("LABEL");
    expect(wrapper).toHaveClass("tui-checkbox", "tui-checkbox--md");
    const input = wrapper.querySelector("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "checkbox");
    expect(input).toHaveClass("tui-checkbox__native");
  });

  it("checked state shows checkmark icon and aria-checked=true", () => {
    const { container } = render(<Checkbox checked onChange={() => {}} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toHaveAttribute("aria-checked", "true");
    const indicator = container.querySelector(
      ".tui-checkbox__indicator--checked",
    );
    expect(indicator).toBeInTheDocument();
    const icon = indicator?.querySelector(".tui-checkbox__icon");
    expect(icon).toBeInTheDocument();
  });

  it("indeterminate shows dash icon and aria-checked=mixed", () => {
    const { container } = render(<Checkbox indeterminate onChange={() => {}} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toHaveAttribute("aria-checked", "mixed");
    const indicator = container.querySelector(
      ".tui-checkbox__indicator--indeterminate",
    );
    expect(indicator).toBeInTheDocument();
    const icon = indicator?.querySelector(".tui-checkbox__icon");
    expect(icon).toBeInTheDocument();
  });

  it("indeterminate takes precedence over checked", () => {
    const { container } = render(
      <Checkbox checked indeterminate onChange={() => {}} />,
    );
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toHaveAttribute("aria-checked", "mixed");
    const indeterminateIndicator = container.querySelector(
      ".tui-checkbox__indicator--indeterminate",
    );
    expect(indeterminateIndicator).toBeInTheDocument();
    const checkedIndicator = container.querySelector(
      ".tui-checkbox__indicator--checked",
    );
    expect(checkedIndicator).not.toBeInTheDocument();
  });

  it("label renders with correct htmlFor association", () => {
    const { container } = render(
      <Checkbox label="Accept terms" id="terms-cb" onChange={() => {}} />,
    );
    const wrapper = container.firstElementChild as HTMLLabelElement;
    expect(wrapper.tagName).toBe("LABEL");
    expect(wrapper).toHaveAttribute("for", "terms-cb");
    const labelText = wrapper.querySelector(".tui-label");
    expect(labelText).toBeInTheDocument();
    expect(labelText).toHaveTextContent("Accept terms");
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toHaveAttribute("id", "terms-cb");
  });

  it('labelPlacement="start" renders label before indicator', () => {
    const { container } = render(
      <Checkbox label="Label" labelPlacement="start" onChange={() => {}} />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const children = Array.from(wrapper.children).filter(
      (el) => !el.classList.contains("tui-checkbox__native"),
    );
    // Label span should come before the indicator
    expect(children[0].tagName).toBe("SPAN");
    expect(children[0]).toHaveClass("tui-label");
    expect(children[1]).toHaveClass("tui-checkbox__indicator");
  });

  it("disabled state attributes", () => {
    const { container } = render(<Checkbox disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-checkbox--disabled");
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
    expect(input).toHaveAttribute("tabindex", "-1");
  });

  it("ghost mode renders Shimmer", () => {
    const { container } = render(<Checkbox isGhost />);
    const shimmer = container.firstElementChild as HTMLElement;
    expect(shimmer).toHaveClass("tui-shimmer");
    expect(shimmer).toHaveClass("tui-checkbox");
    expect(container.querySelector("input")).not.toBeInTheDocument();
  });

  it("invalid state class applied", () => {
    const { container } = render(<Checkbox isInvalid />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-checkbox--danger");
  });

  it("ref forwarding to native input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("checkbox");
  });
});
