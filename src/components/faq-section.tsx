"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faq";
import { slugify } from "@/lib/utils";

export function FaqSection() {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {faqs.map((faq) => (
        <AccordionItem key={faq.question} value={slugify(faq.question)}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <div className="max-w-3xl space-y-3">
              {faq.answer.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
