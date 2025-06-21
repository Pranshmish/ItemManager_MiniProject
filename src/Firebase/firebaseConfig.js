
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRj2DHnOEUg-qh6XqKkll6_i8AKoNtmdY",
  authDomain: "itemmanager-16727.firebaseapp.com",
  projectId: "itemmanager-16727",
  storageBucket: "itemmanager-16727.firebasestorage.app",
  messagingSenderId: "318469752087",
  appId: "1:318469752087:web:cee51247dc010995f02352",
  measurementId: "G-YYN3H1MT5Q"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();