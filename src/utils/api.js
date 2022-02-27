import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
export const db = getFirestore();

let newListing = {
  username: "",
  title: "",
  description: "",
  condition: "",
  location: "",
  tradeRequired: false,
  user_id: ""
};

export const postListing = async (event, newListing) => {
  event.preventDefault();

  const docRef = await addDoc(collection(db, "listings"), newListing);
  console.log("Document written to Listings with ID: ", docRef.id);
};

export const removeListingByID = async (id) => {
  await deleteDoc(doc(db, "listings", id));
};

export const postLike = async (event, likingUserId, itemId, itemOwnerId) => {
  event.preventDefault();

  let newLike = {
    liking_user_id: likingUserId,
    item_id: itemId,
    item_owner_id: itemOwnerId
  }

  const docRef = await addDoc(collection(db, "matches"), newLike);
  console.log("Document written to matches with ID: ", docRef.id);

};

export const queryPotentialUsers = async (current_user) => {
  const query1 = query(
    collection(db, "matches"),
    where("item_owner_id", "==", current_user)
  );
  const querySnapshot = await getDocs(query1);
  let usersThatLikedMyItem = [];
  querySnapshot.forEach((doc) => {
    let userData = { ...doc.data() };
    usersThatLikedMyItem = [userData.liking_user_id, ...usersThatLikedMyItem];
  });
  return usersThatLikedMyItem;
};

export const queryPotentialMatchItems = async ( searchingFor, searchingIn = documentId() ) => {
  const query2 = query(
    collection(db, "listings"),
    where(searchingIn, "in", searchingFor)
  );
  const querySnapshot = await getDocs(query2);
  let potentialMatchItems = [];
  querySnapshot.forEach((doc) => {
    let itemData = { ...doc.data(), id: doc.id };
    potentialMatchItems = [itemData, ...potentialMatchItems];
  });
  return potentialMatchItems;
};


export const queryUserLikes = async (current_user) => {
  const query1 = query(
    collection(db, "matches"),
    where("liking_user_id", "==", current_user)
  );
  const querySnapshot = await getDocs(query1);
  let itemsUserLikes = [];
  querySnapshot.forEach((doc) => {
    let itemData = { ...doc.data() };
    itemsUserLikes = [itemData, ...itemsUserLikes];
  });
  return itemsUserLikes;
};

export const queryMatchOwner = async (current_user) => {
  const query2 = query(
    collection(db, "matches"),
    where("item_owner_id", "==", current_user)
  );
  const querySnapshot = await getDocs(query2);
  let OwnerIdArray = [];
  querySnapshot.forEach((doc) => {
    let itemOwner = { ...doc.data() };
    OwnerIdArray = [itemOwner, ...OwnerIdArray];
  });
  return OwnerIdArray;
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
  postListing(event, newListing);
  newListing = {
    username: "darth_vader",
    title: "Lightsaber",
    description: "Red",
    condition: "Good",
    location: "Tatooine",
    tradeRequired: false,
    user_id: "EVebWT2lGySQG3x5Qm8xqUiHzuC3"
  };
  postListing(event, newListing);
  newListing = {
    username: "bilbo-baggins",
    title: "The One Ring",
    description: "Precious",
    condition: "Old",
    location: "Mordor",
    tradeRequired: true,
    user_id: "vUEK9J8c8tMHLLpGgdnuqJVjwZm1"
  };
  postListing(event, newListing);
  newListing = {
    username: "doctor_who",
    title: "TARDIS",
    description: "Blue police box",
    condition: "Excellent",
    location: "Earth",
    tradeRequired: true,
    user_id: "vUEK9J8c8tMHLLpGgdnuqJVjwZm1"
  };
  postListing(event, newListing);
  newListing = {
    username: "dog_",
    title: "Bone",
    description: "Tasty bone",
    condition: "Damaged",
    location: "Backyard",
    tradeRequired: true,
    user_id: "vUNC6IYA8kZjYUy99OcBC5qmiFF3"
  };
  postListing(event, newListing);
  newListing = {
    username: "cat_",
    title: "Ball of yarn",
    description: "Red",
    condition: "Excellent",
    location: "LivingRoom",
    tradeRequired: true,
    user_id: "vUNC6IYA8kZjYUy99OcBC5qmiFF3"
  };
  postListing(event, newListing);
  console.log("Re-seed complete.");
};
