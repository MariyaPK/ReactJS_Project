import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="wrapper row4">
      <footer id="footer" className="hoc clear">
        <h3 className="heading">The Book Hunt</h3>
        <ul className="nospace inline pushright uppercase">
          <li>
            <Link to="/">
              <i className="fa fa-lg fa-home"></i>
            </Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <ul className="faico clear">
          <li>
            <Link className="faicon-facebook" to="https://www.facebook.com/">
              <i className="fa fa-facebook"></i>
            </Link>
          </li>
          <li>
            <Link className="faicon-twitter" to="https://www.twitter.com/">
              <i className="fa fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link className="faicon-linkedin" to="https://www.linkedin.com/">
              <i className="fa fa-linkedin"></i>
            </Link>
          </li>
          <li>
            <Link className="faicon-google-plus" to="https://www.googleplus.com/">
              <i className="fa fa-google-plus"></i>
            </Link>
          </li>
        </ul>
        <div id="copyright">
          <p>
            Copyright &copy; 2023 - All Rights Reserved - <Link to="/">The Book Hunt</Link>
          </p>
          <p className="font-xs">
            Template by {" "}
            <Link target="_blank" to="http://www.os-templates.com/" title="Free Website Templates">
              OS Templates
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
