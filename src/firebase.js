// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4876lYnwEow9GJwHckL_LYJTMcmhimpU",
  authDomain: "curso-dev-2e4db.firebaseapp.com",
  databaseURL: "https://curso-dev-2e4db-default-rtdb.firebaseio.com",
  projectId: "curso-dev-2e4db",
  storageBucket: "curso-dev-2e4db.appspot.com",
  messagingSenderId: "741981105417",
  appId: "1:741981105417:web:3102d3bdb100edabcbf7d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const secondaryApp = initializeApp(firebaseConfig)
