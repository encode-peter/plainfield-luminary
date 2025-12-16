import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Images } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-setting";
import { HashLink } from "@/components/HashLink";

const Gallery = () => {
  const { galleryUrl, facebookUrl } = useSiteSettings();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Images className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Community Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Relive the magic of our luminary celebrations through photos shared by our amazing
              community.
            </p>
          </div>

          {/* Gallery Content */}
          {galleryUrl ? (
            <div className="w-full aspect-[16/9] max-w-5xl mx-auto rounded-xl overflow-hidden shadow-elegant">
              <iframe
                src={galleryUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Plainfield Luminary Program Photo Gallery"
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Images className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Gallery Coming Soon
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our photo gallery is being set up. In the meantime, check out our Facebook page
                  for the latest photos!
                </p>
                <HashLink
                  to={facebookUrl}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Visit our Facebook Page →
                </HashLink>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Have photos to share? Tag us on Facebook or send them to our team!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
