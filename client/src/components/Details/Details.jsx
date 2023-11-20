import styles from "./Details.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { bookServiceFactory } from "../../services/bookService";
import { useService } from "../../hooks/useService";

import { useAuthContext } from "../../contexts/AuthContext";
import { useBookContext } from "../../contexts/BookContext";

export default function Details() {
  const { bookID } = useParams();
  const { userId, isAuthenticated, userEmail } = useAuthContext();
  const { deleteBook } = useBookContext();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const bookService = useService(bookServiceFactory);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    Promise.all([bookService.getBook(bookID)])
      .then(([bookData]) => {
        const bookState = {
          ...bookData,
        };
        setBook(bookState);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [bookID]);

  const isOwner = book._ownerId === userId;

  const deleteClickHandler = async () => {
    const result = confirm(`Are you sure you want to delete this book?`);

    if (result) {
      await bookService.deleteBook(book._id);
      deleteBook(book._id);

      navigate("/catalog");
    }
  };

  return (
    <section className={styles.details}>
      <h2>{book.title}</h2>
      <div className={styles["image-div"]}>
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <div className={styles["details-product"]}>
        <article className={styles["span-style"]}>
          <p>
            <span>ISBN: </span>
            {book.isbn}
          </p>
          <p>
            <span>Author: </span> {book.author}
          </p>
          <p>
            <span>Publish year: </span>
            {book.publishYear}
          </p>
          <p>
            <span>Summary: </span>
            {showMore ? book.description : `${book.description?.slice(0, 100)}...`}
            {!showMore && (
              <button className={styles.showMoreButton} onClick={() => setShowMore(true)}>
                Show More
              </button>
            )}
            {showMore && (
              <button className={styles.showMoreButton} onClick={() => setShowMore(false)}>
                Show Less
              </button>
            )}
          </p>
          <p>
            <span> Likes: </span>
          </p>
        </article>
        {(isAuthenticated && isOwner) && (
          <>
            <Link to={`/details/${bookID}/edit`}>
              <button type="submit">Edit</button>
            </Link>
            <button type="submit" onClick={deleteClickHandler}>
              Delete
            </button>
          </>
        )}
 {isAuthenticated ? (
      <>
        <button type="button">Like</button>
        <button type="button">Comment</button>

        <div className={styles["comment-area"]}>
          <textarea id="comment-area" name="comment" placeholder="Your comment" rows="3" cols="40"></textarea>
          <button type="button">Add comment</button>
        </div>
      </>
    ) : (
      <p className="container">
        <Link to="/login">Sign in to like and comment</Link>
      </p>
    )}
  </div>
  {isAuthenticated &&
  <div className={styles.comments}>
    <h3>Comments: </h3>
    <p>User: </p>
    <p>Comment</p>
  </div>
}
</section>
  );
}
