import { cn } from "@/utils/misc";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";

export const PowiadomLubKup = ({kursEnabled, className}: {kursEnabled: boolean, className?: string}) => {

  const href = kursEnabled ? '/platnosc' : 'https://actionnetwork.org/forms/mrkh-to-pestka';

  const { mutate: startTransaction, isPending } = trpc.transaction.startTransaction.useMutation();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session?.user?.hasAccess) {
      window.location.href = '/kurs';
      return;
    }

    startTransaction(undefined, {
      onSuccess: (data) => {
          window.location.href = data.link;
      },
      onError: (error) => {
        if (error.data?.code === 'UNAUTHORIZED') {
          window.location.href = '/login?type=kup-kurs';
        } else {
          // TODO: handle error
        }
      },
    });
  }

  if (kursEnabled) {
    return (
      <button onClick={handleClick} className={cn(className, 'whitespace-nowrap')} disabled={isPending} >
        Kup kurs
      </button>
    );
  }

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={cn(className, 'whitespace-nowrap')} >
      Powiadom o sprzedaży
    </Link>
  );
};