import Video from "next-video";
import React from "react";
import Instaplay from "player.style/instaplay/react";
import HomeSection from "./HomeSection";
import insta from "/videos/zwiastun-insta.mp4.json";

const Promo = () => {
  return (
    <HomeSection>
      <Video theme={Instaplay} autoPlay height={700} src={insta} />
    </HomeSection>
  );
};

export { Promo };
