<script>
  import { handleLogout } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../utils/stores";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

</script>

<main>
  <h1>Welcome, {signedIn.displayName}</h1>
  <button on:click={handleLogout}>Logout</button>
</main>
