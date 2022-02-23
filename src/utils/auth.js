import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { user } from "../utils/stores";

initializeApp(firebaseConfig);
const auth = getAuth();

export const loginByEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
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
      console.log(userCredential.user);
      user.set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: username,
      });
      updateUserDisplayName(username);
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};

export const sendWelcomeMessage = async (targetID) => {
  const docRef = await set(
    ref(db, `messages/${targetID}/conversations/wdyh41raSfMoy2lLC6dztyWuxdq2`),
    
    { from: "Topswop Team", date: new Date(), text: "Welcome to Topswop! Here's some information, etc. etc.", read:false }
  );
};

export const handleLogout = () => {
  user.set(null);
};
