import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function AdminRegulationsPage() {
  const { data: regulations, error } = await supabaseAdmin
    .from("regulations")
    .select(`
      id,
      title,
      urgency,
      effective_date,
      status,
      sectors,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Administration des réglementations
        </h1>

        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          Erreur : {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="p-8">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Réglementations
        </h1>

        <div className="text-sm text-gray-500">
          {regulations?.length ?? 0} réglementation(s)
        </div>

      </div>

      <div className="overflow-x-auto rounded-xl border">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Titre</th>

              <th className="text-left p-4">Urgence</th>

              <th className="text-left p-4">Date d'effet</th>

              <th className="text-left p-4">Statut</th>

              <th className="text-left p-4">Secteurs</th>

            </tr>

          </thead>

          <tbody>

            {regulations?.map((regulation) => (

              <tr
                key={regulation.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {regulation.title}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      regulation.urgency === "critical"
                        ? "bg-red-600 text-white"
                        : regulation.urgency === "high"
                        ? "bg-orange-500 text-white"
                        : regulation.urgency === "medium"
                        ? "bg-yellow-300"
                        : "bg-green-200"
                    }`}
                  >
                    {regulation.urgency}
                  </span>

                </td>

                <td className="p-4">
                  {regulation.effective_date ?? "-"}
                </td>

                <td className="p-4">
                  {regulation.status}
                </td>

                <td className="p-4">
                  {(regulation.sectors ?? []).join(", ")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
