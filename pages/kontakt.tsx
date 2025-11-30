import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
// Components
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";
import { getKursEnabled } from "@/utils/getKursEnabled";

type Props = {
  kursEnabled: boolean;
}

const KontaktPage: NextPage<Props> = () => {
  return (
    <>
      <Sponsors />
      <Newsletter />
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

export default KontaktPage;

