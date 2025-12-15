import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, HandHeart } from "lucide-react";
import { HashLink } from "./HashLink";

export const GetInvolved = () => {
  const donationUrl = "https://www.zeffy.com/en-US/donation-form/light-and-unite-plainfield";

  const ways = [
    {
      icon: DollarSign,
      title: "Purchase Luminaries",
      description: "Buy luminaries to honor loved ones and support our community programs.",
      action: "Donate Now",
      link: donationUrl,
    },
    {
      icon: HandHeart,
      title: "Volunteer",
      description: "Help us set up, light, and manage the luminary display on event night.",
      action: "Sign Up",
      link: "#contact",
    },
    {
      icon: Calendar,
      title: "Attend the Event",
      description:
        "Join us for a magical evening of community, music, and thousands of glowing lights.",
      action: "Learn More",
      link: "#about",
    },
  ];

  return (
    <section id="get-involved" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Get Involved</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            There are many ways to participate in the Plainfield Luminary Program and help light up
            our community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ways.map((way, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-secondary transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                <div className="p-4 bg-secondary/10 rounded-full">
                  <way.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold">{way.title}</h3>
                <p className="text-muted-foreground flex-grow">{way.description}</p>
              </div>
              <HashLink to={way.link} className="block mt-6">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  {way.action}
                </Button>
              </HashLink>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
