import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function AuthNav() {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <header className="wrapper row0">
      <div id="navbar" className="hoc clear">
        <div className="fl_right">
          <ul className="nospace">
            {!isAuthenticated && (
              <>
              <li>
                <i className={`fa fa-user`}></i>
              </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <img src="./images/logo.png" alt="logo" style={{ width: "100px", height: "80px" }} />
                  <span>Hello, {username} !</span>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
