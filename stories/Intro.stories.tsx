import type { Meta, StoryObj } from "@storybook/react";
import { Intro } from "@/components/Intro";

const meta = {
  title: "Home/Intro",
  component: Intro,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Intro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile", height: 667 },
  },
};
