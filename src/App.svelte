<script>
  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, onSnapshot } from "firebase/firestore";
  import { firebaseConfig } from "./lib/firebaseConfig";
  import Template from "./lib/components/Template.svelte";
  // import Post from "./Post.svelte";

  const init = initializeApp(firebaseConfig);
  export const db = getFirestore();

  export const colRef = collection(db, "users");

  let users = [];

  export const userSnapshot = onSnapshot(colRef, (QuerySnapshot) => {
    QuerySnapshot.forEach((user) => {
      let userData = { ...user.data() };
      users = [userData, ...users];
    });
  });

  export let name;

  let arrList = [];
  let newUser = "";

  const addPeople = async (
    forename = newUser,
    surname = newUser,
    username = newUser
  ) => {
    await addDoc(colRef, { forename, surname, username });
  };
</script>

<main>
  <h1>Hello {name}!</h1>
  <Template />
  <input type="text" bind:value={newUser} />
  <button on:click={addPeople}>Add</button>
  <ul>
    {#each users as user}
      <li><span>{user.forename} {user.surname} ({user.username})</span></li>
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
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
