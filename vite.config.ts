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
  // see .github/workflows/ci.yml) needs the Node server preset so the build
  // emits `.output/server/index.mjs` with the client assets bundled under
  // `.output/public`. We don't ship the server itself — CI runs it briefly to
  // snapshot the rendered HTML into `.output/public/` (see ci.yml's "Prerender
  // pages" step) rather than deploying it. This sidesteps upstream bugs in
  // both TanStack Start's `prerender` plugin option (hardcodes an expectation
  // of `dist/server/server.js`, breaks under a custom preset — tanstack/router#5939)
  // and Nitro's `static` preset (silently produced no HTML for this project).
  // NOTE: inside the Lovable sandbox this option is ignored — the preview always
  // builds with the cloudflare-module preset into `dist/`. It only takes effect
  // in CI (non-sandbox), which is exactly where deployment happens.
  nitro: {
    preset: "node-server",
  },
});
