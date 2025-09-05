import React from "react";
import { cn } from "@/utils/misc";

type Props = React.ComponentPropsWithoutRef<"section"> & {
  decreaseSize?: boolean
};

const HomeSection = React.forwardRef<
  HTMLDivElement,
  Props
>(({ children, className, decreaseSize, ...rest }, ref) => {

  const height = decreaseSize ? "sm:min-h-initial md:min-h-dvh" : "min-h-dvh";

  return (
    <section
      ref={ref}
      {...rest}
      className={cn("px-6 md:px-32 pt-40 pb-20", height, className)}
    >
      {children}
    </section>
  );
});

HomeSection.displayName = "HomeSection";

export default HomeSection;
