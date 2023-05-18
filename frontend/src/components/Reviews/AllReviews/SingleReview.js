import { useSelector } from "react-redux";
import DeleteReviewFormModal from "../DeleteReview";
import OpenModalButton from "../../OpenModalButton";
import months from "../../../utils/nonCringeMonths";
import "../../Spots/SpotDetails/SpotDetails.css";

const SingleReview = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
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
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<DeleteReviewFormModal review={review} />}
        />
      )}
    </div>
  );
};

export default SingleReview;
