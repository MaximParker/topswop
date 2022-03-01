<script>
  import { user } from "../utils/stores";
  import ListingCard from "./ListingCard.svelte";
  import { onMount } from "svelte";
  import {
    queryPotentialUsers,
    queryPotentialMatchItems,
    queryUserLikes,
  } from "../utils/api";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let potentialMatches = [];
  let anyMatchesYet = true;

  const getPotMatches = async (current_user) => {
    const likingUsers = await queryPotentialUsers(current_user);
    let initialMatches = [];
    if (likingUsers.length === 0) {
      anyMatchesYet = false;
    } else {
      const items = await queryPotentialMatchItems(likingUsers, "user_id");
      initialMatches = items;
    }
    return initialMatches;
  };

  const likeButtonSetting = async (current_user) => {
    const listings = await getPotMatches(current_user);
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
    potentialMatches = await likeButtonSetting(`${signedIn.uid}`);
  });
</script>

<main>
  <h2>Potential Matches ({potentialMatches.length})</h2>
  {#if !anyMatchesYet}
    <p>No potential matches yet, get liking to increase your visibility!</p>
  {:else}
    <ListingCard listingsWithLikes={potentialMatches} />
  {/if}
</main>

<style>
</style>
