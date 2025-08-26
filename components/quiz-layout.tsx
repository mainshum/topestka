import React from "react";
import { cn } from "@/utils/misc";

export const QuizLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={cn("text-center w-full flex items-center justify-center pt-10 pb-4 sm:pt-10 sm:pb-10 bg bg-[#B4C0EE] rounded-lg min-h-[540px]", props.className)}>
      {children}
    </div>
  );
});

QuizLayout.displayName = 'Quiz.Root';