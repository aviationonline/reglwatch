import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/stripe";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const { data: subscription, error } =
      await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error || !subscription) {
      return NextResponse.json(
        {
          error: "Subscription not found",
        },
        {
          status: 404,
        }
      );
    }

    const session =
      await stripe.billingPortal.sessions.create({
        customer:
          subscription.stripe_customer_id,

        return_url:
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Portal error",
      },
      {
        status: 500,
      }
    );
  }
}
