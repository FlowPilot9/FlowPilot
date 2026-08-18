import { lazy, Suspense } from "react";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Trust } from "@/components/landing/Trust";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Showcase } from "@/components/landing/Showcase";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";
import { Preloader } from "@/components/landing/Preloader";

// Splits react-hook-form, @hookform/resolvers/zod and the Supabase client
// into their own chunk, since Contact is the last section on the page and
// none of that code is needed for the initial render.
const Contact = lazy(() =>
  import("@/components/landing/Contact").then((m) => ({ default: m.Contact })),
);

// Why is the largest single section (~600 lines of illustration code) and
// sits below the fold, so it's worth its own chunk too — even though it
// doesn't pull in any new heavy dependency the way Contact does.
const Why = lazy(() => import("@/components/landing/Why").then((m) => ({ default: m.Why })));

export function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Preloader />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140vh] overflow-hidden"
      >
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
      <Process />
      <Services />
      <Showcase />
      <Suspense fallback={<div className="py-24 md:py-32" aria-hidden />}>
        <Why />
      </Suspense>
      <About />
      <Suspense fallback={<div className="py-24 md:py-32" aria-hidden />}>
        <Contact />
      </Suspense>
      <Footer />
    </main>
  );
}
