<script>
  import { sendMessage } from "../utils/api";
  import { user } from "../utils/stores";
  import { useNavigate } from "svelte-navigator";
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
  <div class="bg-primary mx-auto w-100 p-2">
    <h1 class="text-xl font-bold align-center text-center">
      {currentConversation[0].data.from}
    </h1>
  </div>
</header>

<ul class="bg-base-100 mx-auto w-100 p-2">
  {#each currentConversation as message}
    <li>
      <div class="flex w-full">
        {#if message.data.from == signedIn.displayName}
          <div class="grid flex-grow card p-2 mb-1 bg-base-100"></div>
          <div
            class="grid flex-grow card p-2 mb-1 max-w-max bg-base-300 rounded-box place-items-center text-primary"
          >
            {message.data.text}
          </div>
        {/if}
        {#if message.data.from != signedIn.displayName}
          <div
            class="grid flex-grow card p-2 mb-1 max-w-max bg-primary rounded-box place-items-center"
          >
            {message.data.text}
          </div>
          <div class="grid flex-grow card p-2 mb-1 bg-base-100" />
        {/if}
      </div>
    </li>
  {/each}
</ul>

<div
  class="bg-base-300 p-2 fixed bottom-0 right-0 place-items-center rounded-tl-lg"
>
  <div class="input-group">
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
        placeholder={`Send ${currentConversation[0].data.from} a message...`}
        bind:value={newMessage.text}
        required
        class="input input-bordered bg-primary"
      />
      <button type="submit" class="btn btn-square">Send </button>
    </form>
  </div>
</div>
