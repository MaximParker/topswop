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
    console.log(listingsWithLikes)
  };
</script>

<main>
  <ul class="basic-grid">
    {#each getOrderedList([...listingsWithLikes]) as listing, i}

    
      <li class="myCard bg-white rounded-lg overflow-hidden" style="--animation-order: {i + 1};">
        <div class="relative overflow-hidden pb-2/3">
        <img class="absolute w-full h-full object-cover" src={ listing.imageURL ? listing.imageURL : "http://cdn.akc.org/content/article-body-image/siberian_husky_cute_puppies.jpg"}  alt="clothing item" />
        <button class="btn absolute bottom-0 right-0 mr-2 mb-2"
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
          <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide">
            Size: &bull Mens &bull Condition: {listing.condition}
          </div>
        <h3 class="mt-1 font-semibold text-lg leading-tight truncate">{listing.title}</h3>
      
          <div class="mt-4 leading-tight " >
        <p>Description: {listing.description}</p>
        </div>
        <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide mt-2">
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
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    font-size: 1rem;
    color: #fff; */
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    /* height: 100%;
    width: 100%; */
    /* border-radius: 4px; */
    transition: all 500ms;
    /* overflow: hidden; */
    /* background-size: cover; */
    /* background-position: center; */
    /* background-repeat: no-repeat; */
    animation: cardEntrance 700ms ease-out;
    animation-fill-mode: backwards;
    animation-delay: calc(var(--animation-order) * 100ms);

 
  }

  .myCard:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
      rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.05);
  }

  .basic-grid {
    display: grid;
    gap: 0.75rem;
    padding: 0.5rem;
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

  /* @media screen and (max-width: 350px) {
    .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
  } */
</style>
