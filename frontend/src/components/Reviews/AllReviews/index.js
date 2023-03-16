import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsBySpotIdThunk } from "../../../store/reviews";
import './AllReviews.css'


const AllReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const allSpots = useSelector((state) => Object.values(state.spots));
  return (
    <div className="spotCardsContainer">
      {allSpots.map((spot) => (
        <SpotCard spot={spot} />
      ))}
    </div>
  );
};

export default AllReviews;
