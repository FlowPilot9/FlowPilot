export type Locale = "ro" | "en";

export interface FormValidationMessages {
  nameMin: string;
  emailInvalid: string;
  messageMin: string;
  consentRequired: string;
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
    switchToLight: string;
    switchToDark: string;
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
    workspace: {
      browserLabel: string;
      navItems: string[];
      heroHeading: string;
      heroCta: string;
      badges: string[];
    };
  };
  trust: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      detail: string;
    }>;
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
    previewAlt: string;
    liveLabel: string;
    liveDemoLabel: string;
    requestLabel: string;
    items: Array<{
      title: string;
      tag: string;
      description: string;
      stack: string[];
      isLive: boolean;
    }>;
  };
  why: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ label: string; title: string; desc: string }>;
    proof: {
      loadTimeLabel: string;
      loadTimeValue: string;
      scoreLabel: string;
      seoLabel: string;
      accessibilityLabel: string;
      searchQuery: string;
      aiPrompt: string;
      generatingLabel: string;
      architectureLayers: string[];
    };
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
    toastSuccess: string;
    toastError: string;
    experiments: { label: string; status: string; description: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    differentiators: string[];
    foundersLabel: string;
    founders: { initials: string; name: string; role: string }[];
    today: string;
    todayText: string;
    tomorrow: string;
    tomorrowText: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    trustIndicators: string[];
    name: string;
    company: string;
    optional: string;
    email: string;
    message: string;
    submit: string;
    submitting: string;
    toastSuccess: string;
    toastError: string;
  };
  footer: {
    statement: string;
    cta: string;
    navLabel: string;
    connectLabel: string;
    linkedin: string;
    github: string;
    email: string;
    privacyPolicy: string;
  };
  consent: {
    prefix: string;
    linkText: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lastUpdated: string;
    intro: string;
    sections: Array<{ heading: string; body: string }>;
    backHome: string;
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
