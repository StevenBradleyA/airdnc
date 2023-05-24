import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ManageBookings.css";
import { getAllSpotsThunk } from "../../../../store/spots";
import { useModal } from "../../../../context/Modal";
import DeleteBookingModal from "../DeleteBooking";
import UpdateBookingModal from "../UpdateBooking";

const ManageBookingCard = ({ booking }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const spotId = booking.spotId;
  const { setModalContent } = useModal();

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setModalContent(<UpdateBookingModal booking={booking} currentSpot={currentSpot} />);

  };

  const handleDeleteClick = () => {
    setModalContent(<DeleteBookingModal booking={booking} />);
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}`);
  };

  useEffect(() => {
    dispatch(getAllSpotsThunk(spotId));
  }, [dispatch, spotId]);

  const allSpots = useSelector((state) => Object.values(state.spots));

  if (!allSpots) {
    return <h1>LOADING...</h1>;
  }


  const currentSpot = allSpots.filter((e) => e.id === spotId)[0];


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
    <div className="manage-booking-card-container">
      <div className="manage-preview-container">
        <img
          src={currentSpot.previewImage}
          alt={`${booking}`}
          className="manage-booking-preview-image"
        />
      </div>
      <div className="booking-date-info-container" onClick={handleCardClick}>
        <div className="manage-booking-card-text">{`${currentSpot.city}, ${currentSpot.state} `}</div>
        <div className="manage-booking-card-text">{`${cardDateDisplay(
          booking.startDate
        )} - ${cardDateDisplay(booking.endDate)}`}</div>
      </div>
      <div className="manage-hover-container">
        <div className="manage-hover-buttons">
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
        </div>
        <div className="booking-date-card-display">
          <div className="booking-hover-text-head"> You are booked for</div>
          <div className="booking-hover-text">{`${booking.startDate} · ${booking.endDate} `}</div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookingCard;
