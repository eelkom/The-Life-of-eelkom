import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import app from "./initFirebase.js";

const storage = getStorage(app);

export default storage;
