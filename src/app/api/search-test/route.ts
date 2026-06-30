import { NextResponse } from "next/server";

import { SearchBuilder }
from "@/lib/piste/searchBuilder";

import { search }
from "@/lib/piste/search";

export async function GET() {

  try {

    const builder =
      new SearchBuilder()

      .setFond("ALL")

      .addTitleContains("RGPD");

    const result =
      await search(
        builder.build()
      );

    return NextResponse.json(result);

  }

  catch (e) {

    return NextResponse.json({

      success: false,

      error:
        e instanceof Error
          ? e.message
          : "Unknown"

    });

  }

}
