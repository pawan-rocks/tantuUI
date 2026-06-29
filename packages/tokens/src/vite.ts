/**
 * @tantuui/tokens/vite
 *
 * Zero-config Vite plugin for TantuUI.
 *
 * Usage:
 *   import { defineConfig } from "vite";
 *   import react from "@vitejs/plugin-react";
 *   import tantuui from "@tantuui/tokens/vite";
 *
 *   export default defineConfig({
 *     plugins: [react(), tantuui()],
 *   });
 */

// No vite type import — avoids version mismatch between consumer and this package

interface TantuUIOptions {
  /** Auto-inject TantuUI CSS imports. @default true */
  autoImport?: boolean;
  /** Include @tantuui/react/css component styles. @default true */
  includeComponentCSS?: boolean;
}

export default function tantuui(options: TantuUIOptions = {}): any {
  const { autoImport = true, includeComponentCSS = true } = options;

  let postcssPlugin: any;
  try {
    // Load the PostCSS plugin from the same package
    postcssPlugin = require("@tantuui/tokens/postcss");
    postcssPlugin = postcssPlugin.default || postcssPlugin;
  } catch {
    postcssPlugin = null;
  }

  return {
    name: "vite-plugin-tantuui",
    enforce: "pre",

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

    transform(code: string, id: string) {
      if (!autoImport) return;
      if (!/\/src\/(main|index)\.(tsx?|jsx?)$/.test(id)) return;

      const imports = [
        `import "@tantuui/tokens/css";`,
        `import "@tantuui/tokens/css/utilities";`,
        `import "@tantuui/tokens/runtime";`,
      ];
      if (includeComponentCSS) {
        imports.push(`import "@tantuui/react/css";`);
      }

      return { code: imports.join("\n") + "\n" + code, map: null };
    },
  };
}
