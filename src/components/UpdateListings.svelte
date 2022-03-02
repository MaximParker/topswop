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
  <div class="basic-grid">
    <div class="myCard bg-secondary rounded-lg overflow-hidden">
      <div class="relative overflow-hidden pb-2/3">
        <img
          class="absolute w-full h-full object-cover"
          src={listing.imageURL ? listing.imageURL : "graphics/logo_dark.png"}
          alt="clothing item"
        />
        <label
          for="modal-edit"
          class="btn modal-button absolute bottom-0 left-0 ml-2 mb-2"
          on:click={() => {
            edited = false;
          }}>edit</label
        >
        <label
          for="modal-delete"
          class="btn btn-warning modal-button absolute bottom-0 right-0 mr-2 mb-2"
          on:click={() => {
            deleted = false;
          }}>Delete</label
        >
      </div>
      <div class="p-4 text-gray-600">
        <div
          class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
        >
         {listing.fit} &bull {listing.cut} &bull {listing.condition}
        </div>
        <h3 class="mt-1 font-semibold text-lg leading-tight truncate">
          {listing.title}
        </h3>
        <div class="mt-4 leading-tight ">
          {listing.description}
        </div>
        <div
          class="text-gray-600 text-xs uppercase font-semibold tracking-wide mt-2"
        >
          {listing.location}
        </div>
        
        
      </div>
    </div>
  </div>

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
          }}
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

<style>
  .myCard {
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    transition: all 500ms;
    animation: cardEntrance 700ms ease-out;
    animation-fill-mode: backwards;
    animation-delay: calc(var(--animation-order) * 100ms);
  }

  .basic-grid {
    display: grid;
    gap: 0.8rem;
    padding: 0.7rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: center;
  }

  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: scale(0.3);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media screen and (max-width: 380px) {
    .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
  }
</style>
