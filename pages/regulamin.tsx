import { Button, buttonVariants } from "@/components/Button"
import { MailLayout } from "@/components/mail-layout"
import { Nav } from "@/components/Nav"
import { cn } from "@/utils/misc"
import Link from "next/link"
import React from "react"

const P = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <p className={cn("text-2xl font-outfit align-baseline", className)}>
            {children}
        </p>
    )
}

const H2 = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<"h2">>(({ children, className, ...rest }, _ref) => {
    return (
        <h2 {...rest} className={cn("text-4xl font-monarcha py-20", className)}>{children}</h2>
    )
})

H2.displayName = "H2";

const Regulamin = () => {
    return (
        <section className="text-butter-100 px-28 flex flex-col gap-8 pt-32">
            <h1 className="text-5xl font-bold font-monarcha pb-20">Regulamin świadczenia usług w ramach kursów online</h1>
            <P>W tym regulaminie znajdziesz informacje jak możesz złożyć zamówienie na Produkty, które mamy w ofercie, dowiedzieć się jakie są Twoje prawa i obowiązki związane z zawarciem z nami umowy i korzystaniem z naszych cyfrowych Produktów.</P>
            <P>Jeśli masz jakiekolwiek pytania dotyczące tego jak to robimy i nie widzisz odpowiedzi w regulaminie napisz do nas na <a href="mailto:topestka.org@gmail.com">topestka.org@gmail.com</a></P>
            <ol className="list-decimal flex flex-col gap-8">
                <li>
                    <H2>Postanowienia wstępne</H2>
                    <P>Fundacja Bezpestkowe, która jest twórcą tej platformy kierowana jest przez Agatę Śmiałkowską i Zuzanne Piontke tj. zarząd fundacji. Fundacja Bezpestkowe (KRS 0000951776; NIP - 5862377596; REGON - 521286817; ul. Niska 1E/61, 81-646 Gdynia).Piszemy o sobie w tym regulaminie &ldquo;my&rdquo;, &ldquo;nam&rdquo;, &ldquo;nas&rdquo;. </P>
                    <P>Dla komfortu osób, które postanowiły skorzystać z usług naszej platformy, a także według zasad tzw.prostego języka będziemy się do Ciebie dalej zwracać na &ldquo;Ty&rdquo;, &ldquo;Twój&rdquo;, &ldquo;Ciebie&rdquo;.</P>
                    <H2 id="definicje">Definicje:</H2>
                    <ul aria-labelledby="definicje" className="flex flex-col gap-8">
                        <li className="text-2xl font-outfit align-baseline"><span className="font-bold">&ldquo;Platforma&rdquo;</span> - nasza strona internetowa <a href="http://topestka.org/">http://topestka.org/</a>, pod którą prowadzimy sprzedaż kursów edukacyjnych online.</li>
                        <li className="text-2xl font-outfit align-baseline"><span className="font-bold">&ldquo;Produkt&rdquo;</span> - oferowane przez nas treści cyfrowe, składające się z wideo, obrazu, tekstu, lub zdjęć, które za pomocą odpowiedniego oprogramowania możesz odtworzyć na ekranach komputerów lub innych urządzeń elektronicznych - gotowe do zakupu i odtwarzania po ich zakupie.</li>
                        <li className="text-2xl font-outfit align-baseline"><span className="font-bold">&ldquo;Konsument&rdquo;</span> - osoba fizyczna, zawierająca z nami umowę, niezwiązaną bezpośrednio z prowadzoną przez tę osobę działalnością gospodarczą</li>
                        <li className="text-2xl font-outfit align-baseline"><span className="font-bold">&ldquo;Przedsiębiorca na prawach konsumenta&rdquo;</span> - osoba fizyczna, która prowadzi własną działalność gospodarczą, jest wpisana w Centralnej Ewidencji i Informacji o Działalności Gospodarczej (CEIDG) i zawiera z nami umowę, ale zakup ten nie jest bezpośrednio związany z działalnością gospodarczą lub zawodową tej osoby.</li>
                    </ul>
                    <P>W ramach Platformy oferujemy i sprzedajemy Produkty, których opisy znajdziesz na stronach produktowych Platformy - choć nie są one formalną ofertą, podobnie jak treści marketingowe.</P>
                    <P>Aby dokonać zakupu Produktu (kursu), musisz mieć dostęp do internetu szerokopasmowego, o prędkości umożliwiającej oglądanie treści cyfrowych, w tym treści wideo, zaktualizowaną przeglądarkę internetową na Twoim urządzeniu, aktywny adres e-mail.</P>
                    <P>Dokładamy starań, ale nie gwarantujemy, że Platforma będzie dostępny całodobowo. Wymagać może przerw technicznych, aktualizacji lub może dochodzić do usterek po stronie dostawców usług internetowych, które czasowo wyłączyć mogą jego poprawne działanie. Zastrzegamy też prawo do błędów czy omyłek na naszej stronie internetowej. Jak wskazałyśmy wyżej, zawarte tam treści nie są formalną, wiążącą ofertą, a ostateczne warunki zakupu Produktu znajdziesz na stronach bezpośrednio poprzedzających złożenie zamówienia i płatność.</P>
                    <P>W ramach Serwisu stosujemy tzw. środki organizacyjne i techniczne aby zapewnić bezpieczeństwo Twoich danych i publikowanych treści. Nie możemy jednak zapewnić 100% bezpieczeństwa przesyłu danych. Musisz chronić Twoje hasła i urządzenia przed nieuprawnionym dostępem osób trzecich, które nie są upoważnione do korzystania z Produktów naszej Platformy.</P>
                    <P>Korzystając z Platformy i usług, które świadczyć będziemy dla Ciebie drogą elektroniczną na odrębnych zasadach (np. przy usłudze Newsletter) lub podczas korzystania z Produktu (kursu) czy jego funkcjonalności, możesz mieć możliwość przekazywania nam różnych treści. Musimy Cię zgodnie z przepisami poinformować, że nie możesz w takich sytuacjach:</P>
                    <ul className="list-disc flex flex-col gap-8 pt-8">
                        <li className="text-2xl font-outfit align-baseline">przekazywać nam lub publikować treści o charakterze bezprawnym, sprzecznych z prawem lub dobrymi obyczajami,  </li>
                        <li className="text-2xl font-outfit align-baseline">dostarczać materiałów, które mogłyby negatywnie wpłynąć na działanie Platformy, zakłócić lub obciążyć jego działanie,  </li>
                        <li className="text-2xl font-outfit align-baseline">publikować treści, które mogłyby naruszyć prawa innych osób,  </li>
                        <li className="text-2xl font-outfit align-baseline">publikować treści zawierających szkodliwe oprogramowanie, w tym wirusy czy oprogramowanie szpiegujące;  </li>
                        <li className="text-2xl font-outfit align-baseline">publikować treści, które mogłyby spowodować przesyłanie niechcianych lub niezamówionych wiadomości (SPAM-u) innym korzystających z Platformy  lub naszych Produktów (kursów).</li>
                    </ul>
                </li>
                <li>
                    <H2 id="skladanie-zamowienia">SKŁADANIE ZAMÓWIENIA</H2>
                    <P>…    (o sposobie logowania - przez uwietrzylnienie)</P>
                    <P>W celu złożenia zamówienia należy, zaznaczyć wybrane Produkty, dokonać wyboru metody płatności i złożyć na Platformie zamówienie, zgodnie z funkcjonalnościami Platformy i usługami płatności internetowych. </P>
                    <P>Zawarcie pomiędzy nami umowy następuje z chwilą potwierdzenia przez nas złożonego zamówienia, które zostało opłacone (lub potwierdzona została metoda płatności w ratach i otrzymamy środki tytułem Twojego zamówienia).</P>
                    <P>Realizacja Twojego zamówienia jest uzależniona od dokonania wpłaty całości zamówienia. Po zaksięgowaniu płatności realizacja zamówienia i udostępnienie Tobie Produktu następuje niezwłocznie, zwykle automatycznie i nie później niż w terminie 5 (pięciu) dni roboczych.</P>
                    <P>W rzadkich przypadkach problemów z płatnością czy technicznych problemów z zamówieniem, czas na udostępnienie Produktu może się wydłużyć, o czym Cię poinformujemy.</P>
                </li>
                <li>
                    <H2 id="dostarczanie-tresci-cyfrowych-i-platnosci">DOSTARCZANIE TREŚCI CYFROWYCH I PŁATNOŚCI</H2>
                    <P>Za Produkt możesz zapłacić korzystając z płatności elektronicznych oferowanych przez zewnętrznych dostawców, zgodnie z informacjami o możliwych płatnościach przedstawianych na stronach ofertowych. Usługi płatnicze realizowane są przez dostawców płatności zgodnie z ich regulaminami.</P>
                    <P>Faktura/rachunek zostanie wysłany drogą elektroniczną na Twój adres e-mail, podany podczas składania zamówienia w terminie 2-3 roboczych  dni od dnia zawarcia umowy (faktura elektroniczna). Poprzez złożenie zamówienia wyrażasz zgodę na otrzymanie faktury w postaci elektronicznej<strong>.</strong></P>
                    <P>Produkty udostępniamy drogą elektroniczną na adres e-mail w postaci magic linka, umożliwiającego samodzielne odtwarzanie treści cyfrowej na komputerze lub innym urządzeniu elektronicznym. </P>
                </li>
                <li>
                    <H2 id="odstapienie-od-umowy">ODSTĄPIENIE OD UMOWY</H2>
                    <ul aria-labelledby="odstapienie-od-umowy" className="list-disc flex flex-col gap-8">
                        <li className="text-2xl font-outfit align-baseline">Zgodnie z warunkami oferty Produktu, w myśl polskich przepisów informujemy Cię, że w przypadku zakupu Produktu w postaci treści cyfrowej, przekazanie Ci Produktu nastąpi, jeśli zaznaczysz odpowiednie okienko (checkbox) wyboru, w którym poprosisz nas o dostęp do tej treści cyfrowej od razu, przed upływem 14-dniowego terminu na odstąpienie od umowy. Jeśli w terminie na odstąpienie od umowy, kupując u nas Produkt jako Konsument lub Przedsiębiorca na prawach konsumenta, nie poprosisz nas jak wyżej o dostęp do Produktu, to przysługuje Ci przez ten czas tzw. prawo do odstąpienia od umowy zawartej na odległość, bez podania przyczyny i bez ponoszenia kosztów, z wyjątkiem tych określonych przepisami prawa. Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem na nasz adres pocztowy lub e-mail, a my niezwłocznie potwierdzimy, że takie oświadczenie otrzymałyśmy. </li>
                        <li className="text-2xl font-outfit align-baseline">W myśl przepisów informujemy też, że Konsument lub Przedsiębiorca na prawach konsumenta nie ponosi kosztów dostarczania treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli nie wyraził zgody na spełnienie świadczenia przed upływem terminu, o którym mowa w art. 27 ust. 1 albo 2 Prawa konsumenckiego lub nie został poinformowany o utracie przysługującego mu prawa odstąpienia od umowy w chwili udzielania takiej zgody lub sprzedający nie dostarczył potwierdzenia zgodnie z art. 15 ust. 1 i art. 21 ust. 1 ustawy o prawach konsumenta. </li>
                        <li className="text-2xl font-outfit align-baseline">Nie musisz obawiać się zgody na przekazanie Ci Produktu przed upływem terminu na odstąpienie od umowy. Dzięki niej otrzymasz produkt od razu, a nie dopiero po 14 dniach. Musimy przekazać Ci wzór oświadczenia o odstąpieniu od umowy. Nie musisz z niego korzystać, ale takie oświadczenie, do wysyłki pod nasz adres lub email, może brzmieć np. tak: &quot;Ja/My) niniejszym informuję/informujemy(*) o moim/naszym odstąpieniu od umowy sprzedaży następujących rzeczy(*)/ umowy dostawy następujących rzeczy(*)/ umowy o dzieło polegającej na wykonaniu następujących rzeczy(*)/o świadczenie następującej usługi(*)&quot;. Podaj nam też takie informacje jak: data zawarcia umowy(*), numer zamówienia (jeżeli dotyczy), imię i nazwisko(-ów) (*), Twój adres/email (*), Twój podpis (w wersji papierowej).*</li>
                        <li className="text-2xl font-outfit align-baseline">Zwrot ceny zakupu Produktu następuje przy użyciu takiej samej metody płatności, jakiej użył Konsument lub Przedsiębiorca na prawach konsumenta, chyba że wyraźnie zgodził się na inną metodę płatności, która nie wiąże się dla niego z żadnymi kosztami. </li>
                    </ul>
                </li>
                <li>

                    <H2 id="reklamacje">Reklamacje</H2>
                    <ul aria-labelledby="reklamacje" className="list-disc flex flex-col gap-8">
                        <li className="text-2xl font-outfit align-baseline">Reklamacje dotyczące usług i produktów oferowanych przez Fundację można składać drogą elektroniczną na adres e-mail wskazany w niniejszym regulaminie.</li>
                        <li className="text-2xl font-outfit align-baseline">W zgłoszeniu prosimy podać: imię i nazwisko osoby składającej reklamację, dane kontaktowe oraz opis, czego dotyczy reklamacja i jakie są oczekiwania wobec jej rozpatrzenia.</li>
                        <li className="text-2xl font-outfit align-baseline">Reklamacje rozpatrujemy w terminie 14 dni od dnia ich otrzymania.</li>
                        <li className="text-2xl font-outfit align-baseline">O wyniku poinformujemy drogą elektroniczną, na adres e-mail z którego przyszła reklamacja, chyba że wskażesz inny sposób kontaktu.</li>
                    </ul>
                </li>
                <li>
                    <H2 id="prawa-do-tresci">Prawa do treści</H2>
                    <P>Dokonując zakupu Produktu w postaci treści cyfrowej, zobowiązany jesteś do korzystania z tych treści wyłącznie dla własnego użytku (lub użytku jednego, wskazanego imiennie użytkownika), z zastrzeżeniem dalszych ograniczeń określonych w treści tego  regulaminu i/lub w opisie zamieszczonym przy opisie Produktu, jak też stosowanych na Platformie czy …. zabezpieczeń dostępu do treści Produktów. </P>
                    <P>Nie jesteś uprawniony do rozpowszechniania ani udostępniania zakupionej treści cyfrowej, jej fragmentów, kopii w jakichkolwiek celach, w szczególności celach szkoleniowych lub innych komercyjnych, w tym także dokonywania zmian czy wszelkiego rodzaju modyfikacji lub usuwania błędów bez naszej zgody. </P>
                    <P>W przypadku wątpliwości lub potwierdzenia możliwości skorzystania z Produktów w celach związanych z nauczaniem czy szkoleniami, skontaktuj się z nami przez email na topestka.org@gmail.com</P>
                    <P>Korzystanie z Produktu przez inną osobę, czy przepisanie na inną osobę niż ta wskazana imiennie podczas zakupu jest niedozwolone i będzie traktowane jako złamanie Regulaminu. W takiej sytuacji zastrzegamy sobie prawo do odebrania dostępu do Produktu.</P>
                </li>
                <li>
                    <H2 id="postanowienia-koncowe">Postanowienia końcowe</H2>
                    <P>Jako Fundacja Bezpestkowe/platforma topestka.org możemy  wprowadzić zmiany zasad określonych w regulaminie, pod warunkiem, że taka zmiana:</P>
                    <ul aria-labelledby="postanowienia-koncowe" className="list-disc flex flex-col gap-8 py-8">
                        <li className="text-2xl font-outfit align-baseline">będzie zgodna z przepisami prawa;  </li>
                        <li className="text-2xl font-outfit align-baseline">nie naruszy praw, które już nabyłeś;  </li>
                        <li className="text-2xl font-outfit align-baseline">będzie wynikać z naszego obowiązku dostosowania regulaminu do zmian w prawie lub decyzji sądów czy organów;  </li>
                        <li className="text-2xl font-outfit align-baseline">będzie wynikać z konieczności ochrony Ciebie lub nas  przed naruszeniem zasad opisanych w regulaminie.</li>
                    </ul>
                    <P>O każdej zmianie tego Regulaminu poinformujemy Cię wysyłając maila na adres podany przez Ciebie. Aktualna wersja regulaminu jest zawsze dostępna dla Ciebie na stronie internetowej Platformy w zakładce &quot;Regulamin&quot;. </P>
                    <P>Prawem właściwym dla realizacji Twoich zamówień na Platformie i korzystaniu z niego jest prawo polskie. Wybór polskiego prawa nie pozbawia jednak ochrony wynikającej z przepisów o prawach konsumentów. W sprawach nieuregulowanych niniejszym regulaminem stosuje się̨ odpowiednie przepisy powszechnie obowiązującego prawa, w tym przede wszystkim przepisy Kodeksu cywilnego, ustawy o prawach konsumenta, ustawy o prawie autorskim i prawach pokrewnych, ustawy o świadczeniu usług drogą elektroniczną. Żadne z postanowień tego Regulaminu nie ma na celu naruszenia Twoich praw przyznanych bezwzględnie obowiązującymi przepisami prawa. Nie może być również w ten sposób interpretowane, bo w przypadku niezgodności jakiejkolwiek części regulaminu z obowiązującym prawem oczywiście będziemy je stosować w miejsce zasadnie zakwestionowanego postanowienia tego Regulaminu.</P>
                    <P>Kwestie sporne, jeśli Konsument wyrazi taką wolę, rozwiązuje się na drodze postępowania mediacyjnego przed Wojewódzkimi Inspektoratami Inspekcji Handlowej lub procesu przed sądem polubownym przy Wojewódzkim Inspektoracie Inspekcji Handlowej. Konsument może również skorzystać z równoważnych i zgodnych z prawem metod przedsądowego lub pozasądowego rozwiązywania sporów, np. za pośrednictwem unijnej platformy internetowej ODR lub dokonując wyboru dowolnego podmiotu uprawnionego spośród znajdujących się w rejestrze UOKiK. Sprzedający oświadcza zamiar i wyraża zgodę na pozasądowe rozwiązanie sporu konsumenckiego.</P>
                    <P className="font-bold pt-8">Ten regulamin obowiązuje od dnia 1 lutego 2025 roku.</P>
                </li>
            </ol>
            <section>
                <H2 id="regulamin-newslettera">REGULAMIN NEWSLETTERA</H2>
                <P>Cześć! Cieszymy się, że chcesz się zapisać do naszego newslettera. </P>
                <P>Trzymając się definicji tego biuletynu, nasz &quot;Newsletter&quot; jest treścią cyfrową, która obejmuje treści z zakresu kursów edukacyjnych, informacji o naszej działalności (Fundacji jak i Platformy) i produktach cyfrowych oraz inne informacje handlowe, specjalistyczne materiały i treści informacyjne lub edukacyjne.</P>
                <P>Kiedy rejestrujesz się, by otrzymywać od nas Newsletter, zawieramy umowę o dostarczenie treści cyfrowych, na podstawie której my zobowiązujemy się nieodpłatnie dostarczać Tobie ten Newsletter przez czas nieoznaczony (bez ograniczenia czasowego), &quot;w zamian&quot; za przekazanie przez Ciebie danych, pod jakie możemy za Twoją zgodą te treści przesyłać.</P>
                <P>Newsletter wysyłamy za pośrednictwem Action Network, która jest bezpieczną platformą i narzędziem. </P>
            </section>
            <section>
                <H2 id="postanowienia-ogolne">Postanowienia ogólne:</H2>
                <ol aria-labelledby="postanowienia-ogolne" className="list-decimal flex flex-col gap-8">
                    <li className="text-2xl font-outfit align-baseline">Do korzystania z naszej usługi Newsletter konieczny jest dostęp do sieci Internet (standardowe przeglądarki internetowe) oraz posiadanie adresu poczty elektronicznej (e-mail). Po udostępnieniu nam adresu i zapisaniu się do Newslettera, dochodzi do zawarcia przez nas umowy i do rozpoczęcia świadczenia przez nas usługi.  </li>
                    <li className="text-2xl font-outfit align-baseline">Usługa Newsletter polega na przesyłaniu na podany przez Ciebie adres e-mail wiadomości, które będą zawierać informacje dotyczące oferowanych przez nas kursów oraz inne treści o charakterze informacyjno-promocyjnym. Także dotyczące działań Fundacji Bezpestkowe   </li>
                    <li className="text-2xl font-outfit align-baseline">Newsletter jest bezpłatny.  </li>
                    <li className="text-2xl font-outfit align-baseline">Wiadomości, które są wysyłane w ramach tej usługi stanowią utwory (w rozumieniu prawa autorskiego) i podlegają ochronie. Nie można ich kopiować, modyfikować i wykorzystywać w sposób niezgodny z przeznaczeniem bez naszej uprzedniej zgody. Możesz się z nami skontaktować pod:  topestka.org@gmail.com  </li>
                    <li className="text-2xl font-outfit align-baseline">Umowa o korzystanie z usługi Newsletter zostaje zawarta na czas nieokreślony.  </li>
                    <li className="text-2xl font-outfit align-baseline">Wiadomości Newsletter nie podlegają  aktualizacji.  </li>
                    <li className="text-2xl font-outfit align-baseline">Jeśli wyraźnie nie zastrzeżemy inaczej, to nie mamy określonych terminów ani częstotliwości dostarczania Newsletterów oraz nie gwarantujemy tych terminów.  </li>
                    <li className="text-2xl font-outfit align-baseline">Możesz w każdym czasie i bez podania przyczyny wypowiedzieć umowę o dostarczanie Newslettera ze skutkiem natychmiastowym i w ten sposób zrezygnować z otrzymywania Newslettera.  </li>
                    <li className="text-2xl font-outfit align-baseline">Jeżeli jesteś Konsumentem albo Przedsiębiorcą na prawach konsumenta to możesz odstąpić od umowy o dostarczenie Newslettera w terminie 14 dni od dnia jej zawarcia poprzez złożenie stosownego oświadczenia albo zrezygnować z jego otrzymywania poprzez kliknięcie w link umożliwiający rezygnację z otrzymywania Newslettera.   </li>
                    <li className="text-2xl font-outfit align-baseline">Masz prawo wypowiedzieć umowę o korzystanie z usługi Newsletter w każdym czasie. Wypowiedzenie ma skutek natychmiastowy. Wypowiedzenie umowy następuje poprzez kliknięcie przycisku <strong>&quot;Wypisz się&quot;</strong> w dolnej części newslettera.  </li>
                    <li className="text-2xl font-outfit align-baseline">Możemy zawiesić bądź zakończyć świadczenie usługi Newsletter, a jeśli zobowiązałyśmy się przesyłać Tobie treści w określonym cyklu, zrobimy to po uprzednim poinformowaniu Ciebie poprzez wiadomość e-mail.  </li>
                    <li className="text-2xl font-outfit align-baseline">W przypadku chęci ponownego skorzystania z usługi Newsletter wystarczy ponownie się do niej zapisać.  </li>
                    <li className="text-2xl font-outfit align-baseline">Reklamacje dotyczące usługi Newsletter należy składać na adres poczty elektronicznej (e-mail) lub pocztą bezpośrednio na nasz adres.  Prosimy podać dane osoby zgłaszającej reklamację, niezbędne do przesłania informacji o wyniku rozpatrzenia reklamacji oraz opis na czym polegały nieprawidłowości w usłudze Newsletter i jakie są oczekiwania wobec rozstrzygnięcia reklamacji. Rozpatrujemy reklamację w terminie 14 dni od dnia jej otrzymania.</li>
                </ol>
            </section>
        </section >
    )
}

Regulamin.getLayout = (page: React.ReactNode) => (
    <MailLayout.Root>
        <MailLayout.Navigation>
            <Link className={buttonVariants({variant: 'powrot'})} href="/">  Powrót </Link>
            <Nav.Logo className="text-ewhite" />
        </MailLayout.Navigation>
        <MailLayout.Content>
            {page}
        </MailLayout.Content>
    </MailLayout.Root>
)

export default Regulamin