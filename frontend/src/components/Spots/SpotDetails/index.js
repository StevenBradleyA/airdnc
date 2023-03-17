import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../../store/spots";
import { useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./SpotDetails.css";
const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch, spotId]);

  const allSpots = useSelector((state) => state.spots);
  const currentSpot = allSpots[spotId];
  if (!currentSpot) {
    return <h1>LOADING...</h1>;
  }
  return (
    <div>
      <h1>{currentSpot.name}</h1>
      <h2>{`${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}</h2>
      {currentSpot.Owner && currentSpot.SpotImages && (
        <div>
          <div>
            {currentSpot.SpotImages.map((e) => (
              <img key={e.id} alt={`Spot`} src={`${e.url}`} />
            ))}
          </div>

          <h1>{`Hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</h1>
        </div>
      )}
      <div>
        <p>{currentSpot.description}</p>
        <div>
          <div>
            <h1> {`$${currentSpot.price} night `} </h1>
            <h2>
              <FontAwesomeIcon icon={faStar} />
              {`${
                currentSpot.avgStarRating === "NaN"
                  ? "New"
                  : currentSpot.avgStarRating
              } ${currentSpot.numReviews} reviews`}
            </h2>
          </div>
          <button>Reserve</button>
        </div>
      </div>
      <div>
        <AllReviews spotId={spotId} currentSpot={currentSpot} />
      </div>
    </div>
  );
};

export default SpotDetails;
