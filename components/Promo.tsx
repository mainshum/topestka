"use client";

import Video from "next-video";
import React from "react";
import Instaplay from "player.style/instaplay/react";
import HomeSection from "./HomeSection";
import insta from "/videos/zwiastun-insta.mp4.json";
import zwiastun from "/videos/zwiastun.mp4.json";
import zuzaPoster from "@/public/images/zuza-poster.png";

const Promo = () => {
  const [useDevice, setUseDevice] = React.useState<null | "desktop" | "mobile">(
    null,
  );

  const onSection = React.useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const { width } = el.getBoundingClientRect();

    if (width < 768) {
      setUseDevice("mobile");
    } else {
      setUseDevice("desktop");
    }
  }, []);

  return (
    <HomeSection ref={onSection}>
      {useDevice === "mobile" && (
        <Video theme={Instaplay} autoPlay height={700} src={insta} />
      )}
      {useDevice === "desktop" && (
        <Video poster={zuzaPoster} theme={Instaplay} autoPlay height={700} src={zwiastun} />
      )}
    </HomeSection>
  );
};

export { Promo };
