import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const isAdminUser = async (user_id: string) => {
  if (!user_id) return false;
  const snapshot = await getDoc(doc(db, "admin-users", user_id));
  return snapshot.data()?.isAdmin || false;
};
