<script>
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import NewListing from "./components/NewListing.svelte";
  import Listings from "./components/Listings.svelte";
  import Profile from "./components/Profile.svelte";
  import PotentialMatches from "./components/PotentialMatches.svelte";
  import Matches from "./components/Matches.svelte";
  import Messages from "./components/Messages.svelte";
  import MyListings from "./components/MyListings.svelte";
</script>

<Router>
  <nav>
    <Navbar />
  </nav>

  <Route path="/">
    <Login />
  </Route>

  <PrivateRoute path="home" let:location>
    <Listings />
  </PrivateRoute>

  <PrivateRoute path="profile" let:location>
    <Profile />
  </PrivateRoute>

  <PrivateRoute path="new-listing" let:location>
    <NewListing />
  </PrivateRoute>

  <PrivateRoute path="potential-matches" let:location>
    <PotentialMatches />
  </PrivateRoute>

  <PrivateRoute path="matches" let:location>
    <Matches />
  </PrivateRoute>

  <PrivateRoute path="new-listing" let:location>
    <NewListing />
  </PrivateRoute>

  <PrivateRoute path="my-listings" let:location>
    <MyListing />
  </PrivateRoute>

  <PrivateRoute path="messages" let:location>
    <Messages />
  </PrivateRoute>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
