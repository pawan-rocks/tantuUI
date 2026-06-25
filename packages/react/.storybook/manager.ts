import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const tuiTheme = create({
  base: "light",

  // Brand
  brandTitle: `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;"><img src="./brand_logo.png" alt="TantuUI" style="width:20px;height:20px;border-radius:4px;" /><span style="font-size:15px;font-weight:700;background:linear-gradient(135deg,#b927f1,#4f46e5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">TantuUI</span></div>`,
  brandUrl: "https://tantuui.com",
  brandTarget: "_self",

  // Colors — matches TantuUI tokens
  colorPrimary: "#b927f1",    // primary-600 (magenta purple)
  colorSecondary: "#2360ff",  // brand-blue-600

  // UI
  appBg: "#fafafa",
  appContentBg: "#ffffff",
  appBorderColor: "#e4e4e7",
  appBorderRadius: 8,

  // Text colors
  textColor: "#18181b",
  textInverseColor: "#ffffff",

  // Toolbar
  barTextColor: "#71717a",
  barSelectedColor: "#b927f1",  // primary-600
  barHoverColor: "#a21caf",    // primary-700
  barBg: "#ffffff",
});

addons.setConfig({
  theme: tuiTheme,
});
