"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  MapPin,
  CreditCard,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheckoutStep {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface CheckoutLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canProceed: boolean;
}

const steps: CheckoutStep[] = [
  {
    id: "cart",
    title: "Cart",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    id: "shipping",
    title: "Address",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: "payment",
    title: "Payment",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "confirmation",
    title: "Confirm",
    icon: <Check className="h-5 w-5" />,
  },
];

export default function CheckoutLayout({
  children,
  currentStep,
  setCurrentStep,
  canProceed,
}: CheckoutLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-3">
          <div className="hidden md:flex items-center justify-between mb-8">
            {steps?.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={cn(
                    "flex items-center",
                    currentStep >= index
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  // onClick={() => {
                  //   if (currentStep > index) {
                  //     setCurrentStep(index);
                  //   }
                  // }}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-full border-2",
                      currentStep >= index
                        ? "border-primary bg-primary/10"
                        : "border-muted-foreground bg-background"
                    )}
                  >
                    {step.icon}
                  </div>
                  <span className="ml-2 font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 w-16 lg:w-24 rounded-full",
                      currentStep > index ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">
                {steps[currentStep].title}
              </h2>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div
            key={currentStep}
            className="bg-card p-6 rounded-lg shadow-sm border border-border"
          >
            {children}
          </div>
        </div>

        <div className="md:col-span-3 mt-6 flex justify-between">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}

          {currentStep === 0 && <div />}

          {currentStep < steps.length - 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed}
              className="flex items-center ml-auto"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
