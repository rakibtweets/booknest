import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { StripeFormatCurrency } from "@/lib/stripe";
import { metadata } from "@/app/layout";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const { items, shippingAddress, billingAddress } = await req.json();

    // Validate the request
    if (!items || !items.length) {
      return NextResponse.json(
        { error: "Cart items are required" },
        { status: 400 }
      );
    }

    if (!shippingAddress || !billingAddress) {
      return NextResponse.json(
        { error: "Shipping and billing addresses are required" },
        { status: 400 }
      );
    }

    // Calculate order details
    const subtotal = items.reduce(
      (acc: number, item: any) => acc + item.book.price * item.quantity,
      0
    );

    const TAX_RATE = 0.08; // 8% tax
    const SHIPPING_RATE = 599; // $5.99 shipping
    const FREE_SHIPPING_THRESHOLD = 5000; // Free shipping for orders over $50

    const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.book.title,
          description: `Author: ${item.book.author}`,
          images: [item.book.coverImage],
        },
        unit_amount: item.book.price,
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shipping,
              currency: "usd",
            },
            display_name:
              subtotal > FREE_SHIPPING_THRESHOLD
                ? "Free Shipping"
                : "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1299,
              currency: "usd",
            },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
      ],
      metadata: {
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        total: total.toString(),
        userId: "user_id_here", // Replace with actual user ID from your auth system
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: JSON.stringify(billingAddress),
      },
    });

    // Return the session ID to the client
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// Alternative API endpoint using Payment Intents (for custom checkout UI)
export async function PUT(req: Request) {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      total,
      shipping,
      tax,
      subtotal,
      user,
    } = await req.json();

    // Validate the request
    if (!items || !items.length) {
      return NextResponse.json(
        { error: "Cart items are required" },
        { status: 400 }
      );
    }

    const subtotalCents = Math.round(subtotal * 100); // Convert to cents
    const shippingCents = Math.round(shipping * 100); // Convert to cents
    const taxCents = Math.round(tax * 100); // Convert to cents
    const totalCents = Math.round(total * 100); // Convert to cents

    const TAX_RATE = 0.08; // 8% tax
    const SHIPPING_RATE = 599; // $5.99 shipping
    const FREE_SHIPPING_THRESHOLD = 5000; // Free shipping for orders over $50

    // const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
    // const tax = Math.round(subtotal * TAX_RATE);
    // const total = subtotal + shipping + tax;

    // console.log("stripe put", stripe);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents, // Amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?step=confirm`,
      metadata: {
        subtotal: subtotalCents.toString(),
        shipping: shippingCents.toString(),
        tax: taxCents.toString(),
        items: JSON.stringify(
          items.map((item: any) => ({
            id: item.book._id,
            title: item.book.title,
            quantity: item.quantity,
            price: item.book.price,
          }))
        ),
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: JSON.stringify(billingAddress),
        userId: user, // Replace with actual user ID from your auth system
      },
    });
    console.log("stripe", paymentIntent);

    // Return the client secret to the client
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: total,
    });
  } catch (error: any) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
