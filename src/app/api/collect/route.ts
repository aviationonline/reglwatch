import { NextResponse } from "next/server";

import { CollectService }
from "@/lib/collect/CollectService";

export async function POST() {

  try {

    const service =
      new CollectService();

    const result =
      await service.collect();

    return NextResponse.json(result);

  }

  catch (e) {

    return NextResponse.json(

      {

        success: false,

        error:
          e instanceof Error
            ? e.message
            : "Unknown"

      },

      {

        status: 500

      }

    );

  }

}
