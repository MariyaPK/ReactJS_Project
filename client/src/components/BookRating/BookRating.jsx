import "./BookRating.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { requestFactory } from "../../services/requester";
import { useAuthContext } from "../../contexts/AuthContext";

const request = requestFactory();
const baseUrl = "http://localhost:3030/data";

const Rate = () => {
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

    //   console.log(bookID);
    //   console.log(userId);
    //   console.log(result);

      if (result.ok) {
        setRate(givenRating);
        alert(`You have successfully rated the book ${givenRating} stars!`);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error saving rating. Please try again.");
    }
  };

  const generateStars = (numStars) => {
    const stars = [];
    for (let i = numStars; i > 0; i--) {
      stars.push(
        <React.Fragment key={i}>
          <input className={`star star-${i}`} id={`star-${i}`} type="radio" name="star" onClick={() => handleRating(i)} />
          <label className={`star star-${i}`} htmlFor={`star-${i}`}></label>
        </React.Fragment>
      );
    }
    return stars;
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-md-12">
          <div className="stars">
            <form method="POST">{generateStars(5)}</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rate;
