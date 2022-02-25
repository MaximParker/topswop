import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
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
    username: "magpie",
    title: "Crown Jewels",
    description: "Valuable!",
    condition: "Good",
    location: "London",
    geotag: "51.50, -0.07",
    tradeRequired: false,
  };
  postListing(event);
  newListing = {
    username: "anthony_gormley",
    title: "Angel of the North",
    description: "Very big",
    condition: "Good",
    location: "Gateshead",
    geotag: "54.91, -1.58",
    tradeRequired: false,
  };
  postListing(event);
  newListing = {
    username: "king_james",
    title: "Edinburgh Castle",
    description: "11th-century castle and barracks. Crown jewels not included.",
    condition: "Old",
    location: "Edinburgh",
    geotag: "55.94, -3.19",
    tradeRequired: true,
  };
  postListing(event);
  newListing = {
    username: "mancunian_123",
    title: "New shoes",
    description: "White trainers",
    condition: "Excellent",
    location: "Manchester",
    geotag: "53.48, -2.24",
    tradeRequired: true,
  };
  postListing(event);
  newListing = {
    username: "dog_",
    title: "Bone",
    description: "Tasty bone",
    condition: "Damaged",
    location: "Sheffield",
    geotag: "53.37, -1.49",
    tradeRequired: true,
  };
  postListing(event);
  newListing = {
    username: "yorkie_pud",
    title: "Collection of trains",
    description: "Various locomotives, different sizes",
    condition: "Excellent",
    location: "York",
    geotag: "53.96, -1.09",
    tradeRequired: true,
  };
  postListing(event);
  console.log("Re-seed complete.");
};

export const sendWelcomeMessage = (targetID) => {
  console.log(`Creating folder in messages for ${targetID}`);
  return setDoc(doc(db, `messages`, `${targetID}`), {}).then(() => {
    console.log(`Creating conversations collection for ${targetID}`);
    setDoc(
      doc(db, `messages/${targetID}/conversations`, `topswop_team`),
      {}
    ).then(() => {
      addDoc(
        collection(
          db,
          `messages/${targetID}/conversations/topswop_team/messages`
        ),
        {
          from: "Topswop Team",
          date: new Date(),
          text: "Welcome to Topswop! Look here for your messages.",
          read: false,
        }
      );
    });
  });
};

export const createChatroom = (user_a, user_b) => {
  console.log(`Creating a conversation between ${user_a} and ${user_b}`);
  setDoc(
    doc(db, `messages/${user_a}/conversations`, `${user_b}`),
    {}
  )
  setDoc(
    doc(db, `messages/${user_b}/conversations`, `${user_a}`),
    {}
  )
};

export const sendDirectMessage = (sender_id, sender_displayName, recipient_id, text) => {
    console.log(`Creating conversations collection for ${targetID}`);
    setDoc(
      doc(db, `messages/${targetID}/conversations`, `topswop_team`),
      {}
    ).then(() => {
      addDoc(
        collection(
          db,
          `messages/${targetID}/conversations/topswop_team/messages`
        ),
        {
          from: "Topswop Team",
          date: new Date(),
          text: "Welcome to Topswop! Here's some information, etc. etc.",
          read: false,
        }
      );
    });

};
