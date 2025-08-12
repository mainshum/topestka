import { cn } from "@/utils/misc";
import { Content } from "@radix-ui/react-accordion";
import React from "react";

export const AccContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Content>>(({ children, ...props }, ref) => {
    return (
        <Content ref={ref} {...props} className={cn(props.className, "data-[state=closed]:animate-[accordion-up_500ms] data-[state=open]:animate-[accordion-down_500ms]")}>
            {children}
        </Content>
    )
})

AccContent.displayName = "AccContent";