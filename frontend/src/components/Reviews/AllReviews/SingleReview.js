import "./SingleReview.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteReviewFormModal from "../DeleteReview";
import OpenModalButton from "../../OpenModalButton";
import months from "../../../utils/nonCringeMonths";

const SingleReview = ({ review }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div >
      <h2>{`${review.User.firstName} ${review.User.lastName}`}</h2>
      <h3>{`${months[new Date(review.createdAt).getMonth()]} ${new Date(
        review.createdAt
      ).getFullYear()}`}</h3>
      <p>{review.review}</p>
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
