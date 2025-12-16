import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { getEvents } from "@/data/events";
import { Event } from "@/types/EventTypes";
import { useSiteSettings } from "@/hooks/use-setting";

export const Events = () => {
  const { donationUrl, facebookUrl } = useSiteSettings();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = (await getEvents()).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  return (
    <section id="events" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Upcoming Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mark your calendars! Here are the key dates for the Plainfield Luminary Program. Stay
            tuned for specific dates as we get closer to the holiday season.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.length === 0 && !loading && (
            <p className="text-muted-foreground col-span-full text-center">
              No upcoming events at the moment. Please check back later!
            </p>
          )}
          {loading ? (
            <Spinner className="size-10" />
          ) : (
            events.length > 0 &&
            events.map((event, index) => (
              <Card
                key={event.id}
                className="p-8 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                <div className="space-y-4 flex-grow">
                  <h3 className="text-2xl font-bold text-primary">{event.title}</h3>

                  <div className="space-y-3 text-muted-foreground">
                    {event.date && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{new Date(event.date).toDateString()}</span>
                      </div>
                    )}

                    {event.date && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{new Date(event.date).toLocaleTimeString()}</span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    )}

                    {event.attendees && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{event.attendees}</span>
                      </div>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-muted-foreground pt-2 border-t border-border">
                      {event.description}
                    </p>
                  )}
                </div>

                {index === 0 && (
                  <Button
                    className="block mt-6 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => window.open(donationUrl, "_blank")}
                  >
                    Donate
                  </Button>
                )}
              </Card>
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Follow us on Facebook for the latest announcements, date confirmations, and
              behind-the-scenes updates about the Plainfield Luminary Program.
            </p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open(facebookUrl, "_blank")}
            >
              Follow on Facebook
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
