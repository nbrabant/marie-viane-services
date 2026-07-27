# Roadmap — marie-viane-services

Improvement roadmap for the Marie Viane website. Scope is constrained by the project's
architecture: a **static single-page site** (TanStack Start, prerendered to plain HTML and
snapshotted via curl in CI — see `292ad0c`, `vite.config.ts`) deployed to **OVH shared hosting
with no Node runtime and no database**. Every item below must work as static files + client-side
JS only. Nothing here should require a server or a DB.

Status legend: `[ ]` not started · `[~]` partially in place · `[x]` done

Sections below are ordered by owner-assigned priority (1 = most priority, 5 = least). This
replaces the earlier phase grouping — priority is now the primary axis; effort/dependencies are
still noted per item.

A few items are **off-repo deliverables** (print/graphic design, email client config) rather than
code changes to this site. They're tracked here because they share dependencies with the website
(business info, domain, logo) and because one of them — the QR code — does have a small on-repo
hosting component. They're marked "Off-repo" explicitly so it's clear no PR against this codebase
closes them out on its own.

---

## Blocked on business owner (content, not code)

These need real information from Marie before the related code can be finalized. Flagging them
up front so they don't stall a priority tier silently.

- [x] Real SIRET number (`src/routes/index.tsx` mentions légales section — currently "à compléter")
- [x] Real business address (same section — currently "à compléter")
- [x] Real phone number and email (currently placeholders: `0750653753`, `r-rems@hotmail.fr`)
- [ ] Typeform form ID (`TYPEFORM_URL` in `src/routes/index.tsx` is `.../to/your-form-id`)
- [ ] Google Analytics property (GA4 Measurement ID)
- [x] Final production domain name: `https://www.mv-services.pro` (set in `src/lib/site.ts`, used by
      `robots.txt`, `sitemap.xml`, canonical/OG URLs, JSON-LD)
- [ ] 3–10 real customer testimonials (text, first name, optionally service type) for the REX section
- [ ] Logo / visual identity assets — not currently in the repo (only `src/assets/hero.jpg`
      exists); needed for the email signature and print materials below, and could also improve
      `og:image`/favicon on the site itself
