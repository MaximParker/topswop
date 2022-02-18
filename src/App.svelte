<script>
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { firebaseConfig } from './lib/firebaseConfig';

	const init = initializeApp(firebaseConfig);
	const db = getFirestore();

	console.log(init)
	console.log(db)

	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>