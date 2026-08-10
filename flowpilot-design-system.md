# FlowPilot Design System

**Versiune:** 2.0 — încorporează deciziile aprobate (Product Window ca familie, "Accent follows intention", tonul Contact, principiul momentelor semnătură). Acest document e sursa unică de adevăr pentru orice componentă viitoare — Hero, Services, Portfolio, Process, Contact și tot ce urmează.

---

## 1. Filosofia vizuală

> **FlowPilot arată ca un produs, nu ca o broșură.**

Diferența dintre o agenție și un SaaS premium (Vercel, Linear, Stripe) e restricția, nu complexitatea. Un produs premium refuză 90% din ce ar putea adăuga. Orice element nou trece acest test:

- Dacă l-aș elimina, s-ar pierde ceva funcțional (ierarhie, claritate, dovadă) — sau doar decor?
- Culoarea apare pentru că _ghidează atenția_, sau pentru că "arată bine"?
- Mișcarea demonstrează ceva, sau doar umple timpul?

Dacă răspunsul e "doar decor" — nu intră în site.

### 1.1 Cele cinci principii vizuale

1. **Monocrom cu un singur accent.** 90% din interfață e text neutru pe fundal alb. Vezi §2.2, "Accent follows intention". _Singura excepție: Hero-ul inversează luminozitatea (fundal aproape negru), nu paleta — vezi §2.4._
2. **Produsul e dovada, nu ilustrația.** Nu desenăm scene decorative. Arătăm mereu ceva ce _pare_ interfață reală.
3. **Spațiul alb e o afirmație de încredere.** La ezitare între două valori de spațiere, alegem întotdeauna pe cea mai mare.
4. **Ierarhie prin mărime și greutate, nu prin culoare.** Culoarea nu creează ierarhie — asta e treaba tipografiei.
5. **Mișcarea demonstrează, nu decorează.** O animație trăiește doar dacă răspunde la "ce înțelege omul mai bine datorită ei?".

### 1.2 Principiu global nou: fiecare secțiune are un moment-semnătură

Nicio secțiune nu concurează cu alta pentru atenție, dar fiecare are **exact un** moment vizual/interactiv unic care o face memorabilă. Restul secțiunii rămâne disciplinat de acest sistem — semnătura e un punct, nu o stare permanentă.

| Secțiune      | Emoție țintă     | Momentul-semnătură                                                                                                                                                                                            |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**      | Impact cinematic | Singurul fundal întunecat al site-ului + un "workspace" viu care construiește un site sub ochii vizitatorului (wireframe → site finit → scroll care dezvăluie conținut → dovezi) — primul contact cu produsul |
| **Services**  | Interacțiune     | Ferestre de produs mai mici, modulare, fiecare demonstrând o capabilitate — utilizatorul "atinge" produsul                                                                                                    |
| **Portfolio** | Imersiune        | Preview-uri aproape full-screen ale proiectelor reale, aceeași limbă vizuală dusă la scară maximă                                                                                                             |
| **Process**   | Transformare     | (rezervat pentru redesign viitor) — vizualizează explicit trecerea haos → claritate                                                                                                                           |
| **Contact**   | Încredere        | O conversație liniștită după o prezentare impresionantă — nu entuziasm, ci calm                                                                                                                               |

Regulă de aplicare: **momentul-semnătură e singurul loc din secțiune unde e permisă o abatere ușoară de la "regula" generală de moderație** (ex. Portfolio poate merge full-bleed, lucru interzis în altă parte). Restul secțiunii respectă strict sistemul.

---

## 2. Culoare

### 2.1 Tokens (deja definite în `styles.css`, format oklch — nu se inventează culori noi)

