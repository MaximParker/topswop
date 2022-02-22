<script>
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../utils/api";


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
      <section class="basic-grid">
        {#each listings as listing, i}
            <div class="card" style="--animation-order: {i + 1};">
                <h4>{listing.title}</h4>
                <p>{listing.description}</p>
                <p>Condition: {listing.condition}</p>
                <p>{listing.location}</p>
             </div>

          {/each}
      </section>


    
</main>

<style>

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    font-size: 3rem;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    animation: cardEntrance 700ms ease-out;
    animation-fill-mode: backwards;
    animation-delay: calc(var(--animation-order) * 100ms);

 }
  
.card:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.05);
 }

 .basic-grid {
     display: grid;
     gap: 0.75rem; 
     padding: 0.5rem;
     grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
     justify-content: center;
     --stagger-delay: 100ms;

 }

 @keyframes cardEntrance {
     from {
         opacity: 0;
         transform: scale(0.3);
     }
     to {
         opacity: 1;
         transform: scale(1);
     }
 }

 @media screen and (max-width: 350px) {
   .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
   }
}

</style>

