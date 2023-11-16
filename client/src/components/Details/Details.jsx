import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as bookService from "../../services/bookService";
import { useState, useEffect } from "react";

export default function Details() {
  const { bookID } = useParams();
  const [books, setBooks] = useState({});

  useEffect(() => {
    bookService.getOne(bookID).then((result) => {
      setBooks(result);
    });
  }, [bookID]);

  const deleteClickHandler = () => {
    onDeleteClick(bookID);
  };

  return (
    <section className={styles.details}>
      <h2>{books.title}</h2>
      <div className={styles["image-div"]}>
        <img src={books.imageUrl} alt={books.title} />
      </div>
      <div className={styles["details-product"]}>
        <article className={styles["span-style"]}>
          <p>
            <span>ISBN: </span>
            {books.isbn}
          </p>
          <p>
            <span>Author: </span> {books.author}
          </p>
          <p>
            <span>Publish year: </span>
            {books.publishYear}
          </p>
        </article>

        <Link to={`/details/${bookID}/edit`}>
          <button type="submit">Edit</button>
        </Link>
        <button type="submit" onClick={deleteClickHandler}>
          Delete
        </button>
        <button type="submit">Like</button>
        <button type="submit">Comment</button>

        <div className={styles["comment-area"]}>
          <textarea id="comment-area" name="comment" placeholder="Your comment" rows="3" cols="40"></textarea>

          <button type="submit">Add comment</button>
        </div>
      </div>
      <div className={styles.comments}>
        <h3>Comments: </h3>
        <p>User: </p>
        <p>Comment</p>
      </div>
    </section>
  );
}
