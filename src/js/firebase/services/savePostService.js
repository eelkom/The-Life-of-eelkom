import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import db from "../firestore.js";

export async function savePost(postData) {
  await addDoc(collection(db, "post"), postData);
}
