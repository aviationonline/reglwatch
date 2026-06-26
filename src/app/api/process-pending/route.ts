import { NextRequest, NextResponse } from "next/server";
import { processDocument } from "@/lib/engine/processDocument";

export async function POST(req: NextRequest) {

  const body = await req.json();

  const result = await processDocument(body.documentId);

  return NextResponse.json(result);

}
