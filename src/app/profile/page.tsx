"use client";

import { useEffect, useState } from "react";

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
      const { createBrowserSupabaseClient } = await import(
        "@/lib/supabase/browser"
      );

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

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
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

    window.location.href = "/dashboard";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">

      <h1 className="text-4xl font-bold">
        Configuration de votre entreprise
      </h1>

      <p className="mt-3 text-gray-700">
        Ces informations permettent à ReglWatch
        de personnaliser votre veille réglementaire.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >

        <div>
          <label className="block font-medium">
            Raison sociale
          </label>

          <input
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium">
            Forme juridique
          </label>

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
          <label className="block font-medium">
            Nombre de salariés
          </label>

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
          <label className="block font-medium">
            Secteur
          </label>

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
            : "Créer mon entreprise"}
        </button>

        {message && (
          <p className="text-red-600">
            {message}
          </p>
        )}

      </form>

    </main>
  );
}
