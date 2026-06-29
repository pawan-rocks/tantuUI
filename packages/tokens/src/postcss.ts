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
  "min-h": "min-height", "max-h": "max-height", "gap": "gap", "text": "font-size",
  "leading": "line-height", "rounded": "border-radius", "border": "border-width",
  "top": "top", "right": "right", "bottom": "bottom", "left": "left", "inset": "inset", "z": "z-index",
};

function resolveArbitrary(className: string): Record<string, string> | null {
  const match = className.match(/^tui-([\w-]+)-\[([^\]]+)\]$/);
  if (!match) return null;
  const [, prop, value] = match;
  const cssProperties = PROPERTY_MAP[prop];
  if (!cssProperties) return null;
  const result: Record<string, string> = {};
  if (Array.isArray(cssProperties)) {
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
          let declarations: Record<string, string> | undefined = utilities[cls];
          if (!declarations) declarations = resolveArbitrary(cls) ?? undefined;
          if (!declarations) {
            console.warn(`[@tantuui/tokens/postcss] Unknown class "${cls}" in @apply. Skipping.`);
            continue;
          }
          for (const [prop, value] of Object.entries(declarations)) {
            atRule.before(`${prop}: ${value};`);
          }
        }
        atRule.remove();
      },
    },
  };
};

plugin.postcss = true;
export default plugin;
