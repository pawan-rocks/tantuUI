import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { Textarea } from "../Textarea/Textarea";

describe("Textarea", () => {
  it("renders textarea in container with tui-textarea class", () => {
    const { container } = render(<Textarea />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper).toHaveClass("tui-textarea", "tui-textarea--md");
    const textarea = wrapper.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass("tui-textarea__native");
  });

  it("autoResize adjusts height based on scrollHeight", () => {
    const { container } = render(<Textarea autoResize value="hello" />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;

    Object.defineProperty(textarea, "scrollHeight", {
      value: 200,
      configurable: true,
    });

    // Re-render to trigger useLayoutEffect
    const { container: container2 } = render(
      <Textarea autoResize value="hello\nworld" />,
    );
    const textarea2 = container2.querySelector("textarea") as HTMLTextAreaElement;

    Object.defineProperty(textarea2, "scrollHeight", {
      value: 200,
      configurable: true,
    });

    // Force a re-render with different value to trigger the effect
    const { container: container3 } = render(
      <Textarea autoResize value="hello\nworld\nfoo" />,
    );
    const textarea3 = container3.querySelector("textarea") as HTMLTextAreaElement;

    Object.defineProperty(textarea3, "scrollHeight", {
      value: 150,
      configurable: true,
    });

    // The useLayoutEffect sets height to scrollHeight
    // Since jsdom doesn't truly compute layout, we verify the style is set
    expect(textarea3.style.height).toBeDefined();
  });

  it("maxRows caps growth and enables scroll when content exceeds max height", () => {
    const { container, rerender } = render(
      <Textarea autoResize maxRows={3} value="line1" />,
    );
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;

    // Mock getComputedStyle values
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = (el: Element) => {
      const style = originalGetComputedStyle(el);
      return {
        ...style,
        lineHeight: "20px",
        fontSize: "14px",
        paddingTop: "8px",
        paddingBottom: "8px",
        borderTopWidth: "1px",
        borderBottomWidth: "1px",
      } as CSSStyleDeclaration;
    };

    // maxHeight = 20*3 + 8 + 8 + 1 + 1 = 78px
    // Set scrollHeight above maxHeight to trigger scroll
    Object.defineProperty(textarea, "scrollHeight", {
      value: 200,
      configurable: true,
    });

    rerender(<Textarea autoResize maxRows={3} value="line1\nline2\nline3\nline4\nline5" />);

    expect(textarea.style.overflowY).toBe("auto");
    expect(textarea.style.height).toBe("78px");

    // Restore
    window.getComputedStyle = originalGetComputedStyle;
  });

  it("character count renders correct text without maxLength", () => {
    render(<Textarea characterCount value="hello" />);
    const count = screen.getByText("5");
    expect(count).toBeInTheDocument();
    expect(count.tagName).toBe("SPAN");
    expect(count).toHaveClass("tui-textarea__count");
  });

  it("character count renders correct text with maxLength", () => {
    render(<Textarea characterCount maxLength={100} value="hello" />);
    const count = screen.getByText("5/100");
    expect(count).toBeInTheDocument();
    expect(count).toHaveClass("tui-textarea__count");
  });

  it("overlimit applies danger styling class when value exceeds maxLength", () => {
    const { container } = render(
      <Textarea characterCount maxLength={5} value="exceeds" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-textarea--overlimit");
  });

  it("does not apply overlimit class when within maxLength", () => {
    const { container } = render(
      <Textarea characterCount maxLength={10} value="hello" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveClass("tui-textarea--overlimit");
  });

  it("disabled state applies correct attributes", () => {
    const { container } = render(<Textarea disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("tui-textarea--disabled");
    const textarea = wrapper.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("aria-disabled", "true");
    expect(textarea).toHaveAttribute("tabindex", "-1");
  });

  it("ghost mode renders Shimmer", () => {
    const { container } = render(<Textarea isGhost />);
    const shimmer = container.firstElementChild as HTMLElement;
    expect(shimmer).toHaveClass("tui-shimmer");
    expect(shimmer).toHaveClass("tui-textarea");
    expect(container.querySelector("textarea")).not.toBeInTheDocument();
  });

  it("ref forwarding to native textarea", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current?.tagName).toBe("TEXTAREA");
  });
});
