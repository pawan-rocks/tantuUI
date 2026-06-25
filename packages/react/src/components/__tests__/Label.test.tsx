import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { Label } from "../Label/Label";

describe("Label", () => {
  it("renders label element with tui-label class by default", () => {
    render(<Label>Username</Label>);
    const label = screen.getByText("Username");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("tui-label", "tui-label--md");
  });

  it("renders required asterisk with correct class and aria-hidden", () => {
    render(<Label required>Email</Label>);
    const asterisk = screen.getByText("*");
    expect(asterisk).toHaveClass("tui-label__required");
    expect(asterisk).toHaveAttribute("aria-hidden", "true");
    expect(asterisk.tagName).toBe("SPAN");
  });

  it("htmlFor attribute is set correctly", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("disabled state applies tui-label--disabled class", () => {
    render(<Label disabled>Disabled field</Label>);
    const label = screen.getByText("Disabled field");
    expect(label).toHaveClass("tui-label--disabled");
  });

  it("renders empty label when no children provided", () => {
    const { container } = render(<Label />);
    const label = container.querySelector("label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("tui-label", "tui-label--md");
    expect(label).toBeEmptyDOMElement();
  });

  it("forwards ref to native label element", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>With ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    expect(ref.current?.textContent).toBe("With ref");
  });
});
