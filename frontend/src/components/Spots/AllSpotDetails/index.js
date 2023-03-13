import React, { useEffect, useState } from "react";
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
  //   console.log(allSpots);
  //   console.log(allSpots.map((c)=>(c)))
  return (
    <div>
      <div className="spotCardsContainer">
        {allSpots.map((spot) => (
          <SpotCard spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default AllSpotDetails;
