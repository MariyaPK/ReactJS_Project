import styles from "./Details.module.css";

import { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { bookServiceFactory } from "../../services/bookService";
import { useService } from "../../hooks/useService";
import { bookReducer } from "../../reducers/bookReducer";
import * as commentService from "../../services/commentService";

import { useAuthContext } from "../../contexts/AuthContext";
import { useBookContext } from "../../contexts/BookContext";

import CommentForm from "../Comments/CommentForm";
import Comments from "../Comments/Comments";
import Likes from "../Likes/Likes";
import BookRating from "../BookRating/BookRating"

export default function Details() {
  const { bookID } = useParams();
  const { userId, isAuthenticated, username } = useAuthContext();
  const { deleteBook } = useBookContext();
  const navigate = useNavigate();
  const [book, dispatch] = useReducer(bookReducer, {});
  const bookService = useService(bookServiceFactory);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // console.log('Details Component Book:', bookID);
    Promise.all([bookService.getBook(bookID), commentService.getAllComments(bookID)])
      .then(([bookData, comments]) => {
        const bookState = {
          ...bookData,
          comments,
        };
        dispatch({ type: "BOOKS_FETCH", payload: bookState });
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [bookID]);

  const onCommentSubmit = async (userComment) => {
    const response = await commentService.addComment(bookID, userComment.comment);

    dispatch({
      type: "COMMENT_ADD",
      payload: response,
      username,
    });
  };

  const isOwner = book._ownerId === userId;

  const deleteClickHandler = async () => {
    const result = confirm(`Are you sure you want to delete this book?`);

    if (result) {
      await bookService.deleteBook(book._id);
      deleteBook(book._id);

      navigate("/catalog");
    }
  };

  // useEffect(() => {
  //   console.log('Details Component Book (State):', book);
  // }, [book]);

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
            <span>Genres: </span> {book.genre}
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
        </article>
        {(isAuthenticated && isOwner) && (
          <>
            <Link to={`/details/edit/${bookID}`}>
              <button type="submit">Edit</button>
            </Link>
            <button type="submit" onClick={deleteClickHandler}>
              Delete
            </button>
          </>
        )}
        {isAuthenticated ? (
          <>
            <Likes />
            <BookRating />
            <div className={styles["comment-area"]}>
              <CommentForm onCommentSubmit={onCommentSubmit} />
            </div>
            <Comments book={book} />
          </>
        ) : (
          <p className="container">
            <Link to="/login">Sign in to like and comment</Link>
          </p>
        )}
      </div>
    </section>
  );
}
