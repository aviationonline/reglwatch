import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Logiciel de veille réglementaire : comment choisir la meilleure solution",
  description:
    "Découvrez les critères essentiels pour choisir un logiciel de veille réglementaire adapté aux PME et ETI.",
  keywords: [
    "logiciel veille réglementaire",
    "outil veille réglementaire",
    "veille juridique automatisée",
    "conformité réglementaire",
    "ReglWatch",
  ],
};

export default function LogicielVeilleReglementairePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-5xl font-bold">
        Logiciel de veille réglementaire : comment faire le bon choix ?
      </h1>

      <p className="mb-6 text-lg">
        Les entreprises sont confrontées à une augmentation constante
        des obligations réglementaires. Un logiciel de veille
        réglementaire permet de surveiller automatiquement les
        évolutions légales et de réduire le risque de non-conformité.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi utiliser un logiciel spécialisé ?
      </h2>

      <p className="mb-6">
        Les sources réglementaires sont nombreuses et complexes.
        Surveiller manuellement les changements demande du temps et
        mobilise des compétences spécifiques.
      </p>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Gain de temps</li>
        <li>Alertes automatisées</li>
        <li>Réduction des risques</li>
        <li>Suivi centralisé</li>
        <li>Meilleure réactivité</li>
      </ul>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les critères de sélection
      </h2>

      <ol className="mb-8 list-decimal pl-6 space-y-2">
        <li>Pertinence des alertes</li>
        <li>Couverture réglementaire</li>
        <li>Facilité d'utilisation</li>
        <li>Personnalisation</li>
        <li>Qualité des synthèses</li>
      </ol>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Les limites d'une veille manuelle
      </h2>

      <p className="mb-6">
        Une veille réalisée uniquement à la main peut conduire à des
        oublis, des retards ou une surcharge d'information.
      </p>

      <h2 className="mb-4 mt-10 text-3xl font-bold">
        Pourquoi choisir ReglWatch
      </h2>

      <ul className="mb-8 list-disc pl-6 space-y-2">
        <li>Veille automatisée</li>
        <li>Alertes ciblées selon l'activité</li>
        <li>Synthèses compréhensibles</li>
        <li>Configuration rapide</li>
        <li>Essai gratuit 14 jours</li>
      </ul>

      <div className="rounded-xl bg-slate-100 p-8">
        <h2 className="mb-4 text-2xl font-bold">
          Découvrez ReglWatch
        </h2>

        <p className="mb-6">
          Automatisez votre veille réglementaire dès aujourd'hui.
        </p>

        <a
          href="/pricing"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Voir les offres
        </a>
      </div>
    </main>
  );
}
