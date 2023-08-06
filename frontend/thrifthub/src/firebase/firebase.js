// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);