import { SourceDocument } from "./types";

export function mapSearchResult(
  result: any
): SourceDocument {

  const title =
    result.titles?.[0];

  return {

    externalId:
      title?.id ?? "",

    cid:
      title?.cid ?? null,

    title:
      title?.title ?? "",

    origin:
      result.origin ?? "",

    nature:
      result.nature ?? null,

    status:
      result.etat ?? null,

    publicationDate:
      result.datePublication ?? null,

    signatureDate:
      result.dateSignature ?? null,

    nor:
      result.nor ?? null,

    content:
      result.text ?? null

  };

}
