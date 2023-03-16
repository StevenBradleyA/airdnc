import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteSpotThunk } from "../../../store/spots";

function DeleteFormModal({spot}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

//   const sessionUser = useSelector((state) => state.session.user);
  const allSpots = useSelector((state) => Object.values(state.spots));

  // not sure if I need to validate this or if the backend has it dow.
  //   if (sessionUser.id === spot.ownerId) {

  {
    /* <div>
        {allSpots.map((spot) => {
          if (sessionUser.id === spot.ownerId) {
            return <ManageSpotCards spot={spot} />;
          } else {
            return null;
          }
        })}
      </div> */
  }

  const handleDeleteSpot = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spot.id))
    closeModal()
      
  };

  const handleKeepSpot = (e) => {
    e.preventDefault();
     closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listings?</h2>
      <button onClick={handleDeleteSpot}>{`Yes (Delete Spot)`}</button>

      <button onClick={handleKeepSpot}>{`No (Keep Spot)`}</button>
    </div>
  );
}

export default DeleteFormModal;
