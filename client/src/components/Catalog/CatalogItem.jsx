import styles from "./CatalogItem.module.css";

import { useNavigate } from "react-router-dom";

export default function CatalogItem({ _id, title, author, imageUrl }) {
  const navigate = useNavigate();
  return (
    <div className={styles["bookCard-info"]}>
      <img src={imageUrl} alt={title} className={styles["bookCard-image"]} />
      <div className={styles["bookCard-details"]}>
        <h3>{title}</h3>
        <p>Author:{author}</p>
        <button className={styles["details-btn"]} onClick={() => navigate(`/details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
}
