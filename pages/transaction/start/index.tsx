import MailLayout from "@/components/mail-layout";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

const Start = () => {

  const router = useRouter();

  const {data, isLoading, error} = useQuery<{link: string, status: number}>({
    queryKey: ["transaction-link"],
    queryFn: async () => {
      const res =  await fetch(`/api/transaction/start`);
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

  return <Spinner text="Przekierowujemy Cię na stronę płatności..." />;
};

Start.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;

export default Start; 