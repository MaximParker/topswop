<script>
  import {
    onSnapshot,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { createChatroom, db } from "../utils/api";
  import { user } from "../utils/stores";
  import Chat from "../components/Chat.svelte";
  import { onValue, ref } from "firebase/database";
  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let recipientsArray = [];
  let conversationArray = [];
  let uniqueConversations = [];
  let tallyRecipients = [];
  let currentRecipient = "";

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
            querySnapshot.docChanges().forEach((entry) => {
              conversationArray = [
                ...conversationArray,
                { recipient, data: entry.doc.data() },
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
  <div class="mx-auto my-2">
    <h1 class="text-xl font-bold text-primary align-center text-center">Messages</h1>
  </div>
</header>

<main>
  {#if currentRecipient}
    <Chat {conversationArray} {currentRecipient} />
  {:else}
    <ul class="menu bg-primary mx-auto w-80 p-2 rounded-box">
      {#each uniqueConversations as convo}
        <li>
          <button
            class="btn btn-ghost"
            on:click={() => {
              currentRecipient = convo.recipient;
            }}>{convo.recipient}</button
          >
        </li>
      {/each}
    </ul>
  {/if}
</main>
