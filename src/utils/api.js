import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
export const db = getFirestore();

let newListing = {
  username: "",
  title: "",
  description: "",
  condition: "",
  location: "",
  tradeRequired: false,
};

export const postListing = async (event) => {
  event.preventDefault();
  const docRef = await addDoc(collection(db, "listings"), newListing);
  console.log("Document written to Listings with ID: ", docRef.id);
};

export const removeListingByID = async (id) => {
  await deleteDoc(doc(db, "listings", id));
};

export const reseedListingsDatabase = async (event, listings) => {
  console.log("Removing all listings...");
  for (let listing of listings) {
    removeListingByID(listing.id);
  }
  console.log("Listings removed.");
  console.log("Seeding database...");
  newListing = {
    username: "mister_bean",
    title: "Mini",
    description: "Yellow",
    condition: "Old",
    location: "England",
    tradeRequired: false,
    user_id: "EVebWT2lGySQG3x5Qm8xqUiHzuC3"
  };
  postListing(event);
  newListing = {
    username: "darth_vader",
    title: "Lightsaber",
    description: "Red",
    condition: "Good",
    location: "Tatooine",
    tradeRequired: false,
    user_id: "EVebWT2lGySQG3x5Qm8xqUiHzuC3"
  };
  postListing(event);
  newListing = {
    username: "bilbo-baggins",
    title: "The One Ring",
    description: "Precious",
    condition: "Old",
    location: "Mordor",
    tradeRequired: true,
    user_id: "vUEK9J8c8tMHLLpGgdnuqJVjwZm1"
  };
  postListing(event);
  newListing = {
    username: "doctor_who",
    title: "TARDIS",
    description: "Blue police box",
    condition: "Excellent",
    location: "Earth",
    tradeRequired: true,
    user_id: "vUEK9J8c8tMHLLpGgdnuqJVjwZm1"
  };
  postListing(event);
  newListing = {
    username: "dog_",
    title: "Bone",
    description: "Tasty bone",
    condition: "Damaged",
    location: "Backyard",
    tradeRequired: true,
    user_id: "vUNC6IYA8kZjYUy99OcBC5qmiFF3"
  };
  postListing(event);
  newListing = {
    username: "cat_",
    title: "Ball of yarn",
    description: "Red",
    condition: "Excellent",
    location: "LivingRoom",
    tradeRequired: true,
    user_id: "vUNC6IYA8kZjYUy99OcBC5qmiFF3"
  };
  postListing(event);
  console.log("Re-seed complete.");
};
