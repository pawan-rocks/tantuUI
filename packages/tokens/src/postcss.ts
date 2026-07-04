/**
 * @tantuui/tokens/postcss
 *
 * PostCSS plugin for TantuUI — @apply support for tui-* utility classes.
 *
 * Usage:
 *   // postcss.config.js
 *   module.exports = {
 *     plugins: [require("@tantuui/tokens/postcss")()],
 *   };
 *
 * In CSS:
 *   .my-button {
 *     @apply tui-px-4 tui-py-2 tui-rounded-md tui-bg-brand-blue-600 tui-text-white;
 *   }
 */

import type { PluginCreator } from "postcss";
import postcss from "postcss";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";

interface ClassDeclarations {
  [className: string]: Record<string, string>;
}

let classCache: ClassDeclarations | null = null;

function loadUtilities(utilitiesPath?: string): ClassDeclarations {
  if (classCache) return classCache;

  let cssContent = "";
  const paths = [
    utilitiesPath,
    resolve(__dirname, "utilities.css"),
    resolveFromNodeModules("@tantuui/tokens/dist/utilities.css"),
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
    console.warn("[@tantuui/tokens/postcss] Could not find utilities.css. @apply directives will be ignored.");
    classCache = {};
    return classCache;
  }

  const map: ClassDeclarations = {};
  const ruleRegex = /\.([\w\\[\]()%.,#:>+~\/-]+)\s*\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(cssContent)) !== null) {
    const rawSelector = match[1];
    const declarationsStr = match[2].trim();
    const className = rawSelector.replace(/\\(.)/g, "$1");
    const declarations: Record<string, string> = {};

    for (const decl of declarationsStr.split(";")) {
      const trimmed = decl.trim();
      if (!trimmed) continue;
      const colonIndex = trimmed.indexOf(":");
      if (colonIndex === -1) continue;
      declarations[trimmed.slice(0, colonIndex).trim()] = trimmed.slice(colonIndex + 1).trim();
    }

    if (Object.keys(declarations).length > 0) {
      map[className] = declarations;
    }
  }

  classCache = map;
  return classCache;
}

function resolveFromNodeModules(pkg: string): string | null {
  try {
    let dir = process.cwd();
    for (let i = 0; i < 10; i++) {
      const candidate = resolve(dir, "node_modules", pkg);
      try {
        readFileSync(candidate);
        return candidate;
      } catch { /* skip */ }
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  } catch { /* ignore */ }
  return null;
}

const PROPERTY_MAP: Record<string, string | string[]> = {
  "p": "padding", "px": ["padding-left", "padding-right"], "py": ["padding-top", "padding-bottom"],
  "pt": "padding-top", "pr": "padding-right", "pb": "padding-bottom", "pl": "padding-left",
  "m": "margin", "mx": ["margin-left", "margin-right"], "my": ["margin-top", "margin-bottom"],
  "mt": "margin-top", "mr": "margin-right", "mb": "margin-bottom", "ml": "margin-left",
  "w": "width", "h": "height", "min-w": "min-width", "max-w": "max-width",
  "min-h": "min-height", "max-h": "max-height", "gap": "gap", "gap-x": "column-gap", "gap-y": "row-gap",
  "text": "font-size", "leading": "line-height", "tracking": "letter-spacing",
  "rounded": "border-radius", "border": "border-width",
  "top": "top", "right": "right", "bottom": "bottom", "left": "left", "inset": "inset", "z": "z-index",
  "rotate": "TRANSFORM:rotate", "scale": "TRANSFORM:scale", "scale-x": "TRANSFORM:scaleX", "scale-y": "TRANSFORM:scaleY",
  "skew-x": "TRANSFORM:skewX", "skew-y": "TRANSFORM:skewY",
  "translate-x": "TRANSFORM:translateX", "translate-y": "TRANSFORM:translateY",
  "blur": "FILTER:blur", "brightness": "FILTER:brightness", "contrast": "FILTER:contrast",
  "saturate": "FILTER:saturate", "hue-rotate": "FILTER:hue-rotate", "drop-shadow": "FILTER:drop-shadow",
  "backdrop-blur": "BACKDROP:blur", "backdrop-brightness": "BACKDROP:brightness",
  "backdrop-contrast": "BACKDROP:contrast", "backdrop-saturate": "BACKDROP:saturate",
  "opacity": "opacity", "basis": "flex-basis", "order": "order", "columns": "columns",
  "indent": "text-indent", "duration": "transition-duration", "delay": "transition-delay",
};

function resolveArbitrary(className: string): Record<string, string> | null {
  const match = className.match(/^tui-([\w-]+)-\[([^\]]+)\]$/);
  if (!match) return null;
  const [, prop, rawValue] = match;
  const cssProperties = PROPERTY_MAP[prop];
  if (!cssProperties) return null;
  // Convert underscores to spaces (like Tailwind) for calc(), etc.
  // Also auto-add spaces around + and - operators inside calc/clamp/min/max
  let value = rawValue.replace(/_/g, " ");
  value = value.replace(/([a-zA-Z%)])([+-])(\d)/g, "$1 $2 $3");
  const result: Record<string, string> = {};

  if (typeof cssProperties === "string" && cssProperties.startsWith("TRANSFORM:")) {
    const fn = cssProperties.slice("TRANSFORM:".length);
    const unit = (fn === "rotate" || fn === "skewX" || fn === "skewY") ? "deg" : "";
    const finalValue = value.match(/[a-z%]/) ? value : `${value}${unit}`;
    result["transform"] = `${fn}(${finalValue})`;
  } else if (typeof cssProperties === "string" && cssProperties.startsWith("FILTER:")) {
    const fn = cssProperties.slice("FILTER:".length);
    result["filter"] = `${fn}(${value})`;
  } else if (typeof cssProperties === "string" && cssProperties.startsWith("BACKDROP:")) {
    const fn = cssProperties.slice("BACKDROP:".length);
    result["backdrop-filter"] = `${fn}(${value})`;
    result["-webkit-backdrop-filter"] = `${fn}(${value})`;
  } else if (Array.isArray(cssProperties)) {
    for (const p of cssProperties) result[p] = value;
  } else {
    result[cssProperties] = value;
  }
  return result;
}

interface PluginOptions {
  utilitiesPath?: string;
}

const plugin: PluginCreator<PluginOptions> = (opts = {}) => {
  return {
    postcssPlugin: "@tantuui/tokens/postcss",
    AtRule: {
      apply(atRule) {
        const utilities = loadUtilities(opts.utilitiesPath);
        const classes = atRule.params.trim().split(/\s+/);
        const parent = atRule.parent;
        if (!parent) { atRule.remove(); return; }

        for (const cls of classes) {
          // Handle !important prefix: !tui-p-4 → padding with !important
          let actualCls = cls;
          let important = false;
          if (actualCls.startsWith("!")) {
            important = true;
            actualCls = actualCls.slice(1);
          }

          let declarations: Record<string, string> | undefined = utilities[actualCls];
          if (!declarations) declarations = resolveArbitrary(actualCls) ?? undefined;
          if (!declarations) {
            console.warn(`[@tantuui/tokens/postcss] Unknown class "${cls}" in @apply. Skipping.`);
            continue;
          }
          for (const [prop, value] of Object.entries(declarations)) {
            atRule.before(postcss.decl({ prop, value: important ? `${value} !important` : value }));
          }
        }
        atRule.remove();
      },
    },
  };
};

plugin.postcss = true;
export default plugin;
