import { NextResponse } from "next/server";

import { search }
from "@/lib/piste/search";

import { SearchBuilder }
from "@/lib/piste/searchBuilder";

import { mapSearchResult }
from "@/lib/collect/mapper";

export async function GET() {

  const builder =
    new SearchBuilder()
      .setFond("ALL")
      .addTitleContains("RGPD");

  const response =
    await search(
      builder.build()
    );

  const mapped =
    response.results.map(
      mapSearchResult
    );

  return NextResponse.json({

    count: mapped.length,

    first:
      mapped[0]

  });

}
