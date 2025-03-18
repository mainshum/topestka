import React from "react";
import "../styles/globals.css"; // replace with the name of your tailwind css file
import clsx from "clsx";

import type { Preview } from "@storybook/react";

import { Outfit } from "next/font/google";
import { Nav } from "../components/Nav";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const viewports = {
  desktop: {
    name: "desktop",
    styles: {
      width: "1440px",
      height: "820px",
    },
  },
  mobile: {
    name: "mobile",
    styles: {
      width: "393px",
      height: "852px",
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      const style = {
        paddingTop:
          parameters.viewport.defaultViewport === "mobile" ? "58px" : "",
      };

      return (
        <>
          <Nav.NavMobile className="bg-eblue" />
          <main className={clsx(outfit.variable)}>
            <Story />
          </main>
        </>
      );
    },
  ],
  parameters: {
    viewport: {
      viewports,
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
