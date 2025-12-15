import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Gift, Star, Users2 } from "lucide-react";

export const Donation = () => {
  const donationUrl = "https://www.zeffy.com/en-US/donation-form/light-and-unite-plainfield";

  const impact = [
    {
      icon: Star,
      title: "Honor Loved Ones",
      description: "Each luminary can be dedicated to someone special in your life",
    },
    {
      icon: Users2,
      title: "Support Community",
      description: "Funds help maintain and grow the program for years to come",
    },
    {
      icon: Gift,
      title: "Create Magic",
      description: "Your contribution helps create an unforgettable experience",
    },
  ];

  return (
    <section id="donate" className="py-24 px-4 relative overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 animate-float">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Light Up Plainfield</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your donation helps us continue this beautiful tradition of bringing light, hope, and
            community together. Every contribution makes a difference in keeping our streets glowing
            bright.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {impact.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-background/80 backdrop-blur border-border hover:border-primary transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main CTA */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Make Your Donation Today</h3>
            <p className="text-muted-foreground mb-8">
              Join us in lighting up Plainfield this holiday season. Your generosity helps create a
              magical experience for the entire community and supports local causes.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect transition-all duration-300 hover:scale-105 text-lg px-8"
              onClick={() => window.open(donationUrl, "_blank")}
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Secure donation processing powered by Zeffy
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
