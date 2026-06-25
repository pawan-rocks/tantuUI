import { render } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, expect } from "vitest";
import { Textarea } from "../Textarea/Textarea";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 2.2
 *
 * For any valid size, rendered Textarea container contains `tui-textarea--{size}`;
 * default produces `tui-textarea--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Textarea with explicit size contains tui-textarea--{size}",
    (size) => {
      const { container } = render(<Textarea size={size} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-textarea--${size}`);
      expect(wrapper).toHaveClass("tui-textarea");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Textarea without size prop defaults to tui-textarea--md",
    () => {
      const { container } = render(<Textarea />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-textarea--md");
      expect(wrapper).toHaveClass("tui-textarea");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 2.12
 *
 * For any className, output contains both `tui-textarea` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Textarea always contains tui-textarea base class and user className",
    (customClass) => {
      const { container } = render(<Textarea className={customClass} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-textarea");
      expect(wrapper).toHaveClass(customClass);
    },
  );
});

/**
 * Feature: form-components, Property 5: Character count display format
 * Validates: Requirements 2.5, 2.6
 *
 * For any string value and any maxLength number, rendering Textarea with
 * characterCount=true displays the current character count. When maxLength
 * is also provided, the format is "{value.length}/{maxLength}".
 */
describe("Feature: form-components, Property 5: Character count display format", () => {
  fcTest.prop(
    [fc.string(), fc.integer({ min: 1, max: 1000 })],
    { numRuns: 100 },
  )(
    "Textarea with characterCount and maxLength displays {length}/{max} format",
    (value, maxLength) => {
      const { container } = render(
        <Textarea characterCount maxLength={maxLength} value={value} onChange={() => {}} />,
      );
      const countEl = container.querySelector(".tui-textarea__count");
      expect(countEl).toBeInTheDocument();
      expect(countEl).toHaveTextContent(`${value.length}/${maxLength}`);
    },
  );

  fcTest.prop(
    [fc.string()],
    { numRuns: 100 },
  )(
    "Textarea with characterCount but no maxLength displays {length} format",
    (value) => {
      const { container } = render(
        <Textarea characterCount value={value} onChange={() => {}} />,
      );
      const countEl = container.querySelector(".tui-textarea__count");
      expect(countEl).toBeInTheDocument();
      expect(countEl).toHaveTextContent(`${value.length}`);
    },
  );
});

/**
 * Feature: form-components, Property 6: Overlimit class application
 * Validates: Requirements 2.7
 *
 * For any string value and maxLength where value.length > maxLength,
 * `tui-textarea--overlimit` is applied. When value.length <= maxLength,
 * the overlimit class is NOT applied.
 */
describe("Feature: form-components, Property 6: Overlimit class application", () => {
  fcTest.prop(
    [
      fc.string({ minLength: 1 }),
      fc.integer({ min: 0, max: 999 }),
    ],
    { numRuns: 100 },
  )(
    "Textarea applies tui-textarea--overlimit when value.length > maxLength",
    (baseValue, maxLength) => {
      // Ensure value is longer than maxLength
      const value = baseValue.length > maxLength
        ? baseValue
        : baseValue + "x".repeat(maxLength - baseValue.length + 1);

      const { container } = render(
        <Textarea value={value} maxLength={maxLength} onChange={() => {}} />,
      );
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-textarea--overlimit");
    },
  );

  fcTest.prop(
    [
      fc.string(),
      fc.integer({ min: 0, max: 1000 }),
    ],
    { numRuns: 100 },
  )(
    "Textarea does NOT apply tui-textarea--overlimit when value.length <= maxLength",
    (baseValue, extra) => {
      // Ensure maxLength >= value.length
      const value = baseValue;
      const maxLength = value.length + extra;

      const { container } = render(
        <Textarea value={value} maxLength={maxLength} onChange={() => {}} />,
      );
      const wrapper = container.firstElementChild;
      expect(wrapper).not.toHaveClass("tui-textarea--overlimit");
    },
  );
});
