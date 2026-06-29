/**
 * TantuUI Runtime JIT
 *
 * Scans the DOM for tui-* classes and dynamically injects matching CSS rules.
 *
 * Usage:
 *   import "@tantuui/tokens/runtime";          // ESM
 *   <script src="@tantuui/tokens/runtime"></script>  // HTML
 *
 * ─── Arbitrary Values ────────────────────────────────────────────────
 *   tui-p-[10px]        → padding: 10px
 *   tui-w-[350px]       → width: 350px
 *   tui-h-[100vh]       → height: 100vh
 *   tui-max-w-[600px]   → max-width: 600px
 *   tui-w-[calc(100%-260px)]  → width: calc(100% - 260px)
 *
 * ─── Pseudo-Class Variants ───────────────────────────────────────────
 *   hover:tui-bg-brand-black-100   → .hover\:tui-bg-brand-black-100:hover { ... }
 *   focus:tui-ring-2               → .focus\:tui-ring-2:focus { ... }
 *   active:tui-bg-brand-black-200  → .active\:tui-bg-brand-black-200:active { ... }
 *   disabled:tui-opacity-50        → .disabled\:tui-opacity-50:disabled { ... }
 *   focus-visible:tui-ring-2       → .focus-visible\:tui-ring-2:focus-visible { ... }
 *   group-hover:tui-text-white     → .group:hover .group-hover\:tui-text-white { ... }
 *
 * ─── Responsive Prefixes ─────────────────────────────────────────────
 *   sm:tui-flex          → @media (min-width: 640px)  { .sm\:tui-flex { ... } }
 *   md:tui-grid-cols-2   → @media (min-width: 768px)  { .md\:tui-grid-cols-2 { ... } }
 *   lg:tui-grid-cols-3   → @media (min-width: 1024px) { .lg\:tui-grid-cols-3 { ... } }
 *   xl:tui-hidden        → @media (min-width: 1280px) { .xl\:tui-hidden { ... } }
 *
 * ─── Combination ─────────────────────────────────────────────────────
 *   hover:tui-bg-[#ff0000]         → arbitrary + pseudo
 *   md:hover:tui-bg-brand-blue-600 → responsive + pseudo + static
 */

// ── Arbitrary value property map ──────────────────────────────────────
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

// ── Pseudo-class prefix → CSS pseudo-selector mapping ─────────────────
const PSEUDO_MAP: Record<string, string> = {
  "hover":         ":hover",
  "focus":         ":focus",
  "focus-visible": ":focus-visible",
  "focus-within":  ":focus-within",
  "active":        ":active",
  "disabled":      ":disabled",
  "visited":       ":visited",
  "first":         ":first-child",
  "last":          ":last-child",
  "odd":           ":nth-child(odd)",
  "even":          ":nth-child(even)",
  "placeholder":   "::placeholder",
};

// ── Group-based pseudo prefixes ───────────────────────────────────────
const GROUP_PSEUDO_MAP: Record<string, string> = {
  "group-hover":  ".group:hover",
  "group-focus":  ".group:focus",
  "group-active": ".group:active",
};

// ── Responsive breakpoints ────────────────────────────────────────────
const BREAKPOINTS: Record<string, string> = {
  "sm":  "640px",
  "md":  "768px",
  "lg":  "1024px",
  "xl":  "1280px",
  "2xl": "1536px",
};

// ── Regex patterns ────────────────────────────────────────────────────
const ARBITRARY_REGEX = /^tui-([\w-]+)-\[([^\]]+)\]$/;

// Cache of already-generated rules
const generatedRules = new Set<string>();

// The <style> element for injection
let styleEl: HTMLStyleElement | null = null;

function getStyleElement(): HTMLStyleElement {
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.setAttribute("data-tui-runtime", "");
    document.head.appendChild(styleEl);
  }
  return styleEl;
}

function escapeSelector(cls: string): string {
  return cls.replace(/([[\]()%.,#:>+~\/])/g, "\\$1");
}

function injectRule(rule: string): void {
  const sheet = getStyleElement();
  sheet.textContent += rule + "\n";
}

/**
 * Resolve a tui-* class (without prefix) to its CSS declarations.
 * Returns the declarations string or null if not an arbitrary value class.
 */
function resolveArbitrary(tuiClass: string): string | null {
  const match = tuiClass.match(ARBITRARY_REGEX);
  if (!match) return null;

  const [, prop, value] = match;
  const cssProperties = PROPERTY_MAP[prop];
  if (!cssProperties) return null;

  if (Array.isArray(cssProperties)) {
    return cssProperties.map((p) => `${p}: ${value}`).join("; ");
  }
  return `${cssProperties}: ${value}`;
}

/**
 * Try to resolve a static tui-* utility class by checking if it exists
 * in the loaded stylesheets. If it exists, we can reference it for pseudo variants.
 */
function getComputedDeclarations(tuiClass: string): string | null {
  // For static classes (tui-bg-white, tui-p-4, etc.), we read from existing stylesheets
  try {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule) {
            if (rule.selectorText === `.${tuiClass}` || rule.selectorText === `.${escapeSelector(tuiClass)}`) {
              return rule.style.cssText;
            }
          }
        }
      } catch {
        // Cross-origin stylesheet, skip
      }
    }
  } catch {
    // Stylesheets not accessible
  }
  return null;
}

