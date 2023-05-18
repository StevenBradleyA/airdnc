import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import StarsRatingInput from "../CreateReview/StarsRating";
import { createReviewThunk } from "../../../store/reviews";
import "../CreateReview/CreateReview.css";

function UpdateReviewModal({ spotId }) {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();
  
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
  
    useEffect(() => {
      handleInputErrors();
    }, [review, stars]);
  
    const onChange = (e) => {
      setStars(e);
    };
  
    const handleReviewSubmit = async (e) => {
      e.preventDefault();
  
      if (!Object.values(errors).length) {
        const reviewInformation = {
          review,
          stars,
        };
        dispatch(createReviewThunk(reviewInformation, spotId))
          .then(() => closeModal())
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors({ review: data.errors[0] });
          });
        closeModal();
      }
      setHasSubmitted(true);
    };
    return (
      <div className="create-review-container-modal">
        <div className="create-review-heading">How was your stay?</div>
  
        <form
          onSubmit={handleReviewSubmit}
          className="create-review-form-container"
        >
          {hasSubmitted && errors.review && (
            <p className="errors">{errors.review}</p>
          )}
          {hasSubmitted && errors.stars && (
            <p className="errors">{errors.stars}</p>
          )}
  
          <textarea
            type="text"
            value={review}
            className="leave-review"
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
          />
  
          <div className="stars-rating-container">
            <StarsRatingInput
              disabled={false}
              onChange={onChange}
              stars={stars}
            />
  
            <div className="stars-text-rating">Stars</div>
          </div>
  
          <input
            type="submit"
            className="submit-review-button-modal"
            value="Submit Your Review"
            disabled={hasSubmitted && Object.values(errors).length > 0}
          />
        </form>
      </div>
    );
  }
export default UpdateReviewModal;
