/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface PaymentFormProps {
  clientSecret: string;
  onSuccess: (paymentIntent: any) => void;
  setPaymentCompleted: (completed: boolean) => void;
  total: number;
}

export default function PaymentForm({
  clientSecret,
  onSuccess,
  setPaymentCompleted,
  total,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setError(error.message || "An unknown error occurred");
        toast.error(
          `Payment failed, ${error.message || "An unknown error occurred"}`
        );
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful. Thank you for your purchase!");
        setPaymentCompleted(true);
        onSuccess(paymentIntent);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(`Payment failed, ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <PaymentElement />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${total}`
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Your payment is processed securely through Stripe. We do not store your
        credit card information.
      </p>
    </form>
  );
}
