import styles from "./UserProfile.module.css";

import * as likesService from "../../services/likesService";
import { useAuthContext } from "../../contexts/AuthContext";

import { useEffect, useState } from "react";

import Owner from "../Owner/Owner";

export default function UserProfile() {
  const { userId } = useAuthContext();
  const [likedBooks, setLikedBooks] = useState([]);

  useEffect(() => {
    const fetchLikedBooks = async () => {
      try {
        const likedBooksResult = await likesService.liked(userId);
        setLikedBooks(likedBooksResult);
      } catch (error) {
        console.error("Error fetching liked books:", error);
      }
    };

    fetchLikedBooks();
  }, [userId]);

  console.log(likedBooks)

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2>Your Bookshelf</h2>
      </div>

      <div className={styles.profileContent}>
        <h3>Your Created Books</h3>
        <Owner />
        {/* Liked books */}
        <h3>Liked Books</h3>
        <ul>
          {likedBooks?.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>

        {/* Commented books */}
      </div>
    </div>
  );
}
