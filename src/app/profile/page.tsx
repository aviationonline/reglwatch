"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function ProfilePage() {
  const [companyName, setCompanyName] = useState("");
  const [legalForm, setLegalForm] = useState("SAS");
  const [employees, setEmployees] = useState("1-10");
  const [sector, setSector] = useState("Services");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function loadUser() {
      const supabase = createBrowserSupabaseClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    }

    loadUser();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        company_name: companyName,
        legal_form: legalForm,
        employees,
        sector,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      setMessage(result.error || "Erreur");
      setLoading(false);
      return;
    }

    setMessage("Entreprise enregistrée avec succès");
    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Profil entreprise
      </h1>

      <p className="mt-2 text-slate-600">
        Ces informations permettront à ReglWatch de filtrer
        uniquement les réglementations qui vous concernent.
      </p>

      <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm">
        Utilisateur connecté :
        <div className="mt-1 break-all font-mono">
          {userId || "Chargement..."}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >
        <div>
          <label>Raison sociale</label>

          <input
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Ma société"
            required
          />
        </div>

        <div>
          <label>Forme juridique</label>

          <select
            value={legalForm}
            onChange={(e) =>
              setLegalForm(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option>SAS</option>
            <option>SASU</option>
            <option>SARL</option>
            <option>EURL</option>
            <option>EI</option>
          </select>
        </div>

        <div>
          <label>Nombre de salariés</label>

          <select
            value={employees}
            onChange={(e) =>
              setEmployees(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option>0</option>
            <option>1-10</option>
            <option>11-49</option>
            <option>50-249</option>
            <option>250+</option>
          </select>
        </div>

        <div>
          <label>Secteur</label>

          <select
            value={sector}
            onChange={(e) =>
              setSector(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option>Commerce</option>
            <option>Restauration</option>
            <option>BTP</option>
            <option>Transport</option>
            <option>Industrie</option>
            <option>Services</option>
            <option>Immobilier</option>
            <option>Professions libérales</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer"}
        </button>

        {message && (
          <p className="text-sm">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
