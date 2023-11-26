import "./BookRating.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as rateService from "../../services/rateService";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Rate () {
  const { bookID } = useParams();
  const { userId } = useAuthContext();

  const [rate, setRate] = useState([]);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    rateService.rateBook(bookID, userId).then((rateResult) => {
      setRate([rateResult]);
      setIsRated(true);
    });
  }, [bookID, userId]);

  // useEffect(() => {
  //   // Fetch the user's rating for the book
  //   rateService.rateBook(bookID, userId).then((userRating) => {
  //     if (userRating) {
  //       setRate([userRating]);
  //       setIsRated(true);
  //     }
  //   });
  // }, [bookID, userId]);

  const handleRating = async (givenRating) => {
    const currentRate = rate.find((x) => x._ownerId === userId);
    try {
      if (givenRating === rate) {
        givenRating = 0;
      }

if (currentRate) {
        setRate((state) => state.filter((x) => x._id !== currentRate._id));
        setIsRated(false);
        rateService.changeRate(currentRate._id, givenRating, userId, bookID);
      } else {
        rateService.rateBook(bookID, userId).then((result) => {
          setRate((state) => [...state, result]);
          setIsRated(true);
        });
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
            <span className={isRated ? "rate" : "changeRate"} onClick={handleRating}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
