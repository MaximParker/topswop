<script>
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db, queryUserLikes } from "../utils/api";
  import ListingCard from "./ListingCard.svelte";
  import { user } from "../utils/stores";
  import { onMount } from "svelte";
import { each } from "svelte/internal";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let listingsWithLikes = [];

  let hiddenCut = true;
  let hiddenFit = true;
  const cutOptions = ['Unisex','Women','Men','Children','Girls','Boys','Toddlers','Infants'];
  const fitOption = ['Extra large','Large','Medium','Small','Extra small'];

  const getListingsAsync = async () => {
    let listings = [];

    const query1 = query(
    collection(db, "listings"),
    where("user_id", "!=", signedIn.uid))

    const querySnapshot = await getDocs(query1);

    let listingArray = [];
    querySnapshot.forEach((listing) => {
      let listingData = { ...listing.data(), id: listing.id };
      listingArray = [listingData, ...listingArray];
    });
    listings = listingArray;
    return listings;
  };

  const filter = async (fieldName="", option="") => {
    const allListings = await likeButtonSetting(`${signedIn.uid}`);
    if (fieldName == ""){
    listingsWithLikes = allListings
    } 
    else {
    const filteredItems = allListings.filter((item) => item[fieldName] == option)
    listingsWithLikes = filteredItems
     }
     
  }

  const likeButtonSetting = async (current_user) => {
    const listings = await getListingsAsync();

    const userLikesData = await queryUserLikes(current_user);

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
    return listings;
  };

  onMount(async () => {
    listingsWithLikes = await likeButtonSetting(`${signedIn.uid}`);
  });


</script>

<main>
  <header>
    <div class="mx-auto my-2">
      <h1 class="text-xl font-bold text-primary align-center text-center">
        All Topswops
      </h1>
      <div class="dropdown">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="m-1 btn btn-secondary">Filter</label>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a on:click={() => {hiddenCut=true, hiddenFit=true, filter() }}>All</a></li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a on:click={() => {hiddenCut=false, hiddenFit=true }}>Cut</a></li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a on:click={() => {hiddenCut=true, hiddenFit=false }}>Fit</a></li>
        </ul>
      </div>
      <div class="dropdown" class:hidden={hiddenFit} id="fit"> 
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="m-1 btn btn-secondary">Fit</label>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          {#each fitOption as o}
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a on:click={() => filter("fit", o)}>{o}</a></li>
          {/each}
        </ul> 
      </div>
      <div class="dropdown" class:hidden={hiddenCut} id="cut">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="m-1 btn btn-secondary">Cut</label>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          {#each cutOptions as o}
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a on:click={() => filter("cut", o)}>{o}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </header>
  <ListingCard {listingsWithLikes} />
</main>
