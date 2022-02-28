<script>
  import { user } from "../utils/stores";
  import ListingCard from "./ListingCard.svelte";
  import { onMount } from "svelte";
  import { queryPotentialUsers, queryPotentialMatchItems } from "../utils/api";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let potentialMatches = [];
  let anyMatchesYet = true 

  const getPotMatches = (current_user) => {
    return queryPotentialUsers(current_user).then((likingUsers) => {
      if (likingUsers.length === 0 ){
         anyMatchesYet = false }
       else 
      queryPotentialMatchItems( likingUsers, "user_id") 
        .then((items) => {
          potentialMatches = items;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error);
        });
    });
  };

  onMount(async () => {
    getPotMatches(`${signedIn.uid}`);
  });
</script>

<main>
  <h2>Potential Matches</h2>
  {#if !anyMatchesYet}
    <p> No potential matches yet, get liking to increase your visibility!</p>
  {:else}
    <ListingCard listings={potentialMatches} />
  {/if}
</main>

<style>
</style>
