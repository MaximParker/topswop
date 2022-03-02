<script>
  import { db, uploadProfilePic } from "../utils/api";
  import { handleLogout } from "../utils/auth";
  import { user } from "../utils/stores";
  import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
  import { onSnapshot, collection } from "firebase/firestore";
  import UpdateListings from "./UpdateListings.svelte";
  import { useNavigate } from "svelte-navigator";
  const navigate = useNavigate();

  const auth = getAuth();

  let fireUser;
  let profilePhotoURL;

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      profilePhotoURL = firebaseUser.photoURL;
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
  let confirmNewPassword = "";

  function changePassword() {
    if ((newPassword = confirmNewPassword)) {
      updatePassword(fireUser, newPassword)
        .then(() => {
          newPassword = "";
          confirmNewPassword = "";
          alert("Your password has been changed.");
        })
        .catch((error) => {
          alert("Error");
        });
    } else {
      alert("Passwords did not match!");
      newPassword = "";
      confirmNewPassword = "";
    }
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
</script>

<header>
  <div class="mx-auto my-2">
    <h1 class="text-xl font-bold text-primary align-center text-center">
      Hello, {signedIn.displayName}!
    </h1>
    <h2 class="text-l text-primary align-center text-center">
      {signedIn.email}
    </h2>
  </div>
</header>

<main>
  <ul class="menu bg-primary mx-auto w-80 p-2 rounded-box">
    <li>
      <label for="modal-change-password" class="btn btn-ghost modal-button"
        >Change password</label
      >
      <label for="modal-change-avatar" class="btn btn-ghost modal-button"
        >Change avatar</label
      >
      <button
        class="btn btn-ghost"
        on:click={handleLogout}
        >Sign out
      </button>
    </li>
  
  </ul>
  <div class="divider" />
  <div class="mx-auto my-2">
    <h1 class="text-xl font-bold text-primary align-center text-center">
      Your listings
    </h1>
  </div>
  {#if myListings.length != 0}
    <ul>
      {#each myListings as listing}
        <li>
          <UpdateListings {listing} />
        </li>
      {/each}
    </ul>
  {/if}
  {#if myListings.length == 0}
    <div class="mx-auto max-w-max">
      <button
        on:click={() => {
          navigate("/new-listing");
        }}
        class="btn btn-primary">Post your first listing</button
      >
    </div>
  {/if}

  <input type="checkbox" id="modal-change-password" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box bg-primary">
      <h3 class="font-bold text-lg">Change password</h3>
      <p class="py-4">
        Passwords must be at least 6 characters long. Consider using numbers and
        special characters, too.
      </p>

      <form
        on:submit|preventDefault={() => {
          changePassword;
        }}
      >
        <input
          type="password"
          placeholder="New password..."
          bind:value={newPassword}
          required
          class="input input-bordered bg-primary mb-2"
        />

        <input
          type="password"
          placeholder="Confirm new password..."
          bind:value={confirmNewPassword}
          required
          class="input input-bordered bg-primary mb-2"
        />
        <div class="modal-action">
          <label for="modal-change-password" class="btn" type="submit"
            >submit</label
          >
          <label for="modal-change-password" class="btn btn-ghost">cancel</label
          >
        </div>
      </form>
    </div>
  </div>

  <input type="checkbox" id="modal-change-avatar" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box bg-primary">
      <h3 class="font-bold text-lg">Upload new avatar</h3>
      <p class="py-4">Upload a new image to change your avatar.</p>



      <form on:submit|preventDefault={() => {}}>
        <button class="btn"></button>
        <div class="modal-action">
          <label for="modal-change-avatar" class="btn" type="submit"
            >submit</label
          >
          <label for="modal-change-avatar" class="btn btn-ghost">Cancel</label>
        </div>
      </form>
    </div>
  </div>
</main>
