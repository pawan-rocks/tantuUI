import { render, fireEvent } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, vi, expect } from "vitest";
import { Radio } from "../Radio/Radio";
import { RadioGroup } from "../Radio/RadioGroup";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 4.3
 *
 * For any valid size, rendered Radio container contains `tui-radio--{size}`;
 * default produces `tui-radio--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Radio with explicit size contains tui-radio--{size}",
    (size) => {
      const { container } = render(<Radio size={size} value="test" />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass(`tui-radio--${size}`);
      expect(wrapper).toHaveClass("tui-radio");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Radio without size prop defaults to tui-radio--md",
    () => {
      const { container } = render(<Radio value="test" />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-radio--md");
      expect(wrapper).toHaveClass("tui-radio");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 4.14
 *
 * For any className, output contains both `tui-radio` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Radio always contains tui-radio base class and user className",
    (customClass) => {
      const { container } = render(<Radio className={customClass} value="test" />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-radio");
      expect(wrapper).toHaveClass(customClass);
    },
  );
});

/**
 * Feature: form-components, Property 8: RadioGroup value selects exactly one Radio
 * Validates: Requirements 4.11
 *
 * For any value matching one child Radio's value, exactly one Radio is checked
 * and all others are unchecked.
 */
describe("Feature: form-components, Property 8: RadioGroup value selects exactly one Radio", () => {
  const radioValues = ["a", "b", "c"] as const;

  fcTest.prop(
    [fc.constantFrom(...radioValues)],
    { numRuns: 100 },
  )(
    "RadioGroup with value selects exactly one Radio",
    (selectedValue) => {
      const { container } = render(
        <RadioGroup value={selectedValue} name="test-group">
          <Radio value="a" />
          <Radio value="b" />
          <Radio value="c" />
        </RadioGroup>,
      );

      const radios = container.querySelectorAll<HTMLInputElement>("input.tui-radio__native");
      const checkedRadios = Array.from(radios).filter((r) => r.checked);

      // Exactly one radio is checked
      expect(checkedRadios).toHaveLength(1);
      // The checked one has the matching value
      expect(checkedRadios[0].value).toBe(selectedValue);
    },
  );
});

/**
 * Feature: form-components, Property 9: RadioGroup onChange fires with selected Radio value
 * Validates: Requirements 4.12
 *
 * Clicking a Radio within a RadioGroup fires onChange with that Radio's value.
 */
describe("Feature: form-components, Property 9: RadioGroup onChange fires with selected Radio value", () => {
  const radioValues = ["a", "b", "c"] as const;

  fcTest.prop(
    [fc.constantFrom(...radioValues)],
    { numRuns: 100 },
  )(
    "Clicking a Radio fires RadioGroup onChange with its value",
    (clickedValue) => {
      const onChange = vi.fn();
      const { container } = render(
        <RadioGroup onChange={onChange} name="test-group">
          <Radio value="a" />
          <Radio value="b" />
          <Radio value="c" />
        </RadioGroup>,
      );

      const radios = container.querySelectorAll<HTMLInputElement>("input.tui-radio__native");
      const targetRadio = Array.from(radios).find((r) => r.value === clickedValue)!;
      fireEvent.click(targetRadio);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(clickedValue);
    },
  );
});
