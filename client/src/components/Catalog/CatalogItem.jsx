import styles from "./CatalogItem.module.css";

import { Link } from "react-router-dom";

export default function CatalogItem({ _id, title, author, imageUrl }) {
  return (
    <div className={styles["bookCard-info"]}>
      <img src={imageUrl} alt={title} className={styles["bookCard-image"]} />
      <div className={styles["bookCard-details"]}>
        <h3>{title}</h3>
        <p>Author:{author}</p>
        <Link to={`/details/${_id}`} className={styles["details-btn"]}>
          Details
        </Link>
      </div>
    </div>
  );
}
