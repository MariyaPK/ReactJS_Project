import styles from "./Comments.module.css";

// import { useEffect } from "react";
export default function Comments({ book }) {
  // useEffect(() => {
  //   console.log("Comments Component Book:", book);
  // }, [book]);

  return (
    <div className={styles.comments}>
      <div className={styles.comment}>
        {book.comments ? (
          <ul type="none">
            {book.comments &&
              book.comments
                .sort((a, b) => (a._createdOn < b._createdOn ? 1 : -1))
                .map((comment) => (
                  <li key={comment._id} className={styles.comment}>
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
          <p>No comments.</p>
        )}
      </div>
    </div>
  );
}
