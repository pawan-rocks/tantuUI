/**
 * CSS variable generator
 *
 * Converts token objects into flat CSS custom properties
 * with the `--tui-` prefix.
 *
 * Supports nested objects with kebab-case key joining:
 *   color.primitive.primary500 → --tui-color-primary-500
 */

type TokenValue = string | number;
type TokenObject = { [key: string]: TokenValue | TokenObject };

/**
 * Converts a camelCase or PascalCase key segment to kebab-case.
 * e.g. "primary500" → "primary-500"
 *      "fontFamily"  → "font-family"
 *      "2xl"         → "2xl"  (already fine)
 */
function toKebab(str: string): string {
  return str
    // Decimal dots → underscores: "0.5" → "0_5"
    // (dots are technically valid in CSS custom props but esbuild's minifier rejects them)
    .replace(/\./g, "_")
    // camelCase → kebab: "fontFamily" → "font-family"
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    // letter→digit boundary only (NOT digit→letter, so "2xl" stays "2xl")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase();
}

/**
 * Flatten a nested token object to a flat map of CSS variable name → value.
 *
 * @param obj      Token object (can be nested)
 * @param prefix   Current CSS variable prefix (default: "--tui")
 * @param skipKeys Keys to skip one level deep (e.g. "primitive" in color)
 */
export function flattenTokens(
  obj: TokenObject,
  prefix = "--tui",
  skipKeys: string[] = [],
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const segment = toKebab(key);
    const varName = skipKeys.includes(key)
      ? prefix                         // collapse this level
      : `${prefix}-${segment}`;

    if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenTokens(value as TokenObject, varName, []));
    } else {
      result[varName] = String(value);
    }
  }

  return result;
}

/**
 * Render a flat token map to a CSS `:root { }` block string.
 */
export function toCSSRoot(
  flatTokens: Record<string, string>,
  selector = ":root",
): string {
  const lines = Object.entries(flatTokens)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join("\n");
  return `${selector} {\n${lines}\n}\n`;
}

/**
 * Generate the full tokens CSS string for a given token category.
 */
export function generateCSSCategory(
  categoryName: string,
  tokens: TokenObject,
  selector = ":root",
  skipKeys: string[] = [],
): string {
  const prefix = `--tui-${toKebab(categoryName)}`;
  const flat = flattenTokens(tokens, prefix, skipKeys);
  return toCSSRoot(flat, selector);
}
