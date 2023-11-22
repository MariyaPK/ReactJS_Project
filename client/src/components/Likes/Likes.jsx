import styles from "./Likes.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as likesService from "../../services/likesService";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Likes() {
  const { userId, isAuthenticated } = useAuthContext();
  const { bookID } = useParams();

  const [like, setLike] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    likesService.getLikesCount(bookID).then((likesResult) => {
      setLike(likesResult);
    });
  }, [bookID]);

  const onLikeClick = () => {
    const currentLike = like.find((x) => x._ownerId === userId);
    

    if (currentLike) {
      setLike((state) => state.filter((x) => x._id !== currentLike._id));
      setIsLiked(false);
      likesService.dislike(currentLike._id, userId);
    } else {
      likesService.addLike(bookID, userId).then((result) => {
        setLike((state) => [...state, result]);
        setIsLiked(true);
      });
    }
  };

  return (
    <div className="likes">
      <div className="like">
        <h5>
          <b>{like.length} Likes</b>
        </h5>
        {isAuthenticated && (
          <span className={isLiked ? "liked" : "disliked"} onClick={onLikeClick}>
             <i id={styles["heart"]} className="fa fa-heart"></i>
          </span>
        )}
      </div>
    </div>
  );
}
