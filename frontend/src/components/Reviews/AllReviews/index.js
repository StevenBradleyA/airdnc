import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import SingleReview from "./SingleReview";
import "./AllReviews.css";

const AllReviews = ({ spotId, currentSpot }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  const allReviews = useSelector((state) => Object.values(state.reviews));
  console.log(
    useSelector((state) => state.reviews),
    "well what is it"
  );
  console.log(allReviews, "soooo weary traveler");
  const currentReviews = allReviews.filter((e) => Number(spotId) === e.spotId);
  return (
    <div>
      {currentSpot.numReviews === 0 && <h1>New</h1>}
      {currentSpot.numReviews === 0 && <button>Post Your Review</button>}
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
