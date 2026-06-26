/**
 * @tantuui/tokens — public API
 *
 * Usage:
 *   import { color, spacing, typography, tokens } from "@tantuui/tokens";
 *   import { generateAllCSS } from "@tantuui/tokens";
 *   import tuiPreset from "@tantuui/tokens/tailwind-preset";
 */

// ── Token objects ─────────────────────────────────────────────────────
export {
  color,
  type ColorTokens,
} from "./tokens/color";

export {
  spacing,
  type SpacingTokens,
} from "./tokens/spacing";

export {
  typography,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  type TypographyTokens,
} from "./tokens/typography";

export {
  radius,
  type RadiusTokens,
} from "./tokens/radius";

export {
  shadow,
  type ShadowTokens,
} from "./tokens/shadow";

export {
  border,
  borderWidth,
  borderStyle,
  type BorderTokens,
} from "./tokens/border";

export {
  zIndex,
  type ZIndexTokens,
} from "./tokens/zindex";

export {
  animation,
  duration,
  easing,
  type AnimationTokens,
} from "./tokens/animation";

export {
  breakpoint,
  type BreakpointTokens,
} from "./tokens/breakpoint";

export {
  opacity,
  type OpacityTokens,
} from "./tokens/opacity";

export {
  sizing,
  type SizingTokens,
} from "./tokens/sizing";

// ── Aggregated token object ───────────────────────────────────────────
import { color }      from "./tokens/color";
import { spacing }    from "./tokens/spacing";
import { typography } from "./tokens/typography";
import { radius }     from "./tokens/radius";
import { shadow }     from "./tokens/shadow";
import { border }     from "./tokens/border";
import { zIndex }     from "./tokens/zindex";
import { animation }  from "./tokens/animation";
import { breakpoint } from "./tokens/breakpoint";
import { opacity }    from "./tokens/opacity";
import { sizing }     from "./tokens/sizing";

export const tokens = {
  color,
  spacing,
  typography,
  radius,
  shadow,
  border,
  zIndex,
  animation,
  breakpoint,
  opacity,
  sizing,
} as const;

export type Tokens = typeof tokens;

// ── CSS generation utilities ──────────────────────────────────────────
export {
  flattenTokens,
  toCSSRoot,
  generateCSSCategory,
} from "./css-generator";
