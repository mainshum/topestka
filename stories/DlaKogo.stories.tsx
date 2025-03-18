import type { Meta, StoryObj } from "@storybook/react";
import DlaKogo, { AccordionItemData } from "@/components/DlaKogo";

const meta = {
  title: "Home/DlaKogo",
  component: DlaKogo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DlaKogo>;

export default meta;
type Story = StoryObj<typeof meta>;

const dlaKogoItems: AccordionItemData[] = [
  [
    "Lekarek i lekarzy",
    "Jeśli jesteś specjalistką lub specjalistą, która/y pragnie lepiej zrozumieć perspektywę pacjentek oraz skuteczniej rozpoznawać i przekazywać informacje na temat zespołu MRKH, ten materiał jest dla Ciebie.",
  ],
  [
    "Studentek i studentów",
    "Jeśli studiujesz kierunek lekarski i chcesz rozwijać umiejętności w zakresie komunikacji z pacjentkami, ten kurs pomoże Ci zrozumieć, jak rozmawiać o niekiedy trudnych kwestiach związanych z zespołem MRKH.",
  ],
  [
    "Specjalistek i specjalistów",
    "Pracujesz na co dzień z pacjentkami jako psycholożka/psycholog, terapeutka/terapeuta, urofizjoterapeutka/urofizjoterapeuta? Dowiedz się, jak budować zaufanie i wspierać pacjentki w rozmowach o zespole MRKH.",
  ],
  [
    "Bliskich",
    "Jeśli bliska Ci osoba ma zespół MRKH i chcesz zrozumieć jej sytuację oraz dowiedzieć się więcej o tym zespole, znajdziesz tu wartościowe informacje.",
  ],
];

export const Desktop: Story = {
  args: {
    items: dlaKogoItems,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    items: dlaKogoItems,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};