import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { user } from "../utils/stores";

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const loginByEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      user.set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};

export const registerUserByEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      user.set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
      return true;
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

// Google sign in
let googleUser;
export const loginByGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      googleUser = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const logoutByGoogle = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
      googleUser = null;
    })
    .catch((error) => {
      console.log(error);
    });
};

onAuthStateChanged(auth, (googleUser) => {
  if (googleUser) {
    const uid = googleUser.uid;
    console.log("signed in with Google", uid, googleUser.displayName);
  } else {
    console.log("User is signed out");
  }
});
