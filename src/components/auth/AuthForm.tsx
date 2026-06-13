"use client";

import { useState } from "react";

export default function AuthForm({
  title,
}: {
  title: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md rounded-xl border p-8">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <button
          className="w-full rounded-lg bg-black px-4 py-3 text-white"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
