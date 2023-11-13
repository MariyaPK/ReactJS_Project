export default function AuthNav() {
  return (
    <div className="wrapper row0">
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
              <a href="/">
                <i className="fa fa-lg fa-home"></i>
              </a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
