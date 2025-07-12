import Link from "next/link";
import { Nav } from "./Nav";
import React, { HTMLAttributes } from "react";
import clsx from "clsx";

const MailLayout = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...rest }) => {
  return (
    <main className="flex flex-col h-svh" {...rest}>
      <Nav.Root className={clsx("bg-eblue border-none text-ewhite flex-row-reverse flex")}>
        <Link
          className="px-4 py-2 border border-electric-500 rounded-md"
          href="/"
        >
          Powrót
        </Link>
      </Nav.Root>
      <div className="flex flex-col justify-center items-center gap-8 bg-eblue w-full  text-ewhite grow-[1]">
        {children}
      </div>
    </main>
  );
});

MailLayout.displayName = "MailLayout";

export default MailLayout;
