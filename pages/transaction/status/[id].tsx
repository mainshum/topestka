import MailLayout from "@/components/mail-layout";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { buttonVariants } from "@/components/Button";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const retryTime = 120 * 1000;

const TransactionSuccess = () => {
  return <div className="flex flex-col items-center justify-center fixed ">
    <h1 className="text-2xl font-bold text-green-600 mb-4">Transakcja zweryfikowana pomyślnie</h1>
    <Link href="/kurs" className={buttonVariants({ variant: "kupkurs", size: "lg" })}>
      Przejdź do kursu
    </Link>
  </div>
}

const ErrorComponent = ({error}: {error: string}) => {
    return <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Wystąpił błąd</h1>
      <p className="text-ewhite">{error}</p>
    </div>
}

export default function Transaction() {

  const router = useRouter();
  const {update} = useSession();

  const { id } = router.query;

  const { data, isLoading, error } = trpc.transaction.getTransactionStatus.useQuery({ id: id as string }, {
    retry: (failureCount, output) => {
      return output.data?.code === 'PAYMENT_REQUIRED' && failureCount < retryTime / 2000;
    },
    retryDelay: 2000,
    enabled: !!id, // Only run the query when id is available
  });

  useEffect(() => {
    if (!error && !isLoading && data) {
      console.log('updating session');
      update();
    }
  }, [error, data, isLoading]);

  if (!id) {
    return <ErrorComponent error="Brak ID transakcji" />
  }

  if (error) {
    return <ErrorComponent error={error.message} />
  }

  // Show loading spinner while router is hydrating or query is loading
  if (isLoading || !data) {
    return <Spinner text="Trwa weryfikacja transakcji. Nie opuszczaj tej strony." />
  }

  return <TransactionSuccess />
}

Transaction.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;