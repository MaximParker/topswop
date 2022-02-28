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

  const getPotMatches = (current_user) => {
    return queryPotentialUsers(current_user).then((likingUsers) => {
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
  <ListingCard listings={potentialMatches} />
</main>

<style>
</style>
