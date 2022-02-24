<script>
      import { user } from "../utils/stores";
      import { db } from "../utils/api";
      import { collection, getDocs, query, where } from "firebase/firestore";

let signedIn;

user.subscribe((value) => {
  signedIn = value;
});

let likingUserId = [];

const query1 = query(collection(db, "matches"), where("item_owner_id","==",`${signedIn.uid}`));

const queryPotUsers = async () => {
    const querySnapshot = await getDocs(query1);
    let usersThatLikedMyItem = [];
    querySnapshot.forEach((doc) => {
        let userData = { ...doc.data() }
        usersThatLikedMyItem = [userData.liking_user_id, ...usersThatLikedMyItem];
        })
        likingUserId = usersThatLikedMyItem;
        console.log(likingUserId)
        }

</script>

<main>

  <h2>Potential Matches</h2>
  <button on:click={() => {
    queryPotUsers()}}>Click me</button>

</main>

<style>
</style>
