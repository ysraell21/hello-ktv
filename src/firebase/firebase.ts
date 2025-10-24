import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLlKoqHcckx7njm9aE4suIR-qbQHssQ7g",
  authDomain: "hello-ktv.firebaseapp.com",
  projectId: "hello-ktv",
  storageBucket: "hello-ktv.appspot.com",
  messagingSenderId: "558533338459",
  appId: "1:558533338459:web:452df1f6f562d4bb5a667e",
  measurementId: "G-Q88RVDKNS9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };