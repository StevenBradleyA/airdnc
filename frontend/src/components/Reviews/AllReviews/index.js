import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import SingleReview from "./SingleReview";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewModal from "../CreateReview";
import "./AllReviews.css";

const AllReviews = ({ spotId, currentSpot }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  const allReviews = useSelector((state) => Object.values(state.reviews));

  const currentReviews = allReviews.filter((e) => Number(spotId) === e.spotId);

  // is the user logged in? and if they havent posted a review yet.

  // how do we know they are logged in.
  const sessionUser = useSelector((state) => state.session.user);
  // {sessionUser &&}

  // how do we know they havent posted a review?
  const reviewHistoryCheck = currentReviews.filter(
    (e) => sessionUser.id === e.userId
  );

  return (
    <div>
      {currentReviews.length === 0 && <h1>New</h1>}
      {sessionUser &&
        reviewHistoryCheck.length === 0 &&
        sessionUser.id !== currentSpot.ownerId && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReviewModal spotId={spotId} />}
          />
        )}

      {currentReviews.length === 0 && <h2>Be the first to post a review!</h2>}
      {currentReviews.length >= 1 && (
        <h1>{`${currentSpot.avgStarRating}  ${currentReviews.length} review${
          currentReviews.length === 1 ? "" : "s"
        }`}</h1>
      )}

      <div>
        {currentReviews.map((review) => (
          <SingleReview review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
