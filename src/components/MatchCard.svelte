<script>
	import { ConfettiExplosion } from 'svelte-confetti-explosion';
    import { createChatroom, updateItem } from '../utils/api'
import { loginByEmail } from '../utils/auth';

export let matchedItemData = []

</script>
<main>
<div>
    <ConfettiExplosion colors={["#83b271", "#edf2e9", "#37CDBE"]}/>
</div>
<div class="grid place-items-end">
    <ConfettiExplosion colors={["#83b271", "#edf2e9", "#37CDBE"]}/>
</div>
    <ul class="basic-grid">
  {#each matchedItemData as m, i}
      <li class="matchCard bg-secondary rounded-lg overflow-hidden " style="--animation-order: {i + 1};">
        <div>
            <div class="relative overflow-hidden pb-1/3">
                <img class="absolute w-full h-full object-cover" src={m.item.imageURL} alt="clothing item">
                <div class="badge badge-secondary absolute bottom-0 left-0 ml-2 mb-2">{m.item.username}</div>
            </div>
        </div>
        <div class="grid place-items-center mt-3" >
            <p>Congrats it's a match!</p>
            <button on:click={() => {createChatroom(m.user, m.match_user, m.item.username, m.match_item.username )}} class="btn mt-2">Start Chat</button>
        </div>
        <div>
            <div class="relative bottom-0 overflow-hidden pb-1/3 mt-3">
                <img class="absolute w-full h-full object-cover" src={m.match_item.imageURL} alt="clothing item">
                <!-- <button class="btn btn-secondary absolute bottom-0 right-0 mr-2 mb-2">{m.match_item.username}</button> -->
                <div class="badge badge-secondary absolute top-0 right-0 mr-2 mt-2">{m.match_item.username}</div>

            </div>
        </div>
      </li>
    {:else}
      <p>Loading Matches</p>
    {/each}
</ul>
</main>

<style>
 .matchCard {
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  transition: all 500ms;
  animation: cardEntrance 700ms ease-out;
  animation-fill-mode: backwards;
  animation-delay: calc(var(--animation-order) * 100ms);
}

.basic-grid {
  display: grid;
  gap: 0.75rem;
  padding: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

@media screen and (max-width: 380px) {
    .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
  }

</style>
