import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Shimmer } from "../Shimmer";

describe("Shimmer", () => {
  it("renders with no props", () => {
    render(<Shimmer data-testid="shimmer" />);
    const el = screen.getByTestId("shimmer");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("tui-shimmer");
  });

  it("renders as div by default", () => {
    render(<Shimmer data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").tagName).toBe("DIV");
  });

  it("renders as a different element via `as` prop", () => {
    render(<Shimmer as="span" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").tagName).toBe("SPAN");
  });

  it("renders as button element", () => {
    render(<Shimmer as="button" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").tagName).toBe("BUTTON");
  });

  it("applies width inline style", () => {
    render(<Shimmer width="200px" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").style.width).toBe("200px");
  });

  it("applies height inline style", () => {
    render(<Shimmer height="40px" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").style.height).toBe("40px");
  });

  it("applies rounded shape class", () => {
    render(<Shimmer shape="rounded" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer")).toHaveClass("tui-shimmer--rounded");
  });

  it("applies pill shape class", () => {
    render(<Shimmer shape="pill" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer")).toHaveClass("tui-shimmer--pill");
  });

  it("applies circle shape class", () => {
    render(<Shimmer shape="circle" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer")).toHaveClass("tui-shimmer--circle");
  });

  it("applies custom radius as inline style", () => {
    render(<Shimmer radius="12px" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").style.borderRadius).toBe("12px");
  });

  it("merges custom className", () => {
    render(<Shimmer className="custom" data-testid="shimmer" />);
    const el = screen.getByTestId("shimmer");
    expect(el).toHaveClass("tui-shimmer");
    expect(el).toHaveClass("custom");
  });

  it("has aria-hidden true for accessibility", () => {
    render(<Shimmer data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer")).toHaveAttribute("aria-hidden", "true");
  });

  it("has tabIndex -1 to prevent focus", () => {
    render(<Shimmer data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer")).toHaveAttribute("tabindex", "-1");
  });

  it("renders children (invisible for layout)", () => {
    render(<Shimmer data-testid="shimmer">Hidden content</Shimmer>);
    expect(screen.getByTestId("shimmer")).toHaveTextContent("Hidden content");
  });

  it("forwards inline style alongside width/height", () => {
    render(<Shimmer width="100px" height="50px" style={{ opacity: "0.5" }} data-testid="shimmer" />);
    const el = screen.getByTestId("shimmer");
    expect(el.style.width).toBe("100px");
    expect(el.style.height).toBe("50px");
    expect(el.style.opacity).toBe("0.5");
  });

  it("does not apply style object when no style props given", () => {
    render(<Shimmer data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer").getAttribute("style")).toBeNull();
  });

  it("spreads additional HTML attributes", () => {
    render(<Shimmer id="sk-1" data-testid="shimmer" />);
    expect(screen.getByTestId("shimmer")).toHaveAttribute("id", "sk-1");
  });
});
