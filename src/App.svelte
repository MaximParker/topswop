<script>
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import NewListing from "./components/NewListing.svelte";
  import Listings from "./components/Listings.svelte";
  import Profile from "./components/Profile.svelte";
  import Inbox from "./components/Inbox.svelte";
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

    <Route path="inbox">
      <Inbox />
    </Route>

    <PrivateRoute path="profile" let:location>
      <Profile />
    </PrivateRoute>

    <PrivateRoute path="new-listing" let:location>
      <NewListing />
    </PrivateRoute>
  </main>
</Router>

<style>
</style>
