import { getAccessToken } from "./auth";

function baseUrl() {

  const env =
    process.env.PISTE_ENV ?? "sandbox";

  return env === "production"
    ? "https://api.piste.gouv.fr/dila/legifrance/lf-engine-app"
    : "https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app";

}

export async function pisteFetch(
  endpoint: string,
  init?: RequestInit
) {

  const token =
    await getAccessToken();

  const response =
    await fetch(
      baseUrl() + endpoint,
      {
        ...init,

        headers: {

          Authorization:
            `Bearer ${token}`,

          Accept:
            "application/json",

          ...(init?.headers ?? {})

        }

      }
    );

  if (!response.ok) {

    const txt =
      await response.text();

    throw new Error(
      `${response.status}\n${txt}`
    );

  }

  return await response.json();

}
