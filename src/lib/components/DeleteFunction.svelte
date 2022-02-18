<script>
  import { deleteDoc, doc } from "firebase/firestore";
  export let db;

  const deleteFunc = () => {
    deleteDoc(doc(db, "users", "test_id"));
  };
</script>

<main>
  <p />
  <button
    on:click={() => {
      deleteFunc();
      console.log(db);
    }}>Delete</button
  >
</main>

<style>
</style>
