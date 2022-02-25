<script>
  import { Link } from "svelte-navigator";
  import { user } from "../utils/stores";
  import {
    HomeIcon,
    SearchIcon,
    InfoIcon,
    PlusCircleIcon,
    UserIcon,
    MenuIcon,
    GiftIcon,
    UsersIcon,
  } from "svelte-feather-icons";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });
</script>

{#if signedIn}
  <main>
    <Link to="/"><HomeIcon size="36" /></Link>
    <Link to="potential-matches"><GiftIcon size="36" /></Link>
    <Link to="matches"><UsersIcon size="36" /></Link>
    <Link to="new-listing"><PlusCircleIcon size="36" /></Link>
    <Link to="profile"><UserIcon size="36" /></Link>

    <MenuIcon size="36" />
    <p>{signedIn ? `${signedIn.email} (${signedIn.uid})` : "Sign in"}</p>
  </main>
{/if}

<style>
</style>
