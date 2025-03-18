import type { Meta, StoryObj } from "@storybook/react";
import Sponsors from "@/components/Sponsors";
import ff from "../public/images/ff.png";
import kulawa from "../public/images/kulawa.png";
import tranzycja from "../public/images/tranzycja.png";
import skrzyneczka from "../public/images/skrzyneczka.png";
import kolektyw from "../public/images/kolektyw-chemia.png";
import mago from "../public/images/mago-vox.png";

const meta = {
  title: "Home/Sponsors",
  component: Sponsors,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sponsors>;

export default meta;
type Story = StoryObj<typeof meta>;

const sponsorItems = [
  { src: ff, alt: "Fundacja Feminoteka" },
  { src: kulawa, alt: "Kulawa Warszawa" },
  { src: tranzycja, alt: "Tranzycja" },
  { src: skrzyneczka, alt: "Skrzyneczka" },
  { src: kolektyw, alt: "Kolektyw Chemia" },
  { src: mago, alt: "Mago Vox" },
];

export const Desktop: Story = {
  args: {
    sponsors: sponsorItems,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    sponsors: sponsorItems,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};