import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SEND_ID,
  appId: process.env.REACT_APP_ID
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const secondaryApp = initializeApp(firebaseConfig)
