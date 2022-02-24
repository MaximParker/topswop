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

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let potentialMatches = [];

  const getPotMatches = (current_user) => {
    return queryPotentialUsers(current_user).then((likingUsers) => {
      queryPotentialMatchItems(likingUsers)
        .then((items) => {
          console.log(items, "ITEMS");
          potentialMatches = items;
          return items;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error);
        });
    });
  };

  const queryPotentialUsers = async (current_user) => {
    const query1 = query(
      collection(db, "matches"),
      where("item_owner_id", "==", current_user)
    );
    const querySnapshot = await getDocs(query1);
    let usersThatLikedMyItem = [];
    querySnapshot.forEach((doc) => {
      let userData = { ...doc.data() };
      usersThatLikedMyItem = [userData.liking_user_id, ...usersThatLikedMyItem];
    });
    return usersThatLikedMyItem;
  };

  const queryPotentialMatchItems = async (likingUsers) => {
    const query2 = query(
      collection(db, "listings"),
      where("user_id", "in", likingUsers)
    );
    const querySnapshot = await getDocs(query2);
    let potentialMatchItems = [];
    querySnapshot.forEach((doc) => {
      let itemData = { ...doc.data(), id: doc.id };
      potentialMatchItems = [itemData, ...potentialMatchItems];
    });
    return potentialMatchItems;
  };

  onMount(async () => {
    getPotMatches(`${signedIn.uid}`);
  });
</script>

<main>
  <h2>Potential Matches</h2>

  {#each potentialMatches as listings}
    <p>{listings.title}</p>
  {:else}
    <p>Loading.App..</p>
  {/each}
  <!-- <ListingCard /> -->
</main>

<style>
</style>
