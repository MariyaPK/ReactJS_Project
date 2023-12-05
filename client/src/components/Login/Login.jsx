import styles from "./Login.module.css";

import { Link } from "react-router-dom";
import { useContext } from "react";

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
    <section id="login" className={styles["login-section"]}>
      <div className={styles.container}>
        <span>
          <img src="./images/imgForms.png" alt="imgForms" />
        </span>
        <h2>LOGIN</h2>
        <form className={styles["login-form"]} method="POST" onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <input
              type="text"
              name={LoginFormKeys.Email}
              id="login-email"
              placeholder="Enter your email"
              value={values[LoginFormKeys.Email]}
              onChange={changeHandler}
            />

            <input
              type="password"
              id="login-password"
              placeholder="Enter your password"
              name={LoginFormKeys.Password}
              value={values[LoginFormKeys.Password]}
              onChange={changeHandler}
            />
          </div>

          <button type="submit" >
            LOGIN
          </button>

          <p className={styles.message}>
            Not registered? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
