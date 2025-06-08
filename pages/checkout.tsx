import MailLayout from "@/components/mail-layout";
import React from "react";
import { GetServerSideProps } from "next";
import { P24 } from "@ingameltd/node-przelewy24";
import { ResultAsync } from 'neverthrow';

export const getServerSideProps: GetServerSideProps = async () => {
  const merchantId = 325227;
  const posId = 325227;
  const apiKey = "203d245602fa094a45e97e0e5bd7cc10";
  const crcKey = "cc0ec2bb9c8431ec";

  const p24 = new P24(merchantId, posId, apiKey, crcKey, { sandbox: true });

  return ResultAsync.fromPromise(p24.testAccess(), (error) => error)
    .mapErr(res => {
      console.error(res);
      return false;
    })
    .match(b => ({props: {result: b}}), e => ({props: {result: false}}))

};

const Checkout = ({ result }: { result: boolean }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-[470px] pb-20">
      <h1 className="font-outfit text-2xl font-extralight">
        {JSON.stringify(result)}
      </h1>
    </div>
  );
};

Checkout.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;

export default Checkout; 