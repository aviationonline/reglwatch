import { pisteFetch } from "./client";
import { SearchRequest } from "./types";

export async function search(
  request: SearchRequest
) {

  return pisteFetch(
    "/search",
    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json"

      },

      body: JSON.stringify(request)

    }

  );

}
