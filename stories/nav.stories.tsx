import type { Meta, StoryObj } from "@storybook/react";

import Nav from "@/components/Nav";
import { SessionProvider } from "next-auth/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Nav",
  component: Nav,
  decorators: [
    (Story) => (
      <SessionProvider session={{ user: { name: "Test User" } }}>
            <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/DQ4mu9HopW1czoOcnFiQfk/toPestka?node-id=865-2&t=30W2H1b9bioFna5M-4",
    },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Desktop: Story = {};
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/DQ4mu9HopW1czoOcnFiQfk/toPestka?node-id=636-427&t=mR2XtShJEhtm5Nax-4",
    },
  },
};

