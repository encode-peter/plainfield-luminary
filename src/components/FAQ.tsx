import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteSettings } from "@/hooks/use-setting";
import { useMemo } from "react";

export const FAQ = () => {
  const { donationUrl } = useSiteSettings();

  const faqs = useMemo(
    () => [
      {
        question: "What is the Plainfield Luminary Program?",
        answer:
          "It's a community-led holiday tradition where residents light luminaries on Christmas Eve, creating a beautiful ribbon of light across Plainfield.",
      },
      {
        question: "When do we light the luminaries?",
        answer:
          "On Christmas Eve at dusk — usually around 4:30–5:00 PM. Many blocks coordinate a shared lighting time.",
      },
      {
        question: "How much does it cost to participate?",
        answer:
          "We ask for a modest donation of $1 per bag to cover materials (bags, candles, sand) and support our Build Parties. If you cannot donate, that is ok. Everyone is welcome to our program. We love our volunteers!",
      },
      {
        question: "What is a Luminary Build Party?",
        answer:
          "A Build Party is a fun, hands-on gathering where volunteers assemble luminary kits. It's family-friendly, upbeat, and a great way to meet neighbors while helping Plainfield shine.",
      },
      {
        question: "What is a Block Captain and what are their responsibilities?",
        answer:
          'A Block Captain is a neighborhood volunteer who: invites neighbors to join, shares sign-up and donation information, coordinates luminary placement and lighting on Christmas Eve, helps with cleanup on Christmas Day, and serves as the friendly "go-to" person for the street.',
      },
      {
        question: "I can't volunteer… can I still help?",
        answer:
          "Absolutely! Donations help fund materials, events, and local charities such as the Star Fish Food Pantry.",
        link: donationUrl ? { text: "Click here to make a donation", url: donationUrl } : undefined,
      },
      {
        question: "When is cleanup?",
        answer:
          "On Christmas Day, simply pick up your luminaries and dispose of them properly. If you need help, a Block Captain or volunteer can assist.",
      },
      {
        question: "How can my business get involved?",
        answer:
          "Local businesses can become Community Light Partners with a $250 sponsorship. Sponsors are recognized on our website, in volunteer communications, and at our January Recognition Party. Email us at plainfieldluminaryprogram@gmail.com.",
      },
      {
        question: "What happens after Christmas Eve?",
        answer:
          "In early January we host the Luminary Recognition Party at the duCret School of Art to celebrate volunteers, thank sponsors, share photos, and present donations to local charities.",
      },
      {
        question: "Who benefits from the money raised?",
        answer:
          "Funds support local Plainfield families in need through organizations such as the Star Fish Food Pantry and other local charities.",
      },
    ],
    [donationUrl]
  );

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold glow-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the Plainfield Luminary Program
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background/50 rounded-lg border border-primary/20 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                  {faq.link && (
                    <a
                      href={faq.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-primary hover:underline font-medium"
                    >
                      {faq.link.text} →
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
