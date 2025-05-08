import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
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
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          await handleCheckoutCompleted(
            event.data.object as Stripe.Checkout.Session
          );
          break;
        case "payment_intent.succeeded":
          await handlePaymentIntentSucceeded(
            event.data.object as Stripe.PaymentIntent
          );
          break;
        case "payment_intent.payment_failed":
          await handlePaymentIntentFailed(
            event.data.object as Stripe.PaymentIntent
          );
          break;
        default:
          console.warn(`Unhandled relevant event: ${event.type}`);
      }
    } catch (error) {
      console.error(`Error handling webhook event: ${error}`);
      return NextResponse.json(
        { error: "Error handling webhook event" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("Checkout completed:", session);

  // Here you would typically:
  // 1. Get customer information from session.customer
  // 2. Get order details from session.metadata
  // 3. Create an order in your database
  // 4. Clear the user's cart
  // 5. Send order confirmation email

  // Example (pseudo-code):
  /*
  const userId = session.metadata?.userId;
  const items = JSON.parse(session.metadata?.items || '[]');
  
  await db.orders.create({
    userId,
    items,
    total: session.amount_total,
    status: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'Stripe',
    paymentId: session.payment_intent,
  });
  
  await db.users.updateCart(userId, []);
  await sendOrderConfirmationEmail(userId, session.id);
  */
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  console.log("Payment succeeded:", paymentIntent);

  // Here you would typically:
  // 1. Get order details from paymentIntent.metadata
  // 2. Update the order status in your database
  // 3. Trigger any necessary post-payment workflows

  // Example (pseudo-code):
  /*
  const userId = paymentIntent.metadata?.userId;
  const items = JSON.parse(paymentIntent.metadata?.items || '[]');
  
  await db.orders.updateStatus(paymentIntent.id, 'Paid');
  await triggerOrderFulfillment(paymentIntent.id);
  */
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment failed:", paymentIntent);

  // Here you would typically:
  // 1. Get order details from paymentIntent.metadata
  // 2. Update the order status in your database
  // 3. Notify the customer

  // Example (pseudo-code):
  /*
  const userId = paymentIntent.metadata?.userId;
  
  await db.orders.updateStatus(paymentIntent.id, 'Failed');
  await sendPaymentFailureEmail(userId, paymentIntent.id, paymentIntent.last_payment_error?.message);
  */
}
