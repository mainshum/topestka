import type { Meta, StoryObj } from "@storybook/react";
import { Chapter } from "@/pages/kurs/components/Chapters/Chapter";
import { Subchapter } from "@/pages/kurs/components/Chapters/Subchapter";
import { KursProvider } from "@/pages/kurs/context";
import { SessionProvider } from "next-auth/react";
import { Accordion } from "@/components/Accordion";
import { Chapters } from "@/pages/kurs/components/Chapters";
const meta = {
  title: "Kurs/Chapter",
  component: Chapter,
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <KursProvider initialCompletedSubchapters={['1.1']}>
          <Chapters style={{width:'323px'}}>
            <Story />
          </Chapters>
        </KursProvider>
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Chapter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chapterNo: 1,
    subchapterTitle: "Perspektywa pacjencka",
    totalSubchapters: 2,
    children: (
      <>
        <Subchapter
          isCurrent={true}
          done={true}
          onClick={() => { }}
        >
          1. Kim jesteśmy?
        </Subchapter>
        <Subchapter
          isCurrent={false}
          done={true}
          onClick={() => { }}
        >
          2. Czym jest zespół Mayer-Rokitansky-Küstera-Hausera?
        </Subchapter>
      </>
    ),
  },
};

export const Completed: Story = {
  args: {
    chapterNo: 2,
    subchapterTitle: "Completed Chapter",
    totalSubchapters: 2,
    children: (
      <>
        <Subchapter
          isCurrent={false}
          done={true}
          onClick={() => { }}
        >
          <span>Completed Subchapter 1</span>
        </Subchapter>
        <Subchapter
          isCurrent={false}
          done={true}
          onClick={() => { }}
        >
          <span>Completed Subchapter 2</span>
        </Subchapter>
      </>
    ),
  },
};

export const InProgress: Story = {
  args: {
    chapterNo: 3,
    subchapterTitle: "In Progress Chapter",
    totalSubchapters: 3,
    children: (
      <>
        <Subchapter
          isCurrent={false}
          done={true}
          onClick={() => { }}
        >
          <span>Completed Subchapter</span>
        </Subchapter>
        <Subchapter
          isCurrent={true}
          done={false}
          onClick={() => { }}
        >
          <span>Current Subchapter</span>
        </Subchapter>
        <Subchapter
          isCurrent={false}
          done={false}
          onClick={() => { }}
        >
          <span>Upcoming Subchapter</span>
        </Subchapter>
      </>
    ),
  },
}; 