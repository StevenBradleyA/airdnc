import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnedSpotsThunk } from "../../../store/spots";
import SpotCard from "../AllSpotDetails/SpotCard";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnedSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));
  return (
    <div>
      <h1>Manage Spots</h1>
      <button>Create a New Spot</button>
      <div>
        {allSpots.map((spot) => (
          <SpotCard spot={spot} />
        ))}
      </div>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

export default ManageSpots;
