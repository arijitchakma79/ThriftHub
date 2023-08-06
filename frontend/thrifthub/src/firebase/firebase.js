import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Fix the typo here
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDmP-a_vVgTCIXRK37_CmAKFvmYGloKWs",
  authDomain: "thrifthub-19f3e.firebaseapp.com",
  projectId: "thrifthub-19f3e",
  storageBucket: "thrifthub-19f3e.appspot.com",
  messagingSenderId: "457638624680",
  appId: "1:457638624680:web:b5a305565d3ccd16b3719d",
  measurementId: "G-2RSYK5LFC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app); 
export const auth = getAuth(app);
export const storage = getStorage(app);
