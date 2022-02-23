import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { user } from "../utils/stores";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const loginByEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential.user);
    user.set({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error);
  });
};

export const registerUserByEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      user.set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};

export const handleLogout = () => {
  user.set(null);
};
