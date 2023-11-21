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
    <article className="create-comment">
      <form className="form" onSubmit={onSubmit}>
        <textarea
          className="textarea-comments"
          rows={3}
          name="comment"
          placeholder="Type Your Comment"
          value={userComment.comment}
          onChange={changeHandler}
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </article>
  );
}
