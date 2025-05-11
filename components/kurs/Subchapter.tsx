import React from 'react';
import { cn } from '@/utils/misc';

interface SubchapterProps extends React.HTMLAttributes<HTMLLIElement> {
  isCurrent: boolean;
  done: boolean;
}

export const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(
  ({ className, done, isCurrent, ...rest }, ref) => {
    const style = cn(
      "cursor-pointer w-[220px] flex gap-1 justify-between items-center text-sm font-medium",
      done ? "opacity-50" : "opacity-100",
      done && "after:content-['✓']",
      isCurrent ? "text-orange-500" : "text-eblue-500",
      className
    );

    return (
      <li
        ref={ref}
        className={style}
        {...rest}
      />
    );
  }
);

Subchapter.displayName = 'Kurs.Subchapter'; 