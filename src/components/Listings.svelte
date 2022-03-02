<script>
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db, queryUserLikes } from "../utils/api";
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

    const query1 = query(
    collection(db, "listings"),
    where("user_id", "!=", signedIn.uid))

    const querySnapshot = await getDocs(query1);

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
  <header>
    <div class="mx-auto my-2">
      <h1 class="text-xl font-bold text-primary align-center text-center">
        All Topswops
      </h1>
    </div>
  </header>
  <ListingCard {listingsWithLikes} />
</main>
