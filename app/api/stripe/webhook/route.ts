/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { IOrder } from "@/database/order.model";
import { createOrder } from "@/lib/actions/order-actions";

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

  const subtotal = Number(paymentIntent.metadata?.subtotal) / 100;
  const shipping = Number(paymentIntent.metadata?.shipping) / 100;
  const tax = Number(paymentIntent.metadata?.tax) / 100;
  const total = Number(paymentIntent.amount) / 100;

  const parsedIems = JSON.parse(paymentIntent.metadata?.items || "[]");
  const items = parsedIems.map((item: any) => ({
    book: item.id,
    quantity: item.quantity,
    price: item.price,
  }));
  const shippingAddress = JSON.parse(
    paymentIntent.metadata?.shippingAddress || "{}"
  );
  const billingAddress = JSON.parse(
    paymentIntent.metadata?.billingAddress || "{}"
  );
  const userId = paymentIntent.metadata?.userId;
  const orderId = paymentIntent.id;
  const paymentStatus =
    paymentIntent.status === "succeeded" ? "Paid" : "Pending";

  const paymentMethod = paymentIntent.payment_method_types[0]
    ? "Credit Card"
    : "Unknown";

  const timeline = [
    {
      status: "Order Placed",
      date: new Date(),
      description: `Your order has been placed successfully.`,
    },
    {
      status: "Payment Confirmed",
      date: new Date(),
      description: `Payment of ${total} received.`,
    },
    {
      status: "Processing",
      date: new Date(),
      description: `Order is being processed and prepared for shipping.`,
    },
  ];

  const newOrder = {
    orderId: orderId,
    user: userId,
    items,
    total,
    subtotal,
    shipping,
    tax,
    paymentStatus,
    paymentMethod,
    shippingAddress,
    billingAddress,
    timeline,
  } as unknown as IOrder;

  console.log("New order data:", newOrder);

  const { data, error } = await createOrder(newOrder);
  if (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, order: data }, { status: 200 });
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
