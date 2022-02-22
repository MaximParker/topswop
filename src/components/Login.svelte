<script>
  import { loginByEmail, registerUserByEmail } from "../utils/auth";
  import { useNavigate, useLocation } from "svelte-navigator";
  const navigate = useNavigate();
  const location = useLocation();

  let email;
  let password;
  let newEmail;
  let newPassword;

  function handleLogin(event) {
    event.preventDefault();
    loginByEmail(email, password);
    navigate('/home');
  }

  function handleRegister(event) {
    event.preventDefault();
    registerUserByEmail(newEmail, newPassword);
    navigate('/home');
  }
</script>

<h3>Login</h3>
<form on:submit={(event) => {handleLogin(event)}}>
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
<form on:submit={(event) => {handleRegister(event)}}>
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
<button type="submit">Register</button>
</form>

