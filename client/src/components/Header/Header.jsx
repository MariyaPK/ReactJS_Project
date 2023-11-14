export default function Header() {
  return (
    <div className="wrapper row1">
      <header id="header" className="hoc clear">
        <div id="logo" className="fl_left">
          <h1>
            <a href="/">The Book Hunt</a>
          </h1>
          <p>let the fun begins...</p>
        </div>
        <nav id="mainav" className="fl_right">
          <ul className="clear">
            <li className="active">
              <a href="/">Home</a>
            </li>
                <li>
                  <a href="/catalog">Catalog</a>
                </li>
                <li>
                  <a href="/create">Create</a>
                </li>
                <li>
                  <a href="/my-books">My Books</a>
                </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
