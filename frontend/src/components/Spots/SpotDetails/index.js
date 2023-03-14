import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../../store/spots";
import { useParams } from "react-router-dom";
import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
  }, [dispatch]);

  // shouldnt this be in updated state???

  const allSpots = useSelector((state) => state.spots);
  const currentSpot = allSpots[spotId];
  // how can I access the state with only one spot??? I need the images and owner info...

  if (!currentSpot) {
    return <h1>LOADING...</h1>;
  }
  return (
    <div>
      <h1>{currentSpot.name}</h1>
      <h2>{`${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}</h2>
      <div>{/* going to need to show all images from new useeffect */}</div>
      {currentSpot.Owner && currentSpot.SpotImages && (
        <div>
          {currentSpot.SpotImages.map((e) => (
            <img alt={`Spot Image`} src={`${e.url}`}></img>
          ))}

          <h1>{`Hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</h1>
        </div>
      )}
      <div>
        <p>{currentSpot.description}</p>
        <div>
          <div>
            <h1> {`$${currentSpot.price} night `} </h1>
            <h2>{`${currentSpot.avgStarRating} ${currentSpot.numReviews} reviews`}</h2>
          </div>
          <button>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
