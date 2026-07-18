import { Markdown } from "@storybook/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import changelog from "../../CHANGELOG.md?raw";

const meta: Meta = {
  title: "Documentation/React Lib Change Log",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    previewTabs: {
      canvas: { hidden: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ReactLibChangeLog: Story = {
  name: "N/A",
  render: () => (<></>),
  parameters: {
    docs: {
      page: () => <Markdown>{changelog}</Markdown>,
    },
  },
};
