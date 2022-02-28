<script>
  import { user } from "../utils/stores";
  import { db } from "../utils/api";
  import { onSnapshot, collection, addDoc } from "firebase/firestore";
  import Chat from "./Chat.svelte";

  const message = {
    message: "",
    user: "",
    date: Date.now(),
  };

  //   const jsonMessage = JSON.stringify(message)

  user.subscribe((value) => {
    if (value) {
      console.log(value);
      message.user = value.uid;
    }
  });

  let messages = [];
  const getMessages = onSnapshot(
    collection(db, "messages"),
    (querySnapshot) => {
      let messageArray = [];
      querySnapshot.forEach((message) => {
        console.log(message, "messages");
        let messageData = { ...message.data(), id: message.id };
        messageArray = [messageData, ...messageArray];
      });
      messages = messageArray;
    }
  );
</script>

<main>
  <h1>Your messages</h1>
  <ul>
    {#each messages as message}
      <div>
        <p>{message}</p>
      </div>
    {/each}
  </ul>
</main>
