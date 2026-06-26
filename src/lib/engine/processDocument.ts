import { extract } from "./extract";
import { analyze } from "./analyze";
import { saveRegulation } from "./saveRegulation";
import { saveObligations } from "./saveObligations";
import { markProcessed } from "./markProcessed";

export async function processDocument(documentId: string) {

  const document = await extract(documentId);

  const analysis = await analyze(document);

  const regulationId = await saveRegulation(
    document.id,
    analysis
  );

  await saveObligations(
    regulationId,
    analysis
  );

  await markProcessed(document.id);

  return analysis;

}