| Token                       | Rol                                      |
| --------------------------- | ---------------------------------------- |
| `--foreground`              | text principal, titluri                  |
| `--muted-foreground`        | text secundar, descrieri, meta           |
| `--primary`                 | accentul unic al brandului               |
| `--primary` @ 10%           | fundal pentru iconițe/chip-uri mici      |
| `--border`                  | separatoare, contur de card (mereu ≤1px) |
| `--surface` / `--secondary` | fundal de card "liniștit"                |
| `--destructive`             | exclusiv erori de formular               |

### 2.2 Principiu formal: "Accent follows intention"

> Dacă utilizatorul ar trebui să privească acolo sau să interacționeze cu acel element, poate deveni albastru. Altfel, rămâne monocrom.

Testul practic pentru orice element: _"E acesta ceva pe care vreau ca utilizatorul să-l observe activ sau să-l apese acum?"_

- **Da** → poate primi `--primary` (CTA, stare activă, element curent selectat, indicator de progres curent).
- **Nu** → rămâne `foreground`/`muted-foreground`, indiferent cât de "important" pare conținutul din punct de vedere al copy-ului.

Consecințe directe:

- Conținutul inactiv (carduri nealese, pași necompletați, itemi de navigare nesecuri) rămâne mereu neutru.
- Culoarea nu se folosește niciodată pentru a "înveseli" o secțiune goală — dacă o secțiune pare seacă, se rezolvă prin tipografie/spațiere, nu prin a colora ceva arbitrar.
- Regulă de numărare: într-un singur ecran vizibil, `--primary` apare la maximum 2-3 elemente simultan. Dacă un grid de 6 carduri are toate iconițele colorate simultan, principiul e încălcat — culoarea unui card apare doar la hover/focus/selectare, nu implicit pe toate.

### 2.3 Gradient-uri (vezi și §7)

`--gradient-primary` e rezervat pentru: text de accent în titluri (`text-gradient`) și fundalul butonului CTA principal. Nu pentru fundaluri mari de secțiune.

### 2.4 Hero dark scope (excepția de la §1.1)

Hero-ul (și Navbar-ul cât timp plutește transparent peste el) e singurul loc unde fundalul e aproape negru în loc de alb. Nu e o paletă nouă, paralelă — e o **redefinire locală a acelorași tokens** pe care le folosește tot restul site-ului, aplicată printr-o singură clasă wrapper: `.hero-dark` (definită în `styles.css`, imediat după blocul `.dark` neutilizat).

| Token redefinit în `.hero-dark`                 | De ce                                                    |
| ----------------------------------------------- | -------------------------------------------------------- |
| `--background`, `--surface`, `--surface-strong` | fundal aproape negru + variante de card                  |
| `--foreground`, `--muted-foreground`            | text aproape alb / gri deschis, citibil pe fundal închis |
| `--border`, `--secondary`                       | contururi și chip-uri subtile, albe la opacitate mică    |

**Ce NU se redefinește:** `--primary`, `--primary-foreground`, `--gradient-primary`. Albastrul FlowPilot e singura constantă între cele două lumi — de asta nu reutilizăm blocul generic `.dark` din `styles.css` (boilerplate shadcn, nefolosit altundeva): acolo `--primary` e aproape alb și ar șterge accentul de brand exact unde contează cel mai mult.

**Utilități companion**, pentru elementele care altfel amestecă spre alb necondiționat (`glass-panel`, `btn-ghost` — corecte pe fundal deschis, greșite pe fundal închis):

- `glass-panel-dark` — panou frost întunecat (echivalentul `glass-panel` pentru `.hero-dark`)
- `btn-ghost-dark` — buton secundar pe fundal întunecat (echivalentul `btn-ghost`)

**Regulă de aplicare:** orice element nou adăugat _în_ Hero sau în Navbar-ul transparent trebuie să folosească aceleași utilități semantice ca peste tot (`bg-surface`, `text-muted-foreground`, `border-border`) — niciodată culori hardcodate — ca să rămână corect automat dacă scope-ul se ajustează vreodată. Excepție acceptată: elemente explicit "sticla pe negru" (panoul workspace-ului, chip-urile de dovadă) pot folosi direct `white/N%`, pentru că acolo alb-pe-negru e intenția, nu un fallback.

