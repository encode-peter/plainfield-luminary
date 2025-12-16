import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Trash2, Edit2, Calendar, Save, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Event } from "@/types/EventTypes";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Sponsor } from "@/types/SponsorTypes";
import {
  handleAdminLogin,
  loadInitialData,
  handleAddEvent,
  handleEditEvent,
  handleDeleteEvent,
  handleAddSponsor,
  handleEditSponsor,
  handleDeleteSponsor,
  handleUpdateGalleryUrl,
  handleUpdateDonationUrl,
  handleUpdateFacebookUrl,
  handleImageFile,
} from "@/utils/adminUtils";
import { useSiteSettings } from "@/hooks/use-setting";

const Admin = () => {
  const { galleryUrl, setGalleryUrl, donationUrl, setDonationUrl, facebookUrl, setFacebookUrl } =
    useSiteSettings();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localEvents, setLocalEvents] = useState<Event[]>([]);
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
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [newSponsor, setNewSponsor] = useState<Omit<Sponsor, "id">>({
    name: "",
    description: "",
    imageUrl: "",
    websiteUrl: "",
  });
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [isSponsorDialogOpen, setIsSponsorDialogOpen] = useState(false);

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

              <form
                onSubmit={(e) =>
                  handleAdminLogin({
                    e,
                    email,
                    password,
                    setIsAuthenticated,
                    loadInitialData: () =>
                      loadInitialData({ setLocalEvents, setSponsors, setGalleryUrl }),
                    toast,
                  })
                }
                className="space-y-4 mt-6 text-left"
              >
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
                    <Button
                      onClick={() =>
                        handleAddEvent({
                          newEvent,
                          setLocalEvents,
                          setNewEvent,
                          setIsDialogOpen,
                          toast,
                        })
                      }
                      className="w-full"
                    >
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
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label>Title *</Label>
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
                      </div>

                      <div className="space-y-2">
                        <Label>Date & Time *</Label>
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

                      <div className="space-y-2">
                        <Label>Location</Label>
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
                      </div>

                      <div className="space-y-2">
                        <Label>Attendees Info</Label>
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
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
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
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleEditEvent({
                              editingEvent,
                              setLocalEvents,
                              setEditingEvent,
                              toast,
                            })
                          }
                        >
                          Save Changes
                        </Button>
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
                          onClick={() => handleDeleteEvent({ event, setLocalEvents, toast })}
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

          {/* Sponsors Section */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Sponsors</h2>

              <Dialog open={isSponsorDialogOpen} onOpenChange={setIsSponsorDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sponsor
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Sponsor</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input
                        placeholder="Name"
                        value={newSponsor.name}
                        onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input
                        placeholder="Website Url"
                        value={newSponsor.websiteUrl}
                        onChange={(e) =>
                          setNewSponsor({ ...newSponsor, websiteUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <p className="text-sm text-muted-foreground">
                        You can either paste an image URL or upload a file.
                      </p>
                      <Input
                        placeholder="Image URL"
                        value={newSponsor.imageUrl}
                        onChange={(e) => setNewSponsor({ ...newSponsor, imageUrl: e.target.value })}
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const isValid = handleImageFile({
                            file,
                            toast,
                            onSuccess: (base64) =>
                              setNewSponsor({ ...newSponsor, imageUrl: base64 }),
                          });
                          if (!isValid) {
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Description"
                        value={newSponsor.description}
                        onChange={(e) =>
                          setNewSponsor({ ...newSponsor, description: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      onClick={() =>
                        handleAddSponsor({
                          newSponsor,
                          setSponsors,
                          setNewSponsor,
                          setIsSponsorDialogOpen,
                          toast,
                        })
                      }
                      className="w-full"
                    >
                      Add Sponsor
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {sponsors.map((sponsor) => (
                <Card key={sponsor.id} className="p-4 bg-muted/50">
                  {editingSponsor?.id === sponsor.id ? (
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input
                          value={editingSponsor.name}
                          onChange={(e) =>
                            setEditingSponsor({ ...editingSponsor, name: e.target.value })
                          }
                          placeholder="Sponsor Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Website URL</Label>
                        <Input
                          value={editingSponsor.websiteUrl}
                          onChange={(e) =>
                            setEditingSponsor({ ...editingSponsor, websiteUrl: e.target.value })
                          }
                          placeholder="Website URL"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Image</Label>
                        <p className="text-sm text-muted-foreground">
                          You can either paste an image URL or upload a file.
                        </p>
                        <Input
                          value={editingSponsor?.imageUrl || ""}
                          onChange={(e) =>
                            setEditingSponsor({ ...editingSponsor!, imageUrl: e.target.value })
                          }
                          placeholder="Image URL"
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file || !editingSponsor) return;
                            const isValid = handleImageFile({
                              file,
                              toast,
                              onSuccess: (base64) =>
                                setEditingSponsor({
                                  ...editingSponsor,
                                  imageUrl: base64,
                                }),
                            });
                            if (!isValid) {
                              e.target.value = "";
                            }
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={editingSponsor.description}
                          onChange={(e) =>
                            setEditingSponsor({ ...editingSponsor, description: e.target.value })
                          }
                          placeholder="Description"
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleEditSponsor({
                              editingSponsor,
                              setSponsors,
                              setEditingSponsor,
                              toast,
                            })
                          }
                        >
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingSponsor(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-4">
                          {sponsor.imageUrl ? (
                            <img
                              src={sponsor.imageUrl}
                              alt={`${sponsor.name} logo`}
                              className="w-20 h-20 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-20 h-20 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No Image</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold">Name: {sponsor.name}</h3>
                            {sponsor.websiteUrl && (
                              <p className="text-sm text-muted-foreground">
                                Website: {sponsor.websiteUrl}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{sponsor.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingSponsor(sponsor)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() =>
                            handleDeleteSponsor({ id: sponsor.id, setSponsors, toast })
                          }
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

          {/* Site URLs Section */}
          <Card className="p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Site URLs</h2>
              <p className="text-sm text-muted-foreground">
                Note: Refresh the public site to see changes.
              </p>
            </div>

            <div className="space-y-4">
              {/* Donation URL */}
              <div className="flex gap-4 items-center">
                <Label className="w-32">Donation URL</Label>
                <Input
                  value={donationUrl}
                  onChange={(e) => setDonationUrl(e.target.value)}
                  placeholder="Paste donation link here"
                  className="flex-1"
                />
                <Button
                  onClick={() => handleUpdateDonationUrl({ donationUrl, toast, setDonationUrl })}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>

              {/* Facebook URL */}
              <div className="flex gap-4 items-center">
                <Label className="w-32">Facebook URL</Label>
                <Input
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="Paste Facebook page URL here"
                  className="flex-1"
                />
                <Button
                  onClick={() => handleUpdateFacebookUrl({ facebookUrl, toast, setFacebookUrl })}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>

              {/* Gallery URL */}
              <div className="flex gap-4 items-center">
                <Label className="w-32">Gallery URL</Label>
                <Input
                  value={galleryUrl}
                  onChange={(e) => setGalleryUrl(e.target.value)}
                  placeholder="Paste Google Photos album embed URL here"
                  className="flex-1"
                />
                <Button
                  onClick={() => handleUpdateGalleryUrl({ galleryUrl, toast, setGalleryUrl })}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                To get the embed URL: Open Google Photos album → Share → Get link → Create embed
                link
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
