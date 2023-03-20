import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../../store/spots";
import { useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { loadSpots } from "../../../store/spots";

import "./SpotDetails.css";
const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch, spotId]);
  
  const allSpots = useSelector((state) => state.spots);
  const allReviews = useSelector((state) => Object.values(state.reviews));
  
  const currentReviews = allReviews
  .filter((e) => Number(spotId) === e.spotId)
  .sort((a, b) => b.id - a.id);
  
  
    useEffect(() => {
      dispatch(loadSpots(updateReviewAverage()));
    }, [currentReviews.length]);

    const updateReviewAverage = () => {
      const totalScore = currentReviews.reduce((sumReview, currentReview) => {
        sumReview += currentReview.stars;
        return sumReview;
      }, 0);
      const numReviews = currentReviews.length;
      const avgStarRating = `${(totalScore / numReviews).toFixed(1)}`;
  
      const updatedSpot = {
        [spotId]: { ...currentSpot, totalScore, avgStarRating },
      };
  
      return updatedSpot;
    };



  const currentSpot = allSpots[spotId];
  if (!currentSpot) {
    return <h1>LOADING...</h1>;
  }


  return (
    <div className="spot-detail-container">
      <h1 className="spot-name">{currentSpot.name}</h1>
      <h2 className="spot-location">{`${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}</h2>
      {currentSpot.Owner && currentSpot.SpotImages && (
        <div>
          <div className="spot-images-container">
            {currentSpot.SpotImages.map((e) => (
              <img
                key={e.id}
                alt={`Spot`}
                src={`${e.url}`}
                className={e.preview === true ? "preview-image" : "spot-image"}
              />
            ))}
          </div>

          <h1 className="owner-title">{`Hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</h1>
        </div>
      )}
      <div>
        <p className="description">{currentSpot.description}</p>
        <div className="reserve-container">
          <div className="price-star-container">
            <div className="price-night-container">
              <h1 className="price-reserve">{`$${currentSpot.price}`}</h1>
              <h1 className="reserve-night">night</h1>
            </div>

            {currentSpot.numReviews === 0 && (
              <h1 className="reserve-new">
                <FontAwesomeIcon icon={faStar} />
                {`New`}
              </h1>
            )}
            {currentSpot.numReviews >= 1 && (
              <h1 className="reserve-rating-number">
                <FontAwesomeIcon icon={faStar} />{" "}
                {`${currentSpot.avgStarRating} · ${
                  currentReviews.length
                } review${currentReviews.length === 1 ? "" : "s"}`}
              </h1>
            )}
          </div>
          <button
            className="reserve-button"
            onClick={() => window.alert("Feature Coming Soon!")}
          >
            Reserve
          </button>
        </div>
      </div>
      <div>
        <AllReviews spotId={spotId} currentSpot={currentSpot} currentReviews={currentReviews} />
      </div>
    </div>
  );
};

export default SpotDetails;
