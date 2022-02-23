<script>
      import { user } from "../utils/stores";

let signedIn;

user.subscribe((value) => {
  signedIn = value;
});


</script>

<main>
  <h2>Potential Matches</h2>
</main>

<style>
</style>
