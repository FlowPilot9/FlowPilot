import { Linkedin, Github, Mail } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { useTranslation } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground">{t.nav.services}</a>
          <a href="#process" className="hover:text-foreground">{t.nav.process}</a>
          <a href="#work" className="hover:text-foreground">{t.nav.work}</a>
          <a href="#future" className="hover:text-foreground">{t.nav.comingSoon}</a>
          <a href="#contact" className="hover:text-foreground">{t.common.contact}</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" aria-label={t.footer.linkedin} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" aria-label={t.footer.github} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Github className="h-4 w-4" />
          </a>
          <a href="mailto:hello@flowpilot.studio" aria-label={t.footer.email} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1500px] px-4 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t.common.brand}. {t.common.allRightsReserved}
        </div>
      </div>
    </footer>
  );
}
