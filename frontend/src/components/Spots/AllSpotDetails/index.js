import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spots";
import SpotCard from "./SpotCard";

import "./SpotCard.css";
import "./AllSpotDetails.css";
const AllSpotDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));

  return (
    <div className="spotCardsContainer">
      {allSpots.map((spot, index) => (
        <SpotCard key={spot.id} spot={spot} index={index}/>
      ))}
    </div>
  );
};

export default AllSpotDetails;
