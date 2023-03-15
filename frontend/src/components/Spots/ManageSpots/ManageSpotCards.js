import "./ManageSpots.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const ManageSpotCard = ({ spot }) => {
  const history = useHistory();

  const handleCardClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };


  return (
    <div key={spot.id} onClick={handleCardClick} className="spotCard">
      <img
        src={`${spot.previewImage}`}
        alt={`${spot.name}`}
        className="previewImage"
      ></img>
      <h2 className="location">{`${spot.city}, ${spot.state} `}</h2>
      {/* <h2>{spot.state} </h2> */}
      <h2 className="avg-rating">{spot.avgRating}</h2>
      <h2 className="price">{`$${spot.price} night`}</h2>
      {/* Going to need the spot name on a hover css */}
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

export default ManageSpotCard;
