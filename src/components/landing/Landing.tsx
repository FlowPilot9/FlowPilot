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
    <main className="min-h-screen bg-background text-foreground">
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
