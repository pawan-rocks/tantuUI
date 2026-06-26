import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Box } from "../Box";

describe("Box", () => {
  it("renders with no props", () => {
    render(<Box data-testid="box" />);
    expect(screen.getByTestId("box")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Box>Hello</Box>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders as a different element via `as` prop", () => {
    render(<Box as="section" data-testid="box" />);
    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("merges custom className", () => {
    render(<Box className="custom" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("tui-box");
    expect(el).toHaveClass("custom");
  });

  it("applies testId as data-testid", () => {
    render(<Box testId="my-box" />);
    expect(screen.getByTestId("my-box")).toBeInTheDocument();
  });

  it("applies display class", () => {
    render(<Box display="flex" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("tui-box--flex");
  });

  it("applies direction class", () => {
    render(<Box direction="column" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("tui-box--column");
  });

  it("applies align class", () => {
    render(<Box align="center" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("tui-box--align-center");
  });

  it("applies justify class", () => {
    render(<Box justify="space-between" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("tui-box--justify-between");
  });

  it("applies wrap class", () => {
    render(<Box wrap="wrap" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("tui-box--wrap");
  });

  it("sets CSS custom properties for padding", () => {
    render(<Box p="4" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-p")).toBe("var(--tui-spacing-4)");
  });

  it("sets CSS custom properties for margin", () => {
    render(<Box m="2" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-m")).toBe("var(--tui-spacing-2)");
  });

  it("sets CSS custom properties for gap", () => {
    render(<Box gap="3" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-gap")).toBe("var(--tui-spacing-3)");
  });

  it("sets rounded CSS variable", () => {
    render(<Box rounded="lg" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-radius")).toBe("var(--tui-radius-lg)");
  });

  it("sets shadow CSS variable", () => {
    render(<Box shadow="md" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-shadow")).toBe("var(--tui-shadow-md)");
  });

  it("resolves bg as token variable", () => {
    render(<Box bg="brand-pink-500" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-bg")).toBe("var(--tui-color-brand-pink-500)");
  });

  it("passes through raw CSS color values for bg", () => {
    render(<Box bg="#ff0000" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-bg")).toBe("#ff0000");
  });

  it("resolves color prop as token variable", () => {
    render(<Box color="brand-black-900" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-color")).toBe("var(--tui-color-brand-black-900)");
  });

  it("converts decimal spacing keys to underscore format", () => {
    render(<Box p="0.5" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.getPropertyValue("--tui-box-p")).toBe("var(--tui-spacing-0_5)");
  });

  it("renders Shimmer in ghost mode", () => {
    render(<Box isGhost testId="ghost-box" />);
    const el = screen.getByTestId("ghost-box");
    expect(el).toHaveClass("tui-shimmer");
    expect(el).toHaveClass("tui-box");
  });

  it("applies ghostWidth and ghostHeight in ghost mode", () => {
    render(<Box isGhost ghostWidth="200px" ghostHeight="100px" testId="ghost-box" />);
    const el = screen.getByTestId("ghost-box");
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("100px");
  });

  it("forwards inline style", () => {
    render(<Box style={{ border: "1px solid red" }} data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el.style.border).toBe("1px solid red");
  });

  it("spreads additional HTML attributes", () => {
    render(<Box id="my-id" role="region" data-testid="box" />);
    const el = screen.getByTestId("box");
    expect(el).toHaveAttribute("id", "my-id");
    expect(el).toHaveAttribute("role", "region");
  });
});
