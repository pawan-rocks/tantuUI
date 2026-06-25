import { createContext, useContext } from "react";
import type { Size } from "../../types";

export interface RadioGroupContextValue {
  /** Name attribute for all child radios */
  name?: string;
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Size passed to all child radios */
  size?: Size;
  /** Invalid state applied to all child radios */
  isInvalid?: boolean;
  /** Disabled state applied to all child radios */
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined,
);

export function useRadioGroupContext(): RadioGroupContextValue | undefined {
  return useContext(RadioGroupContext);
}
