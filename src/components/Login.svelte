<script>
  import { loginByEmail, registerUserByEmail } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user } from "../utils/stores";
  const navigate = useNavigate();
  const location = useLocation();

  let signedIn;

  user.subscribe((value) => {
    signedIn = value;
  });

  if (signedIn) {
    navigate("/home");
  }

  let displayMenu = "register";
  let email;
  let password;
  let newEmail;
  let newPassword;
  let confirmPassword;

  function handleLogin(event) {
    event.preventDefault();
    loginByEmail(email, password).then(() => {
      navigate("/home");
    });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (newPassword == confirmPassword) {
      registerUserByEmail(newEmail, newPassword).then(() => {
        navigate("/home");
      });
    } else {
      alert("Passwords do not match!");
    }
  }
</script>

<div class="card w-80 bg-base-100 shadow-xl mx-auto my-10">
  <div class="card-body items-center text-center">
    <figure>
      <img
        src="graphics/logotext_green_icon_dark_text.png"
        alt="Topswop logo"
      />
    </figure>
    {#if displayMenu === "register"}
      <div class="btn-group my-6">
        <button class="btn btn-active">Register</button>
        <button
          class="btn"
          on:click={() => {
            displayMenu = "sign_in";
          }}>Sign in</button
        >
      </div>

      <div class="form-control">
        <form
          on:submit={(event) => {
            handleRegister(event);
          }}
        >
          <div class="form-control">
            <label class="input-group input-group-vertical mb-2">
              <span>Email</span>
              <input
                bind:value={newEmail}
                type="email"
                placeholder="example@site.com"
                required
                class="input input-bordered"
              />
            </label>

            <label class="input-group input-group-vertical mb-2">
              <span>Password</span>
              <input
                bind:value={newPassword}
                type="password"
                placeholder="At least 6 characters..."
                required
                class="input input-bordered"
              />
            </label>

            <label class="input-group input-group-vertical mb-2">
              <span>Confirm password</span>
              <input
                bind:value={confirmPassword}
                type="password"
                placeholder="Confirm password..."
                required
                class="input input-bordered"
              />
            </label>
          </div>

          <div type="submit" class="justify-center card-actions">
            <button class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    {/if}
    {#if displayMenu === "sign_in"}
      <div class="btn-group my-6">
        <button
          class="btn"
          on:click={() => {
            displayMenu = "register";
          }}>Register</button
        >
        <button class="btn btn-active">Sign in</button>
      </div>

      <div class="form-control">
        <form
          on:submit={(event) => {
            handleLogin(event);
          }}
        >
          <div class="form-control">
            <label class="input-group input-group-vertical mb-2">
              <span>Email</span>
              <input
                bind:value={email}
                type="email"
                placeholder="example@site.com"
                required
                class="input input-bordered"
              />
            </label>

            <label class="input-group input-group-vertical mb-2">
              <span>Password</span>
              <input
                bind:value={password}
                type="password"
                placeholder="Password..."
                required
                class="input input-bordered"
              />
            </label>

            <div type="submit" class="justify-center card-actions">
              <button class="btn btn-primary">Sign in</button>
            </div>
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>
