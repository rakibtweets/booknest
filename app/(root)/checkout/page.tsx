"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { calculateOrderSummary, StripeFormatCurrency } from "@/lib/stripe";
import { Loader2 } from "lucide-react";
import { CartItem, Order, Address } from "@/types/stripe";
import CartSummary from "@/components/checkout/CartSummary";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import AddressForm, { AddressFormValues } from "@/components/forms/AddressForm";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import PaymentForm from "@/components/forms/PaymentForm";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";

// Mock data - replace with actual data fetching in a real application
// const mockCartItems: CartItem[] = [
//   {
//     book: {
//       _id: "1",
//       title: "The Great Gatsby",
//       author: "F. Scott Fitzgerald",
//       price: 1299,
//       coverImage:
//         "https://images.pexels.com/photos/3747163/pexels-photo-3747163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     quantity: 1,
//     addedAt: new Date(),
//   },
//   {
//     book: {
//       _id: "2",
//       title: "To Kill a Mockingbird",
//       author: "Harper Lee",
//       price: 1499,
//       coverImage:
//         "https://images.pexels.com/photos/3747511/pexels-photo-3747511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     quantity: 2,
//     addedAt: new Date(),
//   },
// ];

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutPage() {
  const { cartItems, subtotal, shipping, tax, total, user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  // const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [addressData, setAddressData] = useState<AddressFormValues | null>(
    null
  );
  const [isAddressSubmitted, setIsAddressSubmitted] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Calculate order summary
  // const { subtotal, shipping, tax, total } = calculateOrderSummary(cartItems);

  // Handle quantity update
  // const handleUpdateQuantity = (id: string, quantity: number) => {
  //   setCartItems((prev) =>
  //     prev.map((item) => (item.book._id === id ? { ...item, quantity } : item))
  //   );
  // };

  // Handle item removal
  // const handleRemoveItem = (id: string) => {
  //   setCartItems((prev) => prev.filter((item) => item.book._id !== id));
  // };

  // Create payment intent
  useEffect(() => {
    if (currentStep === 2 && addressData && !clientSecret) {
      const createPaymentIntent = async () => {
        setLoading(true);
        try {
          console.log("Creating payment intent...");
          const response = await fetch("/api/checkout", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user,
              items: cartItems,
              total: total,
              shipping,
              tax,
              subtotal,
              shippingAddress: addressData.shippingAddress,
              billingAddress: addressData.sameAsBilling
                ? addressData.shippingAddress
                : addressData.billingAddress,
            }),
          });

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error);
          }

          console.log("Payment intent created:", data.clientSecret);

          setClientSecret(data.clientSecret);
        } catch (error: any) {
          toast.error(error.message || "Failed to initialize payment");
          // Go back to address step
          setCurrentStep(1);
        } finally {
          setLoading(false);
        }
      };

      createPaymentIntent();
    }
  }, [currentStep, addressData, clientSecret, cartItems, toast]);

  // Handle payment success
  const handlePaymentSuccess = (paymentIntent: any) => {
    // Create an order object
    const newOrder: Order = {
      orderId: paymentIntent.id,
      user: user as string, // Replace with actual user ID
      items: cartItems?.map((item) => ({
        book: item.book,
        quantity: item.quantity,
        price: item.book.price,
      })),
      status: "Processing",
      total,
      subtotal,
      shipping,
      tax,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      shippingAddress: addressData?.shippingAddress as Address,
      billingAddress: addressData?.sameAsBilling
        ? (addressData.shippingAddress as Address)
        : (addressData?.billingAddress as Address),
      timeline: [
        {
          status: "Order Placed",
          date: new Date(),
          description: "Your order has been received and is being processed.",
        },
      ],
      createdAt: new Date(),
    };

    setOrder(newOrder);
    setPaymentCompleted(true);
    setCurrentStep(3);

    // In a real application, you would also clear the cart here
  };

  // Check if user can proceed to next step
  const canProceed = () => {
    if (currentStep === 0) {
      return cartItems.length > 0;
    }
    if (currentStep === 1) {
      return isAddressSubmitted;
    }

    return true;
  };

  // Render checkout steps
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CartSummary
            items={cartItems}
            // onUpdateQuantity={handleUpdateQuantity}
            // onRemoveItem={handleRemoveItem}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            isEditable={false}
          />
        );
      case 1:
        return (
          <AddressForm
            // onSubmit={handleAddressSubmit}
            setIsAddressSubmitted={setIsAddressSubmitted}
            setAddressData={setAddressData}
          />
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              {clientSecret && stripePromise ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    setPaymentCompleted={setPaymentCompleted}
                    total={total}
                  />
                </Elements>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <CartSummary
                items={cartItems}
                // onUpdateQuantity={handleUpdateQuantity}
                // onRemoveItem={handleRemoveItem}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                isEditable={false}
              />
            </div>
          </div>
        );
      case 3:
        return order ? (
          <OrderConfirmation order={order} />
        ) : (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <CheckoutLayout
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      canProceed={canProceed()}
    >
      {renderStep()}
    </CheckoutLayout>
  );
}
