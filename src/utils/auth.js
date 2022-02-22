import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { user } from "../utils/stores";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const registerUserByEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
      user.set({uid: userCredential.user.uid, email: userCredential.user.email});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};

export const handleLogout = () => {
    user.set(null);
}