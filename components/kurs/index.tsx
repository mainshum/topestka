import React, { HTMLAttributes } from "react";
import { Accordion } from "../Accordion";
import { KursProvider } from "./context";
import { cn } from "@/utils/misc";

function Root({ children, initialCompletedSubchapters }: { children: React.ReactNode, initialCompletedSubchapters: string[] }) {
    return (
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 pt-2">
            <div className="flex flex-col w-full">
                {children}
            </div>
        </section>
    )
}

function Title({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="pt-6 pb-1 font-outfit text-orange-500 text-lg">
            {children}
        </h1>
    )
}

export const Chapters = React.forwardRef<HTMLOListElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Accordion asChild type="single" collapsible>
          <ol ref={ref} className={cn("basis-[35%] shrink-0", className)} {...rest}>{children}</ol>
      </Accordion>
    );
  }
);

Chapters.displayName = 'Kurs.Chapters';



export const Kurs = {
    Root,
    Title,
    Chapters,
}