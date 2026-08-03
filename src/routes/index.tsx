import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import logo from "@/assets/logo.svg";
import nettoyageImg from "@/assets/services/1_nettoyage.png";
import gardeDeNuitImg from "@/assets/services/2_garde_de_nuit.png";
import aideToiletteImg from "@/assets/services/3_aide_toilette.png";
import menageImg from "@/assets/services/4_menage.png";
import finChantierImg from "@/assets/services/5_fin_chantier.png";
import coursesImg from "@/assets/services/6_courses.png";
import accompagnementImg from "@/assets/services/7_accompagnement.png";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Percent,
} from "lucide-react";

const TYPEFORM_URL = "https://form.jotform.com/262146727751057";

const services = [
  {
    icon: Building2,
    image: nettoyageImg,
    title: "Nettoyage de locaux professionnels",
    description:
      "Entretien régulier ou ponctuel de bureaux, commerces et espaces professionnels pour un cadre de travail sain.",
    taxCredit: {
      eligible: false,
      note: "Non éligible : prestation réalisée dans des locaux professionnels, en dehors du champ des services à la personne réservé au domicile des particuliers.",
    },
  },
  {
    icon: Moon,
    image: gardeDeNuitImg,
    title: "Garde de nuit à domicile",
    description:
      "Une présence rassurante et attentive durant la nuit pour veiller au confort et à la sécurité de vos proches.",
    taxCredit: {
      eligible: true,
      note: "Éligible, dans le cadre de mon autorisation du Conseil Départemental pour l'accompagnement des personnes âgées, handicapées ou dépendantes. Possibilité d'aide au coucher e au lever",
    },
  },
  {
    icon: Bath,
    image: aideToiletteImg,
    title: "Aide à la toilette",
    description:
      "Accompagnement à la toilette dans le respect de l'intimité, de la dignité et du bien-être de la personne.",
    taxCredit: {
      eligible: true,
      note: "Éligible, activité soumise à autorisation du Conseil Départemental, dont je dispose.",
    },
  },
  {
    icon: Sparkles,
    image: menageImg,
    title: "Ménage à domicile",
    description:
      "Entretien complet du logement : nettoyage, rangement et repassage pour un intérieur impeccable.",
    taxCredit: {
      eligible: true,
      note: "Éligible, prestation réalisée à votre domicile (résidence principale ou secondaire).",
    },
  },
  {
    icon: Hammer,
    image: finChantierImg,
    title: "Nettoyage de fin de chantier",
    description:
      "Remise en état après travaux dans le cadre d'un état des lieux, pour un logement prêt à être habité.",
    taxCredit: {
      eligible: "conditional" as const,
      note: "Éligible uniquement lorsque la prestation est réalisée à votre domicile (résidence principale ou secondaire) ; non éligible pour un chantier professionnel.",
    },
  },
  {
    icon: ShoppingBag,
    image: coursesImg,
    title: "Courses & approvisionnement",
    description:
      "Réalisation des courses du quotidien selon vos besoins et vos préférences, livrées à domicile.",
    taxCredit: {
      eligible: "conditional" as const,
      note: "Seul l'acte de livraison ouvre droit au crédit d'impôt ; le montant des achats en est exclu.",
    },
  },
  {
    icon: HeartHandshake,
    image: accompagnementImg,
    title: "Accompagnement",
    description:
      "Accompagnement aux rendez-vous, aux sorties et dans les démarches du quotidien, en toute bienveillance.",
    taxCredit: {
      eligible: "conditional" as const,
      note: "Éligible lorsque la prestation bénéficie à une personne âgée, handicapée ou dépendante, dans le cadre d'une offre globale de services à la personne incluant une prestation à domicile.",
    },
  },
];

const taxCreditGeneralConditions = [
  "La prestation est réalisée à votre domicile (résidence principale ou secondaire), ou dans son environnement immédiat pour les activités de livraison et d'accompagnement concernées.",
  "Vous êtes un particulier : les professionnels, sociétés, copropriétés et bailleurs ne sont pas éligibles à cet avantage fiscal.",
  "Le règlement est effectué autrement qu'en espèces (aucun avantage fiscal en cas de paiement en espèces).",
  "Le crédit d'impôt correspond à 50 % des sommes versées, dans la limite des plafonds annuels fixés par l'administration fiscale (article 199 sexdecies du Code général des impôts).",
];

