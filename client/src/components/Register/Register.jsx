import styles from "./Register.module.css";

import { useContext } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
  const { onRegisterSubmit } = useContext(AuthContext);
  const { values, changeHandler, onSubmit } = useForm(
    {
      email: "",
      username: "",
      password: "",
      rePassword: "",
    },
    onRegisterSubmit
  );

  return (
    <section id="register" className={styles["register-section"]}>
      <div className={styles.container}>
      <span>
          <img src="./images/imgForms.png" alt="imgForms" />
        </span>
        <h2>REGISTER</h2>
        <form className={styles["register-form"]} method="POST" onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <input
              type="text"
              name="email"
              id="register-email"
              placeholder="Email..."
              value={values.email}
              onChange={changeHandler}
            />

            <input
              type="text"
              name="username"
              id="register-username"
              placeholder="Username..."
              value={values.username}
              onChange={changeHandler}
            />

            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="Password..."
              value={values.password}
              onChange={changeHandler}
            />

            <input
              type="password"
              name="rePassword"
              id="repeat-password"
              placeholder="Repeat password..."
              value={values.rePassword}
              onChange={changeHandler}
            />
          </div>

          <button type="submit" style={{ backgroundColor: "rgb(88, 46, 7)" }}>REGISTER</button>

          <p className={styles.message}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
