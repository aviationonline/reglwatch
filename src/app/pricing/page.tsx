export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-center text-5xl font-bold">
        Choisissez votre formule
      </h1>

      <div className="mt-16 grid gap-8 md:grid-cols-2">

        <div className="rounded-2xl border p-8">
          <h2 className="text-3xl font-bold">
            Starter
          </h2>

          <div className="mt-4 text-5xl font-bold">
            19€
          </div>

          <div className="text-slate-500">
            par mois
          </div>

          <ul className="mt-8 space-y-3">
            <li>✓ Veille réglementaire ciblée</li>
            <li>✓ Alertes essentielles</li>
            <li>✓ Synthèse hebdomadaire</li>
          </ul>

          <button
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            Commencer l'essai gratuit
          </button>
        </div>

        <div className="rounded-2xl border-2 border-black p-8">
          <h2 className="text-3xl font-bold">
            Business
          </h2>

          <div className="mt-4 text-5xl font-bold">
            49€
          </div>

          <div className="text-slate-500">
            par mois
          </div>

          <ul className="mt-8 space-y-3">
            <li>✓ Toutes les fonctionnalités Starter</li>
            <li>✓ Alertes prioritaires</li>
            <li>✓ Suivi avancé</li>
            <li>✓ Assistance prioritaire</li>
          </ul>

          <button
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            Commencer l'essai gratuit
          </button>
        </div>

      </div>
    </main>
  );
}
