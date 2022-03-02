<script>
  import { Link } from "svelte-navigator";
  import { user } from "../utils/stores";
  import {
    HomeIcon,
    PlusCircleIcon,
    UserIcon,
    MenuIcon,
    GiftIcon,
    UsersIcon,
    MailIcon,
    LogOutIcon,
    ArchiveIcon,
    ZapIcon,
    ToolIcon
  } from "svelte-feather-icons";
  import { handleLogout } from "../utils/auth";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });
</script>

{#if signedIn}
  <div class="navbar bg-base-100 shadow">
    <div class="flex-1">
      <Link to="/" class="normal-case text-xl">
        <img
          src="graphics/logotext_white_hollow.png"
          alt="Topswop logo"
          class="w-36"
        />
      </Link>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://api.lorem.space/image/face?hash=33791"
              alt="Profile icon"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52"
        >
          <p>
            <strong>{signedIn.displayName}</strong>
          </p>
          <li>
            <Link to="/profile">
              <UserIcon size="24" />Profile</Link
            >
          </li>
          <li>
            <Link to="/messages">
              <MailIcon size="24" />Messages</Link
            >
          </li>
          <li>
            <Link to="/new-listing">
              <PlusCircleIcon size="24" />New listing</Link
            >
          </li>

          <li>
            <Link to="/matches">
              <GiftIcon size="24" />Matches</Link
            >
          </li>
          <li>
            <Link to="/potential-matches">
              <ZapIcon size="24" />Potential matches</Link
            >
          </li>
          <li>
            <Link to="/developer">
              <ToolIcon size="24" />Developer menu</Link
            >
          </li>
          <li>
            <a on:click={handleLogout}> <LogOutIcon size="24" />Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
{/if}
