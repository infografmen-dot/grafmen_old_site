# PROJECT BIBLE — Grafmen.com Migration

## 1. CEL PROJEKTU
Migracja produkcyjnego serwisu portfolio freelancera i grafika komputerowego **grafmen.com** z systemu WordPress (motyw Blocksy / bloki) do statycznej, wysoce wydajnej strony opartej o **HTML5, CSS3 oraz Vanilla JavaScript**.

---

## 2. ZAKRES MIGRACJI

### Strony Główne objęte migracją:
1. **Strona Główna** (`index.html`) — Hero banner "Witaj, zaprojektuję Twoją stronę WWW / banery HTML5 / logo i branding", wybrane projekty z portfolio, zakres usług oraz sekcja kontaktowa.
2. **Portfolio** (`portfolio.html`) — Główny widok siatki prac portfolio.
3. **O mnie** (`o-mnie.html`) — Opis doświadczenia ("Projektuję od 2005 roku"), warsztat pracy (Illustrator, XD, Figma, InDesign), certyfikaty, opinie klientów oraz etapy współpracy.
4. **Oferta** (`oferta.html`) — Wykaz usług: projektowanie logo, identyfikacja marki, strony internetowe, banery HTML5, animacje/prezentacje, druk.
5. **Kontakt** (`kontakt.html`) — Dane kontaktowe (Przemyśl / Podkarpacie / Polska), formularz wyceny, bezpośredni telefon i mail.
6. **Polityka Prywatności** (`polityka-prywatnosci.html`) — Strona prawna RODO i Cookies.

### 16 Najnowszych Projektów Portfolio objętych migracją:
1. **logo Hiker** (`/portfolio/logo-hiker.html`)
2. **strona www drew-art.com.pl** (`/portfolio/drew-art.html`)
3. **katalog Drew-Art** (`/portfolio/katalog-drew-art.html`)
4. **film reklamowy Hiker** (`/portfolio/film-hiker.html`)
5. **katalog promocyjny Piotruś Pan** (`/portfolio/piotrus-pan.html`)
6. **logo Kancelaria Lampa** (`/portfolio/kancelaria-lampa.html`)
7. **katalog promocyjny Teneryfa - Egipt** (`/portfolio/teneryfa-egipt.html`)
8. **logo Quero** (`/portfolio/quero.html`)
9. **logo TE Solutions** (`/portfolio/te-solutions.html`)
10. **gazetki reklamowe** (`/portfolio/gazetki-reklamowe.html`)
11. **logo MPEC Przemyśl** (`/portfolio/mpec-przemysl.html`)
12. **logo PiłkaNaHali.pl** (`/portfolio/pilkanahali.html`)
13. **logo UniTrans** (`/portfolio/unitrans.html`)
14. **logo Self Invest** (`/portfolio/self-invest.html`)
15. **katalog targowy Drewmar** (`/portfolio/katalog-drewmar.html`)
16. **logo PerVita24** (`/portfolio/pervita24.html`)

---

## 3. CAŁKOWICIE WYŁĄCZONE Z PROJEKTU
- **Wszystkie wpisy blogowe** (np. *Rebranding – kiedy warto zmienić logo*, *Identyfikacja wizualna strony*, *15 genialnych reklam*, *Top 10 Graphic Design Trends*, *Logo od AI czy grafik*, itp.).
- **Archiwa, kategorie, tagi i autorzy bloga** (`/category/*`, `/author/*`).
- **Podfolder stagingowy** (`/reliant/` — osobna strona testowa, całkowicie pomijana).
- **WordPress jako CMS** oraz baza danych MariaDB/MySQL.

---

## 4. STOS TECHNOLOGICZNY (TARGET STACK)
- **Struktura**: Semantyczny HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- **Stylizacje**: Czysty CSS3 z wykorzystaniem CSS Custom Properties (Variables), Flexbox i CSS Grid.
- **Logika interfejsu**: Vanilla JavaScript (ES6+) — menu mobilne, filtrowanie portfolio, podgląd galerii/lightbox, skrypty interaktywne.
- **Brak zewnętrznych frameworków**: 
  - Brak WordPress / PHP
  - Brak jQuery / React / Vue
  - Brak Bootstrap / TailwindCSS

---

## 5. ZASADY IMPLEMENTACYJNE
1. **Zachowanie tożsamości wizualnej**: Istniejący Grafmen.com stanowi wyłączny punkt odniesienia (*incumbent visual truth*).
2. **Najpierw analiza, potem implementacja**: Nie tworzymy kodu źródłowego nowej strony przed zatwierdzeniem audytu.
3. **Read-Only dla WordPressa**: Żadnych zmian na produkcyjnym serwerze `https://grafmen.com/`.
