import styles from "./Details.module.css";

import { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { bookServiceFactory } from "../../services/bookService";
import { useService } from "../../hooks/useService";
import { bookReducer } from "../../reducers/bookReducer";
import * as commentService from "../../services/commentService";

import { useAuthContext } from "../../contexts/AuthContext";
import { useBookContext } from "../../contexts/BookContext";

import CommentForm from "../Comments/CommentForm";
import Comments from "../Comments/Comments";
import Likes from "../Likes/Likes";

import Loading from "../Loading/Loading";

export default function Details() {
  const { bookID } = useParams();
  const { userId, isAuthenticated, username } = useAuthContext();
  const { deleteBook } = useBookContext();
  const navigate = useNavigate();
  const [book, dispatch] = useReducer(bookReducer, {});
  const bookService = useService(bookServiceFactory);

  const [isLoading, setIsLoading] = useState(true);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2>{book.title}</h2>
          <div className={styles["details-book"]}>
            <div className={styles["book-details"]}>
              <div className={styles["book-image-left"]}>
                <img src={book.imageUrl} alt={book.title} />
              </div>
              <div className={styles["book-details-right"]}>
                <p>
                  <span>ISBN: </span>
                  <span> {book.isbn} </span>
                </p>
                <p>
                  <span>Author: </span> <span>{book.author} </span>
                </p>
                <p>
                  <span>Genres: </span> <span>{book.genre} </span>
                </p>
                <p>
                  <span>Summary: </span>
                  <span>{showMore ? book.summary : `${book.summary?.slice(0, 300)}...`}</span>
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

                {isAuthenticated && isOwner && (
                  <div className={styles["details-btn"]}>
                    <button type="submit" onClick={() => navigate(`/details/${book._id}/edit`)}>
                      Edit
                    </button>
                    <button type="submit" onClick={deleteClickHandler}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            {isAuthenticated && (
              <div className={styles["details-addons"]}>
                <div className={styles["likes-rates"]}>
                  <Likes />
                </div>
              </div>
            )}
            {isAuthenticated && (
              <div className={styles["details-addons2"]}>
                <div className={styles["comment-area"]}>
                  <CommentForm onCommentSubmit={onCommentSubmit} />
                </div>
                <Comments book={book} />
              </div>
            )}
          </div>
          {!isAuthenticated && (
            <div className={styles.signIn}>
              <button className={styles.btn} onClick={() => navigate(`/login`)}>
                Sign in to like and comment
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
