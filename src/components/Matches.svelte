<script>
  import { user } from "../utils/stores";
  import { queryUserLikes, queryMatchOwner, queryPotentialMatchItems } from "../utils/api";
  import { onMount } from "svelte";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let allMatches = [];
  let matchedItemData = [];

  const getMatches = (current_user) => {
    return queryUserLikes(current_user).then((likingUsers) => {
      queryMatchOwner(current_user).then((itemOwner) => {
        joinObjects(likingUsers, itemOwner)
        .then((matchData) => {
            
            queryPotentialMatchItems( matchData )
            .then((items) => {
                console.log(items, 'ALL THE ITEMS')
            })
        })
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
          item: user.item_id,
          match_item: item.item_id,
          match_user: item.liking_user_id,
        };
        allMatchIds = [itemMatch, ...allMatchIds];
        allItemIds = [user.item_id, item.item_id, ...allItemIds]
      });
    });
    allMatches = allMatchIds;
    return allItemIds
  };





  onMount(async () => {
    getMatches(`${signedIn.uid}`);
  });

</script>

<main>
  <h2>Matches!</h2>

  <ol>
    {#each allMatches as m}
      <li>
        <span>{m.user}</span>
        <span>{m.item}</span>
        <span>{m.match_item}</span>
        <span>{m.match_user}</span>
      </li>
      
    {:else}
      <p>No listings</p>
    {/each}
  </ol>
</main>

<style>
</style>
