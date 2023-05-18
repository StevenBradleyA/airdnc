import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import months from "../../../utils/nonCringeMonths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faDeleteLeft,
  faCheck,
  faXmark,
  faC,
} from "@fortawesome/free-solid-svg-icons";
import "../../Spots/SpotDetails/SpotDetails.css";
import { deleteReviewThunk } from "../../../store/reviews";

const SingleReview = ({ review }) => {
  const [deleteClick, setDeleteClick] = useState(false);
  const dispatch = useDispatch();


  const sessionUser = useSelector((state) => state.session.user);

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(review.id));
    setDeleteClick(false)
  };

  return (
    <div className="each-review-container">
      <div className="each-review-top">
        <div className="each-review-circle-container">
          <div className="each-review-circle">
            {`${review.User.firstName[0]}`}
          </div>
        </div>

        <div className="each-review-name-date">
          <div className="first-last-review">{`${review.User.firstName} ${review.User.lastName}`}</div>
          <div className="review-date">
            {`${months[new Date(review.createdAt).getMonth()]} ${new Date(
              review.createdAt
            ).getFullYear()}`}
          </div>
        </div>
      </div>

      <div className="review-text">{review.review}</div>

      {sessionUser && review.userId === sessionUser.id && (
        <div className="edit-delete-review-conatiner">
          <FontAwesomeIcon icon={faPenToSquare} />
          {!deleteClick && (
            <FontAwesomeIcon
              icon={faDeleteLeft}
              onClick={() => setDeleteClick(true)}
            />
          )}
          {deleteClick && (
            <div>
              <FontAwesomeIcon icon={faCheck} onClick={handleDeleteReview} />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setDeleteClick(false)}
              />
            </div>
          )}
          {/* <OpenModalButton
      buttonText="Delete"
      modalComponent={<DeleteReviewFormModal review={review} />}
    /> */}
        </div>
      )}
    </div>
  );
};

export default SingleReview;
