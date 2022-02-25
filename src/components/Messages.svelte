<script>
  import {
    onSnapshot,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../utils/api";
  import { sendWelcomeMessage, createChatroom } from "../utils/api";
  import { user } from "../utils/stores";
  import { onMount } from "svelte";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  $: conversations = {};
  let recipientsArray = [];

  function getMessagesFromConversations(recipientsArray) {
    let newConversations = {};
    recipientsArray.forEach(async (recipient) => {
      newConversations[recipient] = [];
      const q = onSnapshot(
        collection(
          db,
          `messages/${signedIn.uid}/conversations/${recipient}/messages`
        ),
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            newConversations[recipient] = [
              doc.data(),
              ...newConversations[recipient],
            ];
          });
        }
      );
    });
    console.log("NEW CONVERSATION DATA:", newConversations);
    conversations = newConversations;
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
<button
  on:click={() => {
    createChatroom("cat", "dan");
  }}>Start chatroom</button
>

<main>
  <ul>
    {#each Object.keys(conversations) as key}
      <li>
        <p>{key}</p>
        <p>{conversations.topswop_team}</p>
      </li>
    {:else}
      <p>Loading...</p>
    {/each}
  </ul>
</main>
