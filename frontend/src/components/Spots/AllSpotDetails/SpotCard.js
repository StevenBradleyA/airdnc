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

      <div className="home-text-container">
        <div className="location-rating-container">
          <div className="location">{`${spot.city}, ${spot.state} `}</div>
          <div className="avg-rating-container">
            <FontAwesomeIcon icon={faStar} className="home-star" />
            <div className="home-rating-text">
              {spot.avgRating === "NaN" ? "New" : spot.avgRating}
            </div>
          </div>
        </div>
        <div className="home-country-container">
        {`Stay in ${spot.country === "United States"? "the United States" : spot.country }!`}


        </div>



        <div className="price-container">
          <div className="price">{`$${spot.price}`}</div>
          <div className="night">night</div>
        </div>
      </div>
      {/* Going to need the spot name on a hover css */}
    </div>
  );
};

export default SpotCard;
