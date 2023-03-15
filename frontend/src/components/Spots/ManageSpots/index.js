import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnedSpotsThunk } from "../../../store/spots";
import ManageSpotCards from './ManageSpotCards'
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
    // where sessionUser.id === owner.id


  useEffect(() => {
    dispatch(getOwnedSpotsThunk());
  }, [dispatch]);
// do I need to check if session.user.id === owner.id 
// or how do I access this from my new thunk. Not seeing it in state
  const allSpots = useSelector((state) => Object.values(state.spots));
  
//   spot.ownerId === sessionUser.id
  return (
    <div>
      <h1>Manage Spots</h1>
      <button>Create a New Spot</button>
      <div>
        {allSpots.map((spot) => (
                <ManageSpotCards spot={spot} />

            
        ))}
      </div>
      
    </div>
  );
};

export default ManageSpots;
