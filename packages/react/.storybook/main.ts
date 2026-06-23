import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // All stories live in src/stories/**
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",   // controls, actions, docs, viewport, backgrounds
    "@storybook/addon-a11y",          // accessibility panel
    "@storybook/addon-themes",        // dark/light mode switcher
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: "tag", // generate autodocs page for stories tagged with `autodocs`
  },

  typescript: {
    check: false,    // vite handles ts; skip storybook's own tsc check
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Only include props that are explicitly defined on the component,
      // not every inherited HTML attribute
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
