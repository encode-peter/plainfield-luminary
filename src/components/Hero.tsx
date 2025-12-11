import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import community4 from "@/assets/community-4.jpg";
import community5 from "@/assets/community-5.jpg";

const images = [community1, community2, community3, community4, community5];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image carousel */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Plainfield Luminary Program community ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
      ))}

      {/* Twinkling stars overlay */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-20">
      <div className="flex flex-col items-center text-center space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold glow-text">
              Plainfield Luminary Program
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Lighting Up Our Community with Hope, Joy, and Togetherness
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="https://www.zeffy.com/en-US/donation-form/light-and-unite-plainfield" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect transition-all duration-300 hover:scale-105"
              >
                Donate Now
              </Button>
            </a>
            <a href="#about">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </a>
          </div>

          {/* Carousel indicators */}
          <div className="flex gap-2 pt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative lights at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-around items-end pb-4 z-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full sparkle ${
              i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-accent'
            }`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </section>
  );
};
