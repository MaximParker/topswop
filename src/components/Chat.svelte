<script>
  import {
    onSnapshot,
    collection,
    query,
    where,
    getDocs,
    addDoc,
  } from "firebase/firestore";
  import { db, sendMessage } from "../utils/api";
  import { user } from "../utils/stores";
  import { useNavigate, useLocation } from "svelte-navigator";
  const navigate = useNavigate();

  let signedIn;
  user.subscribe((value) => {
    signedIn = value;
  });

  let newMessage = {
    text: "",
    from: signedIn.displayName,
    date: new Date(),
    read: false,
  };

  export let currentRecipient;
  export let conversationArray;
  let currentConversation = [];
  $: if (conversationArray) {
    currentConversation = conversationArray.filter(
      (entry) => entry.recipient == currentRecipient
    );
    currentConversation.sort(function (a, b) {
      return a.data.date - b.data.date;
    });
  }
</script>

<header>
  <form
    on:submit={() => {
      currentRecipient = "";
      navigate("/messages");
    }}
  >
    <button type="submit">Go back to messages</button>
  </form>
  <h1>{currentConversation[0].data.from}</h1>
  {console.log(`Chatting with: ${currentConversation[0].data.from} (${currentRecipient})`)}
</header>

{#each currentConversation as message}
  <li>
    <strong>{message.data.from}</strong> says: {message.data.text}
  </li>
{/each}

<main>
  <form
    on:submit={(event) => {
      event.preventDefault();

      newMessage.date = new Date();
      currentConversation = [
        ...currentConversation,
        { data: { ...newMessage } },
      ];
      sendMessage(signedIn.uid, currentRecipient, newMessage);
      newMessage.text = "";
    }}
  >
    <input
      type="text"
      placeholder="type message here"
      bind:value={newMessage.text}
    />
    <button type="submit">Send!</button>
  </form>
</main>
