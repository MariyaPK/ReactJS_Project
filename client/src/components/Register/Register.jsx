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
      password: "",
      rePassword: "",
    },
    onRegisterSubmit
  );

  return (
    <section
      id="register"
      className={styles["register-section"]}
      // style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}
    >
      <div className={styles.container}>
        <h2>REGISTER</h2>
        <form className={styles["register-form"]} method="POST" onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            {/* <label htmlFor="register-email">Email:</label> */}
            <input
              type="text"
              name="email"
              id="register-email"
              placeholder="Email..."
              value={values.email}
              onChange={changeHandler}
            />

            {/* <label htmlFor="register-password">Password:</label> */}
            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="Password..."
              value={values.password}
              onChange={changeHandler}
            />

            {/* <label htmlFor="register-rePassword">Repeat password:</label> */}
            <input
              type="password"
              name="rePassword"
              id="repeat-password"
              placeholder="Repeat password..."
              value={values.rePassword}
              onChange={changeHandler}
            />
          </div>

          <button type="submit">REGISTER</button>
          <p className={styles.message}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
