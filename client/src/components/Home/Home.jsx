import styles from "./Home.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RecentlyAddedBooks from "../../components/RecentlyAdded/RecentlyAdded";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

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
              <span onClick={() => navigate(`/catalog`)}>Seek bookshelves</span>
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
