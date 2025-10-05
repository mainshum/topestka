import MailLayout from "@/components/mail-layout";

export default function VerifyRequest() {
  return (
    <h1 className="font-outfit text-xl px-8 sm:text-2xl text-clip font-extralight pb-20">
      Gotowe! Link został wysłany na twój adres e-mail. <br />
      Kliknij w niego aby się zalogować.
    </h1>
  );
}

VerifyRequest.getLayout = (page: React.ReactNode) => (
  <MailLayout>{page}</MailLayout>
);
