import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Trash2, Edit2, Calendar, Link, Save, Eye, EyeOff } from "lucide-react";
import { getEvents, saveEvent, deleteEvent } from "@/data/events";
import { getSiteSettings, saveSiteSettings } from "@/data/settings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isAdminUser } from "@/data/user";
import { Event } from "@/types/eventTypes";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localEvents, setLocalEvents] = useState<Event[]>([]);
  const [galleryUrl, setGalleryUrl] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingEventDateTime, setEditingEventDateTime] = useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newEventDateTime, setNewEventDateTime] = useState<Date | undefined>();
  const [newEvent, setNewEvent] = useState<Event>({
    id: "",
    title: "",
    date: "",
    location: "",
    description: "",
    attendees: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        if (token.claims.isAdmin) {
          setIsAuthenticated(true);
          loadInitialData();
        }
      }
    });
    return () => unsub();
  }, []);

  const loadInitialData = async () => {
    const events = await getEvents();
    setLocalEvents(events);
    const settings = await getSiteSettings();
    setGalleryUrl(settings.googlePhotosEmbedUrl || "");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdTokenResult();
      const adminStatus = await isAdminUser(token.claims.user_id as string);
      if (adminStatus) {
        setIsAuthenticated(true);
        loadInitialData();
        toast({ title: "Welcome!", description: "You are now logged in as admin." });
      } else {
        toast({ title: "Access Denied", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Login Failed", description: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Missing Fields",
        description: "Title and date required",
        variant: "destructive",
      });
      return;
    }
    const eventWithId: Event = { ...newEvent, id: Date.now().toString() };
    await saveEvent(eventWithId);
    setLocalEvents((prev) => [...prev, eventWithId]);
    toast({ title: "Event Added" });
    setNewEvent({
      id: "",
      title: "",
      date: "",
      location: "",
      description: "",
      attendees: "",
    });
    setIsDialogOpen(false);
  };

  const handleEditEvent = async () => {
    if (!editingEvent) return;
    await saveEvent(editingEvent);
    setLocalEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? editingEvent : e)));
    toast({ title: "Event Updated" });
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (event: Event) => {
    await deleteEvent(event.id);
    setLocalEvents((prev) => prev.filter((e) => e.id !== event.id));
    toast({ title: "Event Deleted" });
  };

  const handleUpdateGalleryUrl = async () => {
    await saveSiteSettings({ googlePhotosEmbedUrl: galleryUrl });
    toast({ title: "Gallery Updated" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 mx-auto">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">Admin Access</h1>

              <form onSubmit={handleLogin} className="space-y-4 mt-6 text-left">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />

                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage events and site settings. Changes are saved automatically.
            </p>
          </div>

          {/* Events Section */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Events</h2>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Event title"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date & Time *</Label>
                        <DateTimePicker
                          date={newEventDateTime}
                          setDate={(d: Date) => {
                            setNewEventDateTime(d);
                            setNewEvent({
                              ...newEvent,
                              date: d ? d.toISOString() : "",
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        placeholder="Event location"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Attendees Info</Label>
                      <Input
                        value={newEvent.attendees}
                        onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                        placeholder="e.g., Community-wide event"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Event description"
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleAddEvent} className="w-full">
                      Add Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {localEvents.map((event) => (
                <Card key={event.id} className="p-4 bg-muted/50">
                  {editingEvent?.id === event.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingEvent.title}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            title: e.target.value,
                          })
                        }
                        placeholder="Title"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <DateTimePicker
                          date={editingEventDateTime}
                          setDate={(d: Date) => {
                            setEditingEventDateTime(d);
                            if (editingEvent) {
                              setEditingEvent({ ...editingEvent, date: d ? d.toISOString() : "" });
                            }
                          }}
                        />
                      </div>
                      <Input
                        value={editingEvent.location}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            location: e.target.value,
                          })
                        }
                        placeholder="Location"
                      />
                      <Input
                        value={editingEvent.attendees}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            attendees: e.target.value,
                          })
                        }
                        placeholder="Attendees"
                      />
                      <Textarea
                        value={editingEvent.description}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleEditEvent}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingEvent(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingEvent(event);
                            setEditingEventDateTime(event.date ? new Date(event.date) : undefined);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteEvent(event)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Card>

          {/* Gallery URL Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Link className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Gallery Embed URL</h2>
            </div>
            <div className="flex gap-4">
              <Input
                value={galleryUrl}
                onChange={(e) => setGalleryUrl(e.target.value)}
                placeholder="Paste Google Photos album embed URL here"
                className="flex-1"
              />
              <Button onClick={handleUpdateGalleryUrl}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              To get the embed URL: Open Google Photos album → Share → Get link → Create embed link
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
