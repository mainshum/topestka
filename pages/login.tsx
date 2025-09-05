import { Input } from "@/components/Input";
import MailLayout from "@/components/mail-layout";
import { ChevronRight } from "lucide-react";

import { signIn } from "next-auth/react";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";


const Login = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).elements.namedItem(
          "email",
        )! as HTMLInputElement;
        signIn("email", { email: input.value, callbackUrl: "/kurs" });
      }}
      className="flex flex-col justify-center items-center gap-3 md:w-[470px] md:px-0 px-8 pb-20"
    >
      <h2 className="font-outfit text-xl sm:text-2xl font-extralight">
        Wpisz swój adres e-mail aby otrzymać jednorazowy link do logowania.
      </h2>
      <div className="flex w-full">
        <Input
          className="border-x-0 pl-0 border-t-0 border-b-[1px] border-b-ewhite py-7 rounded-none text-electric-500 md:text-xl placeholder:text-electric-500"
          type="email"
          name="email"
          placeholder="Twój email"
        />
        <button
          type="submit"
          className="px-2 rounded-full focus:ring-2 focus:ring-blue-500 focus-visible:ring-2 focus:outline-none"
          aria-label="Submit"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <p className="text-eblue-100 font-monarcha text-sm">
        <span>
          Kontynuując, zgadzasz się z Warunkami korzystania z usług i potwierdzasz, że przeczytałaś/łeś naszą
        </span>
        <Link href="/polityka-prywatnosci" className="text-eblue-100"> Politykę prywatności</Link>.
      </p>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
};

Login.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;

export default Login;
