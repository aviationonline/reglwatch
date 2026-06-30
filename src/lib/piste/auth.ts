type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

let cachedToken: string | null = null;
let expiresAt = 0;

function oauthUrl() {
  const env =
    process.env.PISTE_ENV ?? "sandbox";

  return env === "production"
    ? "https://oauth.piste.gouv.fr/api/oauth/token"
    : "https://sandbox-oauth.piste.gouv.fr/api/oauth/token";
}

async function requestToken(): Promise<TokenResponse> {

  const clientId =
    process.env.PISTE_CLIENT_ID;

  const clientSecret =
    process.env.PISTE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "PISTE_CLIENT_ID ou PISTE_CLIENT_SECRET absent."
    );
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret
  });

  const response = await fetch(
    oauthUrl(),
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      },
      body
    }
  );

  if (!response.ok) {

    const txt =
      await response.text();

    throw new Error(
      `OAuth ${response.status}\n${txt}`
    );

  }

  return await response.json();

}

export async function getAccessToken() {

  const now = Date.now();

  if (
    cachedToken &&
    now < expiresAt
  ) {
    return cachedToken;
  }

  const token =
    await requestToken();

  cachedToken =
    token.access_token;

  expiresAt =
    now +
    (token.expires_in - 60) * 1000;

  return cachedToken;

}
