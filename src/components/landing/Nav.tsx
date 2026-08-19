import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { useTranslation } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_IDS = ["process", "pricing", "work", "future", "about"];

export function Nav() {
  const { t, locale } = useTranslation();
  const homePath = localePath(locale, "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding active-section indicator: whichever tracked section is most
  // visible near the top of the viewport gets the pill. IntersectionObserver
  // rather than a scroll-position calculation, so it stays correct
  // regardless of how tall any given section is.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveHref(`#${mostVisible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: `${homePath}#process`, label: t.nav.process },
    { href: `${homePath}#pricing`, label: t.nav.services },
    { href: `${homePath}#work`, label: t.nav.work },
    { href: `${homePath}#about`, label: t.nav.about },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <div
          className={`relative flex items-center justify-between rounded-2xl border px-5 py-3 transition-all ${
            scrolled
              ? "glass-panel border-transparent"
              : "border-transparent bg-transparent shadow-none"
          }`}
        >
          <Logo />
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 min-[1200px]:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {activeHref === l.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 min-[1200px]:flex">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href={`${homePath}#contact`}
              className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium"
            >
              {t.common.getInTouch} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="flex items-center gap-2 min-[1200px]:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="rounded-lg border border-border p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label={t.common.menu}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="glass-panel mt-2 overflow-hidden rounded-2xl min-[1200px]:hidden"
            >
              <div className="p-3">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-strong"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href={`${homePath}#contact`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: links.length * 0.04, ease: EASE }}
                  className="btn-primary mt-2 block rounded-xl px-4 py-2 text-center text-sm font-medium"
                >
                  {t.common.getInTouch}
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}