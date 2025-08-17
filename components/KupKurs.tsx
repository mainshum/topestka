
import { Button, buttonVariants } from "./Button";
import { cn } from "@/utils/misc";
import React from "react";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

export const KupKurs = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className }) => {

  const { mutate: startTransaction, isPending } = trpc.transaction.startTransaction.useMutation();
  const { data: session } = useSession();

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransaction(undefined, {
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
      })}
      className={cn(
        buttonVariants({ variant: "kupkurs", size: "lg" }),
        className,
      )}
    >
      Kup kurs
    </Button>
  );
});

KupKurs.displayName = 'KupKurs';
