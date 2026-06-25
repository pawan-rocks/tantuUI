import { render } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, expect } from "vitest";
import { Label } from "../Label/Label";

/**
 * Feature: form-components, Property 1: Size modifier class mapping
 * Validates: Requirements 8.2, 8.6
 *
 * For any valid size, rendered Label contains `tui-label--{size}`;
 * default produces `tui-label--md`.
 */
describe("Feature: form-components, Property 1: Size modifier class mapping", () => {
  const validSizes = ["xs", "sm", "md", "lg", "xl"] as const;

  fcTest.prop(
    [fc.constantFrom(...validSizes)],
    { numRuns: 100 },
  )(
    "Label with explicit size contains tui-label--{size}",
    (size) => {
      const { container } = render(<Label size={size}>Test</Label>);
      const label = container.querySelector("label");
      expect(label).toHaveClass(`tui-label--${size}`);
      expect(label).toHaveClass("tui-label");
    },
  );

  fcTest.prop(
    [fc.constant(undefined)],
    { numRuns: 100 },
  )(
    "Label without size prop defaults to tui-label--md",
    () => {
      const { container } = render(<Label>Test</Label>);
      const label = container.querySelector("label");
      expect(label).toHaveClass("tui-label--md");
      expect(label).toHaveClass("tui-label");
    },
  );
});

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 8.6
 *
 * For any className, output contains both `tui-label` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "Label always contains tui-label base class and user className",
    (customClass) => {
      const { container } = render(<Label className={customClass}>Test</Label>);
      const label = container.querySelector("label");
      expect(label).toHaveClass("tui-label");
      expect(label).toHaveClass(customClass);
    },
  );
});
