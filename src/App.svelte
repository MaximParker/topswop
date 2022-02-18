<script>
  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    deleteDoc,
  } from "firebase/firestore";
  import { firebaseConfig } from "./lib/firebaseConfig";
  import Template from "./lib/components/Template.svelte";
  import DeleteFunction from "./lib/components/DeleteFunction.svelte";

  const init = initializeApp(firebaseConfig);
  const db = getFirestore();

  const colRef = collection(db, "users");

  let users = [];

  const userSnapshot = onSnapshot(colRef, (QuerySnapshot) => {
    QuerySnapshot.forEach((user) => {
      let userData = { ...user.data() };
      users = [userData, ...users];
    });
  });

  export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <DeleteFunction {db} />
  <Template />
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
