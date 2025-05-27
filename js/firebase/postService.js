import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import db from "./firestore.js";

let posts = [];
let prevLength = 0;

export const loadPosts = async () => {
  if (posts.length > 0 && posts.length === prevLength) return posts;

  const postsRef = collection(db, "post");
  const q = query(postsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  prevLength = posts.length;
  return posts;
};

export const loadPostById = async (id) => {
  const docRef = doc(db, "post", id);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
};
