import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "../FormField/FormField";

describe("FormField", () => {
  it("renders container with tui-form-field class and flex column layout", () => {
    const { container } = render(<FormField>content</FormField>);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper).toHaveClass("tui-form-field");
  });

  it("renders Label when label prop provided", () => {
    render(<FormField label="Username">content</FormField>);
    const label = screen.getByText("Username");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("tui-label");
  });

  it("required shows asterisk via Label", () => {
    render(
      <FormField label="Email" required>
        content
      </FormField>,
    );
    const asterisk = screen.getByText("*");
    expect(asterisk).toHaveClass("tui-label__required");
    expect(asterisk).toHaveAttribute("aria-hidden", "true");
  });

  it("helperText renders in helper element with aria-describedby", () => {
    render(
      <FormField helperText="Enter your name">
        <input />
      </FormField>,
    );
    const helper = screen.getByText("Enter your name");
    expect(helper).toHaveClass("tui-form-field__helper");

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", helper.id);
  });

  it("errorText renders with role=alert and aria-describedby", () => {
    render(
      <FormField errorText="This field is required">
        <input />
      </FormField>,
    );
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("This field is required");
    expect(error).toHaveClass("tui-form-field__error");

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it("errorText takes priority over helperText", () => {
    render(
      <FormField helperText="Hint text" errorText="Error occurred">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Error occurred");
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
  });

  it("disabled applies modifier class", () => {
    const { container } = render(<FormField disabled>content</FormField>);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-form-field--disabled");
  });

  it("size prop passed to Label", () => {
    render(
      <FormField label="Name" size="lg">
        content
      </FormField>,
    );
    const label = screen.getByText("Name");
    expect(label).toHaveClass("tui-label--lg");
  });

  it("children render between label and helper/error", () => {
    const { container } = render(
      <FormField label="Field" helperText="Help">
        <input data-testid="child-input" />
      </FormField>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const children = Array.from(wrapper.children);

    // Label is first, then the input, then helper text
    expect(children[0].tagName).toBe("LABEL");
    expect(children[1].tagName).toBe("INPUT");
    expect(children[2]).toHaveClass("tui-form-field__helper");
  });
});
