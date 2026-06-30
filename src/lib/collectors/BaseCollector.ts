export interface CollectedDocument {
  externalId: string;
  title: string;
  url: string;
  publishedAt: string;
  content: string;
  rawPayload: unknown;
}

export interface BaseCollector {
  collect(): Promise<CollectedDocument[]>;
}
