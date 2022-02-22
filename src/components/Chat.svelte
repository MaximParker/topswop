<script>
  import Collection from "./Collection.svelte";
  import AppendMessage from "./AppendMessage.svelte";
  export let user;
</script>

<Collection path={"/chat"} let:ref={chatref} let:data={messages}>
  <AppendMessage />
</Collection>
