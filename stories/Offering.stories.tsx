import type { Meta, StoryObj } from "@storybook/react";
import { OfferingList, OfferingSection } from "@/components/Offering";

// Meta for OfferingSection
const metaSection = {
  title: "Home/Offering/Section",
  component: OfferingSection,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OfferingSection>;

export default metaSection;
type StorySectionType = StoryObj<typeof metaSection>;

export const DesktopSection: StorySectionType = {
  args: {
    children: <div className="p-4">Section Content</div>,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const MobileSection: StorySectionType = {
  args: {
    children: <div className="p-4">Section Content</div>,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};

// Meta for OfferingList
export const OfferingListMeta = {
  title: "Home/Offering/List",
  component: OfferingList,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '600px', background: '#123456' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OfferingList>;

type StoryListType = StoryObj<typeof OfferingListMeta>;

export const DesktopList: StoryListType = {
  args: {
    items: [
      "ponad godzinny materiał video",
      "badania dotyczące komunikacji",
      "materiały edukacyjne na temat zespołu MRKH",
      "quiz, dzięki któremu sprawdzisz, czy MRKH to pestka!",
      "certyfikat ukończenia kursu od Fundacji Bezpestkowe",
    ],
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const MobileList: StoryListType = {
  args: {
    items: [
      "ponad godzinny materiał video",
      "badania dotyczące komunikacji",
      "materiały edukacyjne na temat zespołu MRKH",
      "quiz, dzięki któremu sprawdzisz, czy MRKH to pestka!",
      "certyfikat ukończenia kursu od Fundacji Bezpestkowe",
    ],
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};