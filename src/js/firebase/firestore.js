import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import app from "./initFirebase.js";

const db = getFirestore(app);

export default db;
