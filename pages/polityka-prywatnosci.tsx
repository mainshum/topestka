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

const PolitykaPrywatnosci = () => {
    return (
        <section className="text-butter-100 px-28 flex flex-col gap-8 pt-32">
            <h1 className="text-5xl font-bold font-monarcha pb-20">Polityka Prywatności Platformy Edukacyjnej Topestka.org</h1>
            
            <ol className="list-decimal flex flex-col gap-8">
                <li>
                    <H2 id="administrator-danych">Administrator Danych Osobowych</H2>
                    <P>Administratorem danych osobowych użytkowników platformy edukacyjnej Topestka.org jest Fundacja Bezpestkowe z siedzibą w Gdyni, ul. Niska 1E/61, 81-646 Gdynia, wpisana do KRS pod numerem 0000951776, NIP: 5862377596, REGON: 521286817 (dalej: &quot;Administrator&quot;).</P>
                    <P>W sprawach związanych z ochroną danych osobowych można kontaktować się za pośrednictwem adresu e-mail: <a href="mailto:topestka.org@gmail.com">topestka.org@gmail.com</a>.</P>
                </li>
                
                <li>
                    <H2 id="cele-i-podstawy-prawne">Cele i Podstawy Prawne Przetwarzania Danych</H2>
                    <P>Dane osobowe przetwarzane są w następujących celach:</P>
                    <ul aria-labelledby="cele-i-podstawy-prawne" className="list-disc flex flex-col gap-8 pt-8">
                        <li className="text-2xl font-outfit align-baseline">
                            <span className="font-bold">Realizacja zamówień i świadczenie usług</span> – na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy).
                        </li>
                        <li className="text-2xl font-outfit align-baseline">
                            <span className="font-bold">Obsługa zgłoszeń i zapytań</span> – na podstawie art. 6 ust. 1 lit. b i f RODO (realizacja umowy lub prawnie uzasadniony interes Administratora).
                        </li>
                        <li className="text-2xl font-outfit align-baseline">
                            <span className="font-bold">Wysyłka newslettera</span> – na podstawie art. 6 ust. 1 lit. a RODO (zgoda użytkownika).
                        </li>
                        <li className="text-2xl font-outfit align-baseline">
                            <span className="font-bold">Zapewnienie bezpieczeństwa Platformy</span> – na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).
                        </li>
                    </ul>
                </li>
                
                <li>
                    <H2 id="zakres-przetwarzanych-danych">Zakres Przetwarzanych Danych</H2>
                    <P>Administrator przetwarza dane osobowe podane dobrowolnie przez użytkowników, takie jak:</P>
                    <ul aria-labelledby="zakres-przetwarzanych-danych" className="list-disc flex flex-col gap-8 pt-8">
                        <li className="text-2xl font-outfit align-baseline">imię i nazwisko,</li>
                        <li className="text-2xl font-outfit align-baseline">adres e-mail,</li>
                        <li className="text-2xl font-outfit align-baseline">dane konieczne do realizacji zamówień (np. dane do faktury),</li>
                        <li className="text-2xl font-outfit align-baseline">informacje techniczne, takie jak adres IP lub pliki logów, w celu zapewnienia bezpieczeństwa usług.</li>
                    </ul>
                </li>
                
                <li>
                    <H2 id="odbiorcy-danych">Odbiorcy Danych</H2>
                    <P>Dane mogą być udostępniane podmiotom współpracującym z Administratorem w zakresie realizacji umowy, w tym:</P>
                    <ul aria-labelledby="odbiorcy-danych" className="list-disc flex flex-col gap-8 pt-8">
                        <li className="text-2xl font-outfit align-baseline">dostawcom usług płatniczych (np. operatorom płatności online),</li>
                        <li className="text-2xl font-outfit align-baseline">dostawcom narzędzi do wysyłki newslettera (np. Action Network),</li>
                        <li className="text-2xl font-outfit align-baseline">podmiotom świadczącym usługi techniczne i hostingowe.</li>
                    </ul>
                    <P>Dane nie będą przekazywane do państw trzecich lub organizacji międzynarodowych, chyba że wynika to z realizacji usługi (np. korzystanie z narzędzi zlokalizowanych poza Europejskim Obszarem Gospodarczym).</P>
                </li>
                
                <li>
                    <H2 id="okres-przechowywania-danych">Okres Przechowywania Danych</H2>
                    <P>Dane osobowe przetwarzane są przez okres:</P>
                    <ul aria-labelledby="okres-przechowywania-danych" className="list-disc flex flex-col gap-8 pt-8">
                        <li className="text-2xl font-outfit align-baseline">niezbędny do realizacji umowy oraz wynikających z niej zobowiązań prawnych,</li>
                        <li className="text-2xl font-outfit align-baseline">do momentu wycofania zgody na przetwarzanie (np. w przypadku newslettera),</li>
                        <li className="text-2xl font-outfit align-baseline">do czasu przedawnienia ewentualnych roszczeń.</li>
                    </ul>
                </li>
                
                <li>
                    <H2 id="prawa-uzytkownikow">Prawa Użytkowników</H2>
                    <P>Każda osoba, której dane dotyczą, ma prawo do:</P>
                    <ul aria-labelledby="prawa-uzytkownikow" className="list-disc flex flex-col gap-8 pt-8">
                        <li className="text-2xl font-outfit align-baseline">dostępu do swoich danych osobowych,</li>
                        <li className="text-2xl font-outfit align-baseline">sprostowania, usunięcia lub ograniczenia przetwarzania danych,</li>
                        <li className="text-2xl font-outfit align-baseline">wniesienia sprzeciwu wobec przetwarzania danych,</li>
                        <li className="text-2xl font-outfit align-baseline">przenoszenia danych,</li>
                        <li className="text-2xl font-outfit align-baseline">wycofania zgody (w przypadku, gdy podstawą przetwarzania była zgoda),</li>
                        <li className="text-2xl font-outfit align-baseline">wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</li>
                    </ul>
                </li>
                
                <li>
                    <H2 id="bezpieczenstwo-danych">Bezpieczeństwo Danych</H2>
                    <P>Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed ich przypadkowym lub niezgodnym z prawem zniszczeniem, utratą, modyfikacją, nieuprawnionym ujawnieniem lub dostępem.</P>
                </li>
                
                <li>
                    <H2 id="dobrowolnosc-podania-danych">Dobrowolność Podania Danych</H2>
                    <P>Podanie danych osobowych jest dobrowolne, jednak niezbędne do realizacji usług oferowanych przez Platformę.</P>
                </li>
                
                <li>
                    <H2 id="zmiany-polityki-prywatnosci">Zmiany Polityki Prywatności</H2>
                    <P>Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. O wszelkich zmianach użytkownicy będą informowani drogą e-mailową lub za pośrednictwem Platformy.</P>
                    <P>Aktualna wersja dokumentu będzie zawsze dostępna na stronie internetowej Platformy.</P>
                </li>
                
                <li>
                    <H2 id="kontakt">Kontakt</H2>
                    <P>W przypadku pytań dotyczących niniejszej Polityki Prywatności lub przetwarzania danych osobowych prosimy o kontakt na adres e-mail: <a href="mailto:topestka.org@gmail.com">topestka.org@gmail.com</a>.</P>
                </li>
            </ol>
        </section>
    )
}

PolitykaPrywatnosci.getLayout = (page: React.ReactNode) => (
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

export default PolitykaPrywatnosci
