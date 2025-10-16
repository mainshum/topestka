import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/misc";

export const OfferingList = ({ items }: { items: string[] }) => {
  return (
    <ul
      className="space-y-8 py-10 border-b-[1.5px] border-b-ewhite font-monarcha text-xl md:text-3xl list-none"
      role="list"
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <ChevronRight className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
          <span className="pl-2">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const OfferingSection = React.forwardRef<HTMLDivElement, { children: React.ReactNode, className?: string }>(({ children, className, ...rest }, ref) => (
  <section
    ref={ref}
    {...rest}
    className={cn(
      "flex flex-col items-center px-6 xl:px-10 gap-8 bg-eblue pt-10 pb-10 xl:pb-20 rounded-lg text-ewhite",
      className
    )}
  >
    {children}
  </section>
));

OfferingSection.displayName = "OfferingSection";
