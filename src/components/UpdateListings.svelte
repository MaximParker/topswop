<script>
  import { deleteListing, updateItem } from "../utils/api";
  export let listing;

  let editItem = {
    title: "",
    description: "",
    condition: "",
    location: "",
  };
</script>

<main>
  <h3>Title: {listing.title}</h3>
  <p>Description: {listing.description}</p>
  <p>Condition: {listing.condition}</p>
  <p>Location: {listing.location}</p>
  <button class="btn" on:click={deleteListing(listing.id)}>Delete Item</button>
  <form
    on:submit|preventDefault={() => {
      updateItem(
        editItem,
        listing.id,
        editItem.title,
        editItem.description,
        editItem.condition,
        editItem.location
      );
      editItem = {
        title: "",
        description: "",
        condition: "",
        location: "",
      };
    }}
  >
    <input type="text" placeholder="title..." bind:value={editItem.title} />
    <input
      type="text"
      placeholder="description..."
      bind:value={editItem.description}
    />
    <input
      type="text"
      placeholder="condition..."
      bind:value={editItem.condition}
    />
    <input
      type="text"
      placeholder="location..."
      bind:value={editItem.location}
    />
    <button class="btn">Edit Item</button>
  </form>
</main>
