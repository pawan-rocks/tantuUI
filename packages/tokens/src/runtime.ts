/**
 * TantuUI Runtime JIT
 *
 * Scans the DOM for tui-* arbitrary value classes (e.g. tui-p-[10px], tui-w-[350px])
 * and dynamically injects matching CSS rules.
 *
 * Usage:
 *   import "@tantuui/tokens/runtime";          // ESM
 *   <script src="@tantuui/tokens/runtime"></script>  // HTML
 *
 * Supports:
 *   tui-p-[10px]        → padding: 10px
 *   tui-px-[1rem]       → padding-left: 1rem; padding-right: 1rem
 *   tui-m-[20px]        → margin: 20px
 *   tui-mt-[8px]        → margin-top: 8px
 *   tui-w-[350px]       → width: 350px
 *   tui-h-[100vh]       → height: 100vh
 *   tui-gap-[12px]      → gap: 12px
 *   tui-text-[15px]     → font-size: 15px
 *   tui-rounded-[8px]   → border-radius: 8px
 *   tui-border-[3px]    → border-width: 3px
 *   tui-top-[10px]      → top: 10px
 *   tui-left-[20%]      → left: 20%
 *   tui-max-w-[600px]   → max-width: 600px
 *   tui-min-h-[100vh]   → min-height: 100vh
 *   tui-leading-[1.8]   → line-height: 1.8
 *   tui-z-[999]         → z-index: 999
 *
 * Works with calc:
 *   tui-w-[calc(100%-260px)]  → width: calc(100% - 260px)
 *   tui-h-[calc(100vh-64px)]  → height: calc(100vh - 64px)
 */

// Map of prefix → CSS property/properties
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

// Regex to match: tui-<prop>-[<value>]
// Captures: prop name and value inside brackets
const CLASS_REGEX = /^tui-([\w-]+)-\[([^\]]+)\]$/;

// Cache of already-generated rules to avoid duplicates
const generatedRules = new Set<string>();

// The <style> element where we inject rules
let styleEl: HTMLStyleElement | null = null;

function getStyleElement(): HTMLStyleElement {
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.setAttribute("data-tui-runtime", "");
    document.head.appendChild(styleEl);
  }
  return styleEl;
}

/**
 * Escape special characters in class name for use in a CSS selector.
 * [ ] % ( ) must be escaped.
 */
function escapeSelector(cls: string): string {
  return cls.replace(/([[\]()%.,#:>+~\/])/g, "\\$1");
}

/**
 * Process a single class name — if it matches tui-*-[value], generate CSS.
 */
function processClass(className: string): void {
  if (generatedRules.has(className)) return;

  const match = className.match(CLASS_REGEX);
  if (!match) return;

  const [, prop, value] = match;
  const cssProperties = PROPERTY_MAP[prop];
  if (!cssProperties) return;

  // Mark as generated
  generatedRules.add(className);

  // Build the CSS rule
  const selector = `.${escapeSelector(className)}`;
  let declarations: string;

  if (Array.isArray(cssProperties)) {
    declarations = cssProperties.map((p) => `${p}: ${value}`).join("; ");
  } else {
    declarations = `${cssProperties}: ${value}`;
  }

  const rule = `${selector} { ${declarations}; }`;

  // Inject into <style>
  const sheet = getStyleElement();
  sheet.textContent += rule + "\n";
}

/**
 * Scan an element and all its descendants for tui-*-[value] classes.
 */
function scanElement(el: Element): void {
  const classes = el.className;
  if (typeof classes !== "string") return;

  for (const cls of classes.split(/\s+/)) {
    if (cls.startsWith("tui-") && cls.includes("[")) {
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
