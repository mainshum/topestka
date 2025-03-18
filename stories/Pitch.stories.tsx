import type { Meta, StoryObj } from "@storybook/react";
import Pitch from "@/components/Pitch";

const meta = {
  title: "Home/Pitch",
  component: Pitch,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Pitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};