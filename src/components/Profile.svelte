<script>
  import { handleLogout } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../utils/stores";
  import { uploadProfilePic, profilePicExport } from "../utils/api";

  let signedIn;
  user.subscribe((value) => {
    signedIn = value;
  });

  console.log(profilePicExport);
</script>

<main>
  <h1>Welcome, {signedIn.displayName}</h1>
  <img src={profilePicExport} alt="profile pic" />
  <form on:submit={uploadProfilePic}>
    <input type="file" accept="image/*" /><input />
    <button type="submit">Add Profile Pic</button>
  </form>
  <br />
  <button on:click={handleLogout}>Logout</button>
</main>
