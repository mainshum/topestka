import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Home from "../pages/index";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Home/Intro",
  component: Home,
  decorators: [
    (Story) => (
      <SessionProvider session={{user: {id: 'seagal'}, expires: ''}}>
        <Layout>
          <Story />
        </Layout>
      </SessionProvider>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/DQ4mu9HopW1czoOcnFiQfk/toPestka?node-id=826-1775&t=mR2XtShJEhtm5Nax-4",
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"], // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Desktop: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
    viewport: { defaultViewport: "desktop" },
  },
};
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/DQ4mu9HopW1czoOcnFiQfk/toPestka?node-id=1003-1780&t=Bojun3z9N1B44wbK-4",
    },
  },
};
