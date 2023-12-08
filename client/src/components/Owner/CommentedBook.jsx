import styles from "../Catalog/CatalogItem.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { bookServiceFactory } from "../../services/bookService";
import { useService } from "../../hooks/useService";

export default function CommentedBook({ bookID, title, author, imageUrl }) {
  const navigate = useNavigate();
  const bookService = useService(bookServiceFactory);
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const bookDetails = async () => {
      try {
        const details = await bookService.getBook(bookID);
        setBookDetails(details);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (bookID) {
      bookDetails();
    }
  }, [bookID, bookService]);

  return (
    <div className={styles["bookCard-info"]}>
      <img src={bookDetails?.imageUrl || imageUrl} alt={bookDetails?.title || title} className={styles["bookCard-image"]} />
      <div className={styles["bookCard-details"]}>
        <h3>{bookDetails?.title || title}</h3>
        <p>Author: {bookDetails?.author || author}</p>
        <button className={styles["details-btn"]} onClick={() => navigate(`/details/${bookID}`)}>
          Details
        </button>
      </div>
    </div>
  );
}