---

## 3. Tipografie

**Familie:** Inter, exclusiv — titluri și text. O singură familie tipografică e parte din disciplina "premium", nu o limitare.

| Nivel             | Mărime (desktop) | Greutate | Tracking                 | Line-height | Utilizare                 |
| ----------------- | ---------------- | -------- | ------------------------ | ----------- | ------------------------- |
| Display (H1 Hero) | 60–72px          | 700      | −0.02em                  | 1.05        | doar Hero                 |
| H2 secțiune       | 36–42px          | 700      | −0.02em                  | 1.05–1.1    | titlu de secțiune         |
| H3 card           | 20–24px          | 600      | normal                   | 1.2         | titlu de card/subsecțiune |
| Body mare         | 18px             | 400      | normal                   | 1.5         | subtitlu/descriere        |
| Body              | 15–16px          | 400      | normal                   | 1.5–1.6     | text standard             |
| Small/meta        | 11–13px          | 500      | +0.02–0.05em (uppercase) | 1.3         | eyebrow, meta, badge      |

**Regulă de lungime a liniei:** niciun paragraf nu depășește ~60–75 caractere pe linie (`max-w-xl`/`max-w-2xl`), indiferent de lățimea containerului secțiunii.

---

## 4. Spațiere & grid

**Unitate de bază:** 4px (scala Tailwind standard). Fără valori arbitrare, cu excepția alinierilor fine la pixel (SVG).

**Container global:** `max-w-[1320px]`, `px-4` (+ `lg:px-8` opțional pe ecrane foarte late). Toate secțiunile majore folosesc _exact_ aceeași lățime — marginile trebuie să cadă aliniate vertical pe toată pagina. Excepții intenționate și explicite:

- Blocuri de text pur (ex. About) — `max-w-3xl`, dar tot centrate în același container.
- **Portfolio, în momentul-semnătură** — poate depăși containerul standard spre full-bleed, ca parte asumată a imersiunii (vezi §6.3).

**Ritm vertical între secțiuni:** `py-24` mobil / `py-32` desktop, consecvent. O secțiune cu conținut puțin nu primește mai puțin spațiu.

**Spațiere internă de card:** `p-4` (compact — mockup mic) până la `p-6`/`p-8` (card de conținut standard). Carduri din același grid au mereu padding identic.

**Gap în grid-uri:** `gap-6` carduri mici, `gap-10`–`gap-16` coloane mari.

---

## 5. Border radius

Bază: `--radius: 0.875rem`, cu scala derivată `sm → 4xl` deja definită în tokens.

| Nivel                   | Utilizare                                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| `rounded-xl` (~1rem)    | butoane, input-uri                                                              |
| `rounded-2xl` (~1.1rem) | carduri de conținut, product window standard                                    |
| `rounded-3xl`/`4xl`     | carduri feature mari, secțiuni cu fundal distinct, product window la scară Hero |

Regulă: colțuri consecvent rotunjite peste tot. Niciun element cu colț drept lângă elemente rotunjite.

---

## 6. Umbre, elevație, glassmorphism, product window (familia)

### 6.1 Shadow — 3 niveluri (tokens existente)

- `--shadow-soft` — starea de repaus a oricărui card plutitor.
- `--shadow-elevated` — hover pe card, sau elementul central/activ al unei compoziții.
- `--shadow-glow` — rezervat exclusiv CTA-ului primary la hover. Dacă totul strălucește, nimic nu mai e special.

### 6.2 Glassmorphism (`glass-panel`)

Se folosește **doar** pentru elemente care plutesc peste alt conținut (nav fix, carduri suprapuse peste un mockup, tooltip-uri). Niciodată ca fundal al unei secțiuni întregi.

### 6.3 Product Window — familie de design, nu componentă unică

