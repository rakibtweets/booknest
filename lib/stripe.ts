import { loadStripe } from "@stripe/stripe-js";

// Load the Stripe.js script and initialize with your publishable key
export const getStripe = async () => {
  // Ensure we only create one instance of Stripe
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  return stripePromise;
};

// Define Stripe line items interface
export interface StripeLineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images?: string[];
      description?: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

// Calculate order summary
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateOrderSummary = (items: any[]) => {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || item.book.price) * item.quantity,
    0
  );

  // Define constants (these could be moved to a config file)
  const TAX_RATE = 0.08; // 8% tax
  const SHIPPING_RATE = 599; // $5.99 shipping
  const FREE_SHIPPING_THRESHOLD = 5000; // Free shipping for orders over $50

  // Calculate shipping and tax
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
    formattedSubtotal: StripeFormatCurrency(subtotal),
    formattedShipping: StripeFormatCurrency(shipping),
    formattedTax: StripeFormatCurrency(tax),
    formattedTotal: StripeFormatCurrency(total),
  };
};

// Format currency
export const StripeFormatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100); // Stripe uses cents
};
