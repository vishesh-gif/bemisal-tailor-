import { db } from "../firebase.js";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const uploadData = async () => {
  try {
    for (let item of data) {
      await addDoc(collection(db, "bills"), {
        name: item.name,
        phone: String(item.phone),
        billNo: item.billNo,
        imageUrl: item.imageUrl,
        publicId: item.publicId,
        createdAt:
          item.createdAt ?
            Timestamp.fromDate(new Date(item.createdAt))
          : new Date(),
      });
    }

    console.log("✅ Data uploaded successfully");
  } catch (error) {
    console.log(error);
  }
};
