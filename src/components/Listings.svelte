<script>
  import { onSnapshot, collection, getDocs } from "firebase/firestore";
  import { db, reseedListingsDatabase, queryUserLikes } from "../utils/api";
  import ListingCard from "./ListingCard.svelte";
  import { user } from "../utils/stores";
  import { onMount } from "svelte";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let listingsWithLikes = [];

  const getListingsAsync = async () => {
    let listings = [];
    const querySnapshot = await getDocs(collection(db, "listings"));

    let listingArray = [];
    querySnapshot.forEach((listing) => {
      let listingData = { ...listing.data(), id: listing.id };
      listingArray = [listingData, ...listingArray];
    });
    listings = listingArray;
    return listings;
  };

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
  <h1>All listings ({listingsWithLikes.length})</h1>

  <p>Listings</p>
  <ListingCard {listingsWithLikes} />
  <button
    on:click={(event) => {
      reseedListingsDatabase(event, listingsWithLikes);
    }}>Re-seed database</button
  >

  <table>
    <tr>
      <th>id</th>
      <th>Title</th>
      <th>Description</th>
      <th>Condition</th>
      <th>Location</th>
      <th>User ID</th>
    </tr>
    {#each listingsWithLikes as listing}
      <tr
        ><td style="width: 400px">{listing.id}...</td>
        <td>{listing.title}</td>
        <td>{listing.description}</td>
        <td>{listing.condition}</td>
        <td>{listing.location}</td>
        <td>{listing.user_id}</td></tr
      >
    {/each}
  </table>
</main>
