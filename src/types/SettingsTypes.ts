export type SiteSettings = {
  donationUrl?: string;
  facebookUrl?: string;
  googlePhotosEmbedUrl?: string;
};

export type UpdateDonationUrlParams = {
  donationUrl: string;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
  setDonationUrl: (val: string) => void;
};

export type UpdateFacebookUrlParams = {
  facebookUrl: string;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
  setFacebookUrl: (val: string) => void;
};

export type UpdateGalleryUrlParams = {
  galleryUrl: string;
  toast: (props: { title: string; description?: string; variant?: "destructive" }) => void;
  setGalleryUrl: (val: string) => void;
};
