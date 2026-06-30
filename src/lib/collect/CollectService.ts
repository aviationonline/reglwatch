import { SearchBuilder } from "@/lib/piste/searchBuilder";
import { search } from "@/lib/piste/search";
import { mapSearchResult } from "./mapper";
import { SourceDocumentRepository } from "@/lib/repositories/SourceDocumentRepository";

export class CollectService {

  async collect() {

    const repository = new SourceDocumentRepository();

    const builder = new SearchBuilder()
      .setFond("ALL")
      .addTitleContains("RGPD");

    const response = await search(builder.build());

    let created = 0;
    let duplicates = 0;
    let errors = 0;

    const documents: { id: string }[] = [];

    for (const result of response.results) {

      try {

        const document = mapSearchResult(result);

        const saved = await repository.save(document);

        documents.push({
          id: saved.id
        });

        if (saved.created) {
          created++;
        } else {
          duplicates++;
        }

      } catch (e) {

        console.error(e);

        errors++;

      }

    }

    return {

      created,

      duplicates,

      errors,

      total: response.results.length,

      documents

    };

  }

}
