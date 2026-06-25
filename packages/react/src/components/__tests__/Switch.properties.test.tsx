import { render, fireEvent } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, vi, expect } from "vitest";
import { Switch } from "../Switch/Switch";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 6.4
 *
 * For any valid size, rendered Switch button contains `tui-switch--{size}`;
 * default produces `tui-switch--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Switch with explicit size contains tui-switch--{size}",
    (size) => {
      const { container } = render(<Switch size={size} />);
      const button = container.firstElementChild;
      expect(button).toHaveClass(`tui-switch--${size}`);
      expect(button).toHaveClass("tui-switch");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Switch without size prop defaults to tui-switch--md",
    () => {
      const { container } = render(<Switch />);
      const button = container.firstElementChild;
      expect(button).toHaveClass("tui-switch--md");
      expect(button).toHaveClass("tui-switch");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 6.11
 *
 * For any className, output contains both `tui-switch` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Switch always contains tui-switch base class and user className",
    (customClass) => {
      const { container } = render(<Switch className={customClass} />);
      const button = container.firstElementChild;
      expect(button).toHaveClass("tui-switch");
      expect(button).toHaveClass(customClass);
    },
  );
});

/**
 * Feature: form-components, Property 7: Toggle onChange fires with negated state
 * Validates: Requirements 6.7
 *
 * For any boolean checked state, when the Switch is clicked and not disabled,
 * the onChange callback is invoked with the logical negation of checked.
 */
describe("Feature: form-components, Property 7: Toggle onChange fires with negated state", () => {
  fcTest.prop(
    [fc.boolean()],
    { numRuns: 100 },
  )(
    "Clicking Switch fires onChange with !checked",
    (checked) => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={checked} onChange={handleChange} />,
      );
      const button = container.firstElementChild as HTMLElement;
      fireEvent.click(button);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(!checked);
    },
  );
});
