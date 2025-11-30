import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
// Components
import AboutUs from "@/components/AboutUs";
import { getKursEnabled } from "@/utils/getKursEnabled";

type Props = {
  kursEnabled: boolean;
}

const ONasPage: NextPage<Props> = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export const getServerSideProps = async (_context: GetServerSidePropsContext): Promise<{ props: Props }> => {
  return {
    props: {
      kursEnabled: getKursEnabled(),
    }
  };
};

export default ONasPage;

