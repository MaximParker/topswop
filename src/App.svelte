<script>
  import { onSnapshot, collection } from "firebase/firestore";
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import NewListing from './components/NewListing.svelte'
  import Listings from './components/Listings.svelte'

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

    <Route path="listings">
      <Listings />
    </Route>

    <Route path="new-listing">
      <NewListing />
    </Route>

    <Route path="/home">
      <h1>Home</h1>
      <p>Home sweet home...</p>
    </Route>

    <Route path="about">
      <h1>About</h1>
      <p>That's what it's all about!</p>
    </Route>

    <PrivateRoute path="profile" let:location>
      <h1>Welcome {$user.username}</h1>
      <button on:click={handleLogout}>Logout</button>
    </PrivateRoute>
    
  </main>
</Router>

<style>
</style>
