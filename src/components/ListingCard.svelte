<script>
  import { postLike, removeLike } from "../utils/api";
  import { user } from "../utils/stores";
  import { getOrderedList } from "../utils/helpers";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  export let listingsWithLikes = [];

  const eventHandler = (event, signedIn, listingId, listingUserId, liked) => {
    let updatedListingLikes = [];

    if (liked === true) {
      removeLike(signedIn, listingId);
    } else {
      postLike(event, signedIn, listingId, listingUserId);
    }
    listingsWithLikes.forEach((item) => {
      if (item.id == listingId) {
        item.liked = !item.liked;
      }
      updatedListingLikes = [item, ...updatedListingLikes];
    });
    listingsWithLikes = updatedListingLikes;
  };
</script>

<main>
  <ul class="basic-grid">
    {#each getOrderedList([...listingsWithLikes]) as listing, i}
      <li
        class="myCard bg-secondary rounded-lg overflow-hidden"
        style="--animation-order: {i + 1};"
      >
        <div class="relative overflow-hidden pb-2/3">
          <img
            class="absolute w-full h-full object-cover"
            src={listing.imageURL ? listing.imageURL : "graphics/logo_dark.png"}
            alt="clothing item"
          />
          <button
            class="btn absolute bottom-0 right-0 mr-2 mb-2"
            on:click={(event) => {
              eventHandler(
                event,
                signedIn.uid,
                listing.id,
                listing.user_id,
                listing.liked
              );
            }}
          >
            {#if listing.liked == false}
              Like
            {:else}
              Unlike
            {/if}
          </button>
        </div>
        <div class="p-4">
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
      </li>
    {:else}
      <p>Loading.App..</p>
    {/each}
  </ul>
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
