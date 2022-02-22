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
  } from "svelte-feather-icons";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });
</script>

<main>
  <Link to="/home"><HomeIcon size="36" /></Link>
  <Link to="about"><InfoIcon size="36" /></Link>
  <Link to="listings"><SearchIcon size="36" /></Link>
  <Link to="new-listing"><PlusCircleIcon size="36" /></Link>
  <Link to="profile"><UserIcon size="36" /></Link>
  <MenuIcon size="36" />
  <p>{signedIn ? `${signedIn.email} (${signedIn.uid})` : "Sign in"}</p>
</main>

<style>
</style>
