import MailLayout from "@/components/mail-layout";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Checkout = () => {

  const router = useRouter();

  const {data, isLoading, error} = useQuery<{link: string, status: number}>({
    queryKey: ["transaction-link"],
    queryFn: async () => {
      const res =  await fetch(`/api/transaction`);
      const json = await res.json();
      return {link: json.link, status: res.status};
    }
  });


  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data?.status === 401) {
      router.push("/login");
      return;
    }

    if (data) {
      const {link} = data;
      window.location.href = link;
    }
  }, [data, isLoading, error, router]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-[470px] pb-20">
      <p className="font-outfit text-lg md:text-xl font-extralight">
        Przekierowujemy Cię na stronę płatności...
      </p>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ewhite"></div>
      </div>
    </div>
  );
};

Checkout.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;

export default Checkout; 