- [x] Confirmation of eligibility for the "crédit d'impôt services à la personne" (50% tax
      credit): Marie holds both the simple SAP déclaration and a Conseil Départemental
      autorisation (covers garde de nuit, aide à la toilette, accompagnement of dependent
      persons). "Nettoyage de locaux professionnels" stays excluded (professional premises, not
      a particulier's domicile); "fin de chantier" is conditional on the client's own residence.
      Implemented as a popin (see 1.d note below) in `index.tsx` — SAP declaration/authorization
      number intentionally not displayed per owner's choice.

---

## Priority 1

### 1.a Typeform link integration
- [ ] Replace placeholder `TYPEFORM_URL` in `src/routes/index.tsx` with the real form URL
- [ ] Decide: keep as `target="_blank"` link (current behavior, 4 CTAs already wired) vs. embed
      inline (Typeform embed SDK) — embedding keeps users on-site (better for analytics/SEO
      dwell time) but adds a third-party script; current link-out is simpler and already coded
- [ ] Wire GA event tracking on click (see Priority 2 — Google Analytics)

**Effort:** S (assuming link-out) / M (if embedding) · **Depends on:** real Typeform ID

### 1.b Business information integration
- [x] Fill real SIRET + address into the "Mentions légales" section (`index.tsx`, `#mentions-legales`)
- [ ] Extend the `LocalBusiness` JSON-LD (`index.tsx` head `scripts`) with `address`
      (`PostalAddress`), and `openingHoursSpecification` — currently only has
      `name`/`description`/`image`/`email`/`telephone`/`priceRange`/`areaServed`/`makesOffer`.
      A complete address is what unlocks Google Business/local-pack rich results.
- [ ] Update hosting disclosure ("hébergé par Lovable... sur demande") to reflect the actual OVH
      hosting now that deployment target changed (see recent commits `42be3e6`…`292ad0c`)
- [ ] Display the "Mentions légales" block in a popin/modal instead of directly inline in the page
      flow (`index.tsx`, `#mentions-legales` section) — the `Dialog` primitive already exists at
      `src/components/ui/dialog.tsx`, so this is wiring, not a new dependency. Trigger from a
      footer link/button; keep an anchor-accessible fallback (e.g. still route `#mentions-legales`
      to open the dialog) so existing/shared links keep working, and make sure the content still
      renders in the curl-snapshotted static HTML (SEO/legal-compliance text shouldn't become
      JS-only, ties to the same pre-hydration concern as 2.c)

**Effort:** S (once data is provided) · **Depends on:** SIRET, address

> Note: Priority 2's phone/email obfuscation depends on the real contact info landing here first
> — sequencing still works since this tier (1) runs before tier 2.

### 1.c Natural (organic) SEO refinement
- [ ] Add a FAQ section (`#faq`) with `FAQPage` JSON-LD — good fit for a services site, helps
      long-tail queries ("aide à domicile [ville]", "garde de nuit tarif", etc.)
- [ ] Add local/geo keywords once the service area is confirmed (currently `areaServed: "France"`
      in JSON-LD is too broad for local SEO — a home-care business almost certainly serves a
      specific city/region)
- [ ] Audit heading hierarchy (currently one `h1` in hero + `h2` per section — looks correct,
      just re-verify after adding the REX/FAQ sections)
- [ ] Image optimization: `src/assets/hero.jpg` — check dimensions/compression, consider
      `srcset`/AVIF-WebP if it's not already reasonably sized
- [ ] Internal anchors already exist (`#services`, `#apropos`, `#contact`) — make sure new
      sections (`#avis`, `#faq`) are added to the header nav for consistency
- [ ] Verify canonical/OG/Twitter tags once the real domain is set (`og:url: "/"` in `index.tsx`
      is relative — confirm TanStack Start resolves this correctly against the final domain, or
      make it absolute)

**Effort:** M, ongoing · **Depends on:** domain, service area

### 1.d AEO/GEO optimization — User Story

> **As** Marie (business owner), **I want** the site's content, metadata and crawl access
> optimized for AI answer engines and generative search assistants (ChatGPT, Perplexity, Google
> AI Overviews/Gemini, Copilot, Claude) **so that** when a prospective client asks one of these
> tools something like "aide à domicile à [ville]", "tarif garde de nuit à domicile", or "aide à
> domicile crédit d'impôt", the assistant can find, correctly quote, and recommend Marie Viane's
> services instead of a competitor or generic content.

Distinct from 1.c: AEO/GEO targets machine *extraction and citation* by generative models, not
just search ranking. Items below build on 1.c's FAQ/JSON-LD work rather than repeating it.

Acceptance criteria:
- [ ] Confirm AI crawlers aren't accidentally blocked: audit `public/robots.txt` for GPTBot,
      ClaudeBot/anthropic-ai, PerplexityBot, Google-Extended, CCBot — the current
      `User-agent: * / Allow: /` already permits them, but add the `Sitemap:` line (ties to 3.a)
      and make sure no future `Disallow` rule regresses this
- [ ] Verify the curl-snapshotted static HTML (commit `292ad0c`) contains the full page text
      pre-hydration — most AEO crawlers don't execute JS, so any content that only renders after
      hydration (services, FAQ, testimonials) would be invisible to them
- [ ] Rewrite each service's description (the `services` array, `index.tsx`) "answer-first": one
      direct, self-contained sentence stating what the service is and who it's for, before any
      marketing language — generative engines quote the first extractable sentence far more often
      than promotional copy
- [ ] When building the FAQ section from 1.c, phrase questions the way users actually type them
      into an AI assistant (e.g. "Qu'est-ce que l'aide à domicile ?", "Quel est le tarif d'une
      garde de nuit ?", "Comment bénéficier du crédit d'impôt services à la personne ?") — question
      phrasing matters more for AEO than for classic keyword SEO
- [x] Add content for the 50% "crédit d'impôt services à la personne" tax credit: a compact
      teaser callout + "Voir les conditions" button was added at the end of the `#services`
      section (`index.tsx`), opening a `Dialog` popin with general conditions and a per-service
      eligibility breakdown.
- [x] AEO/GEO fix for the popin above: first attempt added a `forceMount` prop to
      `src/components/ui/dialog.tsx`'s `DialogContent` that skipped `Dialog.Portal` so the
      content would render inline in the SSR HTML instead of only client-side. **That approach
      was reverted** — `dialog.tsx` is back to the original, unmodified shadcn primitive. Reason:
      Radix's `DialogOverlayImpl` unconditionally wraps itself in `RemoveScroll` (from
      `react-remove-scroll`) as soon as it mounts; forcing the Overlay to always mount (even
      while visually "closed") locked page scroll permanently, site-wide. Fixed instead with a
      plain `sr-only` duplicate: `index.tsx` now has a `TaxCreditDetails` component rendering the
      shared conditions/breakdown data, used twice — once inside the real `DialogContent` (normal
      Radix behavior, no changes) and once inside a `<div className="sr-only">` sibling that's
      always part of the normal render tree (no Portal, no Presence gating), so it's present in
      the SSR/curl-snapshotted HTML unconditionally. `sr-only` is the same visually-hidden
      technique already used elsewhere in `dialog.tsx` (the Close button's "Close" label) —
      standard, non-cloaking, and doesn't touch Radix's scroll-lock/focus-trap internals at all.
- [ ] Strengthen E-E-A-T signals in "À propos": years of experience, diplomas/certifications,
      agrément or déclaration SAP number (**blocked on owner**, ties to 1.b) — generative engines
      weight authoritativeness/expertise signals when deciding what to cite
- [ ] Complete the `LocalBusiness` JSON-LD (builds on 1.b): add `address`, a real
      city/department in `areaServed` (not `"France"`), `sameAs` (Google Business Profile / social
      links once they exist), and `aggregateRating` only once real reviews exist (5.a) — never
      fabricate ratings
- [x] Add a root-level `public/llms.txt` (emerging convention some LLM tools/plugins read): a
      plain-language summary of what the business does, the service list, service area, contact,
      and the tax-credit note — cheap to add, no downside. Done, but still carries the same
      phone/email placeholders as the rest of the site — update alongside 1.b once Marie provides
      real contact info, and add the tax-credit note once eligibility is confirmed (blocked on
      owner)
- [ ] Ensure NAP (Name/Address/Phone) consistency across visible content, JSON-LD, and `llms.txt`
      once real business data lands (ties to 1.b) — inconsistent NAP undermines trust/citation
      signals for both local SEO and generative engines

**Effort:** M, ongoing · **Depends on:** 1.b (real address/SIRET), 1.c (FAQ section), 3.a/3.b
(domain, sitemap), owner input on tax-credit eligibility & credentials

---

## Priority 2

### 2.a Google Analytics (GA4)
- [ ] Add `gtag.js` loader in `src/routes/__root.tsx` (`scripts` array, same pattern already used
      for the LocalBusiness JSON-LD in `index.tsx`)
- [ ] **RGPD/CNIL requirement**: GA sets tracking cookies, so a consent mechanism is legally
      required before firing gtag for French visitors. Since there's no backend, use a small
      client-side consent banner storing the choice in `localStorage`, and only initialize gtag
      after consent (or fire GA in a CNIL-compliant "exempt" mode if configured for no
      cross-site tracking — needs a decision, not just a toggle).
- [ ] Track key conversion events: Typeform CTA clicks, phone click, email click

**Effort:** S · **Depends on:** GA property ID, domain

### 2.b Email signature — *off-repo*
- [ ] Design an HTML email signature (name, role, phone, email, website URL, logo) for Marie to
      use in her day-to-day email client
- [ ] No code change to this repo required; if useful for version control/reuse, the HTML source
      could still be kept as a plain file under `.claude/roadmap/` or a dedicated `marketing/`
      folder — optional, not load-bearing
- [ ] Link to the real production domain once set, and reuse the same phone/email that end up in
      the obfuscated contact section (2.c) and the `LocalBusiness` JSON-LD (1.b), so all public
      touchpoints stay consistent

**Effort:** S · **Depends on:** logo, real phone/email, domain

### 2.c Phone/email obfuscation (anti-spam)
- [ ] Replace the plain-text phone/email in the Contact section (`tel:0750653753`,
      `mailto:r-rems@hotmail.fr`, visible `07 50 65 37 53` / `r-rems@hotmail.fr` in
      `index.tsx`) with a client-side-assembled version: render a placeholder in JSX and fill in
      the real `href`/text inside a `useEffect` so the value only exists in the DOM after
      hydration, not in the static HTML that gets curl-snapshotted for deployment or scraped by
      naive bots
- [ ] **Known tradeoff, decide deliberately**: the `LocalBusiness` JSON-LD already exposes
      `email`/`telephone` in plain text (`index.tsx` head `scripts`) — that's intentional and
      should stay, since it's what Google reads for local search / rich results, and JSON-LD
      inside a `<script>` tag isn't rendered as clickable/scrapeable page text the same way.
      Obfuscation here targets human-visible contact links, not structured data.
- [ ] Confirm the CI curl-snapshot (`ci.yml`, commit `292ad0c`) actually captures pre-hydration
      HTML — if it runs a headless browser instead, obfuscation needs a different approach
      (e.g. hydration must complete before snapshot, defeating the purpose)

**Effort:** S–M · **Depends on:** Priority 1.b (real contact info to obfuscate)

### 2.d Service panel images
- [x] Add a photo/illustration to each service card in the "Mes services" section
      (`src/routes/index.tsx`, `#services`, the `services` array + its `.map()` render) — each
      card now shows an image above the existing icon, title, and description
- [x] Extend the `services` array with an `image` field per entry (7 services: nettoyage de
      locaux, garde de nuit, aide à la toilette, ménage, fin de chantier, courses, accompagnement)
- [x] Source/select 7 images matching each service — AI-generated per the prompts in
      `.claude/roadmap/service-picture.md`
- [x] Store images under `src/assets/services/` and reference via static import so Vite
      fingerprints them for the static build
- [x] Keep the icon — image sits above it, icon stays as the card's visual anchor below the photo
- [ ] Optimize for static hosting: images are currently unoptimized PNGs (~2 MB each, ~14 MB
      total) kept as-is per explicit decision — still needs compression/resize and ideally
      WebP/AVIF with `srcset` before this ships to production, since this is a meaningful mobile
      payload (same consideration as the hero image in 1.c)

**Effort:** M · **Depends on:** sourced images for each of the 7 services

---

## Priority 3

### 3.a robots.txt
- [x] File already exists at `public/robots.txt` (`User-agent: *` / `Allow: /`) and needs no
      deploy wiring — Vite/Nitro copies `public/` straight into `.output/public/`, which is what
      `ci.yml`'s `rsync` step ships to OVH. This is a content edit only, not a pipeline change.
- [ ] Add a `Sitemap: https://<domain>/sitemap.xml` line once the production domain is set
- [ ] Confirm no routes need disallowing (single page today — revisit if `/mentions-legales` or
      future routes are split out)

### 3.b Sitemap
- [ ] Fix `BASE_URL` placeholder in `src/routes/sitemap[.]xml.ts` (currently `""`, TODO comment
      says "replace once a project name or custom domain is set")
- [ ] Confirms with domain decision above

### 3.c QR code generation & hosting
- [ ] Decide the QR target: simplest is the production domain root with UTM params (e.g.
      `https://<domain>/?utm_source=qr&utm_medium=print&utm_campaign=carte-visite`) so scans are
      attributable in GA (ties to 2.a) without needing a dedicated landing route
- [ ] Generate the QR code image (static PNG/SVG) once the domain is final
- [ ] Hosting is trivial and follows the same pattern as `robots.txt` (3.a): drop the generated
      file into `public/`, it rides through the existing Vite/Nitro static copy + `ci.yml` rsync
      to OVH with no pipeline changes
- [ ] Hand the final QR asset off for use on the visit card and flyer (Priority 4)

**Effort:** S · **Depends on:** domain, GA UTM decision (2.a)

---

## Priority 4

### 4.a Physical visit card & flyer conception — *off-repo*
- [ ] Graphic design of a business card and a flyer (external tool/designer + printer — no code
      in this repo)
- [ ] Content pulled from already-finalized site data: business name, services list (`services`
      array in `src/routes/index.tsx`), address/SIRET (1.b), phone/email (2.c), logo, and the QR
      code (3.c)
- [ ] Include the QR code from 3.c so print materials drive trackable traffic back to the site
- [ ] No repo deliverable expected here beyond possibly archiving final design files somewhere
      outside this codebase (not this repo's concern)

**Effort:** M (external design/print lead time) · **Depends on:** logo, business info (1.b),
QR code (3.c)

---

## Priority 5

### 5.a Customer REX section (testimonials)
- [ ] Store testimonials as static data, e.g. `src/data/testimonials.ts` (array of
      `{ name, service?, quote }`) — no DB needed, matches the project's static-content pattern
- [ ] Random selection of up to 5 entries client-side on mount (`useMemo` shuffling the array;
      keep it deterministic on the server-rendered/curl-snapshotted HTML by either seeding
      predictably or accepting that the snapshot shows one fixed order and JS reshuffles after
      hydration — decide based on whether SEO cares about which 5 show up, it shouldn't)
- [ ] Build the slider on top of **`embla-carousel-react`**, already a dependency, and the
      existing `src/components/ui/carousel.tsx` primitive — no new library needed
- [ ] Add a `#avis` section between "À propos" and "Contact", link it in the header nav
- [ ] Optional: `Review`/`AggregateRating` JSON-LD alongside `LocalBusiness` once there are
      enough real reviews (holds off — fake/unverifiable review markup violates Google's
      structured data guidelines)

**Effort:** M · **Depends on:** real testimonial content
