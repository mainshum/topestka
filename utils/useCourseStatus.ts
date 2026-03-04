import { useSession } from "next-auth/react";
import { trpc } from "./trpc";
import { useSearchParams } from "next/navigation";
import { getDiscountCookie } from "./discountCookie";

export function useCourseStatus() {
  // Check for discount in URL first, then fall back to cookie
  const discountFromUrl = useSearchParams().get("discount");
  const discountFromCookie = getDiscountCookie();
  const discountToken = discountFromUrl || discountFromCookie;
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
