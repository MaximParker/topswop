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
  import Template from "./lib/components/Template.svelte";

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
      username: "doctor_who",
      title: "TARDIS",
      description: "Blue police box",
      condition: "Excellent",
      location: "Earth",
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
    console.log("Re-seed complete.");
  };

  import { Router, Route, Link } from "svelte-navigator";
  import Login from "./lib/components/Login.svelte";
  import PrivateRoute from "./lib/components/PrivateRoute.svelte";
  import { user } from "./lib/components/stores";

  function handleLogout() {
    $user = null;
  }
</script>

<Router>
  <header>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="listings">Offers</Link>
      <Link to="about">About</Link>
      <Link to="new-listing">New post</Link>
      <Link to="profile">Profile</Link>
    </nav>
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
            ><td>{listing.id.substring(0,5)}...</td>
            <td>{listing.title}</td>
            <td>{listing.description}</td>
            <td>{listing.condition}</td>
            <td>{listing.location}</td></tr
          >
        {/each}
      </table>

      <!--       <ul>
        {#each users as user}
          <li>
            <span>{user.forename} {user.surname} ({user.username})</span><button
              on:click={() => {
                removeUser(user.id);
              }}>Delete</button
            >
          </li>
        {/each}
      </ul> -->
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
  :root {
    background-color: darkslategrey;
  }

  nav {
    background-color: lightblue;
    height: 50px;
  }

  main {
    background-color: white;
    text-align: center;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
