import { Linkedin, Github, Mail } from "lucide-react";
import { Logo } from "@/components/landing/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#process" className="hover:text-foreground">Process</a>
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#future" className="hover:text-foreground">Coming Soon</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Github className="h-4 w-4" />
          </a>
          <a href="mailto:hello@flowpilot.studio" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} FlowPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
