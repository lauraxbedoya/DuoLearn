import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
  measurementId: import.meta.env.PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
