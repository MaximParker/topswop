<script>
  import { postListing, uploadImage } from "../utils/api";
  import { user } from "../utils/stores";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let newListing = {
    username: `${signedIn.displayName}`,
    title: "",
    description: "",
    condition: "",
    location: "",
    fit: "",
    tradeRequired: false,
    user_id: `${signedIn.uid}`,
  };
</script>

<main>
  <div class="mx-auto my-2">
    <h1 class="text-xl font-bold text-primary align-center text-center">
      New listing
    </h1>
  </div>
  <div class="card w-100 bg-primary shadow-xl mx-auto">
    <div class="card-body items-center text-center">
      <div class="form-control">
        <form
          on:submit={(event) => {
            postListing(event, newListing);
          }}
        >
          <input type="file" accept="image/*" placeholder="image..." class="mb-2"/>
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
              placeholder="Describe your item..."
              required
              class="input input-bordered bg-primary"
            />
          </label>
          <label class="input-group input-group-vertical mb-2">
            <span class="bg-neutral">Condition</span>
            <select
              bind:value={newListing.condition}
              class="select w-full max-w-xs select-bordered bg-primary"
              required
            >
              <option disabled selected>Select condition...</option>
              <option>Unopened</option>
              <option>New</option>
              <option>Good</option>
              <option>Slightly worn</option>
              <option>Well worn</option>
            </select>
          </label>
          <label class="input-group input-group-vertical mb-2">
            <span class="bg-neutral">Fit</span>
            <select
              bind:value={newListing.fit}
              class="select w-full max-w-xs select-bordered bg-primary"
              required
            >
              <option disabled selected>Select best fit...</option>
              <option>Any / not applicable</option>
              <option>Adults (unisex)</option>
              <option>Women</option>
              <option>Men</option>
              <option>Children</option>
              <option>Toddlers</option>
              <option>Infants</option>
            </select>
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
          <button class="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</main>
