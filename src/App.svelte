<script>
  import { onSnapshot, collection } from "firebase/firestore";
  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Login from "./components/Login.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Template from "./components/Template.svelte";
  import ListingCard from "./components/ListingCard.svelte"
  import { handleLogout } from "./utils/auth";
  import { user } from "./utils/stores";
  import {
    reseedListingsDatabase,
    postListing,
    removeListingByID,
    db,
  } from "./utils/api";

  // UI/UX

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

    <Route path="login">
      <Login />
    </Route>

    <Route path="listings">
      <h1>All listings ({listings.length})</h1>
      <p>Listings</p>
      <ListingCard />
      <button
        on:click={(event) => {
          reseedListingsDatabase(event, listings);
        }}>Re-seed database</button
      >

      <table style="width:100%">
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Condition</th>
          <th>Location</th>
        </tr>
        {#each listings as listing}
          <tr
            ><td>{listing.id.substring(0, 5)}...</td>
            <td>{listing.title}</td>
            <td>{listing.description}</td>
            <td>{listing.condition}</td>
            <td>{listing.location}</td></tr
          >
        {/each}
      </table>
    </Route>

    <Route path="new-listing">
      <h1>New listing</h1>
      <form
        on:submit={(event) => {
          postListing(event, newListing);
        }}
      >
        <input
          type="text"
          placeholder="Username..."
          bind:value={newListing.username}
        />
        <input
          type="text"
          placeholder="title..."
          bind:value={newListing.title}
        />
        <input
          type="text"
          placeholder="description..."
          bind:value={newListing.description}
        />
        <input
          type="text"
          placeholder="condition..."
          bind:value={newListing.condition}
        />
        <input
          type="text"
          placeholder="location..."
          bind:value={newListing.location}
        />
        <input
          type="text"
          placeholder="tradeRequired..."
          bind:value={newListing.tradeRequired}
        />
        <button type="submit">Submit</button>
      </form>
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

    <Route path="/test" />
  </main>
</Router>

<style>
</style>
