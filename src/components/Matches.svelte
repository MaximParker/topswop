<script>
  import { user } from "../utils/stores";
  import {
    queryUserLikes,
    queryMatchOwner,
    queryPotentialMatchItems,
  } from "../utils/api";
  import { onMount } from "svelte";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let allMatches = [];
  let matchedItemData = [];

  const getMatches = (current_user) => {
    return queryUserLikes(current_user)
    .then((likingUsers) => {
        queryMatchOwner(current_user)
        .then((itemOwner) => {
            joinObjects(likingUsers, itemOwner)
            .then((matchData) => {
                queryPotentialMatchItems(matchData)
                .then((items) => {
                    allMatches.forEach((m) => {
                        m.item = items.filter((item) => m.item_id == item.id)[0];
                        m.match_item = items.filter((item) => m.match_item_id == item.id)[0];
                    });
                    matchedItemData = allMatches;
                });
            });
        });
    });
  };

  const joinObjects = async (currentUserLikes, likesMyItems) => {
    let allMatchIds = [];
    let allItemIds = [];
    currentUserLikes.forEach((user) => {
      let filteredMatches = likesMyItems.filter(
        (item) =>
          item.liking_user_id == user.item_owner_id &&
          item.item_owner_id == user.liking_user_id
      );
      filteredMatches.forEach((item) => {
        let itemMatch = {
          user: user.liking_user_id,
          item_id: user.item_id,
          match_item_id: item.item_id,
          match_user: item.liking_user_id,
        };
        allMatchIds = [itemMatch, ...allMatchIds];
        allItemIds = [user.item_id, item.item_id, ...allItemIds];
      });
    });
    allMatches = allMatchIds;
    return allItemIds;
  };

  onMount(async () => {
    getMatches(`${signedIn.uid}`);
  });
</script>

<main>
  <h2>Matches!</h2>

  <ol>
    {#each matchedItemData as m}
      <li>
        <span>{m.user}</span>
        <span>{m.item.title}</span>
        <span>{m.match_item.title}</span>
        <span>{m.match_user}</span>
      </li>
    {:else}
      <p>Loading Matches</p>
    {/each}
  </ol>
</main>

<style>
</style>
