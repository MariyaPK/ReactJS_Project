// import { useEffect } from "react";

export default function Comments({ book }) {
  // useEffect(() => {
  //   console.log("Comments Component Book:", book);
  // }, [book]);

  return (
    <div className="comments">
      <div className="comment">
        {book.comments ? (
          <ul type="none">
            {book.comments &&
              book.comments
                .sort((a, b) => (a._createdOn < b._createdOn ? 1 : -1))
                .map((comment) => (
                  <li key={comment._id} className="comment">
                    <p>{comment.author && comment.author.username} says:</p>
                    <p>{comment.comment}</p>
                  </li>
                ))}
          </ul>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
}
