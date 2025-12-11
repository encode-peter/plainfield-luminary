import { db } from "@/lib/firebase";
import { Event } from "@/types/eventTypes";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

export const getEvents = async () => {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

export const saveEvent = async (event: Event) => {
  await setDoc(doc(collection(db, "events"), event.id), event);
};

export const deleteEvent = async (id: string) => {
  await deleteDoc(doc(db, "events", id));
};
