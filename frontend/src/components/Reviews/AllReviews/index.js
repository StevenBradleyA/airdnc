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

  // console.log("hello, good sir", reviewHistoryCheck)

  return (
    <div>
      {currentSpot.numReviews === 0 && <h1>New</h1>}
      {sessionUser && reviewHistoryCheck.length === 0 && (
        <OpenModalButton
        buttonText="Post Your Review"
        modalComponent={<CreateReviewModal spotId={spotId} />}
      />
      )}
{/* <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteSpotFormModal spot={spot} />}
      /> */}

      {currentSpot.numReviews === 0 && <h2>Be the first to post a review!</h2>}
      {currentSpot.numReviews >= 1 && (
        <h1>{`${currentSpot.avgStarRating}  ${currentSpot.numReviews} reviews`}</h1>
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
