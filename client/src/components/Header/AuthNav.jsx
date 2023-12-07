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
                  <img
                    src="./images/userLogo.png"
                    alt="userLogo"
                    style={{ width: "60px", height: "60px", borderRadius: "70%" }}
                  />
                  <span style={{ padding: "20px", fontSize: "15px" }}>Hello, {username} !</span>
                </li>
                <li style={{ fontSize: "15px" }}>
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
