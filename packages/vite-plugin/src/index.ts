/**
 * @tantuui/vite-plugin
 *
 * Zero-config Vite plugin for TantuUI. Adds:
 * - PostCSS @apply support for tui-* classes
 * - Auto-injects token CSS, utility CSS, runtime JIT, and component CSS
 *
 * Usage:
 *   // vite.config.ts
 *   import { defineConfig } from "vite";
 *   import react from "@vitejs/plugin-react";
 *   import tantuui from "@tantuui/vite-plugin";
 *
 *   export default defineConfig({
 *     plugins: [react(), tantuui()],
 *   });
 *
 * That's it. No postcss.config needed. No manual CSS imports needed.
 */

import type { Plugin } from "vite";

interface TantuUIOptions {
  /**
   * Auto-inject TantuUI CSS imports into your app entry.
   * @default true
   */
  autoImport?: boolean;

  /**
   * Include @tantuui/react/css component styles.
   * Set to false if you only use tokens without the React component library.
   * @default true
   */
  includeComponentCSS?: boolean;
}

export default function tantuui(options: TantuUIOptions = {}): Plugin {
  const { autoImport = true, includeComponentCSS = true } = options;

  // Resolve the PostCSS plugin
  let postcssPlugin: any;
  try {
    postcssPlugin = require("@tantuui/postcss-plugin");
    postcssPlugin = postcssPlugin.default || postcssPlugin;
  } catch {
    postcssPlugin = null;
  }

  return {
    name: "vite-plugin-tantuui",
    enforce: "pre",

    // Auto-configure PostCSS with the TantuUI @apply plugin
    config() {
      if (!postcssPlugin) return;

      return {
        css: {
          postcss: {
            plugins: [postcssPlugin()] as any[],
          },
        },
      };
    },

    // Prepend TantuUI imports to the app entry module
    transform(code, id) {
      if (!autoImport) return;

      // Only transform the main entry file (main.tsx, main.ts, index.tsx, index.ts)
      if (!/\/src\/(main|index)\.(tsx?|jsx?)$/.test(id)) return;

      const imports = [
        `import "@tantuui/tokens/css";`,
        `import "@tantuui/tokens/css/utilities";`,
        `import "@tantuui/tokens/runtime";`,
      ];
      if (includeComponentCSS) {
        imports.push(`import "@tantuui/react/css";`);
      }

      return {
        code: imports.join("\n") + "\n" + code,
        map: null,
      };
    },
  };
}
