<script>
  import { user } from "../utils/stores";
  import { queryUserLikes, queryMatchOwner } from "../utils/api";
  import { onMount } from "svelte";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let all_matches = [];

  const getMatches = (current_user) => {
    return queryUserLikes(current_user).then((likingUsers) => {
      queryMatchOwner(current_user).then((itemOwner) => {
        joinObjects(likingUsers, itemOwner);
      });
    });
  };

    const joinObjects = (currentUserLikes, likesMyItems) => {
    let all_items = [];
    currentUserLikes.forEach((user) => {
      let test = likesMyItems.filter(
        (item) =>
          item.liking_user_id == user.item_owner_id &&
          item.item_owner_id == user.liking_user_id
      );
      test.forEach((item) => {
        let itemMatch = {
          user: user.liking_user_id,
          item: user.item_id,
          match_item: item.item_id,
          match_user: item.liking_user_id,
        };
        all_items = [itemMatch, ...all_items];
      });
    });
    all_matches = all_items;
  };

  onMount(async () => {
    getMatches(`${signedIn.uid}`);
  });
</script>

<main>
  <h2>Matches!</h2>

  <ol>
    {#each all_matches as m}
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
