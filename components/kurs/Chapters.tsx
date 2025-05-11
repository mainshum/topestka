import React, { HTMLAttributes } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/Accordion';
import { cn } from '@/utils/misc';

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