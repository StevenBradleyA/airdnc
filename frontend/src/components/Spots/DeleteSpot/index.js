import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteSpotThunk } from "../../../store/spots";

function DeleteSpotFormModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteSpot = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spot.id));
    closeModal();
  };

  const handleKeepSpot = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listings?</h2>
      <button className='yes-delete-yeet' onClick={handleDeleteSpot}>{`Yes (Delete Spot)`}</button>

      <button className='no-delete' onClick={handleKeepSpot}>{`No (Keep Spot)`}</button>
    </div>
  );
}

export default DeleteSpotFormModal;
