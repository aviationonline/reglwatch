import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/piste/auth";

export async function GET() {
  try {
    const token = await getAccessToken();

    return NextResponse.json({
      success: true,
      authenticated: true,
      token_preview: token.substring(0, 25) + "...",
      message: "Authentification PISTE réussie"
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error"
      },
      { status: 500 }
    );

  }
}
