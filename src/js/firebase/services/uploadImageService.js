import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import storage from "../storage.js";

export async function uploadImage(file) {
  const imageRef = ref(storage, "images/" + file.name);
  const snapshot = await uploadBytes(imageRef, file);
  return await getDownloadURL(snapshot.ref);
}
