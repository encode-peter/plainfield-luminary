import { Card } from "@/components/ui/card";

export const Impact = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Luminaries",
      description: "Glowing bright each year",
    },
    {
      number: "100+",
      label: "Volunteers",
      description: "Making it happen",
    },
    {
      number: "1,000s",
      label: "Families",
      description: "Participating annually",
    },
    {
      number: "15+",
      label: "Years",
      description: "Of community tradition",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Our Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over a decade, the Plainfield Luminary Program has brought joy, hope, and unity to our community. 
            Together, we've created countless memories and strengthened the bonds that make Plainfield special.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-background border-border text-center hover:border-primary transition-all duration-300 group"
            >
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary glow-text group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-center">Where Your Donations Go</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <span className="text-primary font-semibold">• Materials & Supplies:</span> Luminaries, candles, sand, and all the essentials to create our beautiful display
              </p>
              <p>
                <span className="text-primary font-semibold">• Community Programs:</span> Supporting local initiatives and causes that benefit Plainfield residents
              </p>
              <p>
                <span className="text-primary font-semibold">• Event Operations:</span> Setup, safety measures, and coordination to ensure a magical experience for everyone
              </p>
              <p>
                <span className="text-primary font-semibold">• Future Growth:</span> Expanding the program to reach more streets and touch more lives each year
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
