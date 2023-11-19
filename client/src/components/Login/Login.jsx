import styles from "./Login.module.css"; // Import the CSS module

import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const LoginFormKeys = {
  Email: "email",
  Password: "password",
};

export default function Login() {
  const { onLoginSubmit } = useContext(AuthContext);
  const { values, changeHandler, onSubmit } = useForm(
    {
      [LoginFormKeys.Email]: "",
      [LoginFormKeys.Password]: "",
    },
    onLoginSubmit
  );

  return (
    <section
      id="login"
      className={styles["login-section"]}
      // style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}
    >
      <div className={styles.container}>
        <h2>LOGIN</h2>
        <form className={styles["login-form"]} method="POST" onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            {/* <label htmlFor="login-email">Email:</label> */}
            <input
              type="text"
              name={LoginFormKeys.Email}
              id="login-email"
              placeholder="Enter your email"
              value={values[LoginFormKeys.Email]}
              onChange={changeHandler}
            />

            {/* <label htmlFor="login-password">Password:</label> */}
            <input
              type="password"
              id="login-password"
              placeholder="Enter your password"
              name={LoginFormKeys.Password}
              value={values[LoginFormKeys.Password]}
              onChange={changeHandler}
            />
          </div>

          <button type="submit">LOGIN</button>
          <p className={styles.message}>
            Not registered? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
