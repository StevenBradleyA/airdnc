import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import SingleReview from "./SingleReview";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewModal from "../CreateReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../Spots/SpotDetails/SpotDetails.css";

const AllReviews = ({ spotId, currentSpot, currentReviews }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="detail-review-container">
      {currentReviews.length === 0 && (
        <h1 className="review-heading">
          <FontAwesomeIcon icon={faStar} />
          {`New`}
        </h1>
      )}
      {currentReviews.length >= 1 && (
        <h1 className="review-heading">
          <FontAwesomeIcon icon={faStar} />{" "}
          {`${currentSpot.avgStarRating} · ${currentReviews.length} review${
            currentReviews.length === 1 ? "" : "s"
          }`}
        </h1>
      )}
      {sessionUser &&
        currentReviews.filter((e) => sessionUser.id === e.userId).length ===
          0 &&
        sessionUser.id !== currentSpot.ownerId && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal spotId={spotId} />}
          />
        )}
      {currentReviews.length === 0 && <h2>Be the first to post a review!</h2>}

      <div className="reviews-container">
        {currentReviews.map((review) => (
          <SingleReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
