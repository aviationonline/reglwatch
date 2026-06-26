import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe/stripe";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.text();

  const signature =
    (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        let userId =
          session.metadata?.user_id;

        if (!userId && session.subscription) {
          const subscription =
            await stripe.subscriptions.retrieve(
              session.subscription as string
            );

          userId =
            subscription.metadata?.user_id;

          if (!userId) {
            break;
          }

          const item =
            subscription.items.data[0];

          const priceId =
            item.price.id;

          const plan =
            priceId ===
            process.env.STRIPE_PRICE_BUSINESS
              ? "business"
              : "starter";

          await supabaseAdmin
            .from("subscriptions")
            .upsert({
              user_id: userId,
              stripe_customer_id:
                String(session.customer),
              stripe_subscription_id:
                subscription.id,
              plan,
              status: subscription.status,
              trial_end:
                subscription.trial_end
                  ? new Date(
                      subscription.trial_end * 1000
                    ).toISOString()
                  : null,
            });

          break;
        }

        const subscription =
          await stripe.subscriptions.retrieve(
            session.subscription as string
          );

        const item =
          subscription.items.data[0];

        const priceId =
          item.price.id;

        const plan =
          priceId ===
          process.env.STRIPE_PRICE_BUSINESS
            ? "business"
            : "starter";

        await supabaseAdmin
          .from("subscriptions")
          .upsert({
            user_id: userId,
            stripe_customer_id:
              String(session.customer),
            stripe_subscription_id:
              subscription.id,
            plan,
            status: subscription.status,
            trial_end:
              subscription.trial_end
                ? new Date(
                    subscription.trial_end * 1000
                  ).toISOString()
                : null,
          });

        break;
      }

      case "customer.subscription.updated": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: subscription.status,
            trial_end:
              subscription.trial_end
                ? new Date(
                    subscription.trial_end * 1000
                  ).toISOString()
                : null,
          })
          .eq(
            "stripe_subscription_id",
            subscription.id
          );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "canceled",
          })
          .eq(
            "stripe_subscription_id",
            subscription.id
          );

        break;
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Webhook error",
      },
      {
        status: 500,
      }
    );
  }
}
