import styles from "./Comments.module.css";

import { useState, useEffect } from "react";
export default function Comments({ book }) {
  // useEffect(() => {
  //   console.log("Comments Component Book:", book);
  // }, [book]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [book.comments]);

  return (
    <div className={styles.comments}>
      <span>
        <p>Write a review</p>
      </span>
      <div className={styles.comment}>
        {loading ? (
          <p>Loading...</p>
        ) : book.comments && book.comments.length > 0 ? (
          <ul type="none">
            {book.comments
              .sort((a, b) => (a._createdOn < b._createdOn ? 1 : -1))
              .map((comment) => (
                <li key={comment._id} className={styles["comment-details"]}>
                  <div className={styles.commentDataLeft}>
                    <i className={`fa fa-user`}></i>
                    <p className={styles.author}>{comment.author && comment.author.username} says:</p>
                  </div>
                  <div className={styles.commentDataRight}>
                    <p>{comment.comment}</p>
                    <p>{new Date(comment._createdOn).toLocaleString()}</p>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p>No reviews.</p>
        )}
      </div>
    </div>
  );
}
