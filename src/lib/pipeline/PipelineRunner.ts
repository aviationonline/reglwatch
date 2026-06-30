import { CollectService } from "@/lib/collect/CollectService";
import { processDocument } from "@/lib/engine/processDocument";

export class PipelineRunner {

  async run() {

    console.log("=== PIPELINE START ===");

    const started = Date.now();

    const collectService = new CollectService();

    console.log("Collect...");

    const collect = await collectService.collect();

    console.log("Collect terminé");

    let processed = 0;
    let processErrors = 0;

    const results = [];

    for (const document of collect.documents) {

      console.log("Traitement :", document.id);

      try {

        await processDocument(document.id);

        console.log("OK :", document.id);

        processed++;

        results.push({
          id: document.id,
          status: "processed"
        });

      } catch (e) {

        console.error("ERREUR :", document.id, e);

        processErrors++;

        results.push({
          id: document.id,
          status: "error"
        });

      }

    }

    console.log("=== PIPELINE END ===");

    return {

      duration_ms: Date.now() - started,

      collect,

      processed,

      processErrors,

      results

    };

  }

}
