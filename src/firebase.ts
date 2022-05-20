// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { userConverter } from "./models/user";
import { productConverter } from "./models/product";

const firebaseConfig = {
  apiKey: "AIzaSyAatxM9KRLkJLxAGJA9_fZ58RO0Nm9vE2g",
  authDomain: "foodordering-a5c58.firebaseapp.com",
  projectId: "foodordering-a5c58",
  storageBucket: "foodordering-a5c58.appspot.com",
  messagingSenderId: "530123077057",
  appId: "1:530123077057:web:4ece3c48165977b619eb40",
  measurementId: "G-R1PVL5GV7S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const userCollectionRef = collection(db, "users").withConverter(userConverter);
const productCollectionRef = collection(db, "products").withConverter(
  productConverter
);

export { db, userCollectionRef, productCollectionRef };
