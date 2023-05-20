import "./ManageSpots.css";
import { useHistory } from "react-router-dom";
import DeleteSpotFormModal from "../DeleteSpot";
import OpenModalButton from "../../OpenModalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ManageSpotCard = ({ spot }) => {
  const history = useHistory();

  const handleCardClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };
  const handleUpdateClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}/edit`);
  };
  return (
    <div className="manage-spot-card-container">
      <div className="manage-preview-container">
        <img
          src={`${spot.previewImage}`}
          alt={`${spot.name}`}
          className="manage-previewImage"
        />
      </div>
      <div className="home-text-container" onClick={handleCardClick}>
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
          {`Stay in ${
            spot.country === "United States"
              ? "the United States"
              : spot.country
          }!`}
        </div>
        <div className="price-container">
          <div className="price">{`$${spot.price}`}</div>
          <div className="night">night</div>
        </div>
      </div>
      <div className="manage-buttons-container">

      <button className="manage-update-button" onClick={handleUpdateClick}>
        Update
      </button>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteSpotFormModal spot={spot} />}
      />
      </div>
    </div>
  );
};

export default ManageSpotCard;
