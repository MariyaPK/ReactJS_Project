import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function AuthNav() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className="wrapper row0">
      <div id="navbar" className="hoc clear">
        <div className="fl_left">
          <ul className="nospace">
            <li>
              <i className="fa fa-phone"></i> +359 888 888 888
            </li>
            <li>
              <i className="fa fa-envelope-o"></i> my@book.hunt
            </li>
          </ul>
        </div>
        <div className="fl_right">
          <ul className="nospace">
            <li>
              <Link to="/">
                <i className="fa fa-lg fa-home"></i>
              </Link>
            </li>
            {!isAuthenticated && (
              <>
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
                <span>Hello!</span>
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