function TaxCreditDetails() {
  return (
    <div className="space-y-5 text-sm text-muted-foreground">
      <div>
        <h4 className="font-semibold text-foreground">Conditions générales</h4>
        <ul className="mt-2 space-y-2">
          {taxCreditGeneralConditions.map((condition) => (
            <li key={condition} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{condition}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-foreground">Éligibilité par prestation</h4>
        <ul className="mt-2 space-y-3">
          {services.map((service) => (
            <li key={service.title}>
              <span className="font-medium text-foreground">{service.title}</span>
              {" — "}
              {service.taxCredit.note}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs">
        Informations données à titre indicatif et ne remplaçant pas un conseil fiscal personnalisé.
        Pour connaître les plafonds annuels en vigueur, consultez service-public.fr, impots.gouv.fr
        ou votre centre des finances publiques.
      </p>
    </div>
  );
}

function MentionsLegalesContent() {
  return (
    <div className="space-y-6 text-sm text-muted-foreground">
      <div>
        <h3 className="font-semibold text-foreground">Éditeur du site</h3>
        <p className="mt-2">
          Le présent site est édité par Marie Viane, entrepreneuse individuelle exerçant une
          activité d'aide à domicile et de services à la personne.
          <br />
          Adresse : 40 rue Saint Louis — 59200 Tourcoing — France.
          <br />
          Email : r-rems@hotmail.fr — Téléphone : 07 50 65 37 53.
          <br />
          SIRET : 100 804 558 00011.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">Hébergement</h3>
        <p className="mt-2">
          Le site est hébergé par OVH. Les informations relatives à l'hébergeur peuvent être
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
          rectification et de suppression de vos données en écrivant à r-rems@hotmail.fr.
        </p>
      </div>
    </div>
  );
}

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
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: absoluteUrl(heroImg) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl(heroImg) },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Marie Viane — Aide à domicile",
          description:
            "Professionnelle de l'aide à domicile et des services à la personne : ménage, garde de nuit, aide à la toilette, nettoyage de locaux professionnels, nettoyage de fin de chantier, courses et accompagnement.",
          url: SITE_URL,
          image: absoluteUrl(heroImg),
          email: "r-rems@hotmail.fr",
          telephone: "0750653753",
          address: {
            "@type": "PostalAddress",
            streetAddress: "40 rue Saint Louis",
            postalCode: "59200",
            addressLocality: "Tourcoing",
            addressCountry: "FR",
          },
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

function formatFrenchPhone(phone: string) {
  return phone.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function Index() {
  const [mentionsLegalesOpen, setMentionsLegalesOpen] = useState(false);
  const [contact, setContact] = useState<{ phone: string; email: string } | null>(null);

  useEffect(() => {
    if (window.location.hash === "#mentions-legales") {
      setMentionsLegalesOpen(true);
    }
    setContact({ phone: "0750653753", email: "r-rems@hotmail.fr" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#accueil" className="shrink-0">
            <img src={logo} alt="Marie Viane — Aide à domicile & services à la personne" className="h-14 w-auto sm:h-16" />
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
                  className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[var(--shadow-soft)]"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover sm:aspect-video"
                  />
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Percent className="h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Certaines de mes prestations réalisées à votre domicile ouvrent droit à un{" "}
                  <span className="font-semibold text-foreground">crédit d'impôt de 50 %</span>.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                    Voir les conditions
                  </button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Crédit d'impôt de 50 % — Services à la personne</DialogTitle>
                    <DialogDescription>
                      Informations générales sur l'éligibilité de mes prestations à l'avantage
                      fiscal prévu par l'article 199 sexdecies du Code général des impôts.
                    </DialogDescription>
                  </DialogHeader>
                  <TaxCreditDetails />
                </DialogContent>
              </Dialog>
              {/*
                Radix's Dialog only mounts its content once opened (and its Portal never renders
                during SSR at all), so the popin above is invisible to non-JS crawlers and the
                curl-snapshotted static build. This sr-only block duplicates the same content
                (same data, same TaxCreditDetails component) so it's always present in the
                rendered HTML for search/AI crawlers and screen readers, without affecting sighted
                users or the page's visual layout.
              */}
              <div className="sr-only">
                <h3>Crédit d'impôt de 50 % — Services à la personne</h3>
                <p>
                  Informations générales sur l'éligibilité de mes prestations à l'avantage fiscal
                  prévu par l'article 199 sexdecies du Code général des impôts.
                </p>
                <TaxCreditDetails />
              </div>
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
                href={contact ? `tel:${contact.phone}` : undefined}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">
                  {contact ? formatFrenchPhone(contact.phone) : "Afficher le numéro"}
                </span>
              </a>
              <a
                href={contact ? `mailto:${contact.email}` : undefined}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">
                  {contact ? contact.email : "Afficher l'email"}
                </span>
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

        {/*
          Mentions légales now open in a popin from the footer instead of sitting inline in the
          page flow (see Dialog below). This sr-only block keeps the same content anchor-reachable
          at #mentions-legales and present in the server-rendered HTML for legal-compliance/SEO
          crawlers and screen readers, same technique used for the tax-credit details above.
        */}
        <div id="mentions-legales" className="sr-only">
          <h2>Mentions légales</h2>
          <MentionsLegalesContent />
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Marie Viane — Aide à domicile.</p>
          <Dialog open={mentionsLegalesOpen} onOpenChange={setMentionsLegalesOpen}>
            <DialogTrigger asChild>
              <button type="button" className="transition-colors hover:text-foreground">
                Mentions légales
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Mentions légales</DialogTitle>
              </DialogHeader>
              <MentionsLegalesContent />
            </DialogContent>
          </Dialog>
        </div>
      </footer>
    </div>
  );
}
