import type { Meta, StoryObj } from "@storybook/react";
import ProgramFull, { AccordionItemData } from "@/components/ProgramFull";

const meta = {
  title: "Home/ProgramFull",
  component: ProgramFull,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProgramFull>;

export default meta;
type Story = StoryObj<typeof meta>;

const accordionsData: AccordionItemData[] = [
  [
    "dwuczęściowe wideo",
    "dzięki któremu poznasz perspektywę pacjencką i ekspercką na temat komunikacji w gabinecie medycznym",
  ],
  [
    "zestaw fiszek",
    "stworzonych przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH",
  ],
  [
    "dwie broszury",
    "stworzone przez Fundację Bezpestkowe na temat zespołu MRKH oraz towarzyszących mu kwestiach",
  ],
  [
    "publikację",
    "która stanowi podsumowanie badań przeprowadzonych przez Agatą Śmiałkowską na temat przygotowania osób studiujących kierunek lekarski do rozmów z pacjentami",
  ],
  ["quiz", "mający na celu sprawdzenie twojej wiedzy z kursu"],
  ["certyfikat", "potwierdzający, że MRKH to dla ciebie pestka! "],
];

export const Desktop: Story = {
  args: {
    accordions: accordionsData,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    accordions: accordionsData,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};