import "./SingleReview.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteReviewFormModal from "../DeleteReview";
import OpenModalButton from "../../OpenModalButton";


const SingleReview = ({ review }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  console.log('yesssssir', review)
  return (
    <div key={review.id}>
      <h2>{`${review.User.firstName} ${review.User.lastName}`}</h2>
      <h3>{`Month and year from created at`}</h3>
      <p>{review.review}</p>
      {review.userId === sessionUser.id && <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteReviewFormModal review={review} />}
      />}
    </div>
  );
};

export default SingleReview;
