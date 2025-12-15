import { Card } from "@/components/ui/card";
import { ShoppingBag, MapPinned, Flame, Camera } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingBag,
      number: "1",
      title: "Purchase Luminaries",
      description: "Order luminaries online or through our local partners. Each luminary can be dedicated to honor someone special.",
    },
    {
      icon: MapPinned,
      number: "2",
      title: "We Set Up",
      description: "Our dedicated volunteers carefully place luminaries throughout the neighborhood, creating magical pathways of light.",
    },
    {
      icon: Flame,
      number: "3",
      title: "Lighting Night",
      description: "On the designated evening, we light thousands of luminaries, transforming Plainfield into a glowing wonderland.",
    },
    {
      icon: Camera,
      number: "4",
      title: "Experience the Magic",
      description: "Walk through the illuminated streets, enjoy the beauty, and share this special moment with family and neighbors.",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Participating in the Plainfield Luminary Program is simple and rewarding. 
            Here's how we bring the magic of light to our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary transition-all duration-300 relative overflow-hidden group"
            >
              {/* Number badge */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                {step.number}
              </div>

              <div className="space-y-4 pr-16">
                <div className="p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
