import styles from "./Owner.module.css";

import { useEffect, useState } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import * as commentService from "../../services/commentService";

import CommentedBook from "./CommentedBook";

export default function UserComments() {
  const { userId: ownerId } = useAuthContext();
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    commentService.getUserComments(ownerId).then((comments) => {
      const commentedBooksByUser = new Set();

      const commentedBookByUser = comments.filter((comment) => {
        if (!commentedBooksByUser.has(comment.bookID)) {
          commentedBooksByUser.add(comment.bookID);
          return true;
        }
        return false;
      });

      setUserComments(commentedBookByUser);
    });
  }, [ownerId]);

  return (
    <div className={styles["owner-books"]}>
      <div className={styles["book-card"]}>
        <span>
          {userComments.map((book) => (
            <CommentedBook key={book.bookID} {...book} />
          ))}
        </span>
      </div>
    </div>
  );
}
