import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    provider: "email",
    lastLogin: new Date().toISOString(),
    isAdmin: false
  }, { merge: true });
  return result;
}

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider: "google",
    lastLogin: new Date().toISOString(),
    isAdmin: false
  }, { merge: true });
  return result;
}

export const doSignOut = async () => {
  return await signOut(auth);
}

export const doPasswordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password: string) => {
  if (!auth.currentUser) throw new Error("No user is currently signed in.");
  return updatePassword(auth.currentUser as any, password);
}

export const doSendEmailVerification =  () => {
  if (!auth.currentUser) throw new Error("No user is currently signed in.");
  return sendEmailVerification(auth.currentUser as any, {
    url: `${window.location.origin}/home`
  });
}