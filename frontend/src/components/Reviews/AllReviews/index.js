import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import SingleReview from "./SingleReview";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewModal from "../CreateReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../Spots/SpotDetails/SpotDetails.css";
import { loadSpots } from "../../../store/spots";

const AllReviews = ({ spotId, currentSpot, currentReviews }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  // const allReviews = useSelector((state) => Object.values(state.reviews));

  // const currentReviews = allReviews
  //   .filter((e) => Number(spotId) === e.spotId)
  //   .sort((a, b) => b.id - a.id);

  // const updateReviewAverage = () => {
  //   const totalScore = currentReviews.reduce((sumReview, currentReview) => {
  //     sumReview += currentReview.stars;
  //     return sumReview;
  //   }, 0);
  //   const numReviews = currentReviews.length;
  //   const avgStarRating = `${(totalScore / numReviews).toFixed(1)}`;

  //   const updatedSpot = {
  //     [spotId]: { ...currentSpot, totalScore, avgStarRating },
  //   };

  //   return updatedSpot;
  // };

  // useEffect(() => {
  //   dispatch(loadSpots(updateReviewAverage()));
    // dispatch to update store without backend.
    // spotid  and give array of all curent spots reviews
  // }, [currentReviews.length]);
  // is the user logged in? and if they havent posted a review yet.

  // how do we know they are logged in.
  const sessionUser = useSelector((state) => state.session.user);




  return (
    <div className="reviews-container">
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

      <div>
        {currentReviews.map((review) => (
          <SingleReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
