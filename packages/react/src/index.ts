/**
 * @tantuui/react — public API
 */

// Component styles (bundled by Vite → dist/index.css)
import "./index.css";

// Components
export * from "./components";

// Utilities
export { cn }        from "./utils/cn";
export { getCSSVar, setCSSVar, tokenVar } from "./utils/css-vars";

// Types
export type { BaseProps, Size, Variant, Intent } from "./types";
