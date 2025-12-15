import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
// Components
import FAQ from "@/components/FAQ";
import { getKursEnabled } from "@/utils/getKursEnabled";

type Props = {
  kursEnabled: boolean;
}

const FAQPage: NextPage<Props> = () => <FAQ />;

export const getServerSideProps = async (_context: GetServerSidePropsContext): Promise<{ props: Props }> => {
  return {
    props: {
      kursEnabled: getKursEnabled(),
    }
  };
};

export default FAQPage;


