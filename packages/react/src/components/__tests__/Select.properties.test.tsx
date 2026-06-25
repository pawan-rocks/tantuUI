import { render } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, expect } from "vitest";
import { Select } from "../Select/Select";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 5.2
 *
 * For any valid size, rendered Select container contains `tui-select--{size}`;
 * default produces `tui-select--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Select with explicit size contains tui-select--{size}",
    (size) => {
      const { container } = render(<Select size={size} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-select--${size}`);
      expect(wrapper).toHaveClass("tui-select");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Select without size prop defaults to tui-select--md",
    () => {
      const { container } = render(<Select />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-select--md");
      expect(wrapper).toHaveClass("tui-select");
    },
  );
});

/**
 * Feature: form-components, Property 2: Variant modifier class mapping
 * Validates: Requirements 5.3
 *
 * For any valid variant, rendered Select container contains `tui-select--{variant}`;
 * default produces `tui-select--outline`.
 */
describe("Feature: form-components, Property 2: Variant modifier class mapping", () => {
  const validVariants = ["outline", "soft", "plain"] as const;

  fcTest.prop(
    [fc.constantFrom(...validVariants)],
    { numRuns: 100 },
  )(
    "Select with explicit variant contains tui-select--{variant}",
    (variant) => {
      const { container } = render(<Select variant={variant} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-select--${variant}`);
      expect(wrapper).toHaveClass("tui-select");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Select without variant prop defaults to tui-select--outline",
    () => {
      const { container } = render(<Select />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-select--outline");
      expect(wrapper).toHaveClass("tui-select");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 5.10
 *
 * For any className, output contains both `tui-select` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Select always contains tui-select base class and user className",
    (customClass) => {
      const { container } = render(<Select className={customClass} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-select");
      expect(wrapper).toHaveClass(customClass);
    },
  );
});
