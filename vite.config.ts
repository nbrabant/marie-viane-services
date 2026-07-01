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
  // see .github/workflows/ci.yml). Use Nitro's own static-site generation
  // (`static` + `prerender`) rather than TanStack Start's `prerender` plugin
  // option — that one boots a "preview server" that hardcodes an expectation
  // of `dist/server/server.js`, which doesn't exist under the node-server
  // preset (breaks with ERR_MODULE_NOT_FOUND — tanstack/router#5939).
  // The node-server preset still produces a `.output/server` build, but it's
  // unused — deploy only ships the prerendered `.output/public/` output.
  // NOTE: inside the Lovable sandbox this option is ignored — the preview always
  // builds with the cloudflare-module preset into `dist/`. It only takes effect
  // in CI (non-sandbox), which is exactly where deployment happens.
  nitro: {
    preset: "node-server",
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml"],
    },
  },
});
