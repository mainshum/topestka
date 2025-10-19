import { useSession } from "next-auth/react";
import { trpc } from "./trpc";
import { useSearchParams } from "next/navigation";

export function useCourseStatus() {
  const discountToken = useSearchParams().get("discount");
  const { mutate: startTransaction, isPending } = trpc.transaction.startTransaction.useMutation({});
  const { data: session } = useSession();

  const handlePurchase = () => {
    if (session?.user?.hasAccess) {
      window.location.href = "/kurs";
      return;
    }

    startTransaction({ discountToken }, {
      onSuccess: (data) => {
        window.location.href = data.link;
      },
      onError: ({ data }) => {
        if (data?.code === "CONFLICT") {
          window.location.href = "/kurs";
          return;
        }
        if (data?.code === "UNAUTHORIZED") {
          window.location.href = "/login?type=kup-kurs";
        } else {
          // TODO: handle error
        }
      },
    });
  };
  return {
    kupLabel: `${session?.user?.hasAccess ? "Mój" : "Kup"} kurs`,
    isPending,
    handlePurchase,
  };
}
