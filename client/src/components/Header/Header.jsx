import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="wrapper row1">
      <header id="header" className="hoc clear">
        <div id="logo" className="fl_left">
          <h1>
            <Link to="/">The Book Hunt</Link>
          </h1>
          <p>let the fun begins...</p>
        </div>
        <nav id="mainav" className="fl_right">
          <ul className="clear">
            <li className="active">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/my-books">My Books</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
