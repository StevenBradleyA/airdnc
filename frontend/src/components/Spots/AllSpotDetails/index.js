import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spots";

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
      <div>
        {allSpots.map((spot) => (
           
          <div key={spot.id}>
            <img src={`${spot.previewImage}`}></img>
            <div>
              <h2>{spot.city} </h2>
              <h2>{spot.state} </h2>
              <h2>{spot.avgRating}</h2>
            </div>
            <h2>{`$${spot.price} night`}</h2>
            <h3></h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSpotDetails;
