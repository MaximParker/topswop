<script>
  import { handleLogout } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../utils/stores";
  import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
  import { uploadProfilePic } from "../utils/api";

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
</script>

<main>
  <h1>Welcome, {signedIn.displayName}</h1>
  <img src={profilePhotoURL} alt="profile pic" />
  <form on:submit={uploadProfilePic}>
    <input type="file" accept="image/*" /><input />
    <button type="submit">Add Profile Pic</button>
  </form>
  <br />
  <button on:click={handleLogout}>Logout</button>
</main>
