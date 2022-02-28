<script>
  import { postLike, queryUserLikes, removeLike } from "../utils/api";
  import { user } from "../utils/stores";
  import { onMount } from "svelte";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  export let listings = [];
  let listingsWithLikes = [];

  const likeButtonSetting = async (current_user) => {
    return queryUserLikes(current_user).then((userLikesData) => {
      let itemIds = [];
      userLikesData.forEach((item) => {
        itemIds = [item.item_id, ...itemIds];
      });

      listings.forEach((listing) => {
        let filteredIds = itemIds.filter((item) => item === listing.id);
        if (filteredIds.length > 0) {
          listing.liked = true;
        } else {
          listing.liked = false;
        }
      });
      listingsWithLikes = listings;
      console.log("IM RUNNING");
    });
  };

  const eventHandler = (event, signedIn, listingId, listingUserId, liked) => {
    let updatedListingLikes = [];

    if (liked === true) {
      unlike(signedIn, listingId);
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

  const unlike = (current_user, itemId) => {
    removeLike(current_user, itemId);
  };

  onMount(async () => {
    likeButtonSetting(`${signedIn.uid}`);
  });
</script>

<main>
  <ul class="basic-grid">
    {#each listingsWithLikes as listing, i}
      <li class="card" style="--animation-order: {i + 1};">
        <img
          class="card-image"
          src="https://shop.tate.org.uk/dw/image/v2/BBPB_PRD/on/demandware.static/-/Sites-TateMasterShop/default/dwaa107262/tate-logo-black--tshirt-back-g1086.jpg?sw=556"
          alt="clothing item"
        />
        <h3>{listing.title}</h3>
        <p>Description: {listing.description}</p>
        <p>Condition: {listing.condition}</p>
        <p>Location: {listing.location}</p>
        <button
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
          {listing.liked}
          {#if listing.liked == false}
            LIKE
          {:else}
            Dislike
          {/if}
        </button>
      </li>
    {:else}
      <p>Loading.App..</p>
    {/each}
  </ul>
</main>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    font-size: 1rem;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    animation: cardEntrance 700ms ease-out;
    animation-fill-mode: backwards;
    animation-delay: calc(var(--animation-order) * 100ms);
  }

  .card:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
      rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.05);
  }

  .basic-grid {
    display: grid;
    gap: 0.75rem;
    padding: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

  .card-image {
    height: 150px;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  @media screen and (max-width: 350px) {
    .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
  }
</style>
