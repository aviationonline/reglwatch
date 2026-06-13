export default function Home() {
return ( <main className="min-h-screen bg-white text-slate-900">

```
  <section className="mx-auto max-w-6xl px-6 py-24">
    <div className="max-w-4xl">
      <div className="mb-6 inline-flex rounded-full border px-4 py-2 text-sm">
        Assistant réglementaire des PME françaises
      </div>

      <h1 className="text-6xl font-bold tracking-tight">
        Ne manquez plus une obligation réglementaire importante.
      </h1>

      <p className="mt-8 max-w-2xl text-xl text-slate-600">
        ReglWatch surveille les sources officielles françaises et vous
        explique uniquement ce qui concerne votre entreprise.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <button className="rounded-xl bg-black px-6 py-4 text-white">
          Essai gratuit 14 jours
        </button>

        <button className="rounded-xl border px-6 py-4">
          Voir un exemple
        </button>
      </div>
    </div>
  </section>

  <section className="mx-auto max-w-6xl px-6 py-20">
    <h2 className="text-3xl font-bold">
      Comment fonctionne ReglWatch ?
    </h2>

    <div className="mt-12 grid gap-6 md:grid-cols-4">
      <div>
        <h3 className="font-semibold">1. Surveillance</h3>
        <p className="mt-2 text-slate-600">
          Analyse quotidienne des sources officielles.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">2. Qualification</h3>
        <p className="mt-2 text-slate-600">
          Identification des textes réellement pertinents.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">3. Explication</h3>
        <p className="mt-2 text-slate-600">
          Résumé en langage clair et sans jargon juridique.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">4. Action</h3>
        <p className="mt-2 text-slate-600">
          Vous savez exactement quoi faire et avant quand.
        </p>
      </div>
    </div>
  </section>

  <section className="bg-slate-50 py-20">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl font-bold">Tarifs</h2>

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        <div className="rounded-2xl border bg-white p-8">
          <h3 className="text-2xl font-bold">Essentiel</h3>
          <div className="mt-4 text-5xl font-bold">19€</div>
          <div className="mt-1 text-slate-500">/ mois</div>

          <ul className="mt-8 space-y-3">
            <li>Veille réglementaire ciblée</li>
            <li>Synthèse hebdomadaire</li>
            <li>Alertes urgentes</li>
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-black bg-white p-8">
          <h3 className="text-2xl font-bold">Business</h3>
          <div className="mt-4 text-5xl font-bold">49€</div>
          <div className="mt-1 text-slate-500">/ mois</div>

          <ul className="mt-8 space-y-3">
            <li>Toutes les fonctionnalités</li>
            <li>Priorité sur les alertes</li>
            <li>Suivi avancé</li>
          </ul>
        </div>

      </div>
    </div>
  </section>

</main>

);
}
