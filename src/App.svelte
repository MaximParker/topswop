<script>
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
<<<<<<< HEAD
  import Inbox from "./components/Inbox.svelte";
  import { user } from "./components/stores";

  import Template from "./components/Template.svelte";
  import {
    reseedListingsDatabase,
    postListing,
    removeListingByID,
    db,
  } from "./utils/api";

  // GRAPHICS
  import {
    HomeIcon,
    SearchIcon,
    InfoIcon,
    PlusCircleIcon,
    UserIcon,
    MenuIcon,
    MessageSquareIcon,
  } from "svelte-feather-icons";

  let listings = [];

  const getListings = onSnapshot(
    collection(db, "listings"),
    (querySnapshot) => {
      let listingArray = [];
      querySnapshot.forEach((listing) => {
        let listingData = { ...listing.data(), id: listing.id };
        listingArray = [listingData, ...listingArray];
      });
      listings = listingArray;
    }
  );

  let newListing = {
    username: "",
    title: "",
    description: "",
    condition: "",
    location: "",
    tradeRequired: false,
  };

  function handleLogout() {
    $user = null;
  }
=======
  import NewListing from "./components/NewListing.svelte";
  import Listings from "./components/Listings.svelte";
  import Profile from './components/Profile.svelte'
>>>>>>> d714153ac1f8e75d936a53c9430889c1b837746b
</script>

<Router>
  <header>
    <nav>
<<<<<<< HEAD
      <Link to="/home"><HomeIcon size="36" /></Link>
      <Link to="about"><InfoIcon size="36" /></Link>
      <Link to="listings"><SearchIcon size="36" /></Link>
      <Link to="new-listing"><PlusCircleIcon size="36" /></Link>
      <Link to="profile"><UserIcon size="36" /></Link>
      <Link to="inbox"><MessageSquareIcon size="36" /></Link>
      <MenuIcon size="36" />
=======
      <Navbar />
>>>>>>> d714153ac1f8e75d936a53c9430889c1b837746b
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
