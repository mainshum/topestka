import { cn } from "@/utils/misc";
import Link from "next/link";
import { useCourseStatus } from "@/utils/useCourseStatus";

export const PowiadomLubKup = ({kursEnabled, className}: {kursEnabled: boolean, className?: string}) => {

  const href = kursEnabled ? '/platnosc' : 'https://actionnetwork.org/forms/mrkh-to-pestka';

  const {handlePurchase, kupLabel, isPending}  = useCourseStatus();

  if (kursEnabled) {
    return (
      <button onClick={handlePurchase} className={cn(className, 'whitespace-nowrap')} disabled={isPending} >
        {kupLabel}
      </button>
    );
  }

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={cn(className, 'whitespace-nowrap')} >
      Powiadom o sprzedaży
    </Link>
  );
};