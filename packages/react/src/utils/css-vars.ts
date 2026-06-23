/**
 * Runtime CSS variable helpers.
 *
 * Lets components read/set token values at runtime,
 * useful for dynamic theming.
 */

const PREFIX = "--tui";

/** Read a CSS variable value from the document root. */
export function getCSSVar(name: string): string {
  if (typeof window === "undefined") return "";
  const varName = name.startsWith("--") ? name : `${PREFIX}-${name}`;
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/** Set a CSS variable on the document root (or a target element). */
export function setCSSVar(
  name: string,
  value: string,
  target: HTMLElement = document.documentElement,
): void {
  const varName = name.startsWith("--") ? name : `${PREFIX}-${name}`;
  target.style.setProperty(varName, value);
}

/** Build an inline style object from a `--tui-*` variable reference. */
export function tokenVar(name: string): string {
  const varName = name.startsWith("--") ? name : `${PREFIX}-${name}`;
  return `var(${varName})`;
}
