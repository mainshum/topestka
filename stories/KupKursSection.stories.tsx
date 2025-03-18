import type { Meta, StoryObj } from "@storybook/react";
import KupKursSection from "@/components/KupKursSection";

const meta = {
  title: "Home/KupKursSection",
  component: KupKursSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KupKursSection>;

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