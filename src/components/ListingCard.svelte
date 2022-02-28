<script>
  import { postLike } from '../utils/api'
  import { user } from "../utils/stores";


  let signedIn;

user.subscribe((value) => {
  signedIn = value;
});

  export let listings = [];

</script>

<main>
  <ul class="basic-grid">
    {#each listings as listing, i}
      <li class="card" style="--animation-order: {i + 1};">
        <img
          class="card-image"
          src="https://shop.tate.org.uk/dw/image/v2/BBPB_PRD/on/demandware.static/-/Sites-TateMasterShop/default/dwaa107262/tate-logo-black--tshirt-back-g1086.jpg?sw=556"
          alt="clothing item"
        />
        <h3>{listing.title}</h3>
        <p>Description: {listing.description}</p>
        <p>Condition: {listing.condition}</p>
        <p>Location: {listing.location}</p>
        <button on:click={(event) => {
          postLike(event, signedIn.uid, listing.id, listing.user_id )}}>LIKE</button>
      </li>
    {:else}
      <p>Loading.App..</p>
    {/each}
  </ul>
</main>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    font-size: 1rem;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
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
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
      rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.05);
  }

  .basic-grid {
    display: grid;
    gap: 0.75rem;
    padding: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    justify-content: center;
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

  .card-image {
    height: 150px;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  @media screen and (max-width: 350px) {
    .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
  }
</style>
