import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SpotCard = ({ spot }) => {
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
      <h2 className="avg-rating">
        <FontAwesomeIcon icon={faStar} />
        {spot.avgRating === "NaN" ? "New" : spot.avgRating}
      </h2>

      <h2 className="price">{`$${spot.price} night`}</h2>
      {/* Going to need the spot name on a hover css */}
    </div>
  );
};

export default SpotCard;
