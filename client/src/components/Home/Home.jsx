import { Link } from "react-router-dom";

import RecentlyAddedBooks from "../../components/RecentlyAdded/RecentlyAdded";

export default function Home() {
  return (
    <>
      <div className="wrapper bgded overlay" style={{ backgroundImage: 'url("/images/forHome.jpg")' }}>
        <div id="pageintro" className="hoc clear">
          <article>
            <p className="heading">Are you looking for mystery?</p>
            <h2 className="heading">
              <span className="block">... or... </span>
              <span className="block">  for a new fantasy world? </span>
            </h2>
            <footer>
              <Link to="/catalog">Seek our library &raquo;</Link>
            </footer>
          </article>
        </div>
      </div>

      <div>
        <RecentlyAddedBooks />
      </div>
    </>
  );
}
