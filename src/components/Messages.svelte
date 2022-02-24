<script>
  import {
    onSnapshot,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../utils/api";
  import { sendWelcomeMessage } from "../utils/api";
  import { user } from "../utils/stores";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let conversations = {};
  let recipientsArray = [];

  function getMessagesFromConversations(recipientsArray) {
    recipientsArray.forEach((recipient) => {
      conversations[recipient] = [];
      const q = onSnapshot(
        collection(
          db,
          `messages/${signedIn.uid}/conversations/${recipient}/messages`
        ),
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            conversations[recipient].push(doc.data());
          });
        }
      );
    });
  }

  const getConversations = onSnapshot(
    collection(db, `messages/${signedIn.uid}/conversations`),
    (conversationsSnapshot) => {
      conversationsSnapshot.forEach((conversation) => {
        let recipient_id = conversation.id;

        recipientsArray.push(recipient_id);
      });
      getMessagesFromConversations(recipientsArray);
    }
  );
</script>

<header>
  <h1>Messages</h1>
</header>

<button on:click={sendWelcomeMessage(signedIn.uid)}>Send welcome message</button
>

<main>
  <ul>
    {#each Object.keys(conversations) as key}
      {console.log(conversations[key])}
      <!-- {console.log(conversations[key])} -->
      <li>{conversations[key]}</li>
    {/each}
  </ul>
</main>
