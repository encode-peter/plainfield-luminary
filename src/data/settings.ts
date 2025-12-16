import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getSiteSettings = async () => {
  const snap = await getDoc(doc(db, "site_settings", "main"));
  return snap.exists()
    ? snap.data()
    : { googlePhotosEmbedUrl: "", donationUrl: "", facebookUrl: "" };
};

export const saveSiteSettings = async (data) => {
  await setDoc(doc(db, "site_settings", "main"), data, { merge: true });
};
