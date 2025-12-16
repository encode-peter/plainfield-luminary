import { Event } from "./EventTypes";
import { Sponsor } from "./SponsorTypes";

/* --- AUTH --- */
export type HandleAdminLoginParams = {
  e: React.FormEvent;
  email: string;
  password: string;
  setIsAuthenticated: (v: boolean) => void;
  loadInitialData: () => Promise<void>;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};

/* --- INITIAL LOAD --- */
export type LoadInitialDataParams = {
  setLocalEvents: (events: Event[]) => void;
  setSponsors: (sponsors: Sponsor[]) => void;
  setGalleryUrl: (url: string) => void;
};
