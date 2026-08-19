export type ErrorContext = Record<string, unknown>;

/**
 * Central place to report unexpected render/loader errors caught by route
 * error boundaries.
 *
 * This used to forward to `window.__lovableEvents`, a hook that only exists
 * inside the Lovable web editor — so in production (Vercel, or any real
 * deploy) it was silently a no-op and errors went unreported. This logs to
 * the console instead, and is the single place to wire in a real error
 * monitoring service (e.g. Sentry) later without touching call sites.
 */
export function reportError(error: unknown, context: ErrorContext = {}) {
  if (typeof window === "undefined") return;

  // Loaders and server fns commonly throw a raw Response; String(it) is the
  // opaque "[object Response]", so pull out the status and URL instead.
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  console.error("[error-boundary]", message, {
    route: window.location.pathname,
    ...context,
    stack: error instanceof Error ? error.stack : undefined,
  });
}
