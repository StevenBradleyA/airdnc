import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spots";
import SpotCard from "./SpotCard";
import "./AllSpotDetails.css";
const AllSpotDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));
  return (
    <div className="spotCardsContainer">
      {allSpots.map((spot) => (
        <SpotCard spot={spot} />
      ))}
    </div>
  );
};

export default AllSpotDetails;
