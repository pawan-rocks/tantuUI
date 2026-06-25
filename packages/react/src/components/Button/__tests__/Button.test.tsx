import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders with no props", () => {
    render(<Button />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies default classes (solid, primary, md)", () => {
    render(<Button data-testid="btn" />);
    const btn = screen.getByTestId("btn");
    expect(btn).toHaveClass("tui-btn");
    expect(btn).toHaveClass("tui-btn--solid");
    expect(btn).toHaveClass("tui-btn--primary");
    expect(btn).toHaveClass("tui-btn--md");
  });

  it("applies variant class", () => {
    render(<Button variant="outline" data-testid="btn" />);
    expect(screen.getByTestId("btn")).toHaveClass("tui-btn--outline");
  });

  it("applies intent class", () => {
    render(<Button intent="danger" data-testid="btn" />);
    expect(screen.getByTestId("btn")).toHaveClass("tui-btn--danger");
  });

  it("applies size class", () => {
    render(<Button size="lg" data-testid="btn" />);
    expect(screen.getByTestId("btn")).toHaveClass("tui-btn--lg");
  });

  it("applies fullWidth class", () => {
    render(<Button fullWidth data-testid="btn" />);
    expect(screen.getByTestId("btn")).toHaveClass("tui-btn--full");
  });

  it("applies iconOnly class", () => {
    render(<Button iconOnly data-testid="btn" />);
    expect(screen.getByTestId("btn")).toHaveClass("tui-btn--icon-only");
  });

  it("merges custom className", () => {
    render(<Button className="custom" data-testid="btn" />);
    const btn = screen.getByTestId("btn");
    expect(btn).toHaveClass("tui-btn");
    expect(btn).toHaveClass("custom");
  });

  it("applies testId as data-testid", () => {
    render(<Button testId="my-btn" />);
    expect(screen.getByTestId("my-btn")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-disabled", "true");
    expect(btn).toHaveAttribute("tabindex", "-1");
  });

  it("is disabled and shows spinner when loading", () => {
    render(<Button loading data-testid="btn">Submit</Button>);
    const btn = screen.getByTestId("btn");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn.querySelector(".tui-btn__spinner")).toBeInTheDocument();
  });

  it("does not show spinner when not loading", () => {
    render(<Button data-testid="btn">Submit</Button>);
    const btn = screen.getByTestId("btn");
    expect(btn.querySelector(".tui-btn__spinner")).not.toBeInTheDocument();
  });

  it("fires onClick handler", () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const handler = vi.fn();
    render(<Button disabled onClick={handler}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("renders leadingIcon", () => {
    render(<Button leadingIcon={<span data-testid="icon">★</span>}>Go</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders trailingIcon", () => {
    render(<Button trailingIcon={<span data-testid="icon">→</span>}>Next</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("hides icons when loading", () => {
    render(
      <Button loading leadingIcon={<span data-testid="lead">★</span>} trailingIcon={<span data-testid="trail">→</span>}>
        Go
      </Button>,
    );
    expect(screen.queryByTestId("lead")).not.toBeInTheDocument();
    expect(screen.queryByTestId("trail")).not.toBeInTheDocument();
  });

  it("renders Shimmer in ghost mode", () => {
    render(<Button isGhost testId="ghost-btn" />);
    const el = screen.getByTestId("ghost-btn");
    expect(el).toHaveClass("tui-shimmer");
    expect(el).toHaveClass("tui-btn");
  });

  it("applies ghostWidth and ghostHeight in ghost mode", () => {
    render(<Button isGhost ghostWidth="150px" ghostHeight="40px" testId="ghost-btn" />);
    const el = screen.getByTestId("ghost-btn");
    expect(el.style.width).toBe("150px");
    expect(el.style.height).toBe("40px");
  });

  it("applies focus-ring class", () => {
    render(<Button data-testid="btn" />);
    expect(screen.getByTestId("btn")).toHaveClass("tui-focus-ring");
  });

  it("forwards inline style", () => {
    render(<Button style={{ marginTop: "10px" }} data-testid="btn" />);
    expect(screen.getByTestId("btn").style.marginTop).toBe("10px");
  });

  it("spreads additional HTML attributes", () => {
    render(<Button type="submit" name="action" data-testid="btn" />);
    const btn = screen.getByTestId("btn");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveAttribute("name", "action");
  });
});
