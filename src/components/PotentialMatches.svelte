<script>
  import { user } from "../utils/stores";
  import ListingCard from "./ListingCard.svelte";
  import { db } from "../utils/api";
  import {
    onSnapshot,
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import App from "../../../firesvelt/src/App.svelte";
  import Listings from "./Listings.svelte";
  import { queryPotentialUsers, queryPotentialMatchItems } from "../utils/api";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let potentialMatches = [];

  const getPotMatches = (current_user) => {
    return queryPotentialUsers(current_user).then((likingUsers) => {
      queryPotentialMatchItems(likingUsers)
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
