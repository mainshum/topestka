import MailLayout from "@/components/mail-layout";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { TransactionStatus } from "@/utils/types";

// Error code to user-friendly message mapping
const ERROR_MESSAGES: Record<number, string> = {
  400: "Nieprawidłowe żądanie. Sprawdź poprawność danych.",
  401: "Brak autoryzacji. Zaloguj się ponownie.",
  404: "Transakcja nie została znaleziona.",
  405: "Nieprawidłowa metoda żądania.",
  500: "Błąd serwera. Spróbuj ponownie później.",
  502: "Błąd komunikacji z systemem płatności. Spróbuj ponownie za chwilę.",
  503: "Serwis tymczasowo niedostępny. Spróbuj ponownie później.",
  504: "Przekroczono limit czasu odpowiedzi. Spróbuj ponownie.",
};

// Default error message for unknown status codes
const getErrorMessage = (statusCode: number): string => {
  return ERROR_MESSAGES[statusCode] || "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";
};

const TransactionSuccess = () => {
  return <div>Transakcja została dokonana</div>
}

const TransactionFailed = () => {
  return <div>Transakcja nie została dokonana</div>
}

export default function Transaction() {

  const router = useRouter();

  const {id} = router.query;

  const {data, isLoading, error} = useQuery<{status: TransactionStatus}>({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const res = await fetch(`/api/transaction/status/${id}`);
      
      // If status code is not 200, throw error without retrying
      if (!res.ok) {
        const errorMessage = getErrorMessage(res.status);
        throw new Error(errorMessage);
      }
      
      const data = await res.json() as {status: TransactionStatus};
      
      if (data.status === 'no-payment') {
        throw new Error('Przekroczono limit czasu weryfikacji transakcji');
      }
      
      return data;
    },
    retry: (failureCount, error) => {
      return error.message === 'Transaction still pending' && failureCount < 3;
    },
    retryDelay: 2000,
    enabled: !!id, // Only run the query when id is available
  })

  if (error) {
    return <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Wystąpił błąd</h1>
      <p className="text-ewhite">{error.message}</p>
    </div>
  }

  // Show loading spinner while router is hydrating or query is loading
  if (!id || isLoading || !data) {
    return <Spinner text="Trwa weryfikacja transakcji..." />
  }

  return <>
    {data.status ? <TransactionSuccess /> : <TransactionFailed />}
  </>
}

Transaction.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;