Decizie aprobată: "product window" e semnătura vizuală a FlowPilot, dar apare în **trei scări diferite**, cu aceeași grămatică vizuală (colțuri, umbre, spațiere, border, tip de mișcare), niciodată identică literă cu literă între secțiuni.

| Scară                          | Secțiune  | Caracteristici                                                                                                                                                                                                                                                     |
| ------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **XL — Hero workspace**        | Hero      | Cea mai mare fereastră de produs a site-ului. Sidebar + grafic + carduri suprapuse (stat, AI). Float lent, glow discret în spate. Punctul de plecare al grămaticii vizuale — tot ce urmează derivă din ea.                                                         |
| **M — module de capabilitate** | Services  | Ferestre mai mici, una per serviciu/capabilitate, fiecare demonstrând _un singur lucru_ (nu un dashboard complet — un fragment de UI relevant pentru acel serviciu). Interacțiune la hover (nu doar float pasiv) — utilizatorul simte că "atinge" produsul.        |
| **XL+ — imersiune**            | Portfolio | Preview aproape full-screen al fiecărui proiect real. Aceeași grămatică (colțuri, umbre, border, ritm de mișcare) dusă la scară maximă — utilizatorul "intră" în proiect, nu doar îl privește. Singurul loc unde se permite ieșirea din containerul standard (§4). |

Regulă comună tuturor celor trei scări (ce le face o _familie_, nu piese disparate):

- Aceeași paletă de colțuri/umbre/borduri din §5–6.1.
- Aceeași logică de conținut: bară de sus tip-browser SAU absența ei asumată (Portfolio poate renunța la chrome-ul de browser dacă imaginea proiectului vorbește singură), niciodată un al treilea stil inventat.
- Aceeași familie de mișcare (§7) — float lent pentru elementele statice, tranziții `easeOut` scurte pentru interacțiune.
- Conținutul intern (grafice, texte simulate) rămâne monocrom + accent conform §2.2 — o fereastră de produs nu devine ea însăși un loc cu culoare multiplă.

---

## 7. Motion language & principii de animație

### 7.1 Principii non-negociabile

1. **Orice animație răspunde la "ce comunică?"** — reveal = ierarhie de citire; hover = feedback; loop lent = "viu, nu static".
2. **`prefers-reduced-motion` obligatoriu**, pe fiecare componentă nouă, fără excepție.
3. **GPU-only, ca regulă implicită.** Exclusiv `transform` și `opacity` (+ `filter` cu măsură) pentru orice mișcare de layout/compoziție (reveal, hover pe carduri, loop-uri de fundal). **Excepție explicită și limitată:** micro-vizualizări SVG mici (sub ~150px), de tipul celor din Product Window M-scale (§6.3) — acolo se acceptă tranziții pe `stroke`, `fill`, `stroke-dashoffset` la hover, pentru că sunt operații de "paint" pe o suprafață minusculă, nu de layout, cu cost real neglijabil. Excepția NU se extinde la elemente mari sau la bucle continue — rămâne validă doar pentru interacțiuni scurte (hover, sub 0.7s), pe elemente grafice mici.
4. **Nicio buclă infinită sub 4 secunde per ciclu**, cu excepția micro-interacțiunilor (0.2s).

### 7.2 Tabel de referință

| Tip de mișcare                                 | Durată                                                 | Easing                        | Unde                              |
| ---------------------------------------------- | ------------------------------------------------------ | ----------------------------- | --------------------------------- |
| Micro-interacțiune (hover, focus)              | 0.15–0.2s                                              | `easeOut`                     | orice element interactiv          |
| Reveal la încărcare                            | 0.6–0.7s                                               | `cubic-bezier(0.22,1,0.36,1)` | titlu, subtitlu, CTA-uri, carduri |
| Stagger între elemente                         | 0.08–0.12s delay/element                               | —                             | liste de carduri, coloane         |
| Loop ambiental (glow, float)                   | 6–14s/ciclu                                            | `easeInOut`                   | fundal, product window static     |
| Tranziție de stare (nav, tab activ)            | 0.25–0.3s                                              | `easeOut`                     | schimbări de stare UI             |
| **Moment-semnătură** (per secțiune, vezi §1.2) | poate depăși aceste praguri _cu justificare explicită_ | —                             | maximum o dată per secțiune       |

