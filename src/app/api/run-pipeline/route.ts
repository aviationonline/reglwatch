import { NextResponse } from "next/server";

import { PipelineRunner }
from "@/lib/pipeline/PipelineRunner";

export async function POST() {

  try {

    const runner =
      new PipelineRunner();

    const result =
      await runner.run();

    return NextResponse.json(result);

  } catch (e) {

    return NextResponse.json({

      success: false,

      error:
        e instanceof Error
          ? e.message
          : "Unknown"

    }, {

      status: 500

    });

  }

}
