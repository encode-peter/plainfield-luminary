export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: string;
};

export type AddEventParams = {
  newEvent: Omit<Event, "id"> & { id?: string };
  setLocalEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  setNewEvent: (e: Event) => void;
  setIsDialogOpen: (v: boolean) => void;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};

export type EditEventParams = {
  editingEvent: Event | null;
  setLocalEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  setEditingEvent: (e: Event | null) => void;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};

export type DeleteEventParams = {
  event: Event;
  setLocalEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};
