import Link from "next/link";
import { Nav } from "./Nav";

const MailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-svh">
      <Nav.Root className="bg-eblue border-none text-ewhite">
        <Nav.Logo />
        <Link
          className="border border-electric-500 rounded-md py-2 px-4"
          href="/"
        >
          Powrót
        </Link>
      </Nav.Root>
      <div className="flex text-ewhite bg-eblue flex-col justify-center items-center gap-8 w-full h-[calc(100%-90px)]">
        {children}
      </div>
    </main>
  );
};

export default MailLayout;