### 7.3 Permis vs. interzis

**Permis:** fade+translateY la reveal, stagger pe citire, hover scale 1.02–1.04, loop de fundal lent și aproape imperceptibil, tranziții de culoare/border la hover, parallax discret (doar în momentul-semnătură al unei secțiuni, ex. Portfolio).

**Interzis, oriunde:** particule, WebGL/canvas greu, video de fundal, Lottie, bounce/elastic easing, text care "sare" literă cu literă în buclă, orice animație cu cost vizibil pe un laptop mediu.

---

## 8. Ierarhia componentelor

```
Nivel 1 — Structură globală: Nav, Footer, Container
Nivel 2 — Blocuri de secțiune: Hero, Services, Portfolio, Process, Contact
Nivel 3 — Componente compuse: Product Window (§6.3), Card de conținut, Formular
Nivel 4 — Componente atomice: Buton, Badge/Eyebrow, Input, Iconiță, Chip plutitor
```

Regula de compoziție: o componentă de Nivel 3 pornește din piesele de Nivel 4 deja definite în §9, dar **nu e obligată să se limiteze la ele**. Dacă un context (ex. un modul Services) are nevoie genuină de o piesă nouă — o variantă de card, un tip nou de indicator — se poate introduce, cu o singură condiție: **respectă tokens-urile și principiile deja stabilite** (culoare conform §2.2, radius §5, shadow §6.1, motion §7), nu inventează o grămatică vizuală paralelă. Diferența dintre "extindere" (permisă) și "componentă paralelă" (interzisă): o extindere folosește aceleași variabile de design cu o compoziție nouă; o componentă paralelă aduce valori/stiluri care nu există nicăieri altundeva în sistem. Orice piesă nouă introdusă astfel se adaugă înapoi în §9, ca vocabularul comun să rămână la zi — libertatea de a extinde nu înseamnă libertatea de a uita s-o documentezi.

---

## 9. Componente & tipare de interacțiune

**Eyebrow badge** — pastilă mică, `border + bg-white/60 + backdrop-blur`, `text-xs font-medium text-muted-foreground`, punct de accent 6px. Prim element al oricărei secțiuni cu conținut temporal/nou.

**Buton primary** (`btn-primary`) — gradient primary, text alb, `shadow-elevated` → `shadow-glow` la hover, `translateY(-1px)`. Un singur CTA primary vizibil per secțiune.

**Buton ghost** (`btn-ghost`) — fundal aproape alb, border subtil, hover schimbă doar border-ul spre accent. Acțiuni secundare.

**Card de conținut** — `rounded-2xl`, `border-border/80`, `shadow-soft` → `shadow-elevated` la hover, padding `p-6`/`p-8`.

**Chip plutitor (glass)** — `glass-panel`, `rounded-xl`/`2xl`, exclusiv peste alt conținut. Conține: iconiță în cerc `bg-primary/10` + text scurt (o valoare + un label).

**Product Window** — vezi §6.3 pentru cele trei scări.

**Trust row** — listă de text simplă, separată prin puncte mici, fără culoare, fără pastile.

**Nav** — fix, transparent în repaus, `bg-background/75 + backdrop-blur-xl` pe tot elementul la scroll (nu doar pe o pastilă interioară).

### Stări de interacțiune (obligatorii pentru orice componentă nouă)

