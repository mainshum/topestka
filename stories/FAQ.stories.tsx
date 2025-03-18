import type { Meta, StoryObj } from "@storybook/react";
import FAQ, { FAQItem } from "@/components/FAQ";
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

const faqItems: FAQItem[] = [
  [
    "Jak mogę zapłacić za kurs?",
    <>
      <span>Możesz wybrać jedną z poniższych metod płatności:</span>
      <ul className="pl-4 list-disc">
        <li>Szybki przelewzonline za pośrednictwem Przelewy24.</li>
        <li>Tradycyjny przelew bankowy na konto fundacji.</li>
        <li>Rozłożenie płatności na raty za pomocą usługi PayPo.</li>
      </ul>
    </>,
  ],
  [
    "Czy oferujecie faktury VAT?",
    <>
      Tak, wystawiamy faktury i rachunki! Podczas dokonywania płatności zaznacz
      odpowiednią opcję i wypełnij wymagane dane. Faktura/rachunek zostanie
      wysłana do Ciebie w ciągu 2-3 dni roboczych od zakupu.
    </>,
  ],
  [
    "Studiuję, czy mogę liczyć na zniżkę?",
    <>
      Tak, oferujemy zniżki dla studentów! Skontaktuj się z nami, a znajdziemy
      najlepsze rozwiązanie. Napisz na adres bezpestkowe@gmail.com, aby
      dowiedzieć się więcej.
    </>,
  ],
];

export const Desktop: Story = {
  args: {
    faqs: faqItems,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    faqs: faqItems,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};