import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import faqs from "@/constants/faqs";

export default function FAQSection() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about Book-Next
          </p>
        </div>

        <div className="mb-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 5).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/faq">
              <span className="text-sm">View All FAQs</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
