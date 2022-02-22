<script>
  import { user } from "./stores";
  import { db } from "../utils/api";
  import { onSnapshot, collection, addDoc } from "firebase/firestore";

  const message = {
    text: "",
    user: "",
    date: Date.now(),
  };
  user.subscribe((value) => {
    if (value) {
      console.log(value);
      message.user = value.uid;
    }
  });
  let chats = [];
  const getChats = onSnapshot(collection(db, "chats"), (querySnapshot) => {
    let chatArray = [];
    querySnapshot.forEach((chat) => {
      console.log(chat, "chatsssss");
      let chapata = { ...chat.data(), id: chat.id };
      chatArray = [chapata, ...chatArray];
    });
    chats = chatArray;
  });

  async function sendMessage() {
    const docRef = await addDoc(collection(db, "chats"), message);
    console.log("Document written to chats: ", docRef);
    message.text = "";
  }
</script>

<main>
  <h1>Hi</h1>
  <div class="form">
    <input type="text" bind:value={message.text} />
    <button on:click={sendMessage}>send!</button>
    {#each chats as chat}
      <div>
        <p>{chat.text}</p>
      </div>
    {/each}
  </div>
</main>

<style>
  .form {
    background-color: solid red;
  }
</style>
