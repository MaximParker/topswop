<script>
  import { onSnapshot, collection } from "firebase/firestore";
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import NewListing from "./components/NewListing.svelte";
  import Listings from "./components/Listings.svelte";

  // FUNCTIONS
  import { handleLogout } from "./utils/auth";
  import { user } from "./utils/stores";
  import {
    reseedListingsDatabase,
    postListing,
    removeListingByID,
    db,
  } from "./utils/api";
</script>

<Router>
  <header>
    <nav>
      <Navbar />
    </nav>
  </header>

  <main>
    <Route path="/">
      <Login />
    </Route>

    <PrivateRoute path="home" let:location>
      <Listings />
    </PrivateRoute>

    <PrivateRoute path="profile" let:location>
      <h1>Welcome {$user.username}</h1>
      <button on:click={handleLogout}>Logout</button>
    </PrivateRoute>

    <PrivateRoute path="new-listing" let:location>
      <NewListing />
    </PrivateRoute>
  </main>
</Router>

<style>
</style>
