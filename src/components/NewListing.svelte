<script>
  import { postListing } from "../utils/api";

  let newListing = {
    username: "",
    title: "",
    description: "",
    condition: "",
    location: "",
    tradeRequired: false,
  };
</script>

<main>
  <h1>New listing</h1>
  <form
    on:submit={(event) => {
      postListing(event, newListing);
    }}
  >
    <input
      class="input-primary"
      type="text"
      placeholder="Username..."
      bind:value={newListing.username}
    />
    <input type="text" placeholder="title..." bind:value={newListing.title} />
    <input
      type="text"
      placeholder="description..."
      bind:value={newListing.description}
    />
    <input
      type="text"
      placeholder="condition..."
      bind:value={newListing.condition}
    />
    <input
      type="text"
      placeholder="location..."
      bind:value={newListing.location}
    />
    <input
      type="text"
      placeholder="tradeRequired..."
      bind:value={newListing.tradeRequired}
    />
    <button class="btn" type="submit">Submit</button>
  </form>
</main>
