import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ManageBookings.css";
import { getAllSpotsThunk, getSpotByIdThunk } from "../../../../store/spots";
import { useModal } from "../../../../context/Modal";

const ManageBookingCard = ({ booking }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const spotId = booking.spotId;
  const { setModalContent } = useModal();

  const handleUpdateClick = (e) => {
    e.preventDefault();
    // history.push(`/spots/${spot.id}/edit`);
  };

  const handleDeleteClick = () => {
    // setModalContent(<LoginFormModal />);
  };

  useEffect(() => {
    dispatch(getAllSpotsThunk(spotId));
  }, [dispatch, spotId]);

  const allSpots = useSelector((state) => Object.values(state.spots));

  if (!allSpots) {
    return <h1>LOADING...</h1>;
  }

  console.log(allSpots);

  const currentSpot = allSpots.filter((e) => e.id === spotId)[0];

  console.log(currentSpot);

  if (!currentSpot) {
    return <h1>LOADING...</h1>;
  }

  const cardDateDisplay = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}`;
  };




// ! REMEMBER TO CHANGE CLASSNAMES TO NOT EFFECT OTHER PAGE YO


  return (
    <div className="manage-spot-card-container">
      <div className="manage-preview-container">
        <img
          src={currentSpot.previewImage}
          alt={`${booking}`}
          className="manage-previewImage"
        />
      </div>
      <div className="booking-date-info-container">
        <div className="manage-booking-card-text">{`${currentSpot.city}, ${currentSpot.state} `}</div>
        <div className="manage-booking-card-text">{`${cardDateDisplay(
          booking.startDate
        )} - ${cardDateDisplay(booking.endDate)}`}</div>
      </div>
      <div className="manage-buttons-container">
        <button
          className="manage-booking-update-button"
          onClick={handleUpdateClick}
        >
          Update
        </button>
        <button
          className="manage-booking-delete-button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
       <div>
            <div> You are booked for:</div>
            <div>

            {`${booking.startDate} ${booking.endDate} `}

            </div>


       </div>
      </div>
    </div>
  );
};

export default ManageBookingCard;
