import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import StarsRatingInput from "./StarsRating";
import { createReviewThunk } from "../../../store/reviews";
import "./CreateReview.css";

function CreateReviewModal({ spotId }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

// console.log(stars, 'This is a star')

  const handleInputErrors = () => {
    const errorsObj = {};
    if (review.length < 10) {
      errorsObj.review = "Review needs a minimum of 10 characters";
    }
    if (stars < 1) {
      errorsObj.stars = "Star rating must be between 1 and 5";
    }

    setErrors(errorsObj);
  };
  // console.log(errors, "hellothere");

  useEffect(() => {
    handleInputErrors();
  }, [review, stars]);

  const onChange = (e) => {
    console.log(e, 'yo')
    // console.log(e.target)
    setStars(e)
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const reviewInformation = {
        review,
        stars,
      };
      await dispatch(createReviewThunk(reviewInformation, spotId));
      closeModal();
    }
  };
  return (
    <div>
      <h1>How was your stay?</h1>
      <p></p>
      <form onSubmit={handleReviewSubmit}>
        <input
          type="text"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
        {/* <input
          type="text"
          value={stars}
          // placeholder="Leave your review here..."
          onChange={(e) => setStars(e.target.value)}
        /> */}
        <p></p>
        <StarsRatingInput
          disabled={false}
          onChange={onChange}
          stars={stars}
        />
        <p></p>
        <input
          type="submit"
          value="Submit Your Review"
          disabled={errors.length > 0}
        />
      </form>
    </div>
  );
}

export default CreateReviewModal;
