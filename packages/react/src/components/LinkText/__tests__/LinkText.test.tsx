import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LinkText } from "../LinkText";

describe("LinkText", () => {
  it("renders with no props", () => {
    render(<LinkText data-testid="link" />);
    expect(screen.getByTestId("link")).toBeInTheDocument();
    expect(screen.getByTestId("link").tagName).toBe("SPAN");
  });

  it("renders children", () => {
    render(<LinkText>Learn more</LinkText>);
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("applies default variant class (blue)", () => {
    render(<LinkText data-testid="link" />);
    expect(screen.getByTestId("link")).toHaveClass("tui-link-text--blue");
  });

  it("applies variant class", () => {
    render(<LinkText variant="black" data-testid="link" />);
    expect(screen.getByTestId("link")).toHaveClass("tui-link-text--black");
  });

  it("applies size class", () => {
    render(<LinkText size="lg" data-testid="link" />);
    expect(screen.getByTestId("link")).toHaveClass("tui-link-text--lg");
  });

  it("applies weight class", () => {
    render(<LinkText weight="bold" data-testid="link" />);
    expect(screen.getByTestId("link")).toHaveClass("tui-link-text--w-bold");
  });

  it("applies noHoverUnderline class", () => {
    render(<LinkText noHoverUnderline data-testid="link" />);
    expect(screen.getByTestId("link")).toHaveClass("tui-link-text--no-hover-underline");
  });

  it("merges custom className", () => {
    render(<LinkText className="custom" data-testid="link" />);
    const el = screen.getByTestId("link");
    expect(el).toHaveClass("tui-link-text");
    expect(el).toHaveClass("custom");
  });

  it("applies testId as data-testid", () => {
    render(<LinkText testId="my-link" />);
    expect(screen.getByTestId("my-link")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<LinkText disabled data-testid="link" />);
    const el = screen.getByTestId("link");
    expect(el).toHaveClass("tui-link-text--disabled");
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).toHaveAttribute("tabindex", "-1");
  });

  it("does not set aria-disabled when not disabled", () => {
    render(<LinkText data-testid="link" />);
    expect(screen.getByTestId("link")).not.toHaveAttribute("aria-disabled");
  });

  it("sets href attribute", () => {
    render(<LinkText href="https://example.com" data-testid="link" />);
    expect(screen.getByTestId("link")).toHaveAttribute("href", "https://example.com");
  });

  it("sets target and rel attributes", () => {
    render(<LinkText as="a" target="_blank" rel="noopener noreferrer" data-testid="link" />);
    const el = screen.getByTestId("link");
    expect(el).toHaveAttribute("target", "_blank");
    expect(el).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Shimmer in ghost mode", () => {
    render(<LinkText isGhost testId="ghost-link" />);
    const el = screen.getByTestId("ghost-link");
    expect(el).toHaveClass("tui-shimmer");
    expect(el).toHaveClass("tui-link-text");
  });

  it("applies ghostWidth and ghostHeight in ghost mode", () => {
    render(<LinkText isGhost ghostWidth="120px" ghostHeight="20px" testId="ghost-link" />);
    const el = screen.getByTestId("ghost-link");
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("20px");
  });

  it("renders as span in ghost mode", () => {
    render(<LinkText isGhost testId="ghost-link" />);
    expect(screen.getByTestId("ghost-link").tagName).toBe("SPAN");
  });

  it("forwards inline style", () => {
    render(<LinkText style={{ fontSize: "20px" }} data-testid="link" />);
    expect(screen.getByTestId("link").style.fontSize).toBe("20px");
  });
});
