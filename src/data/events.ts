import { db } from "@/lib/firebase";
import { Event } from "@/types/EventTypes";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc } from "firebase/firestore";

export const getEvents = async () => {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

export const addEvent = async (event: Omit<Event, "id">) => {
  const docRef = await addDoc(collection(db, "events"), event);
  return docRef.id;
};

export const updateEvent = async (event: Event) => {
  const { id, ...data } = event;
  await setDoc(doc(db, "events", id), data, { merge: true });
};

export const deleteEvent = async (id: string) => {
  await deleteDoc(doc(db, "events", id));
};
