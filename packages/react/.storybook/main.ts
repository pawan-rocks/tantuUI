import type { StorybookConfig } from "@storybook/react-vite";

// When deployed to tantuui.com/storybook, set STORYBOOK_BASE_PATH=/storybook
// Locally it stays as "/" so nothing breaks in dev
const basePath = process.env.STORYBOOK_BASE_PATH ?? "/";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],

  staticDirs: ["./public"],  // serves .storybook/public/ at root /

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: "tag",
  },

  // Tells Storybook all asset paths are relative to /storybook/
  viteFinal(config) {
    return { ...config, base: basePath };
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
