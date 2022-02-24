<script>
  import { user } from "../utils/stores";
  import { db } from "../utils/api";
  import {
    onSnapshot,
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore";

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  let likingUserId = [];
  let potentialMatches = [];

  const query1 = query(
    collection(db, "matches"),
    where("item_owner_id", "==", `${signedIn.uid}`)
  );
  let query2 = query(
    collection(db, "listings"),
    where("user_id", "==", `${likingUserId}`)
  );

  const queryPotentialUsers = async () => {
    const querySnapshot = await getDocs(query1);
    let usersThatLikedMyItem = [];
    querySnapshot.forEach((doc) => {
      let userData = { ...doc.data() };
      usersThatLikedMyItem = [userData.liking_user_id, ...usersThatLikedMyItem];
    });
    likingUserId = usersThatLikedMyItem;

    query2 = query(
      collection(db, "listings"),
      where("user_id", "in", likingUserId)
    );
  };

  const queryPotentialMatchItems = async () => {
    const querySnapshot = await getDocs(query2);
    let potentialMatchItems = [];
    querySnapshot.forEach((doc) => {
      let itemData = { ...doc.data(), id: doc.id };
      potentialMatchItems = [itemData, ...potentialMatchItems];
    });
    potentialMatches = potentialMatchItems;
    console.log(potentialMatches);
  };
</script>

<main>
  <h2>Potential Matches</h2>
  <button
    on:click={() => {
      queryPotentialUsers();
    }}>Click me</button
  >

  <button
    on:click={() => {
      queryPotentialMatchItems();
    }}>Click me 2</button
  >
</main>

<style>
</style>
