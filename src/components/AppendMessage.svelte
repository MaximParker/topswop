<script>
  export let chatsref;
  export let user;
  let message = "";
  async function appendMessage() {
    if (!message)
      return await chatsref.add({ message, uid: user.uid, date: Date.now() });
    message = "";
  }
</script>

<form on:submit={appendMessage}>
  <div>
    <input
      type="text"
      class="input"
      bind:value={message}
      placeholder="type message"
    />
  </div>
  <div>
    <input type="submit" value="Send" />
  </div>
</form>
