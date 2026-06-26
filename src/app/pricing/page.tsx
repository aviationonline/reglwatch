"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function PricingPage() {
  const [loading, setLoading] = useState("");
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

  async function startCheckout(priceId: string) {
    try {
      if (!userId) {
        alert(
          "Vous devez être connecté avant de souscrire."
        );
        return;
      }

      setLoading(priceId);

      const response = await fetch(
        "/api/stripe/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            priceId,
            userId,
          }),
        }
      );

      const data =
        await response.json();

      if (data.url) {
        window.location.href =
          data.url;
      }
    } catch (error) {
      alert(
        "Erreur lors de la création du paiement."
      );
    } finally {
      setLoading("");
    }
  }

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
            <li>
              ✓ Veille réglementaire ciblée
            </li>
            <li>
              ✓ Alertes essentielles
            </li>
            <li>
              ✓ Synthèse hebdomadaire
            </li>
          </ul>

          <button
            onClick={() =>
              startCheckout(
                "price_1Tg33D0iAQbOjmQHOyDZMEy3"
              )
            }
            disabled={loading !== ""}
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            {loading ===
            "price_1Tg33D0iAQbOjmQHOyDZMEy3"
              ? "Chargement..."
              : "Essai gratuit 14 jours"}
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
            <li>
              ✓ Toutes les fonctionnalités Starter
            </li>
            <li>
              ✓ Alertes prioritaires
            </li>
            <li>
              ✓ Suivi avancé
            </li>
            <li>
              ✓ Assistance prioritaire
            </li>
          </ul>

          <button
            onClick={() =>
              startCheckout(
                "price_1Tg35Z0iAQbOjmQHdijIeyWk"
              )
            }
            disabled={loading !== ""}
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            {loading ===
            "price_1Tg35Z0iAQbOjmQHdijIeyWk"
              ? "Chargement..."
              : "Essai gratuit 14 jours"}
          </button>
        </div>

      </div>
    </main>
  );
}
