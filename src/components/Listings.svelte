<script>
  import { onSnapshot, collection } from "firebase/firestore";
  import { db, reseedListingsDatabase } from "../utils/api";
  import ListingCard from './ListingCard.svelte'

  let listings = [];

  const getListings = onSnapshot(
    collection(db, "listings"),
    (querySnapshot) => {
      let listingArray = [];
      querySnapshot.forEach((listing) => {
        let listingData = { ...listing.data(), id: listing.id };
        listingArray = [listingData, ...listingArray]; 
      });
      listings = listingArray;
    }
  );
</script>

<main>
  <h1>All listings ({listings.length})</h1>

  <ListingCard />

  <p>Listings</p>
  <ListingCard {listings} />
  <button
    on:click={(event) => {
      reseedListingsDatabase(event, listings);
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
    {#each listings as listing}
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