| Stare           | Regulă                                                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default         | monocrom, conform §2.2                                                                                                                                           |
| Hover           | poate introduce `--primary` DOAR dacă elementul e interactiv (§2.2); scale 1.02–1.04 sau schimbare de border/shadow, niciodată amândouă simultan cu mișcare mare |
| Focus-visible   | ring vizibil pe `--ring`, niciodată eliminat                                                                                                                     |
| Active/selectat | `--primary` la text sau fundal @10%, conform §2.2                                                                                                                |
| Disabled        | opacitate redusă (~50%), fără hover state                                                                                                                        |

---

## 10. Iconografie

**Librărie:** `lucide-react`, exclusiv.

**Reguli:** stroke-width implicit (2px). Dimensiuni: `h-3.5 w-3.5` (chip-uri mici), `h-4 w-4` (butoane/liste), `h-5 w-5` (nav, elemente izolate). Monocrome implicit — `text-primary` doar când iconița _este_ accentul curent (conform §2.2), altfel `text-muted-foreground`.

---

## 11. Accesibilitate

- Contrast minim AA text/fundal — verificat explicit pe `muted-foreground` peste `secondary`/`surface`.
- `focus-visible` clar pe orice element interactiv (ring, nu doar schimbare subtilă de culoare).
- `prefers-reduced-motion` respectat de orice componentă nouă (§7.1).
- HTML semantic: `<section>`, `<nav>`, ierarhie logică `<h1>`–`<h3>`, `<button>`/`<a>` folosite corect.
- `alt`/`aria-label` pentru orice element vizual cu sens informațional; `aria-hidden` pentru decor pur.
- Momentele-semnătură (§1.2) nu pot compromite accesibilitatea — o imersiune Portfolio full-screen tot trebuie să rămână navigabilă cu tastatura și să respecte reduced-motion.

---

## 12. Constrângeri de performanță

- Fără librării noi de animație grele (particule, canvas, Lottie, video de fundal) — Framer Motion e singura librărie de motion acceptată, folosită punctual, nu ca fundație pentru tot.
- Product Window (orice scară) se construiește din HTML/CSS/SVG inline — fără imagini exportate pentru elementele de UI simulată, fără librării de grafice pentru un sparkline simplu.
- Imaginile reale (ex. Portfolio) sunt optimizate (format modern, dimensiuni corecte per breakpoint, `loading="lazy"` sub fold) — imersiunea nu justifică greutate necontrolată.
- Orice buclă de animație ambientală (§7.2) rulează pe `transform`/`opacity` — zero cost de layout/paint pe fiecare frame.
- Regulă de acceptare: o secțiune nouă trebuie să rămână fluidă (fără jank vizibil) pe un laptop de gamă medie, nu doar pe mașina de dezvoltare.

---

## 13. Tonul secțiunii Contact (aplicare directă a §1.2)

Contact nu caută să impresioneze din nou — caută să confirme. Direcție aprobată:

- **Atmosferă ușor diferită** de restul paginii: posibil o tranziție subtilă de fundal (ex. `--surface` mai prezent, nu alb pur) care semnalează "am ajuns la finalul călătoriei".
- **Tipografie elegantă, nu mai mare** — nu concurează cu titlul din Hero.
- **Mișcare minimă** — reveal-ul standard (§7.2), fără loop-uri ambientale suplimentare. Contact e locul unde site-ul, în sfârșit, stă liniștit.
- **O declarație finală memorabilă** — o singură propoziție de închidere, scrisă cu grijă, nu un titlu generic ("Hai să vorbim" e neutru; căutăm ceva care sună ca o concluzie, nu ca un formular).

Rezultatul dorit: vizitatorul pleacă cu încredere calmă, nu cu entuziasm — diferența dintre "vreau să aflu mai multe" (Hero) și "sunt convins, hai să începem" (Contact).

---

Acest document e sursa unică de adevăr. Orice decizie de layout, culoare sau mișcare din Services, Portfolio, Process sau Contact se justifică printr-o secțiune de aici — nu prin preferință de moment. Când o cerință nouă nu se potrivește în niciun paragraf existent, actualizăm documentul explicit înainte să scriem cod, nu invers.
