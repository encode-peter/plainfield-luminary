export type Sponsor = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
};

export type HandleImageFileParams = {
  file: File;
  onSuccess: (base64: string) => void;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};

export type AddSponsorParams = {
  newSponsor: Omit<Sponsor, "id">;
  setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>>;
  setNewSponsor: (s: Omit<Sponsor, "id">) => void;
  setIsSponsorDialogOpen: (v: boolean) => void;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};

export type EditSponsorParams = {
  editingSponsor: Sponsor | null;
  setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>>;
  setEditingSponsor: (s: Sponsor | null) => void;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};

export type DeleteSponsorParams = {
  id: string;
  setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>>;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
};
