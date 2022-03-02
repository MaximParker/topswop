<script>
  import { createChatroom, db } from "../utils/api";
  import { user } from "../utils/stores";
  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });
</script>

<main>
  <p><strong>Signed in as:</strong> {signedIn.displayName}</p>
  <p><strong>Email:</strong> {signedIn.email}</p>
  <p><strong>UID:</strong> {signedIn.uid}</p>
</main>
