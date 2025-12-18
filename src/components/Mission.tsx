import { Card } from "@/components/ui/card";
import { Sparkles, TreePine, MapPin } from "lucide-react";

export const Mission = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Our Mission
            </h2>
            <p className="text-xl text-foreground leading-relaxed">
              The Plainfield Luminary Program is dedicated to bringing our community together through the 
              simple yet powerful symbol of light. Each luminary represents hope, remembrance, and unity, 
              creating a spectacular display that transforms our neighborhood into a beacon of warmth and community spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-background backdrop-blur border-border text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Illuminate</h3>
              <p className="text-foreground text-sm">
                Light up our streets with thousands of glowing luminaries
              </p>
            </Card>

            <Card className="p-6 bg-background backdrop-blur border-border text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <TreePine className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Celebrate</h3>
              <p className="text-foreground text-sm">
                Honor loved ones and celebrate the season together
              </p>
            </Card>

            <Card className="p-6 bg-background backdrop-blur border-border text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Unite</h3>
              <p className="text-foreground text-sm">
                Strengthen bonds and build lasting community connections
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
