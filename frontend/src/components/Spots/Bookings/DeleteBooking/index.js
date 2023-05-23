import React from "react";
import { useDispatch } from "react-redux";

import { deleteBookingThunk } from "../../../../store/booking";
import { useModal } from "../../../../context/Modal";

function DeleteBookingModal({ booking }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteSpot = async (e) => {
    e.preventDefault();
    await dispatch(deleteBookingThunk(booking.id));
    closeModal();
  };

  const handleKeepSpot = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-spot-modal-container">
      <div className="delete-spot-modal-header">Confirm Delete</div>
      <div className="delete-spot-modal-text">Are you sure you want to delete your booking?</div>
      <button className='yes-delete-yeet' onClick={handleDeleteSpot}>{`Yes (Delete Booking)`}</button>

      <button className='no-delete' onClick={handleKeepSpot}>{`No (Keep Booking)`}</button>
    </div>
  );
}

export default DeleteBookingModal;
