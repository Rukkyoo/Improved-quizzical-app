import { initializeApp, getApps, getApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEQkvzAcMxFkGaG-j6Qc1v-PlvXhgiLcY",
  authDomain: "authpro-6bfa7.firebaseapp.com",
  databaseURL:
    "https://authpro-6bfa7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authpro-6bfa7",
  storageBucket: "authpro-6bfa7.firebasestorage.app",
  messagingSenderId: "78700165962",
  appId: "1:78700165962:web:5af1e565edee018095dfb3",
  measurementId: "G-T56C6MRJ00",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
