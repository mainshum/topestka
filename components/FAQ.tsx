import React from "react";
import HomeSection from "./HomeSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";


const faqItems = [
  [
    "Jak mogę zapłacić za kurs?",
    <>
      <span>Możesz wybrać jedną z poniższych metod płatności:</span>
      <ul className="pl-4 list-disc *:relative *:left-2">
        <li>Szybki przelewzonline za pośrednictwem Przelewy24.</li>
        <li>Tradycyjny przelew bankowy na konto fundacji.</li>
        <li>Rozłożenie płatności na raty za pomocą usługi PayPo.</li>
      </ul>
    </>,
  ],
  [
    "Czy oferujecie faktury VAT?",
    <>
      Tak, wystawiamy faktury i rachunki! Podczas dokonywania płatności zaznacz
      odpowiednią opcję i wypełnij wymagane dane. Faktura/rachunek zostanie
      wysłana do Ciebie w ciągu 2-3 dni roboczych od zakupu.
    </>,
  ],
  [
    "Studiuję, czy mogę liczyć na zniżkę?",
    <>
      Tak, oferujemy zniżki dla studentów! Skontaktuj się z nami, a znajdziemy
      najlepsze rozwiązanie. Napisz na adres bezpestkowe@gmail.com, aby
      dowiedzieć się więcej.
    </>,
  ],
  [
    "Nie jestem lekarzem, czy ten kurs jest dla mnie?",
    <>
      Tak, kurs jest odpowiedni również dla osób, które chcą poszerzyć swoją
      wiedzę na temat zespołu MRKH. Jeśli pracujesz z osobami z zespołem MRKH
      jako osoba specjalistyczna, ktoś z Twojego bliskiego otoczenia ma ten
      zespół, lub po prostu chcesz dowiedzieć się więcej na ten temat - kurs
      będzie dla Ciebie odpowiedni. Porusza on także zagadnienia społeczne
      związane z MRKH.
    </>,
  ],
  [
    "Jak mogę wspierać osoby z zespołem MRKH?",
    <>
      Kurs składa się z ponad godzinnego wykładu, który obejmuje zarówno
      perspektywę pacjencką, jak i lekarską. Dodatkowo, uczestnicy kursu
      otrzymują dostęp do wszystkich materiałów edukacyjnych, w tym notatek oraz
      quizów, które pozwalają sprawdzić zdobytą wiedzę. Kurs możesz realizować
      we własnym własnym tempie, wracając do poszczególnych materiałów w
      dowolnym czasie.
    </>,
  ],
  [
    "Co zawiera kurs i ile trwa?",
    <>
      Kurs składa się z ponad godzinnego wykładu, który obejmuje zarówno
      perspektywę pacjencką, jak i lekarską. Dodatkowo, uczestnicy kursu
      otrzymują dostęp do wszystkich materiałów edukacyjnych, w tym notatek oraz
      quizów, które pozwalają sprawdzić zdobytą wiedzę. Kurs możesz realizować
      we własnym własnym tempie, wracając do poszczególnych materiałów w
      dowolnym czasie.
    </>,
  ],
  [
    "Kurs dotyczy zespołu MRKH. Czy znajdę w nim uniwersalne treści?",
    <>
      Tak! Choć kurs skupia się na nauce prawidłowego sposobu przekazywania
      diagnozy o zespole MRKH, to ma w sobie także szereg uniwersalnych treści.
      Nasze materiały pomogą Ci zrozumieć perspektywę pacjentek i pacjentek na
      temat prowadzenia rozmowy w gabinecie medycznym. Ponadto w kursie
      poruszamy uniwersalne kwestie związane z zespołem MRKH, które dotyczą
      także innych osób m. in. brak menstruacji, ulokowanie poczucia kobiecości,
      alternatywne metody macierzyństwa.
    </>,
  ],
  [
    "Dlaczego to wy współprowadzicie kurs?",
    <>
      Ponieważ posiadamy wieloletnie doświadczenie w prowadzaniu wykładów,
      warsztatów oraz badań, a od ponad sześciu lat tworzymy największą w Polsce
      społeczność oraz bazę wiedzy na temat zespołu MRKH.
    </>,
  ],
  [
    "Czy po ukończeniu kursu otrzymam certyfikat?",
    <>
      Tak, po ukończeniu kursu otrzymasz certyfikat ukończenia, który będzie
      stanowił potwierdzenie Twojej wiedzy, że zespół MRKH to dla Ciebie pestka!
    </>,
  ],
  [
    "Czy mogę w jakiś sposób wesprzeć działania fundacji?",
    <>
      Tak, możesz wspierać nas na różne sposoby: Śledząc nasze materiały
      edukacyjne w mediach społecznościowych i na naszej stronie internetowej.
      Dokonując darowizny na konto fundacji. Stawiając kawę fundacji poprzez
      platformę Buy Coffee.
    </>,
  ],
] as const;

const FAQ = () => {
  return (
    <HomeSection className="flex flex-col bg-eblue px-6 md:px-24 py-12 md:py-20 text-ewhite">
      <h1 className="text-4xl">F.A.Q</h1>
      <div className="h-12 md:h-16" />
      <section className="flex flex-col gap-3">
        <Accordion
          orientation="horizontal"
          type="single"
          collapsible
          className="accordions"
        >
          {faqItems.map(([question, answer]) => (
            <AccordionItem
              className="md:grid grid-cols-2 gap-x-10 pt-3 grid-rows-[min-content]"
              key={question}
              value={question}
            >
              <AccordionTrigger
                chevProps={{
                  className: "text-ewhite shrink-0 transform md:-rotate-90 ",
                }}
                className="h-fit border-ewhite pb-3 pt-0 border-b-[1px] border-solid md:[&[data-state=open]>svg]:rotate-90 font-outfit text-base md:text-xl"
              >
                {question}
              </AccordionTrigger>
              <AccordionContent className="pt-4 md:pt-0 md:text-xl">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </HomeSection>
  );
};

export default FAQ;
