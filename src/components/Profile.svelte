<script>
  import { handleLogout } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../utils/stores";
  import { updatePassword, onAuthStateChanged } from "firebase/auth";
  import MyListings from "./MyListings.svelte";

  const navigate = useNavigate();

  import { getAuth } from "firebase/auth";

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
        console.log("Cannot change password");
      });
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
    <button>Change Password</button>
  </form>

  <ul>
    My listings
    <li />
  </ul>
</main>
