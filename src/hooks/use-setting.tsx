import { useState, useEffect, useMemo } from "react";
import { getSiteSettings } from "@/data/settings";

let cachedSettings: { galleryUrl: string; donationUrl: string; facebookUrl: string } | null = null;
let isFetching = false;
let fetchPromise: Promise<void> | null = null;

export const useSiteSettings = () => {
  const [galleryUrl, setGalleryUrl] = useState<string>(cachedSettings?.galleryUrl || "");
  const [donationUrl, setDonationUrl] = useState<string>(cachedSettings?.donationUrl || "");
  const [facebookUrl, setFacebookUrl] = useState<string>(cachedSettings?.facebookUrl || "");

  useEffect(() => {
    if (cachedSettings) return;
    if (!isFetching) {
      isFetching = true;
      fetchPromise = (async () => {
        try {
          const settings = await getSiteSettings();
          const gUrl = settings.googlePhotosEmbedUrl || "";
          const dUrl = settings.donationUrl || "";
          const fUrl = settings.facebookUrl || "";

          cachedSettings = { galleryUrl: gUrl, donationUrl: dUrl, facebookUrl: fUrl };

          setGalleryUrl(gUrl);
          setDonationUrl(dUrl);
          setFacebookUrl(fUrl);
        } finally {
          isFetching = false;
        }
      })();
    } else if (fetchPromise) {
      fetchPromise.then(() => {
        if (cachedSettings) {
          setGalleryUrl(cachedSettings.galleryUrl);
          setDonationUrl(cachedSettings.donationUrl);
          setFacebookUrl(cachedSettings.facebookUrl);
        }
      });
    }
  }, []);

  return useMemo(
    () => ({ galleryUrl, setGalleryUrl, donationUrl, setDonationUrl, facebookUrl, setFacebookUrl }),
    [galleryUrl, donationUrl, facebookUrl]
  );
};
