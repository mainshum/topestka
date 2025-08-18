import MailLayout from "@/components/mail-layout";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const TransactionSuccess = () => {
  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold text-green-600 mb-4">Transakcja zweryfikowana pomyślnie</h1>
    <p className="text-white">
      W wersji sandbox dostęp do kursu jest włączany manualnie.
    </p>
    {/* <Link href="/kurs" className={buttonVariants({ variant: "kupkurs", size: "lg" })}>
      Przejdź do kursu
    </Link> */}
  </div>
}

const TransactionFailed = () => {
  return <div>Transakcja nie została dokonana</div>
}

export default function Transaction() {

  const router = useRouter();

  const {id} = router.query;

  const {data: transaction, isLoading, error} = trpc.transaction.getTransactionStatus.useQuery({id: id as string}, {
    retry: (failureCount, output) => {
      return output.data?.code === 'PAYMENT_REQUIRED' && failureCount < 3;
    },
    retryDelay: 2000,
    enabled: !!id, // Only run the query when id is available
  });

  if (error) {
    return <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Wystąpił błąd</h1>
      <p className="text-ewhite">{error.message}</p>
    </div>
  }

  // Show loading spinner while router is hydrating or query is loading
  if (!id || isLoading || !transaction) {
    return <Spinner text="Trwa weryfikacja transakcji..." />
  }

  return <>
    {transaction.status === 'success' || transaction.status === 'already-verified' ? <TransactionSuccess /> : <TransactionFailed />}
  </>
}

Transaction.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;