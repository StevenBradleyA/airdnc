import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import SingleReview from "./SingleReview";
import "./AllReviews.css";

const AllReviews = ({ spotId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsBySpotIdThunk(spotId));
  }, [dispatch]);

  const allReviews = useSelector((state) => Object.values(state.reviews));
  console.log(allReviews, "HELLLLLOOOOOOOOOOOOOOOO");
  return (
    <div>
      {allReviews.length === 0 && <h1>New</h1>}
      {allReviews.length === 0 && <button>Post Your Review</button>}
      {allReviews.length === 0 && <h2>Be the first to post a review!</h2>}
      {allReviews.length > 1 && (
        <h1>{`Avg rating for the spot  ${allReviews.length} reviews`}</h1>
      )}
      {/* need to pass a prop from the spot detail */}

      <div>
        {allReviews.map((review) => (
          <SingleReview review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
