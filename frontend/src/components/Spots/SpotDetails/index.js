import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../../store/spots";
import { useParams } from "react-router-dom";
import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotByIdThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => state.spots);
  console.log(allSpots);
  // const currentSpot = allSpots[useParams]
  return <div></div>;
};

export default SpotDetails;
