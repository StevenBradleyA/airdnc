import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const SpotCard = ({ spot }) => {
  const history = useHistory();
  const handleCardClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };

  return (
    <div onClick={handleCardClick} className="spot-card-container">
      <div className="preview-container">
        <img
          src={`${spot.previewImage}`}
          alt={`${spot.name}`}
          className="previewImage"
          // data-tooltip-id="my-tooltip"
          // data-tooltip-content={spot.name}
        />
        {/* <Tooltip id="my-tooltip" place="bottom" delayShow="200"  /> */}
{/* noArrow="true" */}
      </div>
      <div className="location-rating-container">
        <h2 className="location">{`${spot.city}, ${spot.state} `}</h2>
        {/* <h2>{spot.state} </h2> */}
        <h2 className="avg-rating">
          <FontAwesomeIcon icon={faStar} />
          {spot.avgRating === "NaN" ? "New" : spot.avgRating}
        </h2>
      </div>
      <div className="price-container">
        <h2 className="price">{`$${spot.price}`}</h2>
        <p> </p>
        <h2 className="night">night</h2>
      </div>
      {/* Going to need the spot name on a hover css */}
    </div>
  );
};

export default SpotCard;
