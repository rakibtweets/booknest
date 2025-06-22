import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Book-Next, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree
              to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use License</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Permission is granted to temporarily access Book-Next for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on the
                  website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Account Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                When you create an account with us, you must provide accurate
                and complete information.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You are responsible for safeguarding your account password
                </li>
                <li>
                  You are responsible for all activities that occur under your
                  account
                </li>
                <li>
                  We reserve the right to refuse service or terminate accounts
                  at our discretion
                </li>
                <li>
                  One person or legal entity may not maintain more than one
                  account
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Orders and Payment</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>By placing an order, you agree to the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All orders are subject to availability and confirmation</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Payment must be received before order processing</li>
                <li>
                  You are responsible for providing accurate shipping
                  information
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Returns and Refunds</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Our return policy includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Items must be returned within 30 days of purchase</li>
                <li>Books must be in original condition</li>
                <li>Digital products are non-refundable unless defective</li>
                <li>
                  Return shipping costs are the responsibility of the customer
                </li>
                <li>Refunds will be processed within 5-10 business days</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="text-muted-foreground">
              The materials on Book-Next are provided on an &apos;as is&apos;
              basis. Book-Next makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please
              contact us at support@booknest.com or through our customer support
              channels.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
