import styles from "./CommentForm.module.css";

import { useForm } from "../../hooks/useForm";

export default function CommentForm({ onCommentSubmit }) {
  const {
    values: userComment,
    changeHandler,
    onSubmit,
  } = useForm(
    {
      comment: "",
    },
    onCommentSubmit
  );

  return (
    <article className={styles["create-comment"]}>
      <form className={styles["-comment-form"]} onSubmit={onSubmit}>
        <div className={styles["comment-area"]}>
          <textarea
            className={styles["textarea-comments"]}
            rows={3}
            name="comment"
            placeholder="Add a review..."
            value={userComment.comment}
            onChange={changeHandler}
          ></textarea>
          <button type="submit">Review</button>
        </div>
      </form>
    </article>
  );
}
