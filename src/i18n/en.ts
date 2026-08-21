import type { TranslationDictionary } from "./types";

export const en: TranslationDictionary = {
  meta: {
    title: "FlowPilot — Modern websites for businesses",
    description:
      "We build modern, fast and optimized websites for businesses. Premium design, development and ongoing support from idea to launch.",
    ogTitle: "FlowPilot — Modern websites for businesses",
    ogDescription:
      "We build modern, fast and optimized websites for businesses.",
  },
  common: {
    brand: "FlowPilot",
    menu: "Menu",
    getInTouch: "Get in touch",
    comingSoon: "Coming Soon",
    contact: "Contact",
    allRightsReserved: "All rights reserved.",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  nav: {
    services: "Pricing",
    process: "Process",
    work: "Work",
    comingSoon: "Coming Soon",
    about: "About",
  },
  hero: {
    title: "A website isn't",
    titleLine2: "just",
    titleUnderline: "a page",
    subtitlePrefix: "It's",
    titleHighlight: "the first impression.",
    description: "We build fast, modern websites shaped around your business.",
    ctaPrimary: "Start a project",
    ctaSecondary: "Explore the templates",
    trustTimeline: "Launch in 1 - 2 weeks",
    trustStack: "React & Next.js",
    trustSupport: "Ongoing support",
    imageAlt: "Illustration of digital workflows and business automation",
    scrollCue: "Scroll",
    workspace: {
      browserLabel: "flowpilot.ro",
      navItems: ["Home", "Services", "Work", "Contact"],
      heroHeading: "Your business, elevated.",
      heroCta: "See the work",
      badges: ["Responsive", "SEO ready", "Fast", "Live"],
    },
  },
  trust: {
    title: "Every decision we make is designed to make launching your product predictable.",
    items: [
      {
        title: "Direct Communication",
        description: "You work directly with the founders, from the first call to launch.",
        detail: "No middlemen · no unnecessary delays",
      },
      {
        title: "Fixed Pricing",
        description:
          "Know the investment before development begins, through a transparent proposal.",
        detail: "No hidden costs",
      },
      {
        title: "Fast Delivery",
        description: "Most projects launch within 1-2 weeks, with a clear roadmap from day one.",
        detail: "Clear roadmap from the start",
      },
      {
        title: "Modern Technology",
        description:
          "Built with React, Next.js, and scalable architecture, ready to grow with your business.",
        detail: "React & Next.js",
      },
    ],
  },
  services: {
    eyebrow: "Pricing",
    title: "Simple plans, real results.",
    description: "Choose the right package for your business website. Prices are indicative and may vary depending on project complexity.",
    priceFromLabel: "from",
    plans: [
      {
        name: "Landing",
        tagline: "One page, simple and professional.",
        description:
          "Suited for individuals or businesses that need a simple, fast online presence.",
        price: "100",
        currency: "€",
        features: [
          "1 page",
          "Modern design",
          "Responsive",
          "Essential sections",
          "Contact form / button",
          "Online publishing",
        ],
        cta: "Choose Landing",
      },
      {
        name: "Starter",
        tagline: "A complete website for a small business.",
        description: "Ideal for a small business that wants a full online presence.",
        price: "250",
        currency: "€",
        featured: true,
        badge: "Recommended",
        features: [
          "3-5 pages",
          "Custom design",
          "Responsive",
          "Animations & interactions",
          "Contact form",
          "Basic SEO",
          "Speed optimization",
          "Online publishing",
        ],
        cta: "Choose Starter",
      },
      {
        name: "Business",
        tagline: "A more complex website, built for a growing business.",
        description: "For growing businesses that need more power and integrations.",
        price: "500",
        currency: "€",
        features: [
          "5-10 pages",
          "Fully custom design",
          "Advanced animations & interactions",
          "Technical SEO",
          "Analytics",
          "Third-party integrations",
          "Custom functionality",
          "Advanced optimization",
        ],
        cta: "Discuss your project",
      },
    ],
    maintenance: {
      title: "Maintenance & support",
      priceFromLabel: "from",
      priceValue: "30",
      priceSuffix: "€/month",
      description: "Your site is live. We make sure it stays updated, fast and functional.",
      features: [
        "Backups",
        "Technical updates",
        "Monitoring",
        "Small content changes",
        "Technical support",
      ],
      note: "New pages and additional features are billed separately.",
      cta: "Discuss maintenance",
    },
    disclaimer: "Prices shown are starting prices and may vary depending on project complexity.",
  },
  process: {
    eyebrow: "Our Process",
    title: "A calm, predictable path from idea to launch.",
    labels: {
      whatWeDo: "What we do",
      whatClientGets: "What you get",
      whyItMatters: "Why it matters",
      duration: "Estimated duration",
    },
    steps: [
      {
        title: "Discovery",
        duration: "2-3 days",
        whatWeDo:
          "We dig into your business, audience, and goals, then map the competitive landscape and opportunities.",
        whatClientGets: "A clear brief with measurable goals and a defined project plan.",
        whyItMatters:
          "Without a solid base of information, every design or tech decision becomes a guess, not a strategy.",
      },
      {
        title: "Planning",
        duration: "2 days",
        whatWeDo:
          "We structure the site architecture, map user flows, and settle on the right tech stack.",
        whatClientGets:
          "An approved sitemap and technical plan, before a single line of code is written.",
        whyItMatters: "Planning ahead removes costly rebuilds later in the project.",
      },
      {
        title: "Design",
        duration: "3-5 days",
        whatWeDo:
          "We create wireframes and high-fidelity designs aligned with your brand identity.",
        whatClientGets: "An interactive prototype you can see and test before development starts.",
        whyItMatters: "Fixing a design takes minutes; fixing an already-built site takes days.",
      },
      {
        title: "Development",
        duration: "1-2 weeks",
        whatWeDo:
          "We turn the approved design into clean, fast, responsive code, tested across devices.",
        whatClientGets: "A working site on a staging environment you can access in real time.",
        whyItMatters:
          "This is where the product comes to life — code quality decides long-term speed and stability.",
      },
      {
        title: "Launch",
        duration: "1-2 days",
        whatWeDo: "We set up hosting, verify security and performance, then publish the site live.",
        whatClientGets: "A live, optimized, monitored site, plus usage documentation.",
        whyItMatters: "A well-prepared launch means zero downtime and a flawless first impression.",
      },
      {
        title: "Maintenance",
        duration: "Ongoing",
        whatWeDo:
          "We keep the site running smoothly, apply security updates, and quickly fix any technical issue that comes up.",
        whatClientGets:
          "A consistently maintained site, with direct support whenever something needs attention.",
        whyItMatters:
          "A great site doesn't end at launch — it needs ongoing care to stay fast, secure, and reliable.",
      },
    ],
  },
  showcase: {
    eyebrow: "Templates",
    title: "Premium products, ready to explore.",
    description: "Explore website examples created for restaurants, clinics, construction companies and other businesses. Every template can be customized to match your brand and goals.",
    previewAlt: "{title} preview",
    liveLabel: "Live",
    liveDemoLabel: "Live Demo",
    requestLabel: "Request this design",
    featuredLabel: "Featured project",
    items: [
      {
        title: "Restaurant Website Template",
        tag: "Hospitality",
        description:
          "An elegant site for restaurants, with a digital menu, bookings, and a photo gallery.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Dental Clinic Template",
        tag: "Healthcare",
        description: "Modern website for dental practices with booking, SEO and CMS.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Construction Company Template",
        tag: "Industrial",
        description:
          "A solid presence for construction companies, with a project portfolio and fast quotes.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Product Presentation Template",
        tag: "E-commerce",
        description:
          "Product presentation landing page, with photo gallery, product anatomy and model collection.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
      {
        title: "Product Showcase Template",
        tag: "E-commerce",
        description:
          "Cinematic product showcase for a sneaker collection, with horizontal storytelling and luxury motion design.",
        stack: ["React", "Next.js", "CMS"],
        isLive: true,
      },
    ],
  },
  why: {
    eyebrow: "Why FlowPilot",
    title: "A partner obsessed with the details.",
    intro: "We build modern, fast and optimized websites for businesses that want a professional online presence.",
    items: [
      {
        label: "Performance",
        title: "Fast Delivery",
        desc: "Launch in weeks, not quarters — without cutting corners on speed.",
      },
      {
        label: "Design",
        title: "Premium Design",
        desc: "Refined, considered, on-brand — crafted with intent, not decorated.",
      },
      {
        label: "Responsive",
        title: "Mobile First",
        desc: "Flawless on desktop, tablet, and mobile, from day one.",
      },
      {
        label: "SEO",
        title: "Search Optimized",
        desc: "Built so search engines — and your customers — find you first.",
      },
      {
        label: "Artificial Intelligence",
        title: "AI Ready",
        desc: "Architected today for tomorrow's capabilities.",
      },
      {
        label: "Scalability",
        title: "Scalable Solutions",
        desc: "Grow from a website to a digital ecosystem, without a rebuild.",
      },
    ],
    proof: {
      loadTimeLabel: "Load time",
      loadTimeValue: "0.8s",
      scoreLabel: "Performance",
      seoLabel: "SEO",
      accessibilityLabel: "Accessibility",
      searchQuery: "dental clinic Bucharest",
      aiPrompt: "Create a homepage section",
      generatingLabel: "Generating…",
      architectureLayers: ["Website", "CMS", "Analytics", "AI"],
    },
  },
  comingSoon: {
    badge: "In Development",
    title: "Beyond websites.",
    titleHighlight: "We're building what's next.",
    description:
      "FlowPilot Labs is where we explore what comes after websites — AI assistants, automation, and new digital products. Nothing here has shipped yet; we're building in the open.",
    emailPlaceholder: "you@company.com",
    submit: "Keep me posted",
    submitting: "Joining...",
    disclaimer: "Occasional updates · No spam · Unsubscribe anytime",
    toastSuccess: "You're on the list — we'll let you know when there's news.",
    toastError: "Something went wrong. Please try again.",
    experiments: [
      {
        label: "AI Assistant",
        status: "Research",
        description: "A conversational assistant that takes on repetitive email and document work.",
      },
      {
        label: "No-code Automation",
        status: "Prototype",
        description: "Workflows that connect your existing tools, no code required.",
      },
      {
        label: "Document Intelligence",
        status: "Exploring",
        description: "Automatic extraction and organization of information from documents.",
      },
      {
        label: "Analytics Copilot",
        status: "Concept",
        description: "Automatically generated reports and insights from business data.",
      },
    ],
  },
  about: {
    eyebrow: "ABOUT US",
    title: "We are not a big agency. We are three people who build every project with care.",
    paragraph1:
      "FlowPilot started from a simple observation: too many small business websites look like recycled templates, without personality and without someone truly invested in the outcome.",
    paragraph2:
      "We are a team of students passionate about technology, design, and digital products. We combine technical expertise and creativity to build websites that do not just look good, but help businesses grow.",
    paragraph3:
      "At FlowPilot, every project receives personal attention: we communicate directly with clients, understand their goals, and build solutions tailored to their real needs.",
    differentiators: [
      "You work directly with the people building your product, not through intermediaries.",
      "Every project is carefully planned and developed from the first conversation to launch.",
      "We combine software development, design, and client communication to create a complete experience.",
    ],
    foundersLabel: "TEAM",
    founders: [
      { initials: "ȘD", name: "Ștefan Dima", role: "Frontend development & design" },
      { initials: "AP", name: "Alexandru Pirvu", role: "Backend development & systems" },
      { initials: "MB", name: "Morar Bogdan", role: "Project management & marketing" },
    ],
    today: "Today",
    todayText: "we build premium websites, one project at a time.",
    tomorrow: "Tomorrow",
    tomorrowText: "we want to build much more than websites.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something great together.",
    description: "Tell us about your project. We reply within 24 hours with a tailored proposal.",
    trustIndicators: [
      "Direct communication with us, no middlemen.",
      "A transparent process, from the first sketch to launch.",
      "Websites built for your business, not repackaged templates.",
    ],
    name: "Name",
    company: "Company",
    optional: "optional",
    email: "Email",
    message: "Message",
    submit: "Send message",
    submitting: "Sending...",
    toastSuccess: "Message sent — we'll reply within 24 hours.",
    toastError: "Something went wrong. Please try again.",
  },
  footer: {
    statement: "A small studio, run by two people who build every site by hand.",
    cta: "Start a project",
    navLabel: "Navigate",
    connectLabel: "Connect",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    privacyPolicy: "Privacy Policy",
    cookiesPolicy: "Cookie Policy",
  },
  consent: {
    prefix: "I agree to the",
    linkText: "Privacy Policy",
  },
  privacy: {
    metaTitle: "Privacy Policy — FlowPilot",
    metaDescription: "How we collect, use, and protect your data on FlowPilot.",
    title: "Privacy Policy",
    lastUpdated: "Last updated: August 2026",
    intro:
      "This Privacy Policy explains what personal data we collect through this site, why we use it, how long we keep it, and what rights you have over it.",
    sections: [
      {
        heading: "What data we collect",
        body: "Depending on the form you use on the site, we may collect: through the contact form — your name, your company (if you choose to provide it), your email address, and the content of your message; through the waitlist form — only your email address. To protect our forms from spam and abuse, we may also temporarily process the IP address associated with a submission, along with the date and time of the request. We do not ask for data through our forms that isn't needed for the purposes described below.",
      },
      {
        heading: "Why we use this data",
        body: "We use the data we collect to respond to messages and requests sent through the contact form, to reach out to people on the waitlist when the service or feature they signed up for becomes available, to prevent spam, abuse, or automated and excessive form submissions, and to keep the site secure and functioning properly. We do not sell personal data and do not use it for advertising or profiling beyond the purposes described in this policy.",
      },
      {
        heading: "IP address and spam prevention",
        body: "To protect our forms from spam, abuse, and automated submissions, we may temporarily process the IP address associated with a submission, along with the date and time of the request. This information is used solely to apply submission limits and to detect and prevent abuse of our forms. It is kept for a maximum of 48 hours, after which it is automatically deleted. We do not use this information for advertising, profiling, or marketing.",
      },
      {
        heading: "Legal basis for processing",
        body: "We process personal data in accordance with applicable data protection law, including the General Data Protection Regulation (GDPR). Depending on the situation, processing is based on the steps needed to respond to a request you've made, our legitimate interest in keeping the site secure and preventing spam, fraud, and abuse, or your consent, where consent is required for a specific processing activity.",
      },
      {
        heading: "How long we keep your data",
        body: "Data submitted through the contact form is kept for as long as needed to handle and resolve your request, and, where appropriate, for a reasonable period afterward for record-keeping purposes. Email addresses on the waitlist are kept until the relevant service or feature launches, or until you request that your address be deleted. Data used for spam prevention, including IP address and submission time, is kept for a maximum of 48 hours and then automatically deleted. We may keep certain data for longer periods where necessary to comply with a legal obligation or to establish, exercise, or defend legal claims.",
      },
      {
        heading: "Providers and third-party services",
        body: "To run the site and process data submitted through our forms, we use services provided by third parties, including Supabase (storing and managing data submitted through forms), Resend (sending emails generated by form submissions), and Vercel (hosting the site). These providers may process data on our behalf only to the extent necessary to provide their services. We do not allow them to use data from our forms for their own marketing purposes.",
      },
      {
        heading: "Who has access to your data",
        body: "Access to data is limited to people who need it to administer the site, manage requests, and provide the related services. We take reasonable measures to protect data against unauthorized access, loss, alteration, or disclosure.",
      },
      {
        heading: "Your rights",
        body: "Under GDPR, you have the right to request access to your personal data, rectification of inaccurate data, erasure of your data, restriction of processing, and to object to certain processing, the right to data portability where applicable, and the right to withdraw your consent for processing based on consent. You can contact us at any time to exercise these rights, and you also have the right to lodge a complaint with the competent data protection authority.",
      },
      {
        heading: "Cookies and similar technologies",
        body: "This site may use cookies or similar technologies necessary for the site to function and stay secure. If we use analytics, advertising, or other technologies that require your consent, we will provide the necessary information and choices in accordance with applicable law.",
      },
      {
        heading: "Changes to this policy",
        body: "We may update this Privacy Policy when we change how the site works, the services we use, or how we process data. The current version will always be available on this page, along with the date it was last updated.",
      },
      {
        heading: "Contact",
        body: "For questions about this Privacy Policy or to exercise your data protection rights, you can reach us at tflowpilot@gmail.com.",
      },
    ],
    backHome: "Back to homepage",
  },
  cookies: {
    metaTitle: "Cookie Policy — FlowPilot",
    metaDescription: "Information about how FlowPilot uses cookies on this site.",
    title: "Cookie Policy",
    lastUpdated: "Last updated: August 19, 2026",
    sections: [
      {
        heading: "1. What are cookies?",
        body: "Cookies are small files stored on a user's device when they visit a website. They can serve different purposes, such as keeping a site technically functional, remembering preferences, or gathering information about how the site is used.",
      },
      {
        heading: "2. How cookies are used on flowpilot.ro",
        body: "FlowPilot, available at https://flowpilot.ro, does not currently use non-essential cookies for analytics, advertising, marketing, or tracking user behavior. As of our most recent review, the site does not set any first-party cookies for these purposes. The site may rely on technical mechanisms needed to deliver and secure its web services. FlowPilot does not use these to track user behavior for marketing or advertising purposes.",
      },
      {
        heading: "3. Analytics and statistics cookies",
        body: "FlowPilot does not currently use any web analytics service that would place analytics or statistics cookies on a user's device. If we introduce services such as Google Analytics or similar tools in the future, they will be configured and used in line with applicable law, and this Cookie Policy will be updated accordingly.",
      },
      {
        heading: "4. Marketing and advertising cookies",
        body: "FlowPilot does not currently use cookies for behavioral advertising, remarketing, or tracking users for marketing purposes. Should such technologies be introduced in the future, they will not be activated until the user's consent has been obtained, wherever consent is required under applicable law.",
      },
      {
        heading: "5. Third-party cookies",
        body: "The site may, in the future, rely on services provided by third parties that involve storing or accessing information on a user's device. If such services are introduced, FlowPilot will update this Cookie Policy to inform users about: the service provider; the purpose of use; the type of cookie or technology involved; the retention period; any recipients or third parties who may have access to the information; and how users can give or withdraw their consent, where required.",
      },
      {
        heading: "6. Consent for cookies",
        body: "Because FlowPilot does not currently use non-essential cookies that require consent, no consent request is shown when the site is accessed. If cookies or similar technologies requiring consent are introduced in the future, they will only be activated after valid consent has been obtained, wherever applicable law requires it. Users will always be able to make this choice freely and with full information.",
      },
      {
        heading: "7. Changes to this Cookie Policy",
        body: "FlowPilot may update this Cookie Policy whenever the site, the technologies it uses, or applicable law change. The updated version will be published on this page, along with the date it was last revised.",
      },
      {
        heading: "8. Relationship to the Privacy Policy",
        body: "For information about how FlowPilot processes personal data, including data submitted through the contact form, please refer to the Privacy Policy available on the site.",
      },
      {
        heading: "9. Contact",
        body: "If you have any questions about our use of cookies or about the protection of personal data, you can reach us through the contact details available on the FlowPilot website. FlowPilot — Website: https://flowpilot.ro",
      },
    ],
    backHome: "Back to homepage",
  },
  forms: {
    validation: {
      nameMin: "Name must be at least 2 characters",
      emailInvalid: "Enter a valid email address",
      messageMin: "Message must be at least 10 characters",
      consentRequired: "You must accept the Privacy Policy",
    },
  },
  errors: {
    notFoundTitle: "Page not found",
    notFoundDescription: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    pageErrorTitle: "This page didn't load",
    pageErrorDescription:
      "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
  },
};
