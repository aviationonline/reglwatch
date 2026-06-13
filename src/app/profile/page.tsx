export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Profil entreprise
      </h1>

      <p className="mt-2 text-slate-600">
        Ces informations permettront à ReglWatch de filtrer
        uniquement les réglementations qui vous concernent.
      </p>

      <form className="mt-10 space-y-6">

        <div>
          <label>Raison sociale</label>
          <input
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Ma société"
          />
        </div>

        <div>
          <label>Forme juridique</label>
          <select className="mt-2 w-full rounded-lg border p-3">
            <option>SAS</option>
            <option>SASU</option>
            <option>SARL</option>
            <option>EURL</option>
            <option>EI</option>
          </select>
        </div>

        <div>
          <label>Nombre de salariés</label>
          <select className="mt-2 w-full rounded-lg border p-3">
            <option>0</option>
            <option>1-10</option>
            <option>11-49</option>
            <option>50-249</option>
            <option>250+</option>
          </select>
        </div>

        <div>
          <label>Secteur</label>
          <select className="mt-2 w-full rounded-lg border p-3">
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
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Enregistrer
        </button>

      </form>
    </main>
  );
}
