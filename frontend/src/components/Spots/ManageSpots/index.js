import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnedSpotsThunk } from "../../../store/spots";
import ManageSpotCards from "./ManageSpotCards";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOwnedSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));

  return (
    <div>
      <h1>Manage Spots</h1>
      <button>Create a New Spot</button>
      <div>
        {allSpots.map((spot) => {
          if (sessionUser.id === spot.ownerId) {
            return <ManageSpotCards spot={spot} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ManageSpots;
