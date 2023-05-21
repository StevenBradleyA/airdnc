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


  const allFilteredSpots = useSelector((state) => Object.values(state.filteredSpots));


  // my idea is that I could make a react store for filtered spots
  // if a spot if filtered based on price, country, and state, then I could map through it
  // if there is no filter than just map through all spots.


// once the store is update we will jsut check it code will look something like this 

// {(filteredSpots.length > 0 ? filteredSpots : allSpots).map((spot, index) => (
//   <SpotCard key={spot.id} spot={spot} index={index} />
// ))}

// should probable try filtering server side instead. because this would be more efficient
// when a spot is clicked on prob need to empty the filter state






  return (
    <div className="spotCardsContainer">
      {allSpots.map((spot, index) => (
        <SpotCard key={spot.id} spot={spot} index={index} />
      ))}
    </div>
  );
};

export default AllSpotDetails;
