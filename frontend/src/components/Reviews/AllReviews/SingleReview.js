import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import months from "../../../utils/nonCringeMonths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faDeleteLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deleteReviewThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import "../../Spots/SpotDetails/SpotDetails.css";
import UpdateReviewModal from "../UpdateReview";

const SingleReview = ({ review }) => {
  const [deleteClick, setDeleteClick] = useState(false);
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(review.id));
    setDeleteClick(false);
  };

  const handleUpdateReview = () => {
    setModalContent(<UpdateReviewModal />);
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

            {sessionUser && review.userId === sessionUser.id && (
              <div className="edit-delete-review-conatiner">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={handleUpdateReview}
                  className="edit-review-button-icon"
                />
                {!deleteClick && (
                  <FontAwesomeIcon
                    icon={faDeleteLeft}
                    onClick={() => setDeleteClick(true)}
                  className="delete-review-button-icon"

                  />
                )}
                {deleteClick && (
                  <div className="delete-review-buttons-container">
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={handleDeleteReview}
                      className="confirm-delete-review"
                    />
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => setDeleteClick(false)}
                      className="cancel-delete-review"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="review-text">{review.review}</div>
    </div>
  );
};

export default SingleReview;
