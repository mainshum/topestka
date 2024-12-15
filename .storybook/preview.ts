import '../styles/globals.css'; // replace with the name of your tailwind css file

import type { Preview } from "@storybook/react";

const viewports = {
  desktop: {
    name: 'Komp',
    styles: {
      width: '1440px',
      height: '820px',
    },
  },
  mobile: {
    name: 'Koma',
    styles: {
      width: '390px',
      height: '760px',
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
