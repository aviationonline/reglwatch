export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-5xl font-bold tracking-tight">
          Ne manquez plus une obligation réglementaire importante.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          ReglWatch surveille les sources officielles françaises et vous
          explique uniquement ce qui concerne votre entreprise.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-lg bg-black px-6 py-3 text-white">
            Essai gratuit 14 jours
          </button>

          <button className="rounded-lg border px-6 py-3">
            Voir une démonstration
          </button>
        </div>
      </section>
    </main>
  );
}
