/**
 * @tantuui/postcss-plugin
 *
 * PostCSS plugin that provides @apply support for tui-* utility classes.
 *
 * Usage in postcss.config.js:
 *   module.exports = {
 *     plugins: [
 *       require("@tantuui/postcss-plugin")(),
 *     ],
 *   };
 *
 * Then in your CSS:
 *   .my-button {
 *     @apply tui-px-4 tui-py-2 tui-rounded-md tui-bg-brand-blue-600 tui-text-white tui-font-medium;
 *   }
 *
 *   .my-button:hover {
 *     @apply tui-bg-brand-blue-700;
 *   }
 */

import type { PluginCreator } from "postcss";
import postcss from "postcss";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";

// ── Token-to-CSS resolution maps ──────────────────────────────────────

interface ClassDeclarations {
  [className: string]: Record<string, string>;
}

let classCache: ClassDeclarations | null = null;

/**
 * Parse the utilities.css file to build a map of class → declarations.
 */
function loadUtilities(utilitiesPath?: string): ClassDeclarations {
  if (classCache) return classCache;

  // Try to find utilities.css
  let cssContent = "";
  const paths = [
    utilitiesPath,
    resolveFromNodeModules("@tantuui/tokens/dist/utilities.css"),
    resolveFromNodeModules("@tantuui/tokens/css/utilities"),
  ].filter(Boolean) as string[];

  for (const p of paths) {
    try {
      cssContent = readFileSync(p, "utf-8");
      break;
    } catch {
      continue;
    }
  }

  if (!cssContent) {
    console.warn(
      "[@tantuui/postcss-plugin] Could not find @tantuui/tokens utilities.css. @apply directives will be ignored.",
    );
    classCache = {};
    return classCache;
  }

  // Parse CSS rules into a map
  const map: ClassDeclarations = {};
  const ruleRegex = /\.([\w\\[\]()%.,#:>+~\/-]+)\s*\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(cssContent)) !== null) {
    const rawSelector = match[1];
    const declarationsStr = match[2].trim();

    // Unescape selector to get the class name
    const className = rawSelector.replace(/\\(.)/g, "$1");

    // Parse declarations
    const declarations: Record<string, string> = {};
    for (const decl of declarationsStr.split(";")) {
      const trimmed = decl.trim();
      if (!trimmed) continue;
      const colonIndex = trimmed.indexOf(":");
      if (colonIndex === -1) continue;
      const prop = trimmed.slice(0, colonIndex).trim();
      const value = trimmed.slice(colonIndex + 1).trim();
      declarations[prop] = value;
    }

    if (Object.keys(declarations).length > 0) {
      map[className] = declarations;
    }
  }

  classCache = map;
  return classCache;
}

/**
 * Resolve a package path from node_modules.
 */
function resolveFromNodeModules(pkg: string): string | null {
  try {
    // Walk up directories to find node_modules
    let dir = process.cwd();
    for (let i = 0; i < 10; i++) {
      const candidate = resolve(dir, "node_modules", pkg);
      try {
        readFileSync(candidate);
        return candidate;
      } catch {
        // Try parent
      }
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  } catch {
    // ignore
  }
  return null;
}

// ── Arbitrary value resolution ────────────────────────────────────────

const PROPERTY_MAP: Record<string, string | string[]> = {
  "p":      "padding",
  "px":     ["padding-left", "padding-right"],
  "py":     ["padding-top", "padding-bottom"],
  "pt":     "padding-top",
  "pr":     "padding-right",
  "pb":     "padding-bottom",
  "pl":     "padding-left",
  "m":      "margin",
  "mx":     ["margin-left", "margin-right"],
  "my":     ["margin-top", "margin-bottom"],
  "mt":     "margin-top",
  "mr":     "margin-right",
  "mb":     "margin-bottom",
  "ml":     "margin-left",
  "w":      "width",
  "h":      "height",
  "min-w":  "min-width",
  "max-w":  "max-width",
  "min-h":  "min-height",
  "max-h":  "max-height",
  "gap":    "gap",
  "text":   "font-size",
  "leading":"line-height",
  "rounded":"border-radius",
  "border": "border-width",
  "top":    "top",
  "right":  "right",
  "bottom": "bottom",
  "left":   "left",
  "inset":  "inset",
  "z":      "z-index",
};

function resolveArbitrary(className: string): Record<string, string> | null {
  const match = className.match(/^tui-([\w-]+)-\[([^\]]+)\]$/);
  if (!match) return null;

  const [, prop, value] = match;
  const cssProperties = PROPERTY_MAP[prop];
  if (!cssProperties) return null;

  const result: Record<string, string> = {};
  if (Array.isArray(cssProperties)) {
    for (const p of cssProperties) {
      result[p] = value;
    }
  } else {
    result[cssProperties] = value;
  }
  return result;
}

// ── Plugin ────────────────────────────────────────────────────────────

interface PluginOptions {
  /** Path to the utilities.css file (auto-resolved from node_modules if not set) */
  utilitiesPath?: string;
}

const plugin: PluginCreator<PluginOptions> = (opts = {}) => {
  return {
    postcssPlugin: "@tantuui/postcss-plugin",
    AtRule: {
      apply(atRule) {
        const utilities = loadUtilities(opts.utilitiesPath);
        const classes = atRule.params.trim().split(/\s+/);
        const parent = atRule.parent;

        if (!parent) {
          atRule.remove();
          return;
        }

        for (const cls of classes) {
          // Try static utility lookup
          let declarations: Record<string, string> | undefined = utilities[cls];

          // Try arbitrary value
          if (!declarations) {
            declarations = resolveArbitrary(cls) ?? undefined;
          }

          if (!declarations) {
            // Unknown class — warn and skip
            console.warn(
              `[@tantuui/postcss-plugin] Unknown class "${cls}" in @apply. Skipping.`,
            );
            continue;
          }

          // Insert declarations into parent rule
          for (const [prop, value] of Object.entries(declarations)) {
            atRule.before(postcss.decl({ prop, value }));
          }
        }

        // Remove the @apply directive
        atRule.remove();
      },
    },
  };
};

plugin.postcss = true;

export default plugin;
