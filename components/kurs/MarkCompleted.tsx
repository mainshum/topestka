import React from "react";
import { Button } from "../Button";
import { cn } from "@/utils/misc";

interface MarkCompletedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  markAsCompleted: () => void;
}

export const MarkCompleted = React.forwardRef<HTMLButtonElement, MarkCompletedProps>(({markAsCompleted, className, ...props}, ref) => {
    return (
      <Button
        className={className}
        variant="ghost"
        size="sm"
        onClick={() => markAsCompleted()}
        ref={ref}
        {...props}
      >
        Oznacz lekcję jako ukończoną
      </Button>
    )
})

MarkCompleted.displayName = "MarkCompleted";