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

  const allFilters = useSelector((state) => Object.values(state.filteredSpots));

  const filters = allFilters.filter((e) => e !== "");

  let filteredSpots;
  if (filters.length > 0) {
    filteredSpots = allSpots.filter((spot) => {
      const { minPrice, maxPrice, country, state } = allFilters;

      if (minPrice && spot.price <= Number(minPrice)) {
        return false;
      }
      if (maxPrice && spot.price >= Number(maxPrice)) {
        return false;
      }
      if (country && spot.country !== country) {
        return false;
      }
      if (state && spot.state !== state) {
        return false;
      }

      return true; // Return true if spot passes all filters
    });
  } else {
    filteredSpots = allSpots; // No filters applied, return all spots
  }

  console.log("ayo bb", filteredSpots);

  return (
    <div className="spotCardsContainer">
      {filters.length > 0
        ? filteredSpots
        : allSpots.map((spot, index) => (
            <SpotCard key={spot.id} spot={spot} index={index} />
          ))}
    </div>
  );
};

export default AllSpotDetails;
