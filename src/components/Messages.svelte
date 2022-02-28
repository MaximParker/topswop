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
  <h1>Messages</h1>
</header>

<button
  on:click={() => {
    createChatroom(
      "WoDT5RSioGR1wrsQXtseBN1J6mq1",
      "SKTFILPxIPamzZ2EUbNSRgy830q1"
    );
  }}
/>

<main>
  {#if currentChat}
    <Chat {conversationArray} {currentChat} />
  {:else}
    <ul>
      {#each uniqueConversations as message}
        <li>
          <p>
            <strong>{message.recipient}</strong>
          </p>
          <p>{message.data.from}: {message.data.text}</p>

          <button
            on:click={() => {
              currentChat = message.recipient;
            }}>Chat!</button
          >
        </li>
      {/each}
    </ul>
  {/if}
</main>
