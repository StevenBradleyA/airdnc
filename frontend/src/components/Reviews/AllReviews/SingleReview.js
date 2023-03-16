import "./SingleReview.css";
import { useHistory } from "react-router-dom";
const SingleReview = ({ review }) => {
  const history = useHistory();


    // if the user owns this review allow a delete button.............
  return (
    <div key={review.id}>
    
    <h2>{`${review.User.firstName} ${review.User.lastName}`}</h2>
    <h3>{`Month and year from created at`}</h3>
    <p>{review.review}</p>
    {/* conditional modal delete button if they own the review */}
    {/* <button>Delete</button> */}
    </div>
  );
};

export default SingleReview;
