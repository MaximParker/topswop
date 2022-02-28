import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
initializeApp(firebaseConfig);

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { user } from "../utils/stores";

const auth = getAuth();

export const loginByEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user.set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};

export const updateUserDisplayName = (newUsername) => {
  updateProfile(auth.currentUser, {
    displayName: newUsername,
  })
    .then(() => {
      alert("Profile updated.");
    })
    .catch((error) => {
      alert(error);
    });
};

export const registerUserByEmail = (email, password, username) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("REGISTERED NEW USER:\n", userCredential.user);
      user.set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: username,
      });
      updateUserDisplayName(username);
      addDisplayNameToDB
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};

export const handleLogout = () => {
  user.set("");
};
