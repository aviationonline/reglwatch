"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function DashboardPage() {
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const supabase = createBrowserSupabaseClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const { data } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setCompany(data);
      }
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold">
          Tableau de bord ReglWatch
        </h1>

        <p className="mt-2 text-slate-600">
          Votre veille réglementaire personnalisée.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="font-bold">
            Utilisateur connecté
          </h2>

          <p className="mt-2 break-all text-sm">
            {userId}
          </p>
        </div>

        <div className="mt-8 rounded-xl bg-white p-8 shadow">
          <h2 className="text-xl font-bold">
            Votre entreprise
          </h2>

          {company ? (
            <div className="mt-6 space-y-3">

              <p>
                <strong>Nom :</strong>{" "}
                {company.company_name}
              </p>

              <p>
                <strong>Forme juridique :</strong>{" "}
                {company.legal_form}
              </p>

              <p>
                <strong>Secteur :</strong>{" "}
                {company.sector}
              </p>

              <p>
                <strong>Effectif :</strong>{" "}
                {company.employees}
              </p>

              <p>
                <strong>Formule :</strong>{" "}
                Essai gratuit
              </p>

            </div>
          ) : (
            <p className="mt-4 text-slate-500">
              Aucune entreprise trouvée.
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="text-sm text-slate-500">
              Actions obligatoires
            </div>

            <div className="mt-2 text-4xl font-bold text-red-600">
              0
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="text-sm text-slate-500">
              Vigilance
            </div>

            <div className="mt-2 text-4xl font-bold text-orange-500">
              0
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="text-sm text-slate-500">
              Informations
            </div>

            <div className="mt-2 text-4xl font-bold text-blue-500">
              0
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="text-sm text-slate-500">
              Opportunités
            </div>

            <div className="mt-2 text-4xl font-bold text-green-600">
              0
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
