import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

// Import all token CSS variables — this is the single source of truth
import "../../tokens/dist/base.css";
// Component CSS classes
import "../src/index.css";
// Storybook-specific overrides (spin keyframe, font load, etc.)
import "./preview.css";

const preview: Preview = {
  // ── Global decorators ───────────────────────────────────────────────
  decorators: [
    // Dark / Light mode: toggles data-theme="dark" on <html>
    withThemeByDataAttribute({
      themes: {
        Light: "",
        Dark: "dark",
      },
      defaultTheme: "Light",
      attributeName: "data-theme",
    }),
  ],

  // ── Global parameters ───────────────────────────────────────────────
  parameters: {
    // Backgrounds — use token surface colors (defined in preview.css)
    backgrounds: {
      default: "Light",
      values: [
        { name: "Light",   value: "#ffffff" },
        { name: "Dark",    value: "#111827" },
        { name: "Subtle",  value: "#f9fafb" },
      ],
    },

    // Controls: group props by category, sort alphabetically within
    controls: {
      matchers: {
        color:  /(background|color|bg|fill|stroke)$/i,
        date:   /date$/i,
      },
      sort: "alpha",
    },

    // Default viewport
    viewport: {
      defaultViewport: "desktop",
      viewports: {
        mobile:  { name: "Mobile",  styles: { width: "375px",  height: "812px"  } },
        tablet:  { name: "Tablet",  styles: { width: "768px",  height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1280px", height: "900px"  } },
        wide:    { name: "Wide",    styles: { width: "1536px", height: "900px"  } },
      },
    },

    // Docs page layout
    docs: {
      toc: true, // show table of contents in Docs tab
    },

    // a11y: WCAG 2.1 AA rules enabled by default
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
        ],
      },
    },

    options: {
      storySort: {
        order: ["Introduction", "Documentation", "Foundations", "Components", "Patterns"],
      },
    },
  },
};

export default preview;
