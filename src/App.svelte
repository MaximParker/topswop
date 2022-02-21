<script>
  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
  } from "firebase/firestore";
  import { firebaseConfig } from "./lib/firebaseConfig";

  // ROUTERS
  import { Router, Route, Link } from "svelte-navigator";
  import Login from "./lib/components/Login.svelte";
  import PrivateRoute from "./lib/components/PrivateRoute.svelte";
  import { user } from "./lib/components/stores";
  import Template from "./lib/components/Template.svelte";

  // GRAPHICS
  import { HomeIcon, SearchIcon, InfoIcon, PlusCircleIcon, UserIcon, MenuIcon } from "svelte-feather-icons";

  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Checkbox from '@smui/checkbox';
  let prominent = false;
  let dense = false;
  let secondaryColor = false;

  const init = initializeApp(firebaseConfig);
  export const db = getFirestore();

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

  const postListing = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "listings"), newListing);
    console.log("Document written to Listings with ID: ", docRef.id);
  };

  const removeListingByID = async (id) => {
    await deleteDoc(doc(db, "listings", id));
  };

  const reseedListingsDatabase = async (event) => {
    console.log("Removing all listings...");
    for (let listing of listings) {
      removeListingByID(listing.id);
    }
    console.log("Listings removed.");
    console.log("Seeding database...");
    newListing = {
      username: "mister_bean",
      title: "Mini",
      description: "Yellow",
      condition: "Old",
      location: "England",
      tradeRequired: false,
    };
    postListing(event);
    newListing = {
      username: "darth_vader",
      title: "Lightsaber",
      description: "Red",
      condition: "Good",
      location: "Tatooine",
      tradeRequired: false,
    };
    postListing(event);
    newListing = {
      username: "bilbo-baggins",
      title: "The One Ring",
      description: "Precious",
      condition: "Old",
      location: "Mordor",
      tradeRequired: true,
    };
    postListing(event);
    newListing = {
      username: "doctor_who",
      title: "TARDIS",
      description: "Blue police box",
      condition: "Excellent",
      location: "Earth",
      tradeRequired: true,
    };
    postListing(event);
    newListing = {
      username: "dog_",
      title: "Bone",
      description: "Tasty bone",
      condition: "Damaged",
      location: "Backyard",
      tradeRequired: true,
    };
    postListing(event);
    newListing = {
      username: "cat_",
      title: "Ball of yarn",
      description: "Red",
      condition: "Excellent",
      location: "LivingRoom",
      tradeRequired: true,
    };
    postListing(event);
    console.log("Re-seed complete.");
  };

  function handleLogout() {
    $user = null;
  }
</script>

<Router>
  <header>
    <nav>
      <Link to="/home"><HomeIcon size="36" /></Link>
      <Link to="about"><InfoIcon size="36" /></Link>
      <Link to="listings"><SearchIcon size="36" /></Link>
      <Link to="new-listing"><PlusCircleIcon size="36" /></Link>
      <Link to="profile"><UserIcon size="36" /></Link>
      <MenuIcon size="36"/>
    </nav>
<!--     <div class="top-app-bar-container flexor">
    <TopAppBar
      variant="static"
      {prominent}
      {dense}
      color={secondaryColor ? 'secondary' : 'primary'}
    >
      <Row>
        <Section>
          <IconButton class="material-icons">menu</IconButton>
          <Title>Flex Static</Title>
        </Section>
        <Section align="end" toolbar>
          <IconButton class="material-icons" aria-label="Download"
            >file_download</IconButton
          >
          <IconButton class="material-icons" aria-label="Print this page"
            >print</IconButton
          >
          <IconButton class="material-icons" aria-label="Bookmark this page"
            >bookmark</IconButton
          >
        </Section>
      </Row>
    </TopAppBar>
  </div> -->
  </header>

  <main>
    <Route path="/">
      <h1>Welcome</h1>
      <Login />
    </Route>

    <Route path="login">
      <Login />
    </Route>

    <Route path="listings">
      <h1>All listings ({listings.length})</h1>
      <p>Listings</p>
      <button
        on:click={(event) => {
          reseedListingsDatabase(event);
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
          postListing(event);
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
