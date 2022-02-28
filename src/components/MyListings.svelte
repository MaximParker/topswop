<script>
  import { user } from "../utils/stores";
  import { db } from "../utils/api";
  import ListingCard from "./ListingCard.svelte";
  import { onSnapshot, collection } from "firebase/firestore";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let myListings = [];

  const getListings = onSnapshot(
    collection(db, "listings"),
    (querySnapshot) => {
      let listingArray = [];
      querySnapshot.forEach((listing) => {
        let listingData = { ...listing.data(), id: listing.id };
        listingArray = [listingData, ...listingArray];
      });
      myListings = listingArray;
    }
  );
</script>

<main>
  <h1>All listings ({myListings.length})</h1>

  <ListingCard />

  <p>Listings</p>
  <ListingCard {myListings} />
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
    {#each myListings as listing}
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
