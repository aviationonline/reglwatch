import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Obligations légales PME : les règles essentielles à respecter en 2026",
  description:
    "Découvrez les principales obligations légales des PME et comment éviter les risques grâce à une veille réglementaire efficace.",
  keywords: [
    "obligations légales PME",
    "obligations entreprise",
    "conformité PME",
    "veille réglementaire",
    "obligations réglementaires",
  ],
};

export default function ObligationsLegalesPMEPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-5xl font-bold">
        Obligations légales PME : le guide complet
      </h1>

      <p className="mb-6 text-lg">
        Toute PME est soumise à un ensemble d'obligations légales qui
        évoluent régulièrement. Ne pas respecter ces règles peut
        entraîner des sanctions financières, administratives ou
        judiciaires.
      </p>

      <p className="mb-8 text-lg">
        Comprendre ses obligations est indispensable pour sécuriser le
        développement de son entreprise et limiter les risques.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi les obligations légales évoluent-elles ?
      </h2>

      <p className="mb-6">
        Les lois et règlements sont régulièrement modifiés afin de
        répondre aux évolutions économiques, sociales,
        environnementales et technologiques.
      </p>

      <p className="mb-6">
        Une entreprise conforme aujourd'hui peut ne plus l'être demain
        si elle ne suit pas ces évolutions.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les principales obligations des PME
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Respect du droit du travail</li>
        <li>Affichages obligatoires</li>
        <li>Protection des données personnelles</li>
        <li>Obligations comptables et fiscales</li>
        <li>Prévention des risques professionnels</li>
        <li>Respect des normes sectorielles</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les risques en cas de non-respect
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Amendes administratives</li>
        <li>Sanctions pénales</li>
        <li>Contrôles renforcés</li>
        <li>Contentieux prud'homaux</li>
        <li>Perte de marchés ou certifications</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Comment identifier les obligations applicables ?
      </h2>

      <p className="mb-6">
        Les obligations dépendent de nombreux critères :
      </p>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Secteur d'activité</li>
        <li>Effectif de l'entreprise</li>
        <li>Forme juridique</li>
        <li>Localisation</li>
        <li>Activités spécifiques exercées</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi mettre en place une veille réglementaire ?
      </h2>

      <p className="mb-6">
        La veille réglementaire permet de détecter rapidement les
        nouvelles obligations et de prendre les mesures nécessaires
        avant qu'un problème n'apparaisse.
      </p>

      <p className="mb-6">
        Elle constitue aujourd'hui un élément essentiel de la gestion
        des risques d'une PME.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Comment ReglWatch simplifie le suivi réglementaire
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Analyse automatisée des textes officiels</li>
        <li>Alertes ciblées selon votre activité</li>
        <li>Synthèses faciles à comprendre</li>
        <li>Réduction du risque de non-conformité</li>
        <li>Gain de temps considérable</li>
      </ul>

      <div className="rounded-xl bg-slate-100 p-8">
        <h2 className="mb-4 text-2xl font-bold">
          Gardez le contrôle de vos obligations légales
        </h2>

        <p className="mb-6">
          Essayez ReglWatch gratuitement pendant 14 jours.
        </p>

        <a
          href="/pricing"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Découvrir les offres
        </a>
      </div>

      <h2 className="mb-4 mt-12 text-3xl font-bold">
        FAQ
      </h2>

      <h3 className="mt-6 text-xl font-semibold">
        Une PME doit-elle suivre l'évolution des lois ?
      </h3>

      <p className="mt-2">
        Oui. L'entreprise est responsable du respect des règles qui lui
        sont applicables.
      </p>

      <h3 className="mt-6 text-xl font-semibold">
        Comment connaître ses obligations ?
      </h3>

      <p className="mt-2">
        En réalisant une veille réglementaire régulière ou en utilisant
        un outil spécialisé.
      </p>

      <h3 className="mt-6 text-xl font-semibold">
        Quels sont les risques principaux ?
      </h3>

      <p className="mt-2">
        Les sanctions financières et les risques juridiques sont les
        conséquences les plus fréquentes.
      </p>
    </main>
  );
}
