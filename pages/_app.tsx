import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import Layout from "components/layout";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Script from "next/script";
import { trpc } from "@/utils/trpc";
import type { AppType } from 'next/app';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const websiteId = process.env.NODE_ENV === "production"
  ? "80a8892f-7153-4522-bffe-4eab271fecf0"
  : "148e155c-49f6-4c96-a523-aba8a97f9491";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>To pestka!</title>
        <meta name="description" content="Platforma toPestka" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script onLoad={console.log} onError={console.error} src="https://analityka.topestka.org/script.js" data-website-id={websiteId} strategy="afterInteractive" />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <div>
            <Toaster />
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
