import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOwnedSpotsThunk } from "../../../store/spots";
import ManageSpotCards from "./ManageSpotCards";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getOwnedSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));
  const handleCreateClick = (e) => {
    e.preventDefault();
    history.push("/spots/new");
  };
  return (
    <div >
      <div className="manage-spots-heading">
        <h1>Manage Spots</h1>
        <button className='manage-create-button' onClick={handleCreateClick}>Create a New Spot</button>
      </div>
      <div className="manage-spots-container">
        {allSpots.map((spot) => {
          if (sessionUser && sessionUser.id === spot.ownerId) {
            return <ManageSpotCards key={spot.id} spot={spot} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ManageSpots;
