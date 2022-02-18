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

  /*
  const init = initializeApp(firebaseConfig);
  export const db = getFirestore();


  let users = [];

  const userSnapshot = onSnapshot(collection(db, "users"), (querySnapshot) => {
    let userArray = [];
    querySnapshot.forEach((user) => {
      let userData = { ...user.data(), id: user.id };
      userArray = [userData, ...userArray];
    });
    users = userArray;
  });

  const removeUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  let arrList = [];
  let newForename = "";
  let newSurname = "";
  let newUsername = "";

	const addUser = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "users"), {
      forename: newForename,
      surname: newSurname,
      username: newUsername,
    });
    console.log("Document written with ID: ", docRef.id);
  }; */

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
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="profile">Profile</Link>
    </nav>
  </header>

  <main>
    <Route path="login">
      <Login />
    </Route>

    <Route path="/">
      <h3>Home</h3>
      <p>Home sweet home...</p>
    </Route>

    <Route path="about">
      <h3>About</h3>
      <p>That's what it's all about!</p>
    </Route>

    <PrivateRoute path="profile" let:location>
      <h3>Welcome {$user.username}</h3>
      <button on:click={handleLogout}>Logout</button>
    </PrivateRoute>

    <Route path="/test">
      <!-- <Template />
  <form
    on:submit={(event) => {
      addUser(event);
    }}
  >
    <input type="text" placeholder="Forename..." bind:value={newForename} />
    <input type="text" placeholder="Surname..." bind:value={newSurname} />
    <input type="text" placeholder="Username..." bind:value={newUsername} />
    <button type="submit">Submit</button>
  </form>

  <ul>
    {#each users as user}
      <li><span>{user.forename} {user.surname} ({user.username})</span></li>
    {/each}
  </ul>
  <p>----------------</p>
  <ul>
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
  </main>
</Router>

<style>
  nav {
    background-color: black;
    height: 50px;
  }
  main {
    background-color: blueviolet;
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    background-color: yellow;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
