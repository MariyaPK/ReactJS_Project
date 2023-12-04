import styles from "./RecentlyAdded.module.css";

import { useNavigate } from "react-router-dom";

import { useBookContext } from "../../contexts/BookContext";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className={styles["book-card"]}>
      <img src={book.imageUrl} alt={book.title} className={styles["book-image"]} />
      <div className={styles["book-details"]}>
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <button className={styles["details-btn"]} onClick={() => navigate(`/details/${book._id}`)} >
          Details
        </button>
      </div>
    </div>
  );
};

export default function RecentlyAddedBooks({ limit }) {
  const { recentlyAddedBooks } = useBookContext();

  if (!recentlyAddedBooks || recentlyAddedBooks.length === 0) {
    return (
      <div className={styles["no-books"]}>
        <h2>No recently added books.</h2>
      </div>
    );
  }
  const booksToShow = recentlyAddedBooks.slice(0, limit);

  return (
    <div className={styles["list-header"]}>
      <h2>Recently Added Books</h2>
      <div className={styles["book-list"]}>
        {booksToShow.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
