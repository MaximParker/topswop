<script>
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import NewListing from "./components/NewListing.svelte";
  import Listings from "./components/Listings.svelte";
  import Profile from "./components/Profile.svelte";
  import Messages from "./components/Messages.svelte";
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

  <PrivateRoute path="messages" let:location>
    <Messages />
  </PrivateRoute>
</Router>

<style>
</style>
