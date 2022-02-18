<script>
  import { collection, doc, setDoc } from "firebase/firestore";

  import db from "./App.svelte";

  let arrList = [];
  let newUser = "";

  db.collection("user").onSnapshot((snapData) => {
    arrList = snapData.docs;
  });

  const userCollection = collection(db, "users");

  const addPeople = async (
    forename = "CAT",
    surname = "HOANG",
    username = "CATH"
  ) => {
    await addDoc(userCollection, { forename, surname, username });
  };
</script>

<main>
  <input type="text" bind:value={newUser} />
  <button on:click={addPeople}>Add</button>
</main>

<style>
</style>
