// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm6LpGIvC6SKd6lGtzAjgLxLjeov1doDQ",
  authDomain: "pt-gpt.firebaseapp.com",
  projectId: "pt-gpt",
  storageBucket: "pt-gpt.appspot.com",
  messagingSenderId: "160696689322",
  appId: "1:160696689322:web:ef178a5c05057bc7dc26d3",
  measurementId: "G-LR20VKVT4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);