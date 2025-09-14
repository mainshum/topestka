import React from 'react';
import { cn } from '@/utils/misc';
import { CloudDownload } from 'lucide-react';

interface SubchapterProps extends React.HTMLAttributes<HTMLLIElement> {
  isCurrent: boolean;
  done: boolean;
}

export const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(
  ({ className, done, isCurrent, ...rest }, ref) => {
    const style = cn(
      "cursor-pointer w-full text-sm font-medium border border-l-0 border-r-0 border-eblue-100 py-2 pl-1",
      done ? "opacity-50" : "opacity-100",
      done && "after:content-['✓'] after:float-right",
      isCurrent ? "text-orange-500" : "text-eblue-500",
      className
    );

    return (
      <li
        role="button"
        ref={ref}
        className={style}
        {...rest}
      />
    );
  }
);

export const SubchapterDownloadableContent = ({ text }: { text: string }) => {
  return (
    <>
              <span>
              {text}
              </span>
              <CloudDownload className="w-4 h-4 shrink-0"/>
</>
  );
};

Subchapter.displayName = 'Kurs.Subchapter'; 