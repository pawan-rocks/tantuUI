import { render, fireEvent } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, vi, expect } from "vitest";
import { Checkbox } from "../Checkbox/Checkbox";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 3.4
 *
 * For any valid size, rendered Checkbox container contains `tui-checkbox--{size}`;
 * default produces `tui-checkbox--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Checkbox with explicit size contains tui-checkbox--{size}",
    (size) => {
      const { container } = render(<Checkbox size={size} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-checkbox--${size}`);
      expect(wrapper).toHaveClass("tui-checkbox");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Checkbox without size prop defaults to tui-checkbox--md",
    () => {
      const { container } = render(<Checkbox />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-checkbox--md");
      expect(wrapper).toHaveClass("tui-checkbox");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 3.11
 *
 * For any className, output contains both `tui-checkbox` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Checkbox always contains tui-checkbox base class and user className",
    (customClass) => {
      const { container } = render(<Checkbox className={customClass} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-checkbox");
      expect(wrapper).toHaveClass(customClass);
    },
  );
});

/**
 * Feature: form-components, Property 7: Toggle onChange fires with negated state
 * Validates: Requirements 3.13
 *
 * For any checked boolean, clicking the Checkbox fires onChange.
 * The native checkbox behavior means target.checked will be the toggled value.
 */
describe("Feature: form-components, Property 7: Toggle onChange fires with negated state", () => {
  fcTest.prop(
    [fc.boolean()],
    { numRuns: 100 },
  )(
    "Clicking Checkbox fires onChange",
    (checked) => {
      const onChange = vi.fn();
      const { container } = render(
        <Checkbox checked={checked} onChange={onChange} />,
      );
      const nativeInput = container.querySelector("input.tui-checkbox__native") as HTMLInputElement;
      fireEvent.click(nativeInput);
      expect(onChange).toHaveBeenCalledTimes(1);
    },
  );
});
