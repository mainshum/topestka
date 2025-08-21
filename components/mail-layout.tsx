import Link from "next/link";
import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import { Nav } from "./Nav";

const Root = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...rest }) => {
  return (
    <main className="flex flex-col h-svh" {...rest}>
      {children}
    </main>
  )
})

Root.displayName = "Root";

const Navigation = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, className, ...rest }) => {
  return (
    <Nav.Root {...rest} className={clsx("bg-eblue border-none text-ewhite flex-row-reverse flex", className)}>
      {children}
    </Nav.Root>
  )
})

Navigation.displayName = "Navigation";

const Content = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...rest }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-eblue w-full  text-ewhite grow-[1] pb-20" {...rest}>
      {children}
    </div>
  )
})

Content.displayName = "Content";

export const MailLayout = Object.assign({
  Root,
  Navigation,
  Content,
});

export default function ML({ children }: { children: React.ReactNode }) {
  return (
    <MailLayout.Root>
      <MailLayout.Navigation>
        <Link className="px-4 py-2 border border-electric-500 rounded-md" href="/">Powrót</Link>
      </MailLayout.Navigation>
      <MailLayout.Content>{children}</MailLayout.Content>
    </MailLayout.Root>
  )
}
