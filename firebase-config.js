// Shared Firebase config — used by both index.html (NEXORA FORM)
// and app.html (NEXORA PROMPTS gallery).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2zuW23twUmjlB_SzOksUZYPwhXygRsI4",
  authDomain: "nexora-promps.firebaseapp.com",
  projectId: "nexora-promps",
  storageBucket: "nexora-promps.firebasestorage.app",
  messagingSenderId: "240894310318",
  appId: "1:240894310318:web:a0ea190da2157388937a3f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
