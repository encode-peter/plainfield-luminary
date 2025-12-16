import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isAdminUser } from "@/data/user";
import { getEvents, addEvent, deleteEvent, updateEvent } from "@/data/events";
import { getSponsors, addSponsor, updateSponsor, deleteSponsor } from "@/data/sponsors";
import { getSiteSettings, saveSiteSettings } from "@/data/settings";
import { AddEventParams, DeleteEventParams, EditEventParams, Event } from "@/types/EventTypes";
import {
  AddSponsorParams,
  DeleteSponsorParams,
  EditSponsorParams,
  HandleImageFileParams,
} from "@/types/SponsorTypes";
import {
  SiteSettings,
  UpdateDonationUrlParams,
  UpdateFacebookUrlParams,
  UpdateGalleryUrlParams,
} from "@/types/SettingsTypes";
import { HandleAdminLoginParams, LoadInitialDataParams } from "@/types";

/* ============================
   AUTH
============================ */

export const handleAdminLogin = async ({
  e,
  email,
  password,
  setIsAuthenticated,
  loadInitialData,
  toast,
}: HandleAdminLoginParams) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdTokenResult();
    const isAdmin = await isAdminUser(token.claims.user_id as string);

    if (!isAdmin) throw new Error();

    setIsAuthenticated(true);
    await loadInitialData();
    toast({ title: "Welcome!", description: "You are now logged in as admin." });
  } catch {
    toast({ title: "Login Failed", variant: "destructive" });
  }
};

/* ============================
   INITIAL LOAD
============================ */

export const loadInitialData = async ({
  setLocalEvents,
  setSponsors,
  setGalleryUrl,
}: LoadInitialDataParams) => {
  const events = await getEvents();
  const sponsors = await getSponsors();
  const settings = await getSiteSettings();

  setLocalEvents(events);
  setSponsors(sponsors);
  setGalleryUrl(settings.googlePhotosEmbedUrl || "");
};

/* ============================
   EVENTS
============================ */

export const handleAddEvent = async ({
  newEvent,
  setLocalEvents,
  setNewEvent,
  setIsDialogOpen,
  toast,
}: AddEventParams) => {
  if (!newEvent.title || !newEvent.date) {
    toast({ title: "Missing Fields", variant: "destructive" });
    return;
  }

  const { id, ...eventData } = newEvent;
  const generatedId = await addEvent(eventData);

  setLocalEvents((prev) => [...prev, { id: generatedId, ...eventData }]);
  setNewEvent({ id: "", title: "", date: "", location: "", description: "", attendees: "" });
  setIsDialogOpen(false);
  toast({ title: "Event Added" });
};

export const handleEditEvent = async ({
  editingEvent,
  setLocalEvents,
  setEditingEvent,
  toast,
}: EditEventParams) => {
  if (!editingEvent) return;

  await updateEvent(editingEvent);
  setLocalEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? editingEvent : e)));
  setEditingEvent(null);
  toast({ title: "Event Updated" });
};

export const handleDeleteEvent = async ({ event, setLocalEvents, toast }: DeleteEventParams) => {
  await deleteEvent(event.id);
  setLocalEvents((prev) => prev.filter((e) => e.id !== event.id));
  toast({ title: "Event Deleted" });
};

/* ============================
   SPONSORS
============================ */
const MAX_IMAGE_SIZE = 500 * 1024; // 500 KB

export const handleImageFile = ({ file, onSuccess, toast }: HandleImageFileParams): boolean => {
  if (!file.type.startsWith("image/")) {
    toast({
      title: "Invalid file type",
      description: "Only image files are allowed.",
      variant: "destructive",
    });
    return false;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    toast({
      title: "Image too large",
      description: "Image size must be less than 500 KB.",
      variant: "destructive",
    });
    return false;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    onSuccess(reader.result as string);
  };
  reader.readAsDataURL(file);

  return true;
};

export const handleAddSponsor = async ({
  newSponsor,
  setSponsors,
  setNewSponsor,
  setIsSponsorDialogOpen,
  toast,
}: AddSponsorParams) => {
  if (!newSponsor.name) {
    toast({ title: "Sponsor name required", variant: "destructive" });
    return;
  }

  const id = await addSponsor(newSponsor);
  setSponsors((prev) => [...prev, { id, ...newSponsor }]);
  setNewSponsor({ name: "", description: "", imageUrl: "", websiteUrl: "" });
  setIsSponsorDialogOpen(false);
  toast({ title: "Sponsor added" });
};

export const handleEditSponsor = async ({
  editingSponsor,
  setSponsors,
  setEditingSponsor,
  toast,
}: EditSponsorParams) => {
  if (!editingSponsor) return;

  await updateSponsor(editingSponsor);
  setSponsors((prev) => prev.map((s) => (s.id === editingSponsor.id ? editingSponsor : s)));
  setEditingSponsor(null);
  toast({ title: "Sponsor updated" });
};

export const handleDeleteSponsor = async ({ id, setSponsors, toast }: DeleteSponsorParams) => {
  await deleteSponsor(id);
  setSponsors((prev) => prev.filter((s) => s.id !== id));
  toast({ title: "Sponsor deleted" });
};

/* ============================
   SETTINGS
============================ */

export const handleUpdateDonationUrl = async ({
  donationUrl,
  toast,
  setDonationUrl,
}: UpdateDonationUrlParams) => {
  await saveSiteSettings({ donationUrl });
  setDonationUrl(donationUrl);
  toast({ title: "Donation URL Updated" });
};

export const handleUpdateFacebookUrl = async ({
  facebookUrl,
  toast,
  setFacebookUrl,
}: UpdateFacebookUrlParams) => {
  await saveSiteSettings({ facebookUrl });
  setFacebookUrl(facebookUrl);
  toast({ title: "Facebook URL Updated" });
};

export const handleUpdateGalleryUrl = async ({
  galleryUrl,
  toast,
  setGalleryUrl,
}: UpdateGalleryUrlParams) => {
  await saveSiteSettings({ googlePhotosEmbedUrl: galleryUrl });
  setGalleryUrl(galleryUrl);
  toast({ title: "Gallery Updated" });
};
