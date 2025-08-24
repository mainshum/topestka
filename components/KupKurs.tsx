
import { Button, buttonVariants } from "./Button";
import { cn } from "@/utils/misc";
import { useEnv } from "./EnvContext";
import React from "react";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const KupKurs = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className }) => {

  const { mutate: startTransaction, isPending } = trpc.transaction.startTransaction.useMutation();
  const { data: session } = useSession();
  const { kursEnabled } = useEnv();

  const handleClick = () => {
    if (!kursEnabled) {
      window.location.href = 'https://actionnetwork.org/forms/mrkh-to-pestka';
      return;
    }

    if (session?.user?.hasAccess) {
      window.location.href = '/kurs';
      return;
    }


    startTransaction(undefined, {
      onSuccess: (data) => {
        if (session?.user?.hasAccess) {
          window.location.href = '/kurs';
        } else {
          window.location.href = data.link;
        }
      },
      onError: (error) => {
        if (error.data?.code === 'UNAUTHORIZED') {
          window.location.href = '/login';
        } else {
          // TODO: handle error
        }
      },
    });
  }

  const classNames = cn(
    buttonVariants({ variant: "kupkurs", size: "lg" }),
    className,
  );

  return kursEnabled ? (
    <Button
      disabled={isPending}
      onClick={handleClick}
      className={classNames}
    >
      Kup kurs
    </Button>
  ) : (
    <Link className={classNames}  href="#kup-kurs">
      Kup kurs
    </Link>
  );
});

KupKurs.displayName = 'KupKurs';
