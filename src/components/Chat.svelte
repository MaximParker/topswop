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
  user.subscribe((value) => {
    signedIn = value;
  });

  let newMessage = {
    text: "",
    from: signedIn.displayName,
    date: new Date(),
    read: false,
  };

  export let currentChat;
  export let conversationArray;
  let currentConversation = conversationArray.filter(
    (entry) => entry.recipient == currentChat
  );
  currentConversation.sort(function (a, b) {
    return a.data.date - b.data.date;
  });

  const sendMessage = async () => {
    const senderCopy = await addDoc(
      collection(
        db,
        `messages/${signedIn.uid}/conversations/${currentChat}/messages`
      ),
      newMessage
    );
    console.log("Sending message: ", senderCopy.id, "(sender's copy)");

    const recipientCopy = await addDoc(
      collection(
        db,
        `messages/${currentChat}/conversations/${signedIn.uid}/messages`
      ),
      newMessage
    );
    console.log("Sending message: ", recipientCopy.id, "(recipient's copy)");
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
      currentConversation.push(newMessage);
      sendMessage();
      newMessage.text = "";
      console.log();
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
