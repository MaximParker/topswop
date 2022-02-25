<script>
  import {
    onSnapshot,
    collection,
    query,
    where,
    getDocs,
    addDoc,
  } from "firebase/firestore";
  import { db } from "../utils/api";
  import { user } from "../utils/stores";
  import { useNavigate, useLocation } from "svelte-navigator";

  const navigate = useNavigate();

  let signedIn;
  let newText = {
    text: "",
    from: signedIn.displayName,
    date: Date.now(),
    read: false,
  };
  user.subscribe((value) => {
    signedIn = value;
  });

  export let currentChat;
  export let conversationArray;

  const sendMessage = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(
      collection(
        db,
        `messages/${signedIn.uid}/conversations/${currentChat}/messages`
      ),
      newText
    );
    console.log("Sending message: ", docRef.id);
  };
</script>

<header>
  <form
    on:submit={() => {
      currentChat = "";
      navigate("/messages");
    }}
  >
    <button type="submit">Go back to messages</button>
  </form>
  <h1>{currentChat}</h1>
</header>

{#each conversationArray as conversation}
  {#if conversation.recipient == currentChat}
    <li>{conversation.data.text}</li>
  {/if}
{/each}

<main>
  <form>
    <input type="text" placeholder="type message here" bind:value={newText} />
    <button on:click={sendMessage}>Send!</button>
  </form>
</main>
