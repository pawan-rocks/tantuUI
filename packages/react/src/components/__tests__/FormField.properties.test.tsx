import { render } from "@testing-library/react";
import { fc, test as fcTest } from "@fast-check/vitest";
import { describe, expect } from "vitest";
import { FormField } from "../FormField/FormField";

/**
 * Feature: form-components, Property 3: className merge preserves base classes
 * Validates: Requirements 7.12
 *
 * For any non-empty className string, rendering FormField with that className
 * SHALL produce output containing both `tui-form-field` and the user className.
 */
describe("Feature: form-components, Property 3: className merge preserves base classes", () => {
  const alphanumeric = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [alphanumeric],
    { numRuns: 100 },
  )(
    "FormField always contains tui-form-field base class and user className",
    (customClass) => {
      const { container } = render(<FormField className={customClass} />);
      const wrapper = container.firstElementChild;
      expect(wrapper).toHaveClass("tui-form-field");
      expect(wrapper).toHaveClass(customClass);
    },
  );
});

/**
 * Feature: form-components, Property 10: errorText takes priority over helperText
 * Validates: Requirements 7.6
 *
 * For any FormField where both helperText and errorText are non-empty strings,
 * only the errorText SHALL be rendered (with tui-form-field__error class and role="alert"),
 * and helperText SHALL NOT be visible.
 */
describe("Feature: form-components, Property 10: errorText takes priority over helperText", () => {
  const nonEmptyString = fc.string({ minLength: 1, unit: fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz0123456789") });

  fcTest.prop(
    [nonEmptyString, nonEmptyString],
    { numRuns: 100 },
  )(
    "When both errorText and helperText are provided, only errorText is rendered",
    (helperText, errorText) => {
      const { container } = render(
        <FormField helperText={helperText} errorText={errorText}>
          <input />
        </FormField>,
      );

      // errorText element is present with correct class and role
      const errorEl = container.querySelector(".tui-form-field__error");
      expect(errorEl).toBeInTheDocument();
      expect(errorEl).toHaveTextContent(errorText);
      expect(errorEl).toHaveAttribute("role", "alert");

      // helperText element is NOT present
      const helperEl = container.querySelector(".tui-form-field__helper");
      expect(helperEl).not.toBeInTheDocument();
    },
  );
});
