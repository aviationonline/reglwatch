import { NextResponse } from "next/server";
import { processDocument } from "@/lib/engine/processDocument";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const result = await processDocument(body.content);

    return NextResponse.json(result);

  } catch (e) {

    console.error(e);

    return NextResponse.json(
      { error: "processing failed" },
      { status: 500 }
    );

  }

}
