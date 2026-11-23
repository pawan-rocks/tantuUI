import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "../Stepper";

describe("Stepper", () => {
  const steps = [
    { label: "Account", sublabel: "Your details" },
    { label: "Preferences", sublabel: "Choose options" },
    { label: "Complete", sublabel: "Review" },
  ];

  it("renders with no props", () => {
    render(<Stepper testId="stepper" />);
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders labels, sublabels, and default step labels", () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByText("STEP 1")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Your details")).toBeInTheDocument();
    expect(screen.getByText("STEP 3")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Stepper testId="stepper" />);
    const stepper = screen.getByTestId("stepper");
    expect(stepper).toHaveClass("tui-stepper");
    expect(stepper).toHaveClass("tui-stepper--horizontal");
    expect(stepper).toHaveClass("tui-stepper--vertical-align-top");
    expect(stepper).toHaveClass("tui-stepper--md");
    expect(stepper).toHaveClass("tui-stepper--default");
  });

  it("applies orientation, alignment, size, and intent classes", () => {
    render(
      <Stepper
        orientation="vertical"
        verticalAlign="center"
        size="lg"
        intent="danger"
        testId="stepper"
      />,
    );
    const stepper = screen.getByTestId("stepper");
    expect(stepper).toHaveClass("tui-stepper--vertical");
    expect(stepper).toHaveClass("tui-stepper--vertical-align-center");
    expect(stepper).toHaveClass("tui-stepper--lg");
    expect(stepper).toHaveClass("tui-stepper--danger");
  });

  it("maps testId, merges className, forwards style, and forwards attributes", () => {
    render(
      <Stepper
        testId="stepper"
        className="custom-stepper"
        style={{ marginTop: "10px" }}
        id="progress"
        aria-label="Setup progress"
      />,
    );
    const stepper = screen.getByTestId("stepper");
    expect(stepper).toHaveClass("tui-stepper");
    expect(stepper).toHaveClass("custom-stepper");
    expect(stepper).toHaveAttribute("id", "progress");
    expect(stepper).toHaveAttribute("aria-label", "Setup progress");
    expect(stepper).toHaveStyle({ marginTop: "10px" });
  });

  it("derives completed, active, and pending states from activeStep", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveClass("tui-stepper__item--completed");
    expect(items[0]).toHaveClass("tui-stepper__item--status-completed");
    expect(items[1]).toHaveClass("tui-stepper__item--active");
    expect(items[1]).toHaveClass("tui-stepper__item--status-in-progress");
    expect(items[2]).toHaveClass("tui-stepper__item--status-pending");
    expect(items[1]).toHaveAttribute("aria-current", "step");
  });

  it("supports explicit status, custom status labels, and icons", () => {
    render(
      <Stepper
        steps={[
          { label: "Done", status: "completed", statusLabel: "Finished", icon: <span data-testid="step-icon">✓</span> },
          { label: "Waiting", status: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("Finished")).toBeInTheDocument();
    expect(screen.getByTestId("step-icon")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("makes only enabled indicator circles clickable", () => {
    const onStepChange = vi.fn();
    render(<Stepper steps={steps} activeStep={1} onStepChange={onStepChange} />);

    const firstButton = screen.getByRole("button", { name: "Account" });
    expect(firstButton).toHaveClass("tui-stepper__trigger");
    expect(screen.getByText("Account").closest("button")).toBeNull();
    expect(screen.getByText("Your details").closest("button")).toBeNull();

    fireEvent.click(screen.getByText("Account"));
    expect(onStepChange).not.toHaveBeenCalled();
    fireEvent.click(firstButton);
    expect(onStepChange).toHaveBeenCalledWith(0);
  });

  it("supports per-step click handlers on vertical steppers", () => {
    const onClick = vi.fn();
    render(
      <Stepper
        orientation="vertical"
        steps={[{ label: "First", onClick }, { label: "Second" }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "First" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: "Second" })).not.toBeInTheDocument();
  });

  it("renders read-only indicator slots when no click handler is provided", () => {
    const { container } = render(<Stepper orientation="vertical" steps={steps} />);
    expect(container.querySelectorAll(".tui-stepper__indicator-slot")).toHaveLength(3);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("does not make disabled circles clickable", () => {
    const onStepChange = vi.fn();
    const { container } = render(
      <Stepper
        steps={[{ label: "Enabled" }, { label: "Disabled", disabled: true }]}
        onStepChange={onStepChange}
      />,
    );
    expect(screen.getByRole("button", { name: "Enabled" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Disabled" })).not.toBeInTheDocument();
    expect(container.querySelector(".tui-stepper__item--disabled .tui-stepper__indicator-slot")).toHaveAttribute("aria-disabled", "true");
  });

  it("does not make any circle clickable when the whole Stepper is disabled", () => {
    render(<Stepper steps={steps} disabled onStepChange={() => {}} testId="stepper" />);
    expect(screen.getByTestId("stepper")).toHaveClass("tui-stepper--disabled");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders status pills only when showStatus is enabled", () => {
    const { rerender } = render(<Stepper steps={steps} activeStep={1} showStatus />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();

    rerender(<Stepper steps={steps} activeStep={1} showStatus={false} />);
    expect(screen.queryByText("Completed")).not.toBeInTheDocument();
    expect(screen.queryByText("In Progress")).not.toBeInTheDocument();
    expect(screen.queryByText("Pending")).not.toBeInTheDocument();
  });

  it("renders ghost shimmer content without interactive circles", () => {
    const { container } = render(<Stepper steps={steps} isGhost />);
    expect(container.querySelectorAll(".tui-shimmer").length).toBeGreaterThan(0);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders children as a plain wrapper when no steps are provided", () => {
    render(<Stepper className="plain-stepper">Custom content</Stepper>);
    expect(screen.getByText("Custom content")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toHaveClass("plain-stepper");
  });
});
