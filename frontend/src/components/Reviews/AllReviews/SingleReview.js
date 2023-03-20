import { useSelector } from "react-redux";
import DeleteReviewFormModal from "../DeleteReview";
import OpenModalButton from "../../OpenModalButton";
import months from "../../../utils/nonCringeMonths";
import "../../Spots/SpotDetails/SpotDetails.css"


const SingleReview = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="each-review-container">
      <h2 className='first-last-review'>{`${review.User.firstName} ${review.User.lastName}`}</h2>
      <h3 className="review-date">{`${months[new Date(review.createdAt).getMonth()]} ${new Date(
        review.createdAt
      ).getFullYear()}`}</h3>
      <p className="review-text">{review.review}</p>
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
