<script>
  import {
    loginByEmail,
    registerUserByEmail,
    loginByGoogle,
    logoutByGoogle,
  } from "../utils/auth";
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

  function handleGoogleLogin(event) {
    event.preventDefault();
    loginByGoogle();
    signedIn = true;
    navigate("/home");
  }
</script>

<h1>Sign in</h1>
<form
  on:submit={(event) => {
    handleLogin(event);
  }}
>
  <input bind:value={email} type="email" name="email" placeholder="Email..." />
  <br />
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Password..."
  />
  <br />
  <button>Sign in</button>
</form>

<h3>Register as a new user</h3>
<form
  on:submit={(event) => {
    handleRegister(event);
  }}
>
  <input
    bind:value={newEmail}
    type="email"
    name="email"
    placeholder="Email..."
    required
  />
  <br />
  <input
    bind:value={newPassword}
    type="password"
    name="new-password"
    placeholder="Password..."
    required
  />
  <br />
  <input
    bind:value={confirmPassword}
    type="password"
    name="confirm-password"
    placeholder="Confirm password..."
    required
  />
  <br />
  <button type="submit">Register</button>
</form>

<h3>Or</h3>
<button on:click={handleGoogleLogin}>Sign in with Google</button>
