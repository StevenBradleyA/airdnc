import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import SingleReview from "./SingleReview";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewModal from "../CreateReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ScoreBar from "./scoreBar";
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
        <div className="review-heading">
          <FontAwesomeIcon icon={faStar} />
          {`New`}
        </div>
      )}
      {currentReviews.length >= 1 && (
        <div className="review-heading">
          <FontAwesomeIcon icon={faStar} className="star-review-header" />
          {`${currentSpot.avgStarRating} · ${currentReviews.length} review${
            currentReviews.length === 1 ? "" : "s"
          }`}
        </div>
      )}
      
      {currentReviews.length === 0 && <h2>Be the first to post a review!</h2>}

      {currentReviews.length >= 1 && (
        <div className="all-score-bars-container">
          <div className="score-bars-left">
            <div className="bar-pair">
              <div className="score-text">Cleanliness</div>
              <ScoreBar rating={currentSpot.avgStarRating} />
            </div>
            <div className="bar-pair">
              <div className="score-text">Communication</div>
              <ScoreBar rating={currentSpot.avgStarRating} />
            </div>
            <div className="bar-pair">
              <div className="score-text">Check-in</div>
              <ScoreBar rating={currentSpot.avgStarRating} />
            </div>
          </div>
          <div className="score-bars-right">

          <div className="bar-pair">
              <div className="score-text">Accuracy</div>
              <ScoreBar rating={currentSpot.avgStarRating} />
            </div>
            <div className="bar-pair">
              <div className="score-text">Location</div>
              <ScoreBar rating={currentSpot.avgStarRating} />
            </div>
            <div className="bar-pair">
              <div className="score-text">Value</div>
              <ScoreBar rating={currentSpot.avgStarRating} />
            </div>


          </div>
        </div>
      )}

      <div className="reviews-container">
        {currentReviews.map((review) => (
          <SingleReview key={review.id} review={review} />
        ))}
      </div>
      {sessionUser &&
        currentReviews.filter((e) => sessionUser.id === e.userId).length ===
          0 &&
        sessionUser.id !== currentSpot.ownerId && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal spotId={spotId} />}
          />
        )}
    </div>
  );
};

export default AllReviews;
