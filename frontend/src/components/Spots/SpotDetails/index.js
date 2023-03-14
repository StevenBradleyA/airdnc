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
        <h1>{`Hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</h1>
      )}
      {/* {currentSpot.SpotImages && (
        <h1>{`Hosted by ${currentSpot.Owner.firstName} ${currentSpot.Owner.lastName}`}</h1>
      )} */}
      <p></p>
    </div>
  );
};

export default SpotDetails;
