import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";
import { useTranslation } from "@/i18n/I18nProvider";

export function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#process", label: t.nav.process },
    { href: "#work", label: t.nav.work },
    { href: "#future", label: t.nav.comingSoon },
    { href: "#about", label: t.nav.about },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all ${
            scrolled
              ? "glass-panel border-transparent"
              : "border-transparent bg-transparent shadow-none"
          }`}
        >
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium"
            >
              {t.common.getInTouch} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="rounded-lg border border-border p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label={t.common.menu}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="glass-panel mt-2 rounded-2xl p-3 md:hidden animate-fade-up">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-strong"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 block rounded-xl px-4 py-2 text-center text-sm font-medium"
            >
              {t.common.getInTouch}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
