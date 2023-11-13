export default function Footer() {
  return (
    <div className="wrapper row4">
      <footer id="footer" className="hoc clear">
        <h3 className="heading">The Book Hunt</h3>
        <ul className="nospace inline pushright uppercase">
          <li>
            <a href="/">
              <i className="fa fa-lg fa-home"></i>
            </a>
          </li>
          <li>
            <a href="/catalog">Catalog</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
        <ul className="faico clear">
          <li>
            <a className="faicon-facebook" href="/facebook">
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a className="faicon-twitter" href="/twitter">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a className="faicon-linkedin" href="linkdin">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a className="faicon-google-plus" href="googleplus">
              <i className="fa fa-google-plus"></i>
            </a>
          </li>
        </ul>
        <div id="copyright">
          <p>
            Copyright &copy; 2023 - All Rights Reserved - <a href="/">The Book Hunt</a>
          </p>
          <p className="font-xs">
            Template by{" "}
            <a target="_blank" href="http://www.os-templates.com/" title="Free Website Templates">
              OS Templates
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
