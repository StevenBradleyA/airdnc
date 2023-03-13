import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spots";

const AllSpotDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));
  console.log(allSpots);

  return (
    <div>
      <div>
        {allSpots.map((spot) => (
            <SpotCard spot={spot}></SpotCard>
        ))}
      </div>
    </div>
  );
};

export default AllSpotDetails;
