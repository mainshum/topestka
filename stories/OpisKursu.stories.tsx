import type { Meta, StoryObj } from "@storybook/react";
import OpisKursu from "@/components/OpisKursu";

const meta = {
  title: "Home/OpisKursu",
  component: OpisKursu,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OpisKursu>;

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