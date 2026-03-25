import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";

export const add_bill = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "bills"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef;
  } catch (error) {
    throw error.message;
  }
};

export const get_bills = async () => {
  try {
    const q = query(
      collection(db, "bills"),
      orderBy("createdAt", "desc"),
      limit(20),
    );
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        ...d,
        createdAt: d?.createdAt?.toDate().toISOString(),
      };
    });
    return {
      data,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    };
  } catch (error) {
    throw error.message;
  }
};

export const getMoreBills = async (lastDoc) => {
  try {
    const q = query(
      collection(db, "bills"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(20),
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        ...d,
        createdAt: d?.createdAt?.toDate().toISOString(),
      };
    });
    return { data, lastDoc: snapshot.docs[snapshot.docs.length - 1] };
  } catch (error) {
    throw error.message;
  }
};

export const delete_bills = async (id) => {
  try {
    const docRef = doc(db, "bills", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    throw error.message;
  }
};

export const search_bills_by_phoneNo = async (phonePrefix) => {
  try {
    const q = query(
      collection(db, "bills"),
      where("phone", ">=", phonePrefix),
      where("phone", "<=", phonePrefix + "\uf8ff"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt?.toDate?.()?.toISOString() || null,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const get_customer_count = async () => {
  const coll = collection(db, "bills");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
