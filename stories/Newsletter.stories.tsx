import type { Meta, StoryObj } from "@storybook/react";
import Newsletter from "@/components/Newsletter";

const meta = {
  title: "Home/Newsletter",
  component: Newsletter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Newsletter>;

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