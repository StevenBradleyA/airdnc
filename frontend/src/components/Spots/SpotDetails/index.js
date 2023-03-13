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

  const allSpots = useSelector((state) => state.spots);
// const allSpots = useSelector((state) => Object.values(state.spots));
console.log('yo', allSpots)
const currentSpot = allSpots[spotId];
// if(!currentSpot.id){return null}
// else
console.log(currentSpot)
  return (
    <div>
      <h2>hallo</h2>
    </div>
  );
};

export default SpotDetails;
