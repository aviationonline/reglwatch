import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Veille réglementaire PME : guide complet pour rester conforme en 2026",
  description:
    "Découvrez pourquoi la veille réglementaire est indispensable pour les PME et comment automatiser le suivi des obligations légales avec ReglWatch.",
  keywords: [
    "veille réglementaire PME",
    "conformité réglementaire",
    "obligations légales PME",
    "veille juridique entreprise",
    "logiciel veille réglementaire",
  ],
};

export default function VeilleReglementairePMEPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-5xl font-bold">
        Veille réglementaire PME : le guide complet
      </h1>

      <p className="mb-6 text-lg">
        La veille réglementaire est devenue indispensable pour les PME.
        Les obligations légales évoluent constamment : droit du travail,
        sécurité, environnement, fiscalité, protection des données ou
        encore obligations sectorielles.
      </p>

      <p className="mb-10 text-lg">
        Pourtant, la majorité des petites entreprises ne disposent pas
        d'un service juridique dédié capable de surveiller
        quotidiennement les évolutions réglementaires.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Qu'est-ce que la veille réglementaire ?
      </h2>

      <p className="mb-6">
        La veille réglementaire consiste à surveiller en permanence les
        textes légaux, réglementaires et normatifs susceptibles d'avoir
        un impact sur l'activité d'une entreprise.
      </p>

      <p className="mb-6">
        Elle permet d'identifier rapidement les nouvelles obligations
        applicables et d'anticiper les actions nécessaires pour rester
        conforme.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi les PME sont particulièrement exposées
      </h2>

      <p className="mb-6">
        Contrairement aux grands groupes, les PME disposent souvent de
        ressources limitées pour assurer une veille juridique efficace.
      </p>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Manque de temps</li>
        <li>Absence de juriste interne</li>
        <li>Multiplication des sources réglementaires</li>
        <li>Complexité croissante des textes</li>
        <li>Risques financiers importants</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les risques d'une absence de veille réglementaire
      </h2>

      <p className="mb-6">
        Une entreprise qui ne suit pas les évolutions réglementaires
        s'expose à de nombreux risques.
      </p>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Sanctions administratives</li>
        <li>Amendes financières</li>
        <li>Contentieux avec les salariés</li>
        <li>Perte de certifications</li>
        <li>Atteinte à la réputation</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Comment mettre en place une veille efficace
      </h2>

      <p className="mb-6">
        Une veille réglementaire efficace repose sur plusieurs éléments.
      </p>

      <ol className="mb-8 list-decimal pl-6 space-y-2">
        <li>Identifier les obligations applicables</li>
        <li>Déterminer les sources officielles</li>
        <li>Analyser les nouveautés</li>
        <li>Diffuser l'information</li>
        <li>Mettre en œuvre les actions nécessaires</li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi automatiser la veille réglementaire ?
      </h2>

      <p className="mb-6">
        L'automatisation permet de réduire considérablement le temps
        consacré à la surveillance réglementaire tout en améliorant la
        réactivité.
      </p>

      <p className="mb-6">
        Les outils modernes analysent automatiquement les sources,
        détectent les changements et alertent les responsables concernés.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        ReglWatch : la veille réglementaire automatisée
      </h2>

      <p className="mb-6">
        ReglWatch aide les PME à identifier uniquement les obligations
        réellement pertinentes pour leur activité.
      </p>

      <ul className="mb-10 list-disc pl-6 space-y-2">
        <li>Analyse automatisée des textes</li>
        <li>Alertes ciblées</li>
        <li>Synthèses compréhensibles</li>
        <li>Gain de temps important</li>
        <li>Réduction du risque de non-conformité</li>
      </ul>

      <div className="rounded-xl bg-slate-100 p-8">
        <h2 className="mb-4 text-2xl font-bold">
          Essayez ReglWatch gratuitement
        </h2>

        <p className="mb-6">
          Testez gratuitement ReglWatch pendant 14 jours et découvrez
          comment automatiser votre veille réglementaire.
        </p>

        <a
          href="/pricing"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Voir les offres
        </a>
      </div>

      <h2 className="mb-4 mt-12 text-3xl font-bold">
        FAQ
      </h2>

      <h3 className="mt-6 text-xl font-semibold">
        Une PME est-elle obligée de réaliser une veille réglementaire ?
      </h3>

      <p className="mt-2">
        Même si la loi n'impose pas toujours une méthode précise,
        l'entreprise reste responsable de sa conformité.
      </p>

      <h3 className="mt-6 text-xl font-semibold">
        Quels domaines doivent être surveillés ?
      </h3>

      <p className="mt-2">
        Droit du travail, sécurité, environnement, fiscalité,
        protection des données et réglementation sectorielle.
      </p>

      <h3 className="mt-6 text-xl font-semibold">
        Pourquoi utiliser un logiciel de veille réglementaire ?
      </h3>

      <p className="mt-2">
        Pour gagner du temps, réduire les risques et être alerté
        rapidement des changements pertinents.
      </p>
    </main>
  );
}
