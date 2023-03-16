import "./SingleReview.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const SingleReview = ({ review }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div key={review.id}>
      <h2>{`${review.User.firstName} ${review.User.lastName}`}</h2>
      <h3>{`Month and year from created at`}</h3>
      <p>{review.review}</p>
      {review.userId === sessionUser.id && <button>Delete</button>}
    </div>
  );
};

export default SingleReview;
