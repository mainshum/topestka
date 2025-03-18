import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/misc";

export const OfferingList = ({ items }: { items: string[] }) => {
  return (
    <ul
      className="space-y-2 py-2 p-0 md:pb-5 border-b-[1.5px] border-b-ewhite font-monarcha text-xl md:text-3xl list-none"
      role="list"
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <ChevronRight
            className="flex-shrink-0"
            size={16}
            aria-hidden="true"
          />
          <span className="pl-4">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const OfferingSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      "flex flex-col items-stretch gap-8 bg-eblue pt-10 pr-5 pb-10 pl-5 rounded-lg text-ewhite",
      className,
    )}
  >
    {children}
  </section>
);