<script>
  import { registerUserByEmail } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  const navigate = useNavigate();
  const location = useLocation();

  let email;
  let password;
  let newEmail;
  let newPassword;

  function handleLogin() {
    /* $user = { email, password };
      const from = ($location.state && $location.state.from) || "/";
      navigate(from, { replace: true }); */
  }

  function handleRegister() {
    registerUserByEmail(newEmail, newPassword);
    navigate('/home');
  }
</script>

<h3>Login</h3>
<form on:submit={handleLogin}>
  <input bind:value={email} type="email" name="email" placeholder="Email..." />
  <br />
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Password..."
  />
  <br />
  <button>Login</button>
</form>

<h3>Register as a new user</h3>
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
<button on:click={handleRegister}>Register</button>
