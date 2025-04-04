import type { Meta, StoryObj } from "@storybook/react";
import FAQ from "@/components/FAQ";
import React from "react";

const meta = {
  title: "Home/FAQ",
  component: FAQ,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FAQ>;

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
