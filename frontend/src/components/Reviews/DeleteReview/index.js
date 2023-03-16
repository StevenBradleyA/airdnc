import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReviewThunk } from "../../../store/reviews";
import "./DeleteReview.css";

function DeleteReviewFormModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(review.id));
    closeModal();
  };

  const handleKeepReview = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <button onClick={handleDeleteReview}>{`Yes (Delete Review)`}</button>

      <button onClick={handleKeepReview}>{`No (Keep Review)`}</button>
    </div>
  );
}

export default DeleteReviewFormModal;
