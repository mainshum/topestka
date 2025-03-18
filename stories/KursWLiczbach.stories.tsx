import type { Meta, StoryObj } from "@storybook/react";
import KursWLiczbach, { KursWLiczbachItem } from "@/components/KursWLiczbach";
import React from "react";

const meta = {
  title: "Home/KursWLiczbach",
  component: KursWLiczbach,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KursWLiczbach>;

export default meta;
type Story = StoryObj<typeof meta>;

const kursWLiczbachItems: KursWLiczbachItem[] = [
  [
    "70",
    <span key="70">
      tyle minut trwa wideo
      <br /> zawarte w naszym kursie
    </span>,
  ],
  ["13", "tyle rodziałów ma nasz kurs "],
  ["8", "tyle wykładów przeprowadziłyśmy na uczelniach medycznych w Polsce"],
  [
    "10K",
    "to liczba wydrukowanych przez nas broszur, które dystrybuujemy w całej Polsce",
  ],
];

export const Desktop: Story = {
  args: {
    items: kursWLiczbachItems,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    items: kursWLiczbachItems,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};