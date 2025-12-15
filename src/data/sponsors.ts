import { db } from "@/lib/firebase";
import { Sponsor } from "@/types/SponsorTypes";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from "firebase/firestore";

export const getSponsors = async () => {
  const snapshot = await getDocs(collection(db, "sponsors"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Sponsor));
};

export const addSponsor = async (sponsor: Omit<Sponsor, "id">) => {
  const docRef = await addDoc(collection(db, "sponsors"), sponsor);
  return docRef.id;
};

export const updateSponsor = async (sponsor: Sponsor) => {
  const { id, ...data } = sponsor;
  await setDoc(doc(db, "sponsors", id), data, { merge: true });
};

export const deleteSponsor = async (id: string) => {
  await deleteDoc(doc(db, "sponsors", id));
};
