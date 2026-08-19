import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Plain Vite config (no external build-config package). Equivalent to what
// this project used to get from @lovable.dev/vite-tanstack-config, minus the
// Lovable-editor-only bits (sandbox detection, preview asset proxy, HMR
// gate) which only matter inside the Lovable web editor and are dead code
// anywhere else this runs (local dev, Vercel).
//
// Note on `nitro()`: no preset is hardcoded here, so it auto-detects the
// deploy target from the platform's own env vars at build time (Vercel sets
// these automatically). The old config forced a `cloudflare-module` default,
// which no longer matches where this actually deploys.
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define: envDefine,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
      ignoreOutdatedRequests: true,
    },
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        server: { entry: "server" },
      }),
      // Nitro only matters for `vite build`, not `vite dev`.
      ...(command === "build" ? [nitro()] : []),
      viteReact(),
    ],
  };
});
