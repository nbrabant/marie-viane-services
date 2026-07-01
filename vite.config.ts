// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Deployment target (OVH shared hosting — static files only, no Node runtime,
  // see .github/workflows/ci.yml). Use Nitro's dedicated `static` preset so the
  // build prerenders every route straight to `.output/public/*.html` with no
  // server bundle at all. (We previously mixed this with the node-server
  // preset, which silently suppressed the prerendered output — and also with
  // TanStack Start's own `prerender` plugin option, which hardcodes an
  // expectation of `dist/server/server.js` and breaks with ERR_MODULE_NOT_FOUND
  // under a custom preset — tanstack/router#5939.)
  // NOTE: inside the Lovable sandbox this option is ignored — the preview always
  // builds with the cloudflare-module preset into `dist/`. It only takes effect
  // in CI (non-sandbox), which is exactly where deployment happens.
  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml"],
    },
  },
});
