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
      setIsLiked(likesResult.some((x) => x._ownerId === userId));
    });
  }, [bookID, userId]);

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
    <div className={styles.likes}>
      <div className={styles.like}>
        <p>{like.length} Likes</p>
        {isAuthenticated && (
          <div className={isLiked ? styles.liked : styles.disliked} onClick={onLikeClick}>
            <i id={styles.heart} className={`fa fa-heart ${isLiked ? styles.red : ""}`}></i>
          </div>
        )}
      </div>
    </div>
  );
}
