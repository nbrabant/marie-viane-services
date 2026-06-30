import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import {
  Building2,
  Moon,
  Bath,
  Sparkles,
  Hammer,
  ShoppingBag,
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const TYPEFORM_URL = "https://form.typeform.com/to/your-form-id";

const services = [
  {
    icon: Building2,
    title: "Nettoyage de locaux professionnels",
    description:
      "Entretien régulier ou ponctuel de bureaux, commerces et espaces professionnels pour un cadre de travail sain.",
  },
  {
    icon: Moon,
    title: "Garde de nuit à domicile",
    description:
      "Une présence rassurante et attentive durant la nuit pour veiller au confort et à la sécurité de vos proches.",
  },
  {
    icon: Bath,
    title: "Aide à la toilette",
    description:
      "Accompagnement à la toilette dans le respect de l'intimité, de la dignité et du bien-être de la personne.",
  },
  {
    icon: Sparkles,
    title: "Ménage à domicile",
    description:
      "Entretien complet du logement : nettoyage, rangement et repassage pour un intérieur impeccable.",
  },
  {
    icon: Hammer,
    title: "Nettoyage de fin de chantier",
    description:
      "Remise en état après travaux dans le cadre d'un état des lieux, pour un logement prêt à être habité.",
  },
  {
    icon: ShoppingBag,
    title: "Courses & approvisionnement",
    description:
      "Réalisation des courses du quotidien selon vos besoins et vos préférences, livrées à domicile.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement",
    description:
      "Accompagnement aux rendez-vous, aux sorties et dans les démarches du quotidien, en toute bienveillance.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Marie Viane — Aide à domicile & services à la personne",
      },
      {
        name: "description",
        content:
          "Marie Viane, professionnelle de l'aide à domicile : ménage, garde de nuit, aide à la toilette, nettoyage de locaux, fin de chantier, courses et accompagnement. Contactez-nous.",
      },
      {
        name: "keywords",
        content:
          "aide à domicile, services à la personne, ménage, garde de nuit, aide à la toilette, nettoyage de locaux, fin de chantier, courses, accompagnement, Marie Viane",
      },
      { property: "og:title", content: "Marie Viane — Aide à domicile & services à la personne" },
      {
        property: "og:description",
        content:
          "Services à la personne et aide à domicile professionnels : ménage, garde de nuit, toilette, nettoyage de locaux, courses et accompagnement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Marie Viane — Aide à domicile",
          description:
            "Professionnelle de l'aide à domicile et des services à la personne : ménage, garde de nuit, aide à la toilette, nettoyage de locaux professionnels, nettoyage de fin de chantier, courses et accompagnement.",
          image: heroImg,
          email: "contact@marie-viane.fr",
          telephone: "+33600000000",
          priceRange: "€€",
          areaServed: "France",
          makesOffer: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#accueil" className="text-lg font-semibold tracking-tight text-primary">
            Marie Viane
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">
              Services
            </a>
            <a href="#apropos" className="text-muted-foreground transition-colors hover:text-foreground">
              À propos
            </a>
            <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            Demander un devis
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="accueil" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <HeartHandshake className="h-4 w-4" /> Aide à domicile & services à la personne
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Un accompagnement humain et professionnel, à votre domicile
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Marie Viane vous propose des prestations sur mesure : ménage, garde de nuit, aide à la
              toilette, nettoyage de locaux, courses et accompagnement, dans le respect et la
              bienveillance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={TYPEFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Prendre contact
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Découvrir les services
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
            <img
              src={heroImg}
              alt="Marie Viane, aide à domicile, accompagnant une personne âgée avec bienveillance"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-muted/50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Mes services</h2>
              <p className="mt-4 text-muted-foreground">
                Des prestations adaptées à chaque situation, pour les particuliers comme pour les
                professionnels.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* À propos */}
        <section id="apropos" className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">À propos de Marie</h2>
              <p className="mt-5 text-muted-foreground">
                Forte d'une expérience dans l'aide à domicile et les services à la personne, Marie
                Viane met son sérieux, sa discrétion et son écoute au service de votre bien-être et de
                celui de vos proches.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Prestations sur mesure et flexibles",
                  "Respect de l'intimité et de la dignité",
                  "Interventions ponctuelles ou régulières",
                  "Particuliers et professionnels",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-[var(--gradient-hero)] p-8 text-primary-foreground shadow-[var(--shadow-soft)]">
              <h3 className="text-2xl font-semibold">Besoin d'un accompagnement ?</h3>
              <p className="mt-3 text-primary-foreground/90">
                Remplissez le formulaire en ligne pour décrire votre besoin. Marie vous recontacte
                rapidement pour une proposition personnalisée.
              </p>
              <a
                href={TYPEFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-card px-7 py-3 text-base font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                Ouvrir le formulaire
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-muted/50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Me contacter</h2>
              <p className="mt-4 text-muted-foreground">
                Une question, une demande de devis ? N'hésitez pas à me joindre.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              <a
                href="tel:+33600000000"
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">06 00 00 00 00</span>
              </a>
              <a
                href="mailto:contact@marie-viane.fr"
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">contact@marie-viane.fr</span>
              </a>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">France</span>
              </div>
            </div>
            <div className="mt-10 text-center">
              <a
                href={TYPEFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Remplir le formulaire de contact
              </a>
            </div>
          </div>
        </section>

        {/* Mentions légales */}
        <section id="mentions-legales" className="mx-auto max-w-3xl px-4 py-20">
          <h2 className="text-2xl font-bold tracking-tight">Mentions légales</h2>
          <div className="mt-6 space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground">Éditeur du site</h3>
              <p className="mt-2">
                Le présent site est édité par Marie Viane, entrepreneuse individuelle exerçant une
                activité d'aide à domicile et de services à la personne.
                <br />
                Adresse : à compléter — France.
                <br />
                Email : contact@marie-viane.fr — Téléphone : 06 00 00 00 00.
                <br />
                SIRET : à compléter.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Hébergement</h3>
              <p className="mt-2">
                Le site est hébergé par Lovable. Les informations relatives à l'hébergeur peuvent être
                communiquées sur demande.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Propriété intellectuelle</h3>
              <p className="mt-2">
                L'ensemble des contenus présents sur ce site (textes, images, logos) est protégé par
                le droit de la propriété intellectuelle. Toute reproduction sans autorisation est
                interdite.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Données personnelles</h3>
              <p className="mt-2">
                Les données transmises via le formulaire de contact sont utilisées uniquement pour
                répondre à votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de
                rectification et de suppression de vos données en écrivant à contact@marie-viane.fr.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Marie Viane — Aide à domicile.</p>
          <a href="#mentions-legales" className="transition-colors hover:text-foreground">
            Mentions légales
          </a>
        </div>
      </footer>
    </div>
  );
}
