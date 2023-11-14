export default function Login() {
  return (
    <section
      id="login"
      style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}
    >
      <div className="form">
        <h2>LOGIN</h2>
        <form className="login-form">
          <input type="text" name="email" id="login-email" placeholder="email" />
          <input type="password" name="password" id="login-password" placeholder="password" />

          <button type="submit">LOGIN</button>
          <p className="message">
            Not registered? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </section>
  );
}
