<script>
  import { onSnapshot, collection } from "firebase/firestore";
  import { db } from "../utils/api";
  import { user } from "../utils/stores";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let conversations = [];

  const getConversations = onSnapshot(
    collection(db, `messages/${signedIn.uid}/conversations`),
    (querySnapshot) => {
      querySnapshot.forEach((conversation) => {
        console.log(conversation)
        let conversationData = {
          ...conversation.data(),
          recipient_id: conversation.id,
        };
        conversations = [conversationData, ...conversations];
      });
    }
  );
  console.log(conversations);
</script>

<header>
  <h1>Messages</h1>
</header>

<main>
  <ul>
    {#each conversations as conversation}
      <li>
        <p>{conversation.recipient_id}</p>
        <p>Last message: {conversation.messages[conversation.messages.length-1]}</p>
      </li>
    {/each}
  </ul>
</main>
