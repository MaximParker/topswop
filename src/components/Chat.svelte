<script>
  import { user } from "./stores";
  import { db } from "../utils/api";
  import { onSnapshot, collection, addDoc } from "firebase/firestore";

  const chatMessage = {
    text: "",
    user: "",
    date: Date.now(),
  };
  user.subscribe((value) => {
    if (value) {
      console.log(value);
      chatMessage.user = value.uid;
    }
  });
  let chats = [];
  const getChats = onSnapshot(collection(db, "chats"), (querySnapshot) => {
    let chatArray = [];
    querySnapshot.forEach((chat) => {
      console.log(chat, "chatsssss");
      let chatData = { ...chat.data(), id: chat.id };
      chatArray = [chatData, ...chatArray];
    });
    chats = chatArray;
  });

  async function sendchatMessage() {
    const docRef = await setDoc(collection(db, "chats"), chatMessage);
    console.log("Document written to chats: ", docRef);
    chatMessage.text = "";
  }
</script>

<main>
  <h1>Hi</h1>
  <div class="form">
    <input type="text" bind:value={chatMessage.text} />
    <button on:click={sendchatMessage}>send!</button>
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
