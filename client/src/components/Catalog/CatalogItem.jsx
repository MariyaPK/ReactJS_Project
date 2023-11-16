import styles from "./Catalog.module.css";
import { Link } from "react-router-dom";

export default function CatalogItem({ _id, title, imageUrl }) {
  return (
    <li>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <Link to={`/details/${_id}`} className={styles["details-btn"]}>
        Details
      </Link>
    </li>
  );
}
