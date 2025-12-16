import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HashLink } from "@/components/HashLink";
import { Sponsor } from "@/types/SponsorTypes";
import { getSponsors } from "@/data/sponsors";
import { Spinner } from "@/components/ui/spinner";
import { ExternalLink } from "lucide-react";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSponsors, setExpandedSponsors] = useState<Record<string, boolean>>({});

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
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-background mb-8" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Sponsors</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              The Plainfield Luminary Program is made possible by the generous support of our
              sponsors. Together, we're lighting up our community.
            </p>
          </div>
        </div>

        {/* Decorative lights */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-twinkle" />
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-twinkle"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary rounded-full animate-twinkle"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Sponsor */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center flex-wrap gap-4 gap-y-10 overflow-hidden">
            {sponsors.length === 0 && !loading && (
              <p className="text-foreground col-span-full text-center">
                No Sponsors at the moment. Please check back later!
              </p>
            )}
            {loading ? (
              <Spinner className="size-10" />
            ) : (
              sponsors.map((sponsor, index) => (
                <div
                  key={sponsor.name}
                  className="w-96 h-96 p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg shadow-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1 + index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-52 h-52 flex-shrink-0 rounded-lg bg-background flex items-center justify-center">
                      {sponsor.imageUrl ? (
                        <img
                          src={sponsor.imageUrl}
                          alt={`${sponsor.name} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground text-center px-1">
                          No Image
                        </span>
                      )}
                    </div>
                    <div>
                      {sponsor.websiteUrl ? (
                        <h3 className="text-lg font-semibold text-foreground mb-1 flex justify-center">
                          <HashLink
                            to={sponsor.websiteUrl}
                            className="flex justify-center items-center border-primary gap-2 hover:border-b hover:scale-105 transition-all"
                          >
                            {sponsor.name} <ExternalLink size={16} />
                          </HashLink>
                        </h3>
                      ) : (
                        <h3 className="text-lg font-semibold text-foreground mb-1 text-center">
                          {sponsor.name}
                        </h3>
                      )}
                      <p className="text-foreground text-sm overflow-y-auto max-h-24">
                        {expandedSponsors[sponsor.name] || sponsor.description.length <= 150
                          ? sponsor.description
                          : sponsor.description.slice(0, 150) + ".."}
                        {sponsor.description.length > 150 && (
                          <button
                            onClick={() =>
                              setExpandedSponsors((prev) => ({
                                ...prev,
                                [sponsor.name]: !prev[sponsor.name],
                              }))
                            }
                            className="text-primary text-sm mt-1 underline"
                          >
                            {expandedSponsors[sponsor.name] ? "show less" : "..show more"}
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Become a <span className="text-primary">Sponsor</span>
            </h2>
            <p className="text-foreground mb-8">
              Join our community of sponsors and help light up Plainfield. Your support makes a
              lasting impact on our neighborhood.
            </p>
            <HashLink to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact Us About Sponsorship
              </Button>
            </HashLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsors;
