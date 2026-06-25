import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "../Radio/Radio";
import { RadioGroup } from "../Radio/RadioGroup";

describe("Radio", () => {
  it("renders input type radio with tui-radio class", () => {
    const { container } = render(<Radio value="a" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("LABEL");
    expect(wrapper).toHaveClass("tui-radio", "tui-radio--md");
    const input = wrapper.querySelector("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "radio");
    expect(input).toHaveClass("tui-radio__native");
  });

  it("checked Radio shows filled dot and aria-checked=true", () => {
    const { container } = render(
      <Radio value="a" checked onChange={() => {}} />,
    );
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toHaveAttribute("aria-checked", "true");
    const indicator = container.querySelector(
      ".tui-radio__indicator--checked",
    );
    expect(indicator).toBeInTheDocument();
    const dot = indicator?.querySelector(".tui-radio__dot");
    expect(dot).toBeInTheDocument();
  });

  it("ghost mode renders Shimmer", () => {
    const { container } = render(<Radio value="a" isGhost />);
    const shimmer = container.firstElementChild as HTMLElement;
    expect(shimmer).toHaveClass("tui-shimmer");
    expect(shimmer).toHaveClass("tui-radio");
    expect(container.querySelector("input")).not.toBeInTheDocument();
  });

  it("ref forwarding to native input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio ref={ref} value="a" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("radio");
  });
});

describe("RadioGroup", () => {
  it("renders container with role=radiogroup", () => {
    const { container } = render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(group).toHaveAttribute("role", "radiogroup");
    expect(group).toHaveClass("tui-radio-group");
  });

  it("passes name to child Radios", () => {
    const { container } = render(
      <RadioGroup name="color">
        <Radio value="red" />
        <Radio value="blue" />
        <Radio value="green" />
      </RadioGroup>,
    );
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("name", "color");
    });
  });

  it("horizontal orientation applies modifier class", () => {
    const { container } = render(
      <RadioGroup orientation="horizontal">
        <Radio value="a" />
      </RadioGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(group).toHaveClass("tui-radio-group--horizontal");
  });

  it("vertical orientation is default", () => {
    const { container } = render(
      <RadioGroup>
        <Radio value="a" />
      </RadioGroup>,
    );
    const group = container.firstElementChild as HTMLElement;
    expect(group).toHaveClass("tui-radio-group--vertical");
  });

  it("disabled state on RadioGroup disables all children", () => {
    const { container } = render(
      <RadioGroup disabled>
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("aria-disabled", "true");
    });
  });

  it("invalid state applies to all child indicators", () => {
    const { container } = render(
      <RadioGroup isInvalid>
        <Radio value="a" />
        <Radio value="b" />
      </RadioGroup>,
    );
    const radios = container.querySelectorAll(".tui-radio");
    radios.forEach((radio) => {
      expect(radio).toHaveClass("tui-radio--danger");
    });
    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("arrow key navigation wraps around (ArrowDown)", () => {
    const { container } = render(
      <RadioGroup name="nav">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
        <Radio value="c" label="C" />
      </RadioGroup>,
    );
    const inputs = container.querySelectorAll("input");
    const group = container.firstElementChild as HTMLElement;

    // Focus first radio
    inputs[0].focus();
    expect(document.activeElement).toBe(inputs[0]);

    // ArrowDown moves to next
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(document.activeElement).toBe(inputs[1]);

    // ArrowDown again moves to third
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(document.activeElement).toBe(inputs[2]);

    // ArrowDown wraps to first
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(document.activeElement).toBe(inputs[0]);
  });

  it("arrow key navigation wraps around (ArrowUp)", () => {
    const { container } = render(
      <RadioGroup name="nav">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
        <Radio value="c" label="C" />
      </RadioGroup>,
    );
    const inputs = container.querySelectorAll("input");
    const group = container.firstElementChild as HTMLElement;

    // Focus first radio
    inputs[0].focus();
    expect(document.activeElement).toBe(inputs[0]);

    // ArrowUp on first wraps to last
    fireEvent.keyDown(group, { key: "ArrowUp" });
    expect(document.activeElement).toBe(inputs[2]);
  });
});
