<script>
  import { onSnapshot, collection } from "firebase/firestore";
  import { db } from "../utils/api";
  import { sendWelcomeMessage } from "../utils/api";
  import { user } from "../utils/stores";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let conversations = {};
  let recipientsArray = [];

  onSnapshot(
    collection(db, `messages/${signedIn.uid}/conversations`),
    (conversationsSnapshot) => {
      conversationsSnapshot.forEach((conversation) => {
        let recipient_id = conversation.id;
        console.log(conversation.id);

        recipientsArray.push(recipient_id);
      });

      console.log(recipientsArray);
    }
  );

  recipientsArray.forEach((recipient) => {
    conversations[recipient] = [];
    collection(
      db,
      `messages/${signedIn.uid}/conversations/${recipient_id}/messages`
    ),
      (messagesSnapshot) => {
        console.log(messagesSnapshot);
        messagesSnapshot.forEach((message) => {
          console.log(message);
          conversations[recipient_id].push(message.data());
        });
      };
  });

  console.log(conversations);
</script>

<header>
  <h1>Messages</h1>
</header>

<button on:click={sendWelcomeMessage(signedIn.uid)}>Send welcome message</button
>

<main>
  <ul>
    <li><p>List items here!</p></li>
  </ul>
</main>
