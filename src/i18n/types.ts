export type Locale = "ro" | "en";

export interface FormValidationMessages {
  nameMin: string;
  emailInvalid: string;
  messageMin: string;
}

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  common: {
    brand: string;
    menu: string;
    getInTouch: string;
    comingSoon: string;
    contact: string;
    allRightsReserved: string;
  };
  nav: {
    services: string;
    process: string;
    work: string;
    comingSoon: string;
    about: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustTimeline: string;
    trustStack: string;
    trustSupport: string;
    imageAlt: string;
    scrollCue: string;
    mockup: {
      browserLabel: string;
      navItems: string[];
      chartLabel: string;
      statValue: string;
      statLabel: string;
      aiLabel: string;
      aiMessage: string;
    };
  };
  trust: {
    intro: string;
    introHighlight: string;
    stats: Array<{ value: string; label: string }>;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      desc: string;
      badge?: string;
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    labels: {
      whatWeDo: string;
      whatClientGets: string;
      whyItMatters: string;
      duration: string;
    };
    steps: Array<{
      title: string;
      duration?: string;
      whatWeDo: string;
      whatClientGets: string;
      whyItMatters: string;
    }>;
  };
  showcase: {
    eyebrow: string;
    title: string;
    description: string;
    projectMockup: string;
    items: Array<{
      title: string;
      tag: string;
    }>;
  };
  why: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; desc: string }>;
  };
  comingSoon: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    disclaimer: string;
    imageAlt: string;
    toastSuccess: string;
    toastError: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    today: string;
    todayText: string;
    tomorrow: string;
    tomorrowText: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    fixedPrice: string;
    delivery: string;
    name: string;
    company: string;
    email: string;
    message: string;
    submit: string;
    submitting: string;
    toastSuccess: string;
    toastError: string;
  };
  footer: {
    linkedin: string;
    github: string;
    email: string;
  };
  forms: {
    validation: FormValidationMessages;
  };
  errors: {
    notFoundTitle: string;
    notFoundDescription: string;
    goHome: string;
    pageErrorTitle: string;
    pageErrorDescription: string;
    tryAgain: string;
  };
}
