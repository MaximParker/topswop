<script>
  import { db } from "../utils/api";
  import { handleLogout } from "../utils/auth";
  import { user } from "../utils/stores";
  import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
  import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";

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
        <h3>Title: {listing.title}</h3>
        <p>Description: {listing.description}</p>
        <p>Condition: {listing.condition}</p>
        <p>Location: {listing.location}</p>
        <button class="btn" on:click={deleteListing(listing.id)}
          >Delete Item</button
        >
        <button class="btn">Edit Item</button>
      </li>
    {/each}
  </ul>
</main>
