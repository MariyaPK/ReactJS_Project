import styles from "./UserProfile.module.css";

import { useState, useEffect } from "react";

import Owner from "../Owner/Owner";
import UserComments from "../Owner/UserComments";

import Loading from "../Loading/Loading";

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.profile}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles["profile-container"]}>
          <div className={styles["profile-header"]}>
            <h2>Your Bookshelf</h2>
          </div>
          <div className={styles["profile-content"]}>
            <div className={styles["user-adds"]}>
              <h3>Your added books to the shelf </h3>
              <span>
                <Owner />
              </span>
            </div>
            <div className={styles["user-comments"]}>
              <h3>Books you`ve commented</h3>
              <UserComments />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
