import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="wrapper row1">
      <header id="header" className="hoc clear">
        <div id="logo" className="fl_left">
          <h1>
            <Link to="/">The Book Hunt</Link>
          </h1>
          <p>let the magic begin...</p>
        </div>
        <nav id="mainav" className="fl_right">
          <ul className="clear">
            <li className="active">
              <Link to="/">Home</Link>
            </li>
                <li>
                  <Link to="/catalog">Catalog</Link>
                </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/create">Create</Link>
                </li>
                <li>
                  <Link to="/profile">My Books</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
