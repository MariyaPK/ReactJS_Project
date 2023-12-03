import styles from "./Home.module.css";

import { Link } from "react-router-dom";

import RecentlyAddedBooks from "../../components/RecentlyAdded/RecentlyAdded";

export default function Home() {
  return (
    <>
      <div className={styles.background} style={{ backgroundImage: 'url("/images/homeBgr.jpg")' }}>
        <div id={styles.home} className={styles["hoc clear"]}>
          <article>
            <p className={styles.heading1}>Are you looking for a mystery?</p>
            <p className={styles.heading2}>A crime?</p>
            <h2>
              <span className={styles.block1}>... or ...</span>
              <span className={styles.block2}> a new fantasy world?</span>
            </h2>
            <h3>
              <span>
                <Link to="/catalog">Seek bookshelf &raquo;</Link>
              </span>
            </h3>
          </article>
        </div>
      </div>

      <div>
        <RecentlyAddedBooks />
      </div>
    </>
  );
}
