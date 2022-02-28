<script>
  import { handleLogout } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../utils/stores";
  import { updatePassword } from "firebase/auth";
  import MyListings from "./MyListings.svelte";

  const navigate = useNavigate();

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let newPassword = "";

  updatePassword(signedIn, newPassword)
    .then((entry) => {
      console.log(entry);
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<main>
  <h1>Welcome, {signedIn.displayName}</h1>
  <button on:click={handleLogout}>Logout</button>
  <p>Avatar image{signedIn.photoURL}</p>
  <!-- <p>Location {signedIn.location}</p> -->
  <button
    on:click={() => {
      MyListings;
      navigate("/my-listings");
    }}
    >My listings
  </button>
  <p>Email: {signedIn.email}</p>
  <form>
    <input type="text" placeholder="password" bind:value={newPassword} />
    <button on:click={updatePassword()}>Change Password</button>
  </form>
</main>
