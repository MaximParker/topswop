<script>
  import { Link } from "svelte-navigator";
  import { user } from "../utils/stores";
  import {
    HomeIcon,
    PlusCircleIcon,
    UserIcon,
    MenuIcon,
    MessageSquareIcon
  } from "svelte-feather-icons";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });
</script>

{#if signedIn}
  <main>
    <Link to="/"><HomeIcon size="36" /></Link>
    <Link to="new-listing"><PlusCircleIcon size="36" /></Link>
    <Link to="profile"><UserIcon size="36" /></Link>
    <Link to="messages"><MessageSquareIcon size="36" /></Link>
    <MenuIcon size="36" />
    <p>{signedIn ? `${signedIn.displayName} ${signedIn.email} (${signedIn.uid})` : "Not signed in"}</p>
  </main>
{/if}

<style>
</style>