/**
 * Process a single class name — handles arbitrary values, pseudo prefixes, and responsive.
 */
function processClass(className: string): void {
  if (generatedRules.has(className)) return;

  // ── Parse prefixes: responsive:pseudo:tui-class ──
  let responsivePrefix: string | null = null;
  let pseudoPrefix: string | null = null;
  let groupPrefix: string | null = null;
  let tuiClass = className;

  // Check for responsive prefix first (sm:, md:, lg:, xl:, 2xl:)
  const responsiveMatch = tuiClass.match(/^(sm|md|lg|xl|2xl):(.*)/);
  if (responsiveMatch) {
    responsivePrefix = responsiveMatch[1];
    tuiClass = responsiveMatch[2];
  }

  // Check for group pseudo prefix (group-hover:, group-focus:, group-active:)
  const groupMatch = tuiClass.match(/^(group-hover|group-focus|group-active):(.*)/);
  if (groupMatch) {
    groupPrefix = groupMatch[1];
    tuiClass = groupMatch[2];
  }

  // Check for pseudo prefix (hover:, focus:, active:, disabled:, etc.)
  if (!groupPrefix) {
    const pseudoMatch = tuiClass.match(/^(hover|focus|focus-visible|focus-within|active|disabled|visited|first|last|odd|even|placeholder):(.*)/);
    if (pseudoMatch) {
      pseudoPrefix = pseudoMatch[1];
      tuiClass = pseudoMatch[2];
    }
  }

  // If no prefix and no arbitrary value brackets, nothing to do
  if (!responsivePrefix && !pseudoPrefix && !groupPrefix && !tuiClass.includes("[")) {
    return;
  }

  // ── Resolve the CSS declarations ──
  let declarations: string | null = null;

  // Try arbitrary value first
  declarations = resolveArbitrary(tuiClass);

  // If not arbitrary, try to find existing static class declarations
  if (!declarations && (pseudoPrefix || groupPrefix || responsivePrefix)) {
    declarations = getComputedDeclarations(tuiClass);
  }

  if (!declarations) return;

  // Mark as generated
  generatedRules.add(className);

  // ── Build the CSS rule ──
  const escapedFull = `.${escapeSelector(className)}`;
  let selector: string;
  let rule: string;

  if (groupPrefix) {
    // group-hover:tui-text-white → .group:hover .group-hover\:tui-text-white
    const parentPseudo = GROUP_PSEUDO_MAP[groupPrefix];
    selector = `${parentPseudo} ${escapedFull}`;
  } else if (pseudoPrefix) {
    // hover:tui-bg-white → .hover\:tui-bg-white:hover
    const pseudo = PSEUDO_MAP[pseudoPrefix];
    selector = `${escapedFull}${pseudo}`;
  } else {
    // Just arbitrary value, no pseudo
    selector = escapedFull;
  }

  rule = `${selector} { ${declarations}; }`;

  // Wrap in media query if responsive
  if (responsivePrefix) {
    const bp = BREAKPOINTS[responsivePrefix];
    rule = `@media (min-width: ${bp}) { ${rule} }`;
  }

  injectRule(rule);
}

/**
 * Scan an element and all its descendants for processable classes.
 */
function scanElement(el: Element): void {
  const classes = el.className;
  if (typeof classes !== "string") return;

  for (const cls of classes.split(/\s+/)) {
    if (!cls) continue;
    // Process if: has arbitrary value brackets, OR has a recognized prefix
    if (cls.includes("[") || cls.includes(":")) {
      processClass(cls);
    }
  }

  // Scan children
  for (const child of el.children) {
    scanElement(child);
  }
}

/**
 * Initialize: scan existing DOM + observe for new elements.
 */
function init(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // Scan existing DOM
  scanElement(document.documentElement);

  // Watch for new elements or class changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) {
            scanElement(node);
          }
        }
      } else if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (mutation.target instanceof Element) {
          scanElement(mutation.target);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}

// Auto-initialize when the script loads
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

export { init, processClass, scanElement };
