import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(
  request: NextRequest
) {
  try {
    const {
      priceId,
      userId,
    } = await request.json();

    console.log(
      "CHECKOUT USER ID:",
      userId
    );

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        subscription_data: {
          trial_period_days: 14,

          metadata: {
            user_id: userId,
          },
        },

        success_url:
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,

        cancel_url:
          `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=1`,
      });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(
      "STRIPE CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Erreur Stripe",
      },
      { status: 500 }
    );
  }
}
