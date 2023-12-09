import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  

  return (
    <div className="wrapper row1">
      <header id="header" className="hoc clear">
        <div id="logo" className="fl_left" style={{ display: "flex", alignItems: "center" }}>
          <span>
            <h1>
              <Link to="/">THE BOOKSHELF</Link>
            </h1>
            <p style={{fontStyle:"italic"}}>let the search begin...</p>
          </span>
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
