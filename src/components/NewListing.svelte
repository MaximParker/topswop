<script>
  import { postListing, uploadImage } from "../utils/api";
  import { user } from "../utils/stores";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let newListing = {
    username: "",
    title: "",
    description: "",
    condition: "",
    location: "",
    tradeRequired: false,
    user_id: `${signedIn.uid}`,
  };
</script>

<main>
  <div class="mx-auto my-2">
    <h1
      class="text-xl font-bold text-primary align-center text-center"
    >
      New listing
    </h1>
  </div>
  <div class="card w-100 bg-primary shadow-xl mx-auto">
    <div class="card-body items-center text-center">
      <div class="form-control">
        <label class="input-group input-group-vertical mb-2">
          <span class="bg-neutral">Item name</span>
          <input
            bind:value={newListing.title}
            type="text"
            placeholder="Item name..."
            required
            class="input input-bordered bg-primary"
          />
        </label>
        <label class="input-group input-group-vertical mb-2">
          <span class="bg-neutral">Description</span>
          <input
            bind:value={newListing.description}
            type="text"
            placeholder="Description..."
            required
            class="input input-bordered bg-primary"
          />
        </label>
        <label class="input-group input-group-vertical mb-2">
          <span class="bg-neutral">Location</span>
          <input
            bind:value={newListing.location}
            type="text"
            placeholder="Location..."
            required
            class="input input-bordered bg-primary"
          />
        </label>
      </div>
    </div>
  </div>

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
    <input type="file" accept="image/*" placeholder="image..." />
    <button class="btn" type="submit">Submit</button>
  </form>
</main>
