import { initializeApp } from "firebase/app"; // Importa initializeApp
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoEaZmNC3tpzLsBLM13fjl6fG6oyOQrvk",
  authDomain: "proyecto-chi-23ec2.firebaseapp.com",
  projectId: "proyecto-chi-23ec2",
  storageBucket: "proyecto-chi-23ec2.appspot.com",
  messagingSenderId: "481991738081",
  appId: "1:481991738081:web:fa70ca22663a7de72d2da0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Inicializa Firestore
