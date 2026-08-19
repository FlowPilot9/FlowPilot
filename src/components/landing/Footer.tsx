import { Linkedin, Github, Mail, ArrowRight } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { useTranslation } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n";

const socialButtonClass =
  "grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-soft";

// Level-1 structural chrome (design system: same tier as Nav) — restrained
// on motion and color on purpose, but organized as a real closing statement
// rather than a single row of links, since this is the last thing a visitor
// sees.
export function Footer() {
  const { t, locale } = useTranslation();
  const homePath = localePath(locale, "/");

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-strong dark:bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-primary-glow)_18%,transparent),transparent)]" />
      </div>

      <div className="mx-auto max-w-[1680px] px-6 py-16 sm:px-10 lg:px-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
              {t.footer.statement}
            </p>
            <a
              href={`${homePath}#contact`}
              className="group mt-5 inline-flex items-center gap-2 text-base font-medium text-primary"
            >
              {t.footer.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t.footer.navLabel}
            </span>
            <nav className="mt-5 flex flex-col gap-3.5 text-base text-muted-foreground">
              <a
                href={`${homePath}#pricing`}
                className="w-fit transition-colors hover:text-foreground"
              >
                {t.nav.services}
              </a>
              <a
                href={`${homePath}#process`}
                className="w-fit transition-colors hover:text-foreground"
              >
                {t.nav.process}
              </a>
              <a
                href={`${homePath}#work`}
                className="w-fit transition-colors hover:text-foreground"
              >
                {t.nav.work}
              </a>
              <a
                href={`${homePath}#about`}
                className="w-fit transition-colors hover:text-foreground"
              >
                {t.nav.about}
              </a>
              <a
                href={`${homePath}#contact`}
                className="w-fit transition-colors hover:text-foreground"
              >
                {t.common.contact}
              </a>
            </nav>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t.footer.connectLabel}
            </span>
            <div className="mt-4 flex items-center gap-2">
              <a href="#" aria-label={t.footer.linkedin} className={socialButtonClass}>
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
              <a href="#" aria-label={t.footer.github} className={socialButtonClass}>
                <Github className="h-[18px] w-[18px]" />
              </a>
              <a
                href="mailto:tflowpilot@gmail.com"
                aria-label={t.footer.email}
                className={socialButtonClass}
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </div>
            <a
              href={localePath(locale, "/privacy")}
              className="mt-6 block w-fit text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.footer.privacyPolicy}
            </a>
            <a
              href={localePath(locale, "/cookies")}
              className="mt-3 block w-fit text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.footer.cookiesPolicy}
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t.common.brand}. {t.common.allRightsReserved}
        </div>
      </div>
    </footer>
  );
}
