import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import app from "../initFirebase.js";

const auth = getAuth(app);

export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return await signOut(auth);
}

export function observeAuth(onLogin, onLogout) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      onLogin(user);
    } else {
      onLogout();
    }
  });
}
