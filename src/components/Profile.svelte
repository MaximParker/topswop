<script>
  import { db } from "../utils/api";
  import { handleLogout } from "../utils/auth";
  import { user } from "../utils/stores";
  import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
  import {
    onSnapshot,
    collection,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { update } from "firebase/database";
  import UpdateListings from "./UpdateListings.svelte";

  const auth = getAuth();

  let fireUser;

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      fireUser = firebaseUser;
    } else {
      console.log("no user!");
    }
  });

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let newPassword = "";

  function changePassword() {
    console.log("inside function");
    updatePassword(fireUser, newPassword)
      .then(() => {
        newPassword = "";
        console.log("Password Changed");
      })
      .catch((error) => {
        console.log(error, "errror");
      });
  }

  let myListings = [];

  const getListings = onSnapshot(
    collection(db, "listings"),
    (querySnapshot) => {
      let listingArray = [];
      querySnapshot.forEach((listing) => {
        let listingData = { ...listing.data(), id: listing.id };
        listingArray = [listingData, ...listingArray];
      });

      myListings = listingArray.filter((listItem) => {
        return listItem.user_id == signedIn.uid;
      });
    }
  );

  function deleteListing(listing) {
    deleteDoc(doc(db, "listings", listing));
  }

  const updateItem = async (
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
</script>

<main>
  <h1>Welcome, {signedIn.displayName}</h1>
  <button on:click={handleLogout}>Logout</button>
  <p>Avatar image{signedIn.photoURL}</p>
  <p>Email: {signedIn.email}</p>
  <form on:submit|preventDefault={changePassword}>
    <input
      type="password"
      placeholder="new password"
      bind:value={newPassword}
    />
    <button class="btn">Change Password</button>
  </form>
  <br />
  <h2>My listings</h2>
  <ul>
    {#each myListings as listing}
      <li>
        <UpdateListings {listing} {deleteListing} {updateItem} />
      </li>
    {/each}
  </ul>
</main>
