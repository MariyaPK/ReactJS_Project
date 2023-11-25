import styles from "./BookRating.module.css";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { requestFactory } from "../../services/requester";
import { useAuthContext } from "../../contexts/AuthContext";

const request = requestFactory();
const baseUrl = "http://localhost:3030/data";

export default function Rate() {
  const [rate, setRate] = useState(0);
  const { bookID } = useParams();
  const { userId } = useAuthContext();

  const handleRating = async (givenRating) => {
    try {
      if (givenRating === rate) {
        givenRating = 0;
      }

      const result = await request.post(`${baseUrl}/rating`, {
        bookID,
        userId,
        rating: givenRating,
      });
      console.log(bookID);
      console.log(userId);
      console.log(result);

      if (result.ok) {
        setRate(givenRating);
        alert(`You have successfully rated the book ${givenRating} stars!`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving rating. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {[...Array(5)].map((book, index) => {
        const givenRating = index + 1;
        return (
          <label key={givenRating}>
            <input
              className={styles.radio}
              type="radio"
              value={givenRating}
              onClick={() => {
                handleRating(givenRating);
              }}
            />
            <div className={styles.rating}>
              <FaStar color={givenRating <= rate ? "000" : "rgb(192,110,110)"} />
            </div>
          </label>
        );
      })}
    </div>
  );
}
