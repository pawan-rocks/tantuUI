import { defineConfig } from "tsup";

export default defineConfig({
  entry:       ["src/index.ts"],
  format:      ["cjs", "esm"],
  dts:         true,          // generate .d.ts
  sourcemap:   true,
  clean:       true,          // empty dist before build
  splitting:   false,         // single output file per format
  treeshake:   true,
  outDir:      "dist",

  // After JS is compiled, build-css.js reads dist/index.js to generate
  // the CSS and Tailwind preset artifacts.
  onSuccess: "node scripts/build-css.js",
});
