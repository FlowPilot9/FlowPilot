import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Trust } from "@/components/landing/Trust";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Showcase } from "@/components/landing/Showcase";
import { Why } from "@/components/landing/Why";
import { ComingSoon } from "@/components/landing/ComingSoon";
import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* The Hero's atmosphere doesn't just stop — it fades out gradually
          over roughly the first section and a half, so scrolling past the
          Hero feels like leaving the same world rather than hitting a hard
          cut. `absolute` (not `fixed`): it only exists for this height at
          the top of the document, then is simply gone for the rest of the
          page. Cross-fades with the theme the same way AtmosphereScene
          does — pure `dark:` opacity, no JS. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140vh] overflow-hidden">
        <div
          className="absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out dark:opacity-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.88 0.08 60 / 0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out dark:opacity-100"
          style={{
            background: "linear-gradient(180deg, oklch(0.28 0.07 264 / 0.18), transparent 70%)",
          }}
        />
      </div>

      <Nav />
      <Hero />
      <Trust />
      <Services />
      <Process />
      <Showcase />
      <Why />
      <ComingSoon />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
