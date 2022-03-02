<script>
  import { deleteListing, updateItem } from "../utils/api";
  export let listing;

  let deleted = false;
  let edited = false;

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
  <label
    for="modal-edit"
    class="btn modal-button"
    on:click={() => {
      edited = false;
    }}>edit</label
  >
  <label
    for="modal-delete"
    class="btn btn-warning modal-button"
    on:click={() => {
      deleted = false;
    }}>Delete</label
  >

  <input type="checkbox" id="modal-delete" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box bg-primary">
      <h3 class="font-bold text-lg">Delete listing</h3>
      {#if !deleted}
        <p class="py-4">Are you sure you want to delete this listing?</p>
        <strong>This cannot be undone!</strong>
        <form
          on:submit|preventDefault={() => {
            deleteListing(listing.id);
            deleted = true;
          }}
        >
          <button type="submit" class="btn btn-error">Confirm deletion</button>
        </form>
      {/if}
      {#if deleted}
        <p class="py-4">Listing deleted.</p>
      {/if}
      <div class="modal-action">
        <label for="modal-delete" class="btn btn-ghost">Back</label>
      </div>
    </div>
  </div>

  <input type="checkbox" id="modal-edit" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box bg-primary">
      <h3 class="font-bold text-lg">Edit listing</h3>
      {#if !edited}
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
            edited = true;
          }
        }
        >
          <input
            type="text"
            placeholder="title..."
            bind:value={editItem.title}
          />
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
      {/if}
      {#if edited}
        <p class="py-4">Edit successful!</p>
      {/if}
      <div class="modal-action">
        <label for="modal-edit" class="btn btn-ghost">Back</label>
      </div>
    </div>
  </div>
</main>
