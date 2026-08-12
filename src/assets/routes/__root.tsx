import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { DEFAULT_LOCALE, getLocaleFromPathname, getMetaTags } from "@/i18n";
import { PageReadyProvider } from "@/hooks/use-page-ready";

// Locale-agnostic fallback only. In practice every real 404/error is caught
// inside routes/{-$locale}.tsx, which knows the locale and renders a
// translated version. This one only fires if something goes wrong before the
// locale layout even mounts, so it stays deliberately simple and bilingual.
function RootNotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Pagina nu a fost găsită. / Page not found.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Acasă / Home
          </a>
        </div>
      </div>
    </div>
  );
}

function RootErrorComponent({ error }: { error: Error }) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          A apărut o eroare. / Something went wrong.
        </h1>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Acasă / Home
          </a>
        </div>
      </div>
    </div>
  );
}

// Ultimate fallback title only — the real per-locale title/description/og
// tags come from routes/{-$locale}/index.tsx and override these.
const fallbackMeta = getMetaTags(DEFAULT_LOCALE);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: fallbackMeta.title },
      { name: "author", content: "FlowPilot" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: RootNotFoundComponent,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // The locale lives in the URL, so the shell reads it straight from the
  // current path rather than from any client-side state — this stays
  // correct during SSR, on the very first paint, and on every navigation.
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = getLocaleFromPathname(pathname);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Blocking, runs before paint: sets the `dark` class from the
            stored preference (or OS setting) so there's no flash of the
            wrong theme on load. Plain <script> in <head>, not a head()
            config entry — guaranteed to execute regardless of the exact
            TanStack Start head-scripts API surface. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("flowpilot-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();',
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PageReadyProvider>
          <Outlet />
          <Toaster position="bottom-right" />
        </PageReadyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
