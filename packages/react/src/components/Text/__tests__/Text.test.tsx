import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "../Text";

describe("Text", () => {
  it("renders with no props", () => {
    render(<Text data-testid="text" />);
    const el = screen.getByTestId("text");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("P");
  });

  it("renders children", () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders as a different element via `as` prop", () => {
    render(<Text as="h1" data-testid="text">Heading</Text>);
    expect(screen.getByTestId("text").tagName).toBe("H1");
  });

  it("applies size class", () => {
    render(<Text size="lg" data-testid="text" />);
    expect(screen.getByTestId("text")).toHaveClass("tui-text--lg");
  });

  it("applies weight class", () => {
    render(<Text weight="bold" data-testid="text" />);
    expect(screen.getByTestId("text")).toHaveClass("tui-text--bold");
  });

  it("applies semantic color class", () => {
    render(<Text color="primary" data-testid="text" />);
    expect(screen.getByTestId("text")).toHaveClass("tui-text--color-primary");
  });

  it("applies custom color as inline style variable", () => {
    render(<Text color="brand-black-700" data-testid="text" />);
    const el = screen.getByTestId("text");
    expect(el.style.color).toBe("var(--tui-color-brand-black-700)");
  });

  it("passes through raw CSS color values", () => {
    render(<Text color="#ff0000" data-testid="text" />);
    const el = screen.getByTestId("text");
    expect(el.style.color).toBe("rgb(255, 0, 0)");
  });

  it("applies alignment class", () => {
    render(<Text align="center" data-testid="text" />);
    expect(screen.getByTestId("text")).toHaveClass("tui-text--center");
  });

  it("applies truncate class when truncate is true", () => {
    render(<Text truncate data-testid="text" />);
    expect(screen.getByTestId("text")).toHaveClass("tui-text--truncate");
  });

  it("applies clamp class and CSS variable for multi-line truncate", () => {
    render(<Text truncate={3} data-testid="text" />);
    const el = screen.getByTestId("text");
    expect(el).toHaveClass("tui-text--clamp");
    expect(el.style.getPropertyValue("--tui-text-clamp-lines")).toBe("3");
  });

  it("merges custom className", () => {
    render(<Text className="custom" data-testid="text" />);
    const el = screen.getByTestId("text");
    expect(el).toHaveClass("tui-text");
    expect(el).toHaveClass("custom");
  });

  it("applies testId as data-testid", () => {
    render(<Text testId="my-text" />);
    expect(screen.getByTestId("my-text")).toBeInTheDocument();
  });

  it("renders Shimmer in ghost mode", () => {
    render(<Text isGhost testId="ghost-text" />);
    const el = screen.getByTestId("ghost-text");
    expect(el).toHaveClass("tui-shimmer");
    expect(el).toHaveClass("tui-text");
  });

  it("applies ghostWidth and ghostHeight in ghost mode", () => {
    render(<Text isGhost ghostWidth="200px" ghostHeight="24px" testId="ghost-text" />);
    const el = screen.getByTestId("ghost-text");
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("24px");
  });

  it("renders as span in ghost mode", () => {
    render(<Text isGhost testId="ghost-text" />);
    expect(screen.getByTestId("ghost-text").tagName).toBe("SPAN");
  });

  it("preserves children content inside ghost for sizing", () => {
    render(<Text isGhost testId="ghost-text">Some text</Text>);
    expect(screen.getByTestId("ghost-text")).toHaveTextContent("Some text");
  });

  it("forwards inline style", () => {
    render(<Text style={{ letterSpacing: "2px" }} data-testid="text" />);
    expect(screen.getByTestId("text").style.letterSpacing).toBe("2px");
  });

  it("spreads additional HTML attributes", () => {
    render(<Text id="intro" role="heading" data-testid="text" />);
    const el = screen.getByTestId("text");
    expect(el).toHaveAttribute("id", "intro");
    expect(el).toHaveAttribute("role", "heading");
  });
});
