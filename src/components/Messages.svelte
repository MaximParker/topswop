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
  import Chat from "../components/Chat.svelte";
  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let recipientsArray = [];
  let conversationArray = [];
  let uniqueConversations = [];
  let tallyRecipients = [];
  let currentChat = "";

  const getConversations = onSnapshot(
    collection(db, `messages/${signedIn.uid}/conversations`),
    (conversationsSnapshot) => {
      conversationsSnapshot.forEach((conversation) => {
        let recipient_id = conversation.id;
        recipientsArray = [...recipientsArray, recipient_id];
      });

      recipientsArray.forEach((recipient) => {
        const q = onSnapshot(
          collection(
            db,
            `messages/${signedIn.uid}/conversations/${recipient}/messages`
          ),
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              conversationArray = [
                ...conversationArray,
                { recipient, data: doc.data() },
              ];
            });
          }
        );
      });
    }
  );

  $: {
    conversationArray.forEach((entry) => {
      if (!tallyRecipients.includes(entry.recipient)) {
        uniqueConversations = [...uniqueConversations, entry];
        tallyRecipients = [...tallyRecipients, entry.recipient];
      }
    });
  }
</script>

<header>
  <h1>Messages</h1>
</header>

<main>
  {#if currentChat}
    <Chat {conversationArray} {currentChat} />
  {:else}
    <ul>
      {#each uniqueConversations as conversation}
        <li>
          <p>
            <strong>{conversation.recipient}</strong>
          </p>
          <p>{conversation.data.from}: {conversation.data.text}</p>

          <button
            on:click={() => {
              currentChat = conversation.recipient;
            }}>Chat!</button
          >
        </li>
      {/each}
    </ul>
  {/if}
</main>
