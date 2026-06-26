import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Veille juridique entreprise : comment anticiper les évolutions réglementaires",
  description:
    "Découvrez comment mettre en place une veille juridique efficace pour votre entreprise et rester conforme aux évolutions réglementaires.",
  keywords: [
    "veille juridique entreprise",
    "veille légale entreprise",
    "veille réglementaire",
    "conformité réglementaire",
    "ReglWatch",
  ],
};

export default function VeilleJuridiqueEntreprisePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-5xl font-bold">
        Veille juridique entreprise : guide pratique
      </h1>

      <p className="mb-6 text-lg">
        Les entreprises évoluent dans un environnement réglementaire
        en constante mutation. Une veille juridique efficace permet
        d'anticiper les changements et d'éviter les risques liés à
        la non-conformité.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Qu'est-ce que la veille juridique ?
      </h2>

      <p className="mb-6">
        La veille juridique consiste à surveiller les évolutions des
        lois, règlements, décrets, jurisprudences et normes pouvant
        impacter l'activité d'une entreprise.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi est-elle indispensable ?
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Réduire les risques juridiques</li>
        <li>Anticiper les nouvelles obligations</li>
        <li>Éviter les sanctions</li>
        <li>Protéger l'entreprise</li>
        <li>Maintenir sa compétitivité</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les principales sources à surveiller
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Légifrance</li>
        <li>Bulletins officiels</li>
        <li>Jurisprudence</li>
        <li>Organismes professionnels</li>
        <li>Publications sectorielles</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les limites d'une veille manuelle
      </h2>

      <p className="mb-6">
        Une veille manuelle exige beaucoup de temps et augmente le
        risque de passer à côté d'une évolution importante.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Automatiser la veille juridique
      </h2>

      <p className="mb-6">
        Les outils modernes permettent de filtrer automatiquement les
        informations pertinentes et d'alerter les responsables en
        temps réel.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        ReglWatch : une veille adaptée aux PME
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Analyse automatisée des textes</li>
        <li>Alertes personnalisées</li>
        <li>Synthèses simplifiées</li>
        <li>Gain de temps</li>
        <li>Réduction du risque réglementaire</li>
      </ul>

      <div className="rounded-xl bg-slate-100 p-8">
        <h2 className="mb-4 text-2xl font-bold">
          Automatisez votre veille juridique
        </h2>

        <p className="mb-6">
          Essayez ReglWatch gratuitement pendant 14 jours.
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
        Quelle différence entre veille juridique et veille réglementaire ?
      </h3>

      <p className="mt-2">
        La veille juridique couvre les lois, règlements et jurisprudences.
        La veille réglementaire se concentre davantage sur les obligations
        applicables à l'entreprise.
      </p>

      <h3 className="mt-6 text-xl font-semibold">
        Qui doit réaliser la veille juridique ?
      </h3>

      <p className="mt-2">
        Selon la taille de l'entreprise, elle peut être réalisée par
        un dirigeant, un juriste ou un outil spécialisé.
      </p>

      <h3 className="mt-6 text-xl font-semibold">
        Pourquoi automatiser cette veille ?
      </h3>

      <p className="mt-2">
        Pour gagner du temps et être alerté rapidement des évolutions
        réellement pertinentes.
      </p>
    </main>
  );
}
