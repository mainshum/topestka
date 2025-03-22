import React from "react";
import { cn } from "@/utils/misc";

const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ children, className, ...rest }, ref) => {
  return (
    <section
      ref={ref}
      {...rest}
      className={cn("px-6 md:px-32 pt-40 pb-20 min-h-dvh", className)}
    >
      {children}
    </section>
  );
});

HomeSection.displayName = "HomeSection";

export default HomeSection;
