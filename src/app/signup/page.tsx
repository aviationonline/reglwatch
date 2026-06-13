"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("SIGNUP CLICK");
    
    setLoading(true);
    setMessage("");

    const supabase = createBrowserSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Compte créé avec succès.");

    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-xl border p-8"
      >
        <h1 className="mb-6 text-3xl font-bold">
          Créer un compte TEST123
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
          required
        />

       <div
          onClick={() => alert("CLICK OK")}
          className="mb-4 rounded border p-4 cursor-pointer"
        >
          TEST CLICK
        </div> 


        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 text-white"
        >
          {loading ? "Création..." : "BOUTON TEST 999"}
        </button>

        {message && (
          <p className="mt-4 text-sm">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
