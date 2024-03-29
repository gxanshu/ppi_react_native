// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZSCDn5TF5KOjzD-GIELPcf4t4w9_mpmk",
  authDomain: "parivartan-party.firebaseapp.com",
  databaseURL: "https://parivartan-party-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "parivartan-party",
  storageBucket: "parivartan-party.appspot.com",
  messagingSenderId: "347902300537",
  appId: "1:347902300537:web:ae1879924f11de36485fa8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);