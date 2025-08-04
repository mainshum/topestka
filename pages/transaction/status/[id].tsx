import MailLayout from "@/components/mail-layout";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Status = {
  0: 'no-payment',
  1: 'advance payment',
  2: 'payment made',
  3: 'payment returned',
}

export default function Transaction() {

  const router = useRouter();

  const {id} = router.query;

  const {data, isLoading, error} = useQuery<{status: keyof Status}>({
    queryKey: ['transaction', id],
    queryFn: async () => {
      if (!id) throw new Error('No transaction ID provided');
      const res = await fetch(`/api/transaction/status/${id}`);
      const data = await res.json();
      if (data.status === 'pending') throw new Error('Transaction not verified');
      return data;
    },
    retry: true,
    retryDelay: 2000,
    enabled: !!id, // Only run the query when id is available
  })

  // Show loading spinner while router is hydrating or query is loading
  if (!id || isLoading) {
    return <Spinner text="Trwa weryfikacja transakcji..." />
  }

  // Show error state
  if (error) {
    return <div>Błąd: {error.message}</div>
  }

  // Ensure data is available
  if (!data) {
    return <Spinner text="Ładowanie danych transakcji..." />
  }

  return <div>
    {data.status === 0 && <div>Transakcja nie została dokonana</div>}
    {data.status === 1 && <div>Transakcja została dokonana</div>}
    {data.status === 2 && <div>Transakcja została dokonana</div>}
    {data.status === 3 && <div>Transakcja została dokonana</div>}
  </div>
}

Transaction.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;
