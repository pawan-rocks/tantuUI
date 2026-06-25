import { render } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, expect } from "vitest";
import { Input } from "../Input/Input";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 1.2
 *
 * For any valid size, rendered Input container contains `tui-input--{size}`;
 * default produces `tui-input--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Input with explicit size contains tui-input--{size}",
    (size) => {
      const { container } = render(<Input size={size} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-input--${size}`);
      expect(wrapper).toHaveClass("tui-input");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Input without size prop defaults to tui-input--md",
    () => {
      const { container } = render(<Input />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-input--md");
      expect(wrapper).toHaveClass("tui-input");
    },
  );
});

/**
 * Feature: form-components, Property 2: Variant modifier class mapping
 * Validates: Requirements 1.3
 *
 * For any valid variant, rendered Input container contains `tui-input--{variant}`;
 * default produces `tui-input--outline`.
 */
describe("Feature: form-components, Property 2: Variant modifier class mapping", () => {
  const validVariants = ["outline", "soft", "plain"] as const;

  fcTest.prop(
    [fc.constantFrom(...validVariants)],
    { numRuns: 100 },
  )(
    "Input with explicit variant contains tui-input--{variant}",
    (variant) => {
      const { container } = render(<Input variant={variant} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-input--${variant}`);
      expect(wrapper).toHaveClass("tui-input");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Input without variant prop defaults to tui-input--outline",
    () => {
      const { container } = render(<Input />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-input--outline");
      expect(wrapper).toHaveClass("tui-input");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 1.14
 *
 * For any className, output contains both `tui-input` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Input always contains tui-input base class and user className",
    (customClass) => {
      const { container } = render(<Input className={customClass} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-input");
      expect(wrapper).toHaveClass(customClass);
    },
  );
});

/**
 * Feature: form-components, Property 4: Clearable shows/hides clear button
 * Validates: Requirements 1.8, 1.9
 *
 * For any non-empty string value with clearable=true, a clear button is rendered.
 * For empty string value with clearable=true, no clear button is rendered.
 */
describe("Feature: form-components, Property 4: Clearable shows/hides clear button", () => {
  const nonEmptyString = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789 ") });

  fcTest.prop(
    [nonEmptyString],
    { numRuns: 100 },
  )(
    "Input with clearable=true and non-empty value renders clear button",
    (value) => {
      const { container } = render(<Input clearable value={value} onChange={() => {}} />);
      const clearButton = container.querySelector("button.tui-input__clear");
      expect(clearButton).toBeInTheDocument();
    },
  );

  fcTest.prop(
    [fc.constant("")],
    { numRuns: 100 },
  )(
    "Input with clearable=true and empty value does not render clear button",
    (value) => {
      const { container } = render(<Input clearable value={value} onChange={() => {}} />);
      const clearButton = container.querySelector("button.tui-input__clear");
      expect(clearButton).not.toBeInTheDocument();
    },
  );
});
