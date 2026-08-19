import type { TranslationDictionary } from "./types";

export const ro: TranslationDictionary = {
  meta: {
    title: "FlowPilot — Site-uri premium și automatizare business",
    description:
      "FlowPilot proiectează site-uri premium astăzi și construiește instrumentele inteligente de business de mâine. Experiențe digitale rapide, moderne și scalabile.",
    ogTitle: "FlowPilot — Site-uri premium și automatizare business",
    ogDescription:
      "Proiectăm site-uri premium astăzi, în timp ce construim instrumentele inteligente de business de mâine.",
  },
  common: {
    brand: "FlowPilot",
    menu: "Meniu",
    getInTouch: "Contactează-ne",
    comingSoon: "În curând",
    contact: "Contact",
    allRightsReserved: "Toate drepturile rezervate.",
    switchToLight: "Comută la modul deschis",
    switchToDark: "Comută la modul întunecat",
  },
  nav: {
    services: "Prețuri",
    process: "Proces",
    work: "Proiecte",
    comingSoon: "În curând",
    about: "Despre noi",
  },
  hero: {
    badge: "Acceptăm proiecte noi · T4 2026",
    title: "Un site nu este",
    titleLine2: "doar",
    titleUnderline: "o pagină.",
    subtitlePrefix: "Este",
    titleHighlight: "prima impresie.",
    description: "Creăm site-uri rapide, moderne și adaptate afacerii tale.",
    ctaPrimary: "Începe un proiect",
    ctaSecondary: "Explorează modelele",
    trustTimeline: "Livrare în 1 - 2 săptămâni",
    trustStack: "React & Next.js",
    trustSupport: "Suport continuu",
    imageAlt: "Ilustrație cu fluxuri digitale și automatizare business",
    scrollCue: "Derulează",
    workspace: {
      browserLabel: "flowpilot.ro",
      navItems: ["Acasă", "Servicii", "Portofoliu", "Contact"],
      heroHeading: "Afacerea ta, la superlativ.",
      heroCta: "Vezi lucrările",
      badges: ["Responsive", "SEO ready", "Rapid", "Live"],
    },
  },
  trust: {
    title: "Fiecare decizie e gândită să facă lansarea produsului tău predictibilă.",
    items: [
      {
        title: "Comunicare directă",
        description: "Lucrezi direct cu fondatorii, de la primul apel până la lansare.",
        detail: "Fără intermediari · fără întârzieri inutile",
      },
      {
        title: "Preț fix",
        description:
          "Afli investiția înainte să înceapă dezvoltarea, printr-o ofertă transparentă.",
        detail: "Fără costuri ascunse",
      },
      {
        title: "Livrare rapidă",
        description:
          "Majoritatea proiectelor sunt lansate în 1-2 săptămâni, cu un plan clar din prima zi.",
        detail: "Roadmap clar, de la început",
      },
      {
        title: "Tehnologie modernă",
        description:
          "Construim cu React, Next.js și arhitecturi scalabile, gata să crească odată cu afacerea ta.",
        detail: "React & Next.js",
      },
    ],
  },
  services: {
    eyebrow: "Prețuri",
    title: "Planuri simple, rezultate reale.",
    description:
      "Prețurile de mai jos sunt orientative și pot varia în funcție de complexitatea proiectului.",
    priceFromLabel: "de la",
    plans: [
      {
        name: "Landing",
        tagline: "O singură pagină, simplă și profesionistă.",
        description:
          "Potrivit pentru persoane sau afaceri care au nevoie de o prezență online simplă și rapidă.",
        price: "100",
        currency: "€",
        features: [
          "1 pagină",
          "Design modern",
          "Responsive",
          "Secțiuni esențiale",
          "Formular / buton de contact",
          "Publicare online",
        ],
        cta: "Alege Landing",
      },
      {
        name: "Starter",
        tagline: "Un website complet pentru o afacere mică.",
        description: "Ideal pentru o afacere mică ce vrea o prezență completă online.",
        price: "250",
        currency: "€",
        featured: true,
        badge: "Recomandat",
        features: [
          "3-5 pagini",
          "Design personalizat",
          "Responsive",
          "Animații & interacțiuni",
          "Formular de contact",
          "SEO de bază",
          "Optimizare pentru viteză",
          "Publicare online",
        ],
        cta: "Alege Starter",
      },
      {
        name: "Business",
        tagline: "Un website mai complex, construit pentru o afacere în creștere.",
        description: "Pentru afaceri în creștere care au nevoie de mai multă putere și integrări.",
        price: "500",
        currency: "€",
        features: [
          "5-10 pagini",
          "Design complet personalizat",
          "Animații & interacțiuni avansate",
          "SEO tehnic",
          "Analytics",
          "Integrări cu servicii externe",
          "Funcționalități custom",
          "Optimizare avansată",
        ],
        cta: "Discută despre proiect",
      },
    ],
    maintenance: {
      title: "Mentenanță & suport",
      priceFromLabel: "de la",
      priceValue: "30",
      priceSuffix: "€/lună",
      description:
        "Site-ul tău este lansat. Noi avem grijă să rămână actualizat, rapid și funcțional.",
      features: [
        "Backup-uri",
        "Actualizări tehnice",
        "Monitorizare",
        "Mici modificări de conținut",
        "Suport tehnic",
      ],
      note: "Paginile noi și funcționalitățile suplimentare se taxează separat.",
      cta: "Discută despre mentenanță",
    },
    disclaimer:
      "Prețurile afișate sunt prețuri de pornire și pot varia în funcție de complexitatea proiectului.",
  },
  process: {
    eyebrow: "Procesul nostru",
    title: "Un parcurs clar și predictibil, de la idee la lansare.",
    labels: {
      whatWeDo: "Ce facem",
      whatClientGets: "Ce primești",
      whyItMatters: "De ce contează",
      duration: "Durată estimată",
    },
    steps: [
      {
        title: "Descoperire",
        duration: "2-3 zile",
        whatWeDo:
          "Analizăm afacerea, publicul țintă și obiectivele tale, apoi cercetăm concurența și oportunitățile de piață.",
        whatClientGets: "Un brief clar, cu obiective măsurabile și un plan de proiect definit.",
        whyItMatters:
          "Fără o bază solidă de informații, orice decizie de design sau tehnologie devine o presupunere, nu o strategie.",
      },
      {
        title: "Planificare",
        duration: "2 zile",
        whatWeDo:
          "Structurăm arhitectura site-ului, definim fluxurile utilizatorului și stabilim stack-ul tehnic potrivit.",
        whatClientGets:
          "O hartă a site-ului (sitemap) și un plan tehnic aprobat, înainte să se scrie vreun cod.",
        whyItMatters:
          "Planificarea din timp elimină reconstrucțiile costisitoare mai târziu în proiect.",
      },
      {
        title: "Design",
        duration: "3-5 zile",
        whatWeDo:
          "Creăm machete (wireframes) și design-uri de mare fidelitate, aliniate cu identitatea brandului tău.",
        whatClientGets:
          "Un prototip interactiv, pe care îl poți vedea și testa înainte de dezvoltare.",
        whyItMatters:
          "Corectarea unui design costă minute; corectarea unui site deja dezvoltat costă zile.",
      },
      {
        title: "Dezvoltare",
        duration: "1-2 săptămâni",
        whatWeDo:
          "Transformăm design-ul aprobat în cod curat, performant și responsive, testat pe toate dispozitivele.",
        whatClientGets:
          "Un site funcțional, într-un mediu de testare, la care ai acces în timp real.",
        whyItMatters:
          "Aici prinde viață produsul — calitatea codului decide viteza și stabilitatea pe termen lung.",
      },
      {
        title: "Lansare",
        duration: "1-2 zile",
        whatWeDo:
          "Configurăm hosting-ul, verificăm securitatea și performanța, apoi publicăm site-ul live.",
        whatClientGets: "Un site live, optimizat și monitorizat, plus documentație de utilizare.",
        whyItMatters:
          "O lansare bine pregătită înseamnă zero timp de nefuncționare și o primă impresie impecabilă.",
      },
      {
        title: "Mentenanță",
        duration: "Continuu",
        whatWeDo:
          "Monitorizăm funcționarea site-ului, aplicăm actualizări de securitate și rezolvăm rapid orice problemă tehnică apărută.",
        whatClientGets:
          "Un site întreținut constant, cu suport direct atunci când apare o problemă.",
        whyItMatters:
          "Un site bun nu se termină la lansare — are nevoie de îngrijire constantă ca să rămână rapid, sigur și funcțional.",
      },
    ],
  },
  showcase: {
    eyebrow: "Șabloane",
    title: "Produse premium, gata de explorat.",
    description:
      "Fiecare șablon e construit ca un produs complet — explorează-l live, apoi personalizează-l pentru afacerea ta.",
    previewAlt: "Previzualizare {title}",
    liveLabel: "Live",
    liveDemoLabel: "Demo live",
    requestLabel: "Solicită acest design",
    featuredLabel: "Proiect featured",
    items: [
      {
        title: "Restaurant Website Template",
        tag: "HoReCa",
        description:
          "Site elegant pentru restaurante, cu meniu digital, rezervări și galerie foto.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Dental Clinic Template",
        tag: "Sănătate",
        description: "Site modern pentru cabinete stomatologice, cu programări online, SEO și CMS.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Construction Company Template",
        tag: "Industrial",
        description:
          "Prezență solidă pentru companii de construcții, cu portofoliu de proiecte și oferte rapide.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Product Presentation Template",
        tag: "E-commerce",
        description:
          "Landing page de prezentare produs, cu galerie foto, detalii de anatomie și colecție de modele.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Product Showcase Template",
        tag: "E-commerce",
        description:
          "Vitrină digitală cinematică pentru o colecție de sneakers, cu storytelling orizontal și animații de lux.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
    ],
  },
  why: {
    eyebrow: "De ce FlowPilot",
    title: "Un partener obsedat de detalii.",
    intro: "Fiecare beneficiu de mai jos e o demonstrație, nu doar o promisiune.",
    items: [
      {
        label: "Performanță",
        title: "Livrare rapidă",
        desc: "Lansare în săptămâni, nu trimestre — fără compromisuri de viteză.",
      },
      {
        label: "Design",
        title: "Design premium",
        desc: "Rafinat, gândit, aliniat brandului tău — nu doar frumos, ci intenționat.",
      },
      {
        label: "Responsive",
        title: "Mobile first",
        desc: "Impecabil pe desktop, tabletă și mobil, din prima zi.",
      },
      {
        label: "SEO",
        title: "Optimizat pentru căutare",
        desc: "Construit ca motoarele de căutare — și clienții tăi — să te găsească primii.",
      },
      {
        label: "Inteligență artificială",
        title: "Pregătit pentru AI",
        desc: "Arhitecturat azi pentru capabilitățile de mâine.",
      },
      {
        label: "Scalabilitate",
        title: "Soluții scalabile",
        desc: "Crește de la site la ecosistem digital, fără reconstrucție.",
      },
    ],
    proof: {
      loadTimeLabel: "Timp de încărcare",
      loadTimeValue: "0.8s",
      scoreLabel: "Performanță",
      seoLabel: "SEO",
      accessibilityLabel: "Accesibilitate",
      searchQuery: "clinică stomatologică București",
      aiPrompt: "Creează o secțiune pentru pagina de start",
      generatingLabel: "Se generează…",
      architectureLayers: ["Website", "CMS", "Analitice", "AI"],
    },
  },
  comingSoon: {
    badge: "În dezvoltare",
    title: "Dincolo de site-uri.",
    titleHighlight: "Construim ce urmează.",
    description:
      "FlowPilot Labs e spațiul unde explorăm ce vine după site-uri — asistenți AI, automatizări și produse digitale noi. Nimic de aici nu e lansat încă; construim în văzul tuturor.",
    emailPlaceholder: "tu@compania.ro",
    submit: "Fii primul anunțat",
    submitting: "Se înscrie...",
    disclaimer: "Notificări rare · Fără spam · Dezabonare oricând",
    toastSuccess: "Ești pe listă — te anunțăm când apare ceva nou.",
    toastError: "Ceva nu a mers bine. Te rugăm să încerci din nou.",
    experiments: [
      {
        label: "Asistent AI",
        status: "Cercetare",
        description:
          "Un asistent conversațional care preia sarcini repetitive din email și documente.",
      },
      {
        label: "Automatizări fără cod",
        status: "Prototip",
        description: "Fluxuri de lucru care leagă unelte existente, fără nicio linie de cod.",
      },
      {
        label: "Documente inteligente",
        status: "Explorare",
        description: "Extragere și organizare automată a informațiilor din documente.",
      },
      {
        label: "Copilot analitic",
        status: "Concept",
        description: "Rapoarte și observații generate automat din datele afacerii.",
      },
    ],
  },
  about: {
    eyebrow: "DESPRE NOI",
    title:
      "Nu suntem o agenție mare. Suntem trei oameni care construiesc fiecare proiect cu grijă.",
    paragraph1:
      "FlowPilot a pornit dintr-o observație simplă: prea multe site-uri de afaceri mici arată ca niște șabloane reciclate, fără personalitate și fără cineva care să se implice cu adevărat în rezultat.",
    paragraph2:
      "Suntem o echipă de studenți pasionați de tehnologie, design și dezvoltarea produselor digitale. Combinăm partea tehnică și creativă pentru a construi site-uri care nu doar arată bine, ci ajută afacerile să crească.",
    paragraph3:
      "La FlowPilot fiecare proiect este tratat personal: comunicăm direct cu clienții, înțelegem obiectivele lor și construim soluții adaptate nevoilor reale.",
    differentiators: [
      "Lucrezi direct cu echipa care construiește produsul, nu prin intermediari.",
      "Fiecare proiect este analizat și dezvoltat cu atenție, de la prima discuție până la lansare.",
      "Combinăm dezvoltarea software, designul și comunicarea cu clientul pentru o experiență completă.",
    ],
    foundersLabel: "ECHIPA",
    founders: [
      { initials: "ȘD", name: "Ștefan Dima", role: "Frontend development & design" },
      { initials: "AP", name: "Alexandru Pirvu", role: "Backend development & sisteme" },
      { initials: "MB", name: "Morar Bogdan", role: "Project management & relații cu clienții" },
    ],
    today: "Astăzi",
    todayText: "construim site-uri premium, unul câte unul.",
    tomorrow: "Mâine",
    tomorrowText: "vrem să construim mult mai mult decât site-uri.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Hai să construim ceva remarcabil împreună.",
    description:
      "Spune-ne despre proiectul tău. Răspundem în 24 de ore cu o propunere personalizată.",
    trustIndicators: [
      "Comunicare directă cu noi, fără intermediari.",
      "Proces transparent, de la prima schiță până la lansare.",
      "Site-uri construite pentru afacerea ta, nu șabloane reambalate.",
    ],
    name: "Nume",
    company: "Companie",
    optional: "opțional",
    email: "Email",
    message: "Mesaj",
    submit: "Trimite mesajul",
    submitting: "Se trimite...",
    toastSuccess: "Mesaj trimis — răspundem în maximum 24 de ore.",
    toastError: "Ceva nu a mers bine. Te rugăm să încerci din nou.",
  },
  footer: {
    statement: "Un studio mic, condus de doi oameni care construiesc fiecare site cu mâna lor.",
    cta: "Începe un proiect",
    navLabel: "Navigare",
    connectLabel: "Conectare",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    privacyPolicy: "Politica de Confidențialitate",
  },
  consent: {
    prefix: "Sunt de acord cu",
    linkText: "Politica de Confidențialitate",
  },
  privacy: {
    metaTitle: "Politica de Confidențialitate — FlowPilot",
    metaDescription: "Cum colectăm, folosim și protejăm datele tale pe FlowPilot.",
    title: "Politica de Confidențialitate",
    lastUpdated: "Ultima actualizare: august 2026",
    intro:
      "Această Politică de Confidențialitate explică ce date cu caracter personal colectăm prin intermediul acestui site, în ce scop le utilizăm, cât timp le păstrăm și ce drepturi ai în legătură cu acestea.",
    sections: [
      {
        heading: "Ce date colectăm",
        body: "În funcție de formularul utilizat pe site, putem colecta: prin formularul de contact — numele tău, compania (dacă alegi să o furnizezi), adresa de email și conținutul mesajului transmis; prin formularul pentru lista de așteptare — doar adresa de email. De asemenea, pentru protejarea formularelor împotriva spamului și abuzului, putem prelucra temporar adresa IP asociată unei trimiteri, precum și data și ora solicitării. Nu solicităm date care nu sunt necesare pentru scopurile descrise mai jos.",
      },
      {
        heading: "De ce folosim datele",
        body: "Utilizăm datele colectate pentru a răspunde mesajelor și solicitărilor transmise prin formularul de contact, pentru a contacta persoanele înscrise pe lista de așteptare atunci când serviciul devine disponibil, pentru a preveni spamul și abuzul asupra formularelor și pentru a asigura securitatea și funcționarea corespunzătoare a site-ului. Nu vindem datele personale și nu le folosim pentru publicitate sau profilare în afara acestor scopuri.",
      },
      {
        heading: "Adresa IP și prevenirea spamului",
        body: "Pentru protejarea formularelor împotriva spamului, abuzului și trimiterilor automatizate, putem prelucra temporar adresa IP asociată unei trimiteri, împreună cu data și ora solicitării. Aceste informații sunt utilizate exclusiv pentru aplicarea unor limite de trimitere și pentru detectarea și prevenirea abuzului, fiind păstrate maximum 48 de ore, după care sunt șterse automat. Nu folosim aceste date pentru publicitate, profilare sau marketing.",
      },
      {
        heading: "Temeiul prelucrării",
        body: "Prelucrăm datele personale în conformitate cu legislația aplicabilă privind protecția datelor, inclusiv Regulamentul General privind Protecția Datelor (GDPR). În funcție de situație, prelucrarea se bazează pe demersurile necesare pentru a răspunde solicitării tale, pe interesul nostru legitim de a asigura securitatea site-ului și de a preveni spamul și abuzul, sau pe consimțământul tău, atunci când acesta este necesar.",
      },
      {
        heading: "Cât timp păstrăm datele",
        body: "Datele transmise prin formularul de contact sunt păstrate atât timp cât este necesar pentru soluționarea solicitării tale și, ulterior, pentru o perioadă rezonabilă în scop de evidență a comunicării. Adresele de email de pe lista de așteptare sunt păstrate până la lansarea serviciului respectiv sau până când soliciți ștergerea lor. Datele folosite pentru prevenirea spamului sunt păstrate maximum 48 de ore. Putem păstra anumite date pentru perioade mai lungi atunci când este necesar pentru îndeplinirea unei obligații legale sau pentru constatarea, exercitarea ori apărarea unor drepturi.",
      },
      {
        heading: "Furnizori și servicii terțe",
        body: "Pentru funcționarea site-ului și procesarea datelor transmise prin formulare folosim servicii furnizate de terți, inclusiv Supabase (stocarea și gestionarea datelor din formulare), Resend (transmiterea emailurilor generate de formulare) și Vercel (găzduirea site-ului). Acești furnizori pot prelucra date în numele nostru, doar în măsura necesară furnizării serviciilor respective, și nu au voie să le folosească în scopuri de marketing propriu.",
      },
      {
        heading: "Cine are acces la date",
        body: "Accesul la date este limitat la persoanele care au nevoie de acesta pentru administrarea site-ului, gestionarea solicitărilor și furnizarea serviciilor asociate. Luăm măsuri rezonabile pentru protejarea datelor împotriva accesului neautorizat, pierderii, modificării sau divulgării.",
      },
      {
        heading: "Drepturile tale",
        body: "Conform GDPR, ai dreptul să soliciți accesul la datele tale personale, rectificarea celor incorecte, ștergerea lor, restricționarea prelucrării sau opoziția față de anumite prelucrări, portabilitatea datelor (atunci când este aplicabilă) și retragerea consimțământului, în cazul prelucrărilor bazate pe acesta. Ne poți contacta oricând pentru a-ți exercita aceste drepturi și ai, de asemenea, dreptul de a depune o plângere la autoritatea competentă pentru protecția datelor.",
      },
      {
        heading: "Cookies și tehnologii similare",
        body: "Acest site poate utiliza cookie-uri sau tehnologii similare necesare pentru funcționarea și securitatea site-ului. Dacă vom utiliza servicii de analiză, publicitate sau alte tehnologii care necesită consimțământul tău, îți vom furniza informațiile și opțiunile necesare, în conformitate cu legislația aplicabilă.",
      },
      {
        heading: "Modificarea acestei politici",
        body: "Putem actualiza această Politică de Confidențialitate atunci când modificăm modul în care funcționează site-ul, serviciile pe care le utilizăm sau modul în care prelucrăm datele. Versiunea actuală va fi disponibilă permanent pe această pagină, împreună cu data ultimei actualizări.",
      },
      {
        heading: "Contact",
        body: "Pentru întrebări privind această Politică de Confidențialitate sau pentru exercitarea drepturilor tale privind protecția datelor, ne poți contacta la tflowpilot@gmail.com.",
      },
    ],
    backHome: "Înapoi la pagina principală",
  },
  forms: {
    validation: {
      nameMin: "Numele trebuie să aibă cel puțin 2 caractere",
      emailInvalid: "Introdu o adresă de email validă",
      messageMin: "Mesajul trebuie să aibă cel puțin 10 caractere",
      consentRequired: "Trebuie să accepți Politica de Confidențialitate",
    },
  },
  errors: {
    notFoundTitle: "Pagina nu a fost găsită",
    notFoundDescription: "Pagina pe care o cauți nu există sau a fost mutată.",
    goHome: "Acasă",
    pageErrorTitle: "Pagina nu s-a încărcat",
    pageErrorDescription:
      "Ceva nu a mers bine. Poți reîmprospăta pagina sau reveni la pagina principală.",
    tryAgain: "Încearcă din nou",
  },
};
