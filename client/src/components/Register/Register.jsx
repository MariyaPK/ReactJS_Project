export default function Register() {
  return (
    <section
      id="register"
      style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}
    >
      <div className="form">
        <h2>REGISTER</h2>
        <form className="register-form">
          <input type="text" name="email" id="register-email" placeholder="Email..." />
          <input type="password" name="password" id="register-password" placeholder="Password..." />
          <input type="password" name="re-password" id="repeat-password" placeholder="Repeat password..." />
          <button type="submit">REGISTER</button>
          <p className="message">
            Already registered? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </section>
  );
}
