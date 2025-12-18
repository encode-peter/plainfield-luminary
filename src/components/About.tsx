import { Card } from "@/components/ui/card";
import { Lightbulb, Heart, Users } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "Light the Way",
      description: "Every luminary represents hope and remembrance, creating a beautiful pathway of light through our community.",
    },
    {
      icon: Heart,
      title: "Community Spirit",
      description: "Bringing neighbors together to celebrate, remember, and support one another during the holiday season.",
    },
    {
      icon: Users,
      title: "Make a Difference",
      description: "Funds raised through the luminary program support local causes and make a real impact in Plainfield.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            About Our Program
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Plainfield Luminary Program illuminates our community with thousands of glowing luminaries,
            creating a spectacular display that honors loved ones and brings our neighborhood together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
