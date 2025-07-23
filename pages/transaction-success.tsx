import MailLayout from "@/components/mail-layout";

function TransactionSuccess() {
  return <div>Transakcja zakończona pomyślnie</div>;
}

TransactionSuccess.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;

export default TransactionSuccess;