import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { HashLink } from "@/components/HashLink";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Sponsor } from "@/types/SponsorTypes";
import { getSponsors } from "@/data/sponsors";

export const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsors = async () => {
      setLoading(true);
      const data = (await getSponsors()).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      setSponsors(data);
      setLoading(false);
    };
    loadSponsors();
  }, []);
  return (
    <section id="sponsors" className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our <span className="text-primary">Sponsors</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thank you to our generous sponsors who help light up Plainfield
          </p>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex justify-end items-center animate-marquee">
          {sponsors.length === 0 && !loading && (
            <p className="text-muted-foreground col-span-full text-center">
              No Sponsors at the moment. Please check back later!
            </p>
          )}
          {loading ? (
            <Spinner className="size-10" />
          ) : (
            sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="mx-6 px-8 py-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-background/30 overflow-hidden flex items-center justify-center">
                    <img
                      src={sponsor.imageUrl}
                      alt={`${sponsor.name} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {sponsor.websiteUrl ? (
                    <HashLink to={sponsor.websiteUrl}>
                      <span className="text-foreground font-medium whitespace-nowrap">
                        {sponsor.name}
                      </span>
                    </HashLink>
                  ) : (
                    <span className="text-foreground font-medium whitespace-nowrap">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 text-center">
        <HashLink to="/sponsors">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Sponsors
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </HashLink>
      </div>
    </section>
  );
};
