"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/misc";

const Accordion = AccordionPrimitive.Root;

interface TriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  chevProps?: React.ComponentPropsWithoutRef<typeof ChevronDown>;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  TriggerProps
>(({ className, children, chevProps, ...props }, ref) => {
  const { className: chevClassName, ...rest } = chevProps || {};

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 gap-10 items-center justify-between py-3 text-lg font-normal text-left [&>svg]:data-[state=open]:rotate-180 ",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground text-orange-400 transition-transform duration-500 rotate-0 md:duration-1000 shrink-0",
            chevClassName,
          )}
          {...rest}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-[accordion-down_500ms]"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
