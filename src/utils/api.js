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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref as ref_storage,
} from "firebase/storage";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

export const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

let newListing = {
  username: "",
  title: "",
  description: "",
  condition: "",
  location: "",
  tradeRequired: false,
  user_id: "",
};

let uid;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    return uid;
  }
});

export const postListing = async (event, newListing) => {
  event.preventDefault();
  const docRef = await addDoc(collection(db, "listings"), newListing);
  console.log("Document written to Listings with ID: ", docRef.id);
  const listingRef = docRef.id;
  const uid = newListing.user_id;
  uploadImage(event, uid, listingRef);
};

const storageRef = ref_storage(storage);
const metadata = {
  contentType: "image/jpeg",
};
export const uploadImage = (event, uid, listingRef) => {
  event.preventDefault();
  const file = event.target[6].files[0];
  if (!file) return;
  const storageRefImage = ref_storage(
    storage,
    `/files/${uid}/listings/${listingRef}/${file}`
  );
     uploadBytesResumable(storageRefImage, file, metadata)
    .then((uploadTaskSnapshot) => {
      getDownloadURL(uploadTaskSnapshot.ref).then((downloadURL) => {
        updateListingWithImage(downloadURL, listingRef);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateListingWithImage = (downloadURL, listingRef) => {
  const newListingRef = doc(db, "listings", listingRef);
  setDoc(newListingRef, { imageURL: downloadURL }, { merge: true });
};

export const uploadProfilePic = (event) => {
  event.preventDefault();
  const profilePic = event.target[0].files[0];
  if (!profilePic) return;
  const storageRef = ref_storage(
    storage,
    `/files/${uid}/profilePic/${profilePic}`
  );
  const uploadTask = uploadBytesResumable(
    storageRef,
    profilePic,
    metadata
  ).then((uploadTaskSnapshot) => {
    getDownloadURL(uploadTaskSnapshot.ref).then((downloadURL) => {
      updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      }).catch((error) => {
        console.log(error);
      });
    });
  });
};

export const removeListingByID = async (id) => {
  await deleteDoc(doc(db, "listings", id));
};

export const removeLike = async (current_user, itemId) => {
  const query1 = query(
    collection(db, "matches"),
    where("liking_user_id", "==", current_user), where("item_id", "==", itemId))

    const querySnapshot = await getDocs(query1);
  querySnapshot.forEach((data) => {
    deleteDoc(doc(db, "matches", data.id));
    console.log(data.id, 'deleted')
  });

};

export const postLike = async (event, likingUserId, itemId, itemOwnerId) => {
  event.preventDefault();

  let newLike = {
    liking_user_id: likingUserId,
    item_id: itemId,
    item_owner_id: itemOwnerId,
  };

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

export const queryPotentialMatchItems = async (
  searchingFor,
  searchingIn = documentId()
) => {
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
    username: "magpie",
    title: "Crown Jewels",
    description: "Valuable!",
    condition: "Good",
    location: "London",
    geotag: "51.50, -0.07",
    tradeRequired: false,
    user_id: "EVebWT2lGySQG3x5Qm8xqUiHzuC3",
  };
  postListing(event, newListing);
  newListing = {
    username: "anthony_gormley",
    title: "Angel of the North",
    description: "Very big",
    condition: "Good",
    location: "Gateshead",
    geotag: "54.91, -1.58",
    tradeRequired: false,
    user_id: "EVebWT2lGySQG3x5Qm8xqUiHzuC3",
  };
  postListing(event, newListing);
  newListing = {
    username: "king_james",
    title: "Edinburgh Castle",
    description: "11th-century castle and barracks. Crown jewels not included.",
    condition: "Old",
    location: "Edinburgh",
    geotag: "55.94, -3.19",
    tradeRequired: true,
    user_id: "vUEK9J8c8tMHLLpGgdnuqJVjwZm1",
  };
  postListing(event, newListing);
  newListing = {
    username: "mancunian_123",
    title: "New shoes",
    description: "White trainers",
    condition: "Excellent",
    location: "Manchester",
    geotag: "53.48, -2.24",
    tradeRequired: true,
    user_id: "vUEK9J8c8tMHLLpGgdnuqJVjwZm1",
  };
  postListing(event, newListing);
  newListing = {
    username: "dog_",
    title: "Bone",
    description: "Tasty bone",
    condition: "Damaged",
    location: "Sheffield",
    geotag: "53.37, -1.49",
    tradeRequired: true,
    user_id: "vUNC6IYA8kZjYUy99OcBC5qmiFF3",
  };
  postListing(event, newListing);
  newListing = {
    username: "yorkie_pud",
    title: "Collection of trains",
    description: "Various locomotives, different sizes",
    condition: "Excellent",
    location: "York",
    geotag: "53.96, -1.09",
    tradeRequired: true,
    user_id: "vUNC6IYA8kZjYUy99OcBC5qmiFF3",
  };
  postListing(event, newListing);
  console.log("Re-seed complete.");
};

export const addDisplayNameToDB = (uid, displayName) => {
  setDoc(doc(db, `messages/${uid}/`), { displayName });
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
          text: "Welcome to Topswop! When you match with another user, a chat room will be opened for you to complete your trade.",
          read: false,
        }
      );
    });
  });
};

export const createChatroom = (uid_a, uid_b, displayName_a, displayname_b) => {
  console.log(`Creating a conversation between ${uid_a} and ${uid_b}`);
  setDoc(doc(db, `messages/${uid_a}/conversations`, `${uid_b}`), {});
  setDoc(doc(db, `messages/${uid_b}/conversations`, `${uid_a}`), {}).then(
    () => {
      addDoc(
        collection(db, `messages/${uid_a}/conversations/${uid_b}/messages`),
        {
          from: displayName_a,
          date: new Date(),
          text: `Matched with ${displayName_a}! You can discuss the trade here.`,
          read: false,
        }
      );
      addDoc(
        collection(db, `messages/${uid_b}/conversations/${uid_a}/messages`),
        {
          from: displayname_b,
          date: new Date(),
          text: `Matched with ${displayname_b}! You can discuss the trade here.`,
          read: false,
        }
      );
    }
  );
};

export const sendMessage = async (senderID, recipientID, messageObject) => {
  const senderCopy = await addDoc(
    collection(
      db,
      `messages/${senderID}/conversations/${recipientID}/messages`
    ),
    messageObject
  );
  console.log("Sending message: ", senderCopy.id, "(sender's copy)");
  const recipientCopy = await addDoc(
    collection(
      db,
      `messages/${recipientID}/conversations/${senderID}/messages`
    ),
    messageObject
  );
  console.log("Sending message: ", recipientCopy.id, "(recipient's copy)");
};

export function deleteListing(listing) {
  deleteDoc(doc(db, "listings", listing));
}

export const updateItem = async (
  editItem,
  listItem,
  title,
  description,
  condition,
  location
) => {
  const updateRef = doc(db, "listings", listItem);
  await updateDoc(updateRef, editItem);
};
