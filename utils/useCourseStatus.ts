import { useSession } from "next-auth/react"
import { trpc } from "./trpc";

export function useCourseStatus() {

  const { mutate: startTransaction, isPending } = trpc.transaction.startTransaction.useMutation();
    const { data: session } = useSession();

  const handlePurchase = () => {
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
    return {
        kupLabel: `${session?.user?.hasAccess ? 'Mój' : 'Kup'} kurs`,
        isPending,
        handlePurchase
    }
}