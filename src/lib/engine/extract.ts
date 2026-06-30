import { DocumentRepository } from "../repositories/DocumentRepository";

export interface PendingDocument {
  id: string;
  title: string;
  content: string;
  source_name: string;
  source_url: string;
}

export async function extract(documentId: string): Promise<PendingDocument> {

  const data = await DocumentRepository.getById(documentId);

if (!data) {
  throw new Error("Document introuvable");
}

  return {
    id: data.id,
    title: data.title ?? "",
    content: data.content ?? "",
    source_name: data.source_name ?? "",
    source_url: data.source_url ?? ""
  };

}
