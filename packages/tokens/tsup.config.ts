import { defineConfig } from "tsup";

export default defineConfig({
  entry:       ["src/index.ts", "src/runtime.ts"],
  format:      ["cjs", "esm"],
  dts:         true,
  sourcemap:   true,
  clean:       true,
  splitting:   false,
  treeshake:   true,
  outDir:      "dist",

  // After JS is compiled, build-css.js reads dist/index.js to generate
  // the CSS and Tailwind preset artifacts.
  onSuccess: "node scripts/build-css.js",
});
