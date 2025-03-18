import type { Meta, StoryObj } from "@storybook/react";
import DowiedzSie from "@/components/DowiedzSie";

const meta = {
  title: "Home/DowiedzSie",
  component: DowiedzSie,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DowiedzSie>;

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