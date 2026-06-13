export default function DashboardPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        Tableau de bord ReglWatch
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border p-6">
          🔴 Actions obligatoires
        </div>

        <div className="rounded-xl border p-6">
          🟠 Vigilance
        </div>

        <div className="rounded-xl border p-6">
          🔵 Informations
        </div>

        <div className="rounded-xl border p-6">
          🟢 Opportunités
        </div>
      </div>
    </main>
  );
}
