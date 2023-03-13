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

//   if (!currentSpot.id) {
//     return null;
//   }
//   if (!currentSpot.name) {
//     return null;
//   }
//   if (!currentSpot.city) {
//     return null;
//   }
//   if (!currentSpot.state) {
//     return null;
//   }
//   if (!currentSpot.country) {
//     return null;
//   }
  console.log(currentSpot);
  return (
    <div>
      <h1>{currentSpot.name}</h1>
      <h2>{`${currentSpot.city}, ${currentSpot.state}, ${currentSpot.country}`}</h2>
      <div>{/* going to need to show all images from new useeffect */}</div>
      {/* <h1>{`Hosted by ${} ${}`}</h1> */}
      <p></p>
    </div>
  );
};

export default SpotDetails